#!/usr/bin/env python3
"""
Create a Jekyll blog post from an external blog URL.

Usage:
    python create_blog_post.py https://example.com/blog-post --category highlights
    python create_blog_post.py https://example.com/blog-post --tags "tag1,tag2,tag3"
"""

import sys
import argparse
import re
import os
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from urllib.parse import urljoin, urlparse
import html2text
import yaml


def download_image(img_url, post_slug, img_dir):
    """Download an image and save it to the blog image directory."""
    try:
        # Create directory if it doesn't exist
        os.makedirs(img_dir, exist_ok=True)
        
        response = requests.get(img_url, timeout=30)
        response.raise_for_status()
        
        # Get file extension from URL
        ext = os.path.splitext(urlparse(img_url).path)[1]
        if not ext:
            # Try to detect from content-type
            content_type = response.headers.get('content-type', '')
            if 'png' in content_type:
                ext = '.png'
            elif 'jpeg' in content_type or 'jpg' in content_type:
                ext = '.jpg'
            elif 'gif' in content_type:
                ext = '.gif'
            else:
                ext = '.png'
        
        # Generate filename from URL or use index
        url_path = urlparse(img_url).path
        url_filename = os.path.basename(url_path)
        if url_filename and url_filename != '':
            filename = url_filename
        else:
            # Generate a name from hash
            import hashlib
            hash_part = hashlib.md5(img_url.encode()).hexdigest()[:10]
            filename = f"image-{hash_part}{ext}"
        
        filepath = os.path.join(img_dir, filename)
        
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"  ✓ Downloaded image: {filename}")
        return filename
    
    except Exception as e:
        print(f"  ✗ Failed to download image {img_url}: {e}")
        return None


def extract_content(url):
    """Extract blog post content from URL."""
    try:
        print(f"Fetching content from: {url}")
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Try to find the main content (common patterns)
        content = None
        for selector in ['.post-body', '.entry-content', 'article', '.post-content', 'main', '.content']:
            content = soup.select_one(selector)
            if content:
                break
        
        if not content:
            content = soup.find('body')
        
        # Try to extract title (Blogger-specific first, then general)
        title = None
        title_tag = soup.select_one('.post-title.entry-title')
        if title_tag:
            title = title_tag.get_text().strip()
        if not title:
            title_tag = soup.find('h1')
            if title_tag:
                title = title_tag.get_text().strip()
        if not title:
            title_tag = soup.find('title')
            if title_tag:
                title = title_tag.get_text().strip()
        
        # Try to extract description/excerpt
        description = None
        meta_desc = soup.find('meta', {'name': 'description'})
        if meta_desc:
            description = meta_desc.get('content', '').strip()
        if not description:
            meta_desc = soup.find('meta', {'itemprop': 'description'})
            if meta_desc:
                description = meta_desc.get('content', '').strip()
        if not description:
            # Try first paragraph
            first_p = content.find('p') if content else None
            if first_p:
                description = first_p.get_text().strip()[:200]
        
        # Try to extract author (Blogger-specific first)
        author = None
        author_tag = soup.select_one('.post-author .fn')
        if author_tag:
            author = author_tag.get_text().strip()
        if not author:
            for selector in ['.author', '.byline', '[rel="author"]']:
                author_tag = soup.select_one(selector)
                if author_tag:
                    author = author_tag.get_text().strip()
                    break
        
        # Try to extract date (Blogger date-header first)
        date = None
        date_tag = soup.select_one('.date-header span')
        if date_tag:
            date_str = date_tag.get_text().strip()
            try:
                # Parse formats like "Tuesday, November 25, 2025"
                date = datetime.strptime(date_str, '%A, %B %d, %Y')
            except:
                try:
                    # Try without day of week
                    date = datetime.strptime(date_str, '%B %d, %Y')
                except:
                    pass
        
        if not date:
            for selector in ['time', '.date', '.published']:
                date_tag = soup.select_one(selector)
                if date_tag:
                    date_str = date_tag.get('datetime') or date_tag.get_text()
                    try:
                        date = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
                    except:
                        pass
                    if date:
                        break
        
        if not date:
            date = datetime.now()
        
        return {
            'title': title or 'Untitled Post',
            'content': content,
            'description': description,
            'author': author,
            'date': date,
            'soup': soup
        }
        
    except Exception as e:
        print(f"Error fetching content: {e}")
        return None


