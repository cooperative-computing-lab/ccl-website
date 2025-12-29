#!/usr/bin/env python3
"""
Create a project page from an existing CCL research project webpage.

Usage:
    python create_project_page.py https://ccl.cse.nd.edu/research/vc3/ vc3
    python create_project_page.py https://ccl.cse.nd.edu/research/biocompute/ biocompute --order 5
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


def download_image(img_url, project_name, img_dir):
    """Download an image and save it to the project image directory."""
    try:
        # Create directory if it doesn't exist
        os.makedirs(img_dir, exist_ok=True)
        
        response = requests.get(img_url, timeout=30)
        response.raise_for_status()
        
        # Get file extension from URL
        ext = os.path.splitext(urlparse(img_url).path)[1]
        if not ext:
            ext = '.png'
        
        # Get original filename
        orig_filename = os.path.basename(urlparse(img_url).path)
        
        # Save with project name prefix
        filename = f"{project_name}-{orig_filename}"
        filepath = os.path.join(img_dir, filename)
        
        with open(filepath, 'wb') as f:
            f.write(response.content)
        
        print(f"  ✓ Downloaded image: {filename}")
        return filename
    
    except Exception as e:
        print(f"  ✗ Failed to download image: {e}")
        return None


def extract_keyword_from_html(soup):
    """Extract the keyword/tag from the publications section."""
    # Look for text like "Showing papers with tag <b>vc3</b>"
    html_str = str(soup)
    match = re.search(r'Showing papers with tag\s+<b>(\w+)</b>', html_str, re.IGNORECASE)
    if match:
        return match.group(1)
    
    # Alternative: look in plain text
    text = soup.get_text()
    match = re.search(r'Showing papers with tag\s+(\w+)', text, re.IGNORECASE)
    if match:
        return match.group(1)
    
    return None


def extract_paper_titles_from_html(soup):
    """Extract paper titles from the publications section."""
    titles = []
    
    # Find all tables in the publications section
    for table in soup.find_all('table'):
        # Look for links with <b> tags containing titles
        for link in table.find_all('a'):
            b_tag = link.find('b')
            if b_tag:
                title = b_tag.get_text().strip()
                if title and len(title) > 10:  # Reasonable title length
                    titles.append(title)
    
    return titles


def html_to_markdown(html_content):
    """Convert HTML to Markdown."""
    h = html2text.HTML2Text()
    h.ignore_links = False
    h.ignore_images = False
    h.ignore_emphasis = False
    h.body_width = 0  # Don't wrap lines
    h.unicode_snob = True
    h.skip_internal_links = True
    
    markdown = h.handle(html_content)
    
    # Clean up excessive newlines
    markdown = re.sub(r'\n{3,}', '\n\n', markdown)
    
    return markdown.strip()


def extract_project_info(soup, base_url):
    """Extract project title and description."""
    body = soup.find('td', class_='subpagebody')
    if not body:
        return None, "", []
    
    title = None
    description_parts = []
    images = []
    
    # Find h1 or h2 for title (h1 is preferred)
    h1 = body.find('h1')
    h2 = body.find('h2')
    title_tag = h1 if h1 else h2
    if title_tag:
        title = title_tag.get_text().strip()
    
    # Look for images (but skip thumbnails)
    for img in body.find_all('img'):
        img_src = img.get('src', '')
        if img_src:
            # Skip thumbnail images
            if 'thumb' in img_src.lower():
                continue
            
            # Skip very small images (likely icons)
            width = img.get('width', '0')
            height = img.get('height', '0')
            try:
                w = int(width) if width else 0
                h = int(height) if height else 0
                if w < 50 and h < 50:
                    continue
            except:
                pass
            
            img_url = urljoin(base_url, img_src)
            images.append(img_url)
    
    # Extract content between title and publications (be greedy - collect everything!)
    found_title = False
    
    for element in body.children:
        if not element.name:
            continue
        
        # Skip until we find the title tag (h1 or h2)
        if not found_title and element.name in ['h1', 'h2']:
            found_title = True
            continue
        
        if not found_title:
            continue
        
        # Stop only at publications section or h2 that contains "publication" text
        if element.name == 'h2' and 'publication' in element.get_text().lower():
            break
        
        # For <p> tags, check if they contain ONLY the "showing papers" text (not nested content)
        if element.name == 'p':
            # Get direct text only (not from children)
            direct_text = ''.join([str(s) for s in element.strings if s.parent == element]).strip().lower()
            if 'showing papers with tag' in direct_text and len(direct_text) < 100:
                # This is the publications marker, stop here
                break
        
        # Collect ALL content after title (be greedy!)
        if found_title:
            description_parts.append(str(element))
    
    # Convert description to markdown
    html_content = '\n'.join(description_parts)
    description = html_to_markdown(html_content)
    
    return title, description, images


def create_project_markdown(project_name, title, description, image_filenames, order, keyword):
    """Create the markdown content for the project page."""
    # Use placeholder text for front matter descriptions
    short_desc = "Description goes here."
    long_desc_placeholder = "Description goes here."
    subtitle_placeholder = "Subtitle goes here."
    
    # Use actual extracted description for the page body
    body_content = description if description else "Description goes here."
    
    content = f"""---