def convert_images_and_html(content_soup, post_slug, year, base_url):
    """Download images and convert HTML to Markdown with proper image paths."""
    if not content_soup:
        return "", ""
    
    # Clean up excessive whitespace in the HTML
    # Remove multiple consecutive <br> tags
    for br in content_soup.find_all('br'):
        # Check if there are multiple br tags in a row
        next_sibling = br.next_sibling
        if next_sibling and next_sibling.name == 'br':
            br.decompose()
    
    # Remove empty divs and spans that just contain whitespace
    for tag in content_soup.find_all(['div', 'span']):
        if not tag.get_text(strip=True) and not tag.find(['img', 'iframe', 'video']):
            tag.decompose()
    
    # Detect and mark code blocks conservatively
    # Look for pre/code tags, or divs with code-like styling
    for pre in content_soup.find_all('pre'):
        pre['data-is-code'] = 'true'
    
    for code in content_soup.find_all('code'):
        # Only mark as code if it's actually in a code context
        if code.parent.name in ['pre', 'div'] or len(code.get_text().strip()) > 20:
            code['data-is-code'] = 'true'
    
    # Look for code-like patterns: monospace fonts with background colors
    for div in content_soup.find_all('div', style=True):
        style = div.get('style', '')
        if ('courier' in style.lower() or 'monospace' in style.lower()) and 'background' in style.lower():
            div.name = 'pre'
            div['data-is-code'] = 'true'
    
    # Directory for this post's images
    img_dir = os.path.join(os.path.dirname(__file__), '..', 'assets', 'blog', str(year), post_slug)
    img_dir = os.path.abspath(img_dir)
    
    # Find all images
    images = content_soup.find_all('img')
    image_map = {}
    
    print(f"\nProcessing {len(images)} images...")
    for idx, img in enumerate(images):
        img_url = img.get('src') or img.get('data-src')
        if not img_url:
            continue
        
        # Check if parent is an <a> tag with a higher-res image URL
        parent = img.parent
        if parent and parent.name == 'a':
            parent_href = parent.get('href', '')
            # Check if the href points to an image (common in Blogger for full-res links)
            if parent_href and any(ext in parent_href.lower() for ext in ['.png', '.jpg', '.jpeg', '.gif', '.webp']):
                print(f"  Found full-res image link: {parent_href}")
                img_url = parent_href
                # Remove the <a> wrapper so we just have the image
                parent.replace_with(img)
        
        # Make absolute URL
        if not img_url.startswith('http'):
            img_url = urljoin(base_url, img_url)
        
        # Download image
        filename = download_image(img_url, post_slug, img_dir)
        if filename:
            # Map old URL to new path
            new_path = f"/assets/blog/{year}/{post_slug}/{filename}"
            image_map[img_url] = new_path
            # Update img tag in soup
            img['src'] = new_path
    
    # Convert to Markdown
    h = html2text.HTML2Text()
    h.body_width = 0  # Don't wrap lines
    h.ignore_links = False
    h.ignore_images = False
    h.images_to_alt = False
    h.skip_internal_links = False
    
    # Convert HTML to markdown
    markdown = h.handle(str(content_soup))
    
    # Replace image URLs that might have been missed
    for old_url, new_path in image_map.items():
        markdown = markdown.replace(old_url, new_path)
    
    # Remove blogspot references in links
    markdown = re.sub(r'\]\(https?://[^\)]*blogger\.googleusercontent\.com[^\)]*\)', '](#)', markdown)
    markdown = re.sub(r'blogger\.googleusercontent\.com', '', markdown)
    
    # Convert markdown image syntax to Jekyll figure.liquid includes
    # Pattern: ![alt text](image_path)
    def replace_image(match):
        alt_text = match.group(1)
        img_path = match.group(2)
        # Only convert if it's our local path
        if img_path.startswith('/assets/blog/'):
            return f'''<div class="row justify-content-sm-center">\n<div class="col-sm-12">\n{{% include figure.liquid path="{img_path}" title="{alt_text}" class="img-fluid rounded z-depth-1" zoomable=true %}}\n</div>\n</div>'''
        return match.group(0)
    
    markdown = re.sub(r'!\[([^\]]*)\]\(([^\)]+)\)', replace_image, markdown)
    
    # Also handle standalone linked images like [![...](path)](#)
    markdown = re.sub(r'\[!\[([^\]]*)\]\(([^\)]+)\)\]\(#\)', replace_image, markdown)
    
    # Clean up excessive blank lines (more than 2 consecutive)
    markdown = re.sub(r'\n{4,}', '\n\n\n', markdown)
    
    # Remove all leading whitespace/indentation to prevent Jekyll auto-formatting
    lines = markdown.split('\n')
    lines = [line.lstrip().rstrip() for line in lines]
    markdown = '\n'.join(lines)
    
    return markdown, img_dir


def slugify(text):
    """Convert text to URL-friendly slug."""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')


def create_blog_post(url, category=None, tags=None, author=None):
    """Create a Jekyll blog post from a URL."""
    
    # Extract content
    data = extract_content(url)
    if not data:
        print("Failed to extract content from URL")
        return False
    
    # Generate slug and paths
    date = data['date']
    year = date.year
    slug = slugify(data['title'])
    date_str = date.strftime('%Y-%m-%d')
    filename = f"{date_str}-{slug}.md"
    
    # Determine post directory
    posts_dir = os.path.join(os.path.dirname(__file__), '..', '_posts', str(year))
    posts_dir = os.path.abspath(posts_dir)
    os.makedirs(posts_dir, exist_ok=True)
    
    filepath = os.path.join(posts_dir, filename)
    
    # Always overwrite if exists
    if os.path.exists(filepath):
        print(f"File {filename} exists. Overwriting...")
    
    print(f"\nCreating blog post: {filename}")
    
    # Convert content and download images
    markdown_content, img_dir = convert_images_and_html(data['content'], slug, year, url)
    
    # Determine featured image (first image if available)
    featured_image = None
    if os.path.exists(img_dir):
        images = [f for f in os.listdir(img_dir) if f.endswith(('.png', '.jpg', '.jpeg', '.gif'))]
        if images:
            featured_image = f"/assets/blog/{year}/{slug}/{images[0]}"
    
    # Build front matter in specific order
    from collections import OrderedDict
    front_matter = OrderedDict()
    front_matter['layout'] = 'post'
    front_matter['title'] = data['title']
    front_matter['date'] = date.strftime('%Y-%m-%dT%H:%M:%S%z')
    front_matter['author'] = author or data['author'] or 'Unknown'
    
    if featured_image:
        front_matter['image'] = featured_image
    
    if category:
        if isinstance(category, str):
            category = [c.strip() for c in category.split(',')]
        front_matter['categories'] = category
    
    if tags:
        if isinstance(tags, str):
            tags = [t.strip() for t in tags.split(',')]
        front_matter['tags'] = tags
    
    if data['description']:
        front_matter['description'] = data['description']
    
    front_matter['toc'] = False
    front_matter['related_posts'] = True
    
    # Write the post file with custom YAML formatting
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('---\n')
        # Write each field manually to preserve order and prevent line breaks
        for key, value in front_matter.items():
            if isinstance(value, list):
                f.write(f'{key}:\n')
                for item in value:
                    f.write(f'- {item}\n')
            elif isinstance(value, bool):
                f.write(f'{key}: {str(value).lower()}\n')
            elif isinstance(value, str):
                # Escape quotes if needed
                if ':' in value or '\n' in value or '"' in value:
                    value_escaped = value.replace('"', '\\"')
                    f.write(f'{key}: "{value_escaped}"\n')
                else:
                    f.write(f'{key}: {value}\n')
            else:
                f.write(f'{key}: {value}\n')
        f.write('---\n\n')
        f.write(markdown_content)
    
    print(f"\n✓ Blog post created: {filepath}")
    print(f"✓ Images saved to: {img_dir}")
    
    return True


def main():
    parser = argparse.ArgumentParser(description='Create a Jekyll blog post from an external URL')
    parser.add_argument('url', help='URL of the blog post to import')
    parser.add_argument('--category', '--categories', help='Comma-separated categories (e.g., "highlights")')
    parser.add_argument('--tags', help='Comma-separated tags (e.g., "workflows,hpc,research")')
    parser.add_argument('--author', help='Override author name')
    
    args = parser.parse_args()
    
    success = create_blog_post(
        args.url,
        category=args.category,
        tags=args.tags,
        author=args.author
    )
    
    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