layout: project
title: "{title if title else project_name.upper()}"
subtitle: "{subtitle_placeholder}"
description: "{short_desc}"
long_description: "{long_desc_placeholder}"
order: {order}
skip_list: true
category: work
carousel: false
publication_keywords:
  - {keyword}
---
{body_content}
"""
    
    # Add images if any
    if image_filenames:
        content += '\n\n'
        for img_file in image_filenames:
            content += f"""<div class="row justify-content-sm-center mt-3">
    <div class="col-sm-6">
        {{{{ include figure.liquid path="assets/img/projects/{img_file}" class="img-fluid rounded z-depth-0" zoomable=true }}}}
    </div>
</div>

"""
    
    return content


def backup_bib_file(bib_file):
    """Create a timestamped backup of the bib file."""
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_file = f"{bib_file}.bak.{timestamp}"
    
    with open(bib_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    with open(backup_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✓ Backup created: {backup_file}")
    return backup_file


def normalize_title(title):
    """Normalize title for comparison."""
    normalized = re.sub(r'[{}\\]', '', title)
    normalized = re.sub(r'[^\w\s]', ' ', normalized)
    normalized = re.sub(r'\s+', ' ', normalized)
    return normalized.lower().strip()


def find_entry_by_title(bib_content, title):
    """Find a bib entry that matches the given title."""
    normalized_target = normalize_title(title)
    
    entry_pattern = r'(@\w+\s*\{[^@]+\n\})'
    entries = re.finditer(entry_pattern, bib_content, re.MULTILINE | re.DOTALL)
    
    for match in entries:
        entry_text = match.group(0)
        title_match = re.search(r'title\s*=\s*["{]([^"}]+)["}]', entry_text, re.IGNORECASE | re.DOTALL)
        
        if title_match:
            entry_title = title_match.group(1)
            normalized_entry = normalize_title(entry_title)
            
            if normalized_target == normalized_entry or \
               normalized_target in normalized_entry or \
               normalized_entry in normalized_target:
                return entry_text, match.start(), match.end()
    
    return None, None, None


def add_keyword_to_entry(entry_text, keyword):
    """Add keyword field to a bib entry if not already present."""
    keywords_match = re.search(r'keywords\s*=\s*\{([^}]*)\}', entry_text, re.IGNORECASE)
    
    if keywords_match:
        existing_keywords = keywords_match.group(1).strip()
        keyword_list = [k.strip() for k in existing_keywords.split(',')]
        if keyword in keyword_list:
            return entry_text, False
        
        if existing_keywords:
            new_keywords = f"{existing_keywords}, {keyword}"
        else:
            new_keywords = keyword
        
        entry_text = re.sub(
            r'(keywords\s*=\s*\{)[^}]*(\})',
            f'\\1{new_keywords}\\2',
            entry_text,
            flags=re.IGNORECASE
        )
        return entry_text, True
    
    # Keywords field doesn't exist, add it
    cclpaperid_match = re.search(r'(cclpaperid\s*=\s*"[^"]+",?\s*\n)', entry_text, re.IGNORECASE)
    if cclpaperid_match:
        insert_pos = cclpaperid_match.end()
        entry_text = (
            entry_text[:insert_pos] +
            f"keywords={{{keyword}}},\n" +
            entry_text[insert_pos:]
        )
        return entry_text, True
    
    pdf_match = re.search(r'(\s*)(pdf\s*=)', entry_text, re.IGNORECASE)
    if pdf_match:
        indent = pdf_match.group(1)
        insert_pos = pdf_match.start()
        entry_text = (
            entry_text[:insert_pos] +
            f"keywords={{{keyword}}},\n{indent}" +
            entry_text[insert_pos:]
        )
        return entry_text, True
    
    return entry_text, False


def update_papers_bib(titles, keyword, bib_file):
    """Update papers.bib with the keyword for matching papers."""
    print(f"\n📚 Updating papers.bib with keyword '{keyword}'...")
    
    # Read bib file
    with open(bib_file, 'r', encoding='utf-8') as f:
        bib_content = f.read()
    
    original_content = bib_content
    updated_count = 0
    not_found = []
    already_has_keyword = []
    
    for i, title in enumerate(titles, 1):
        print(f"  {i:2d}. {title[:60]}{'...' if len(title) > 60 else ''}")
        entry_text, start_pos, end_pos = find_entry_by_title(bib_content, title)
        
        if entry_text:
            updated_entry, was_updated = add_keyword_to_entry(entry_text, keyword)
            
            if was_updated:
                bib_content = bib_content[:start_pos] + updated_entry + bib_content[end_pos:]
                updated_count += 1
                print(f"      ✓ Added keyword '{keyword}'")
            else:
                already_has_keyword.append(title)
                print(f"      - Already has keyword")
        else:
            not_found.append(title)
            print(f"      ✗ Not found in bib file")
    
    # Only write if something changed
    if bib_content != original_content:
        # Create backup first
        backup_bib_file(bib_file)
        
        with open(bib_file, 'w', encoding='utf-8') as f:
            f.write(bib_content)
        print(f"\n  ✓ Updated {updated_count} entries in papers.bib")
    else:
        print(f"\n  - No changes made to papers.bib")
    
    return updated_count, len(already_has_keyword), len(not_found)


def main():
    parser = argparse.ArgumentParser(
        description='Create a project page from an existing CCL research project webpage.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python create_project_page.py https://ccl.cse.nd.edu/research/vc3/ vc3
  python create_project_page.py https://ccl.cse.nd.edu/research/biocompute/ biocompute --order 5
        """
    )
    parser.add_argument(
        'url',
        help='URL of the CCL project page to download'
    )
    parser.add_argument(
        'name',
        help='Project name (e.g., vc3, biocompute, taskvine)'
    )
    parser.add_argument(
        '--order',
        type=int,
        default=9,
        help='Order in the project list (default: 9)'
    )
    parser.add_argument(
        '--bib-file',
        default='../_bibliography/papers.bib',
        help='Path to papers.bib file (default: ../_bibliography/papers.bib)'
    )
    
    args = parser.parse_args()
    
    # Get absolute paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    img_dir = os.path.join(script_dir, '..', 'assets', 'img', 'projects')
    project_dir = os.path.join(script_dir, '..', '_projects')
    
    if not os.path.isabs(args.bib_file):
        bib_file = os.path.join(script_dir, args.bib_file)
    else:
        bib_file = args.bib_file
    
    print(f"\n{'='*70}")
    print(f"CREATING PROJECT PAGE: {args.name.upper()}")
    print(f"{'='*70}")
    
    # Step 1: Download HTML
    print(f"\n📥 Downloading HTML from: {args.url}")
    try:
        response = requests.get(args.url, timeout=30)
        response.raise_for_status()
        print(f"  ✓ Downloaded {len(response.content)} bytes")
    except Exception as e:
        print(f"  ✗ Failed to download: {e}")
        sys.exit(1)
    
    # Step 2: Parse HTML
    print(f"\n🔍 Parsing HTML content...")
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Step 3: Extract project information
    print(f"\n📝 Extracting project information...")
    title, description, image_urls = extract_project_info(soup, args.url)
    
    if title:
        print(f"  ✓ Title: {title}")
    if description:
        print(f"  ✓ Description: {len(description)} characters")
    
    # Step 4: Download images
    print(f"\n🖼️  Extracting images...")
    image_filenames = []
    if image_urls:
        print(f"  Found {len(image_urls)} images")
        for img_url in image_urls:
            filename = download_image(img_url, args.name, img_dir)
            if filename:
                image_filenames.append(filename)
    else:
        print(f"  No images found")
    
    # Step 5: Use project name as keyword
    print(f"\n🏷️  Setting publication keyword...")
    keyword = args.name
    print(f"  ✓ Using keyword: '{keyword}'")
    
    # Step 6: Extract paper titles
    print(f"\n📄 Extracting paper titles...")
    paper_titles = extract_paper_titles_from_html(soup)
    print(f"  ✓ Found {len(paper_titles)} papers")
    
    # Step 7: Create markdown file
    print(f"\n📄 Creating project markdown file...")
    markdown_content = create_project_markdown(
        args.name,
        title,
        description,
        image_filenames,
        args.order,
        keyword
    )
    
    project_file = os.path.join(project_dir, f"{args.name}.md")
    os.makedirs(project_dir, exist_ok=True)
    
    with open(project_file, 'w', encoding='utf-8') as f:
        f.write(markdown_content)
    
    print(f"  ✓ Created: {project_file}")
    
    # Step 8: Update papers.bib
    if paper_titles and os.path.exists(bib_file):
        updated, already_has, not_found = update_papers_bib(paper_titles, keyword, bib_file)
        
        print(f"\n{'='*70}")
        print(f"SUMMARY")
        print(f"{'='*70}")
        print(f"  Project page:        {project_file}")
        print(f"  Images:              {len(image_filenames)}")
        print(f"  Keyword:             {keyword}")
        print(f"  Papers found:        {len(paper_titles)}")
        print(f"  ✓ Updated in bib:    {updated}")
        print(f"  - Already tagged:    {already_has}")
        print(f"  ✗ Not found:         {not_found}")
        print(f"{'='*70}")
    else:
        print(f"\n{'='*70}")
        print(f"SUMMARY")
        print(f"{'='*70}")
        print(f"  Project page:        {project_file}")
        print(f"  Images:              {len(image_filenames)}")
        print(f"  Keyword:             {keyword}")
        print(f"  Papers found:        {len(paper_titles)}")
        print(f"{'='*70}")
    
    print(f"\n✓ Successfully created project page for '{args.name}'!")


if __name__ == '__main__':
    main()
