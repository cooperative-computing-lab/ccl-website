#!/usr/bin/env python3
"""
Add keywords to papers in papers.bib based on a list in a text file.

Usage:
    python add_keywords_from_list.py workqueue --papers-file papers.txt
    python add_keywords_from_list.py makeflow
"""

import sys
import argparse
import re
import os
from datetime import datetime


def parse_paper_entries(txt_file):
    """Parse paper entries from text file and extract titles."""
    titles = []
    with open(txt_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split by (PDF) markers
    entries = content.split('(PDF)')
    
    for entry in entries:
        entry = entry.strip()
        if not entry:
            continue
        
        # Split by lines and remove empty lines
        lines = [line.strip() for line in entry.split('\n') if line.strip()]
        
        if len(lines) < 2:
            continue
        
        # Title is typically on line 2 (index 1), after authors
        # It ends with a comma before the venue line
        if len(lines) >= 2:
            title_line = lines[1].rstrip(',').strip()
            if title_line:
                titles.append(title_line)
    
    return titles


def backup_bib_file(bib_file):
    """Create a timestamped backup of the bib file."""
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_file = f"{bib_file}.bak.{timestamp}"
    
    with open(bib_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    with open(backup_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✓ Backup created: {backup_file}")
    return backup_file


def normalize_title(title):
    """Normalize title for comparison by removing punctuation and converting to lowercase."""
    # Remove common LaTeX/special characters and punctuation
    normalized = re.sub(r'[{}\\]', '', title)
    normalized = re.sub(r'[^\w\s]', ' ', normalized)
    normalized = re.sub(r'\s+', ' ', normalized)
    return normalized.lower().strip()


def find_entry_by_title(bib_content, title):
    """Find a bib entry that matches the given title."""
    normalized_target = normalize_title(title)
    
    # Split into entries using @ as delimiter
    entry_pattern = r'(@\w+\s*\{[^@]+\n\})'
    entries = re.finditer(entry_pattern, bib_content, re.MULTILINE | re.DOTALL)
    
    for match in entries:
        entry_text = match.group(0)
        
        # Extract title from entry
        title_match = re.search(r'title\s*=\s*["{]([^"}]+)["}]', entry_text, re.IGNORECASE | re.DOTALL)
        
        if title_match:
            entry_title = title_match.group(1)
            normalized_entry = normalize_title(entry_title)
            
            # Check if titles match (fuzzy matching)
            if normalized_target == normalized_entry or \
               normalized_target in normalized_entry or \
               normalized_entry in normalized_target:
                return entry_text, match.start(), match.end()
    
    return None, None, None


def add_keyword_to_entry(entry_text, keyword):
    """Add keyword field to a bib entry if not already present."""
    # Check if keywords field already exists
    keywords_match = re.search(r'keywords\s*=\s*\{([^}]*)\}', entry_text, re.IGNORECASE)
    
    if keywords_match:
        existing_keywords = keywords_match.group(1).strip()
        # Check if this keyword is already there
        keyword_list = [k.strip() for k in existing_keywords.split(',')]
        if keyword in keyword_list:
            return entry_text, False  # Already has this keyword
        
        # Add to existing keywords
        if existing_keywords:
            new_keywords = f"{existing_keywords}, {keyword}"
        else:
            new_keywords = keyword
        
        # Replace the keywords field
        entry_text = re.sub(
            r'(keywords\s*=\s*\{)[^}]*(\})',
            f'\\1{new_keywords}\\2',
            entry_text,
            flags=re.IGNORECASE
        )
        return entry_text, True
    
    # Keywords field doesn't exist, need to add it
    # Strategy: Insert after cclpaperid if present, otherwise before pdf field
    
    # Try after cclpaperid
    cclpaperid_match = re.search(r'(cclpaperid\s*=\s*"[^"]+",?\s*\n)', entry_text, re.IGNORECASE)
    if cclpaperid_match:
        insert_pos = cclpaperid_match.end()
        entry_text = (
            entry_text[:insert_pos] +
            f"keywords={{{keyword}}},\n" +
            entry_text[insert_pos:]
        )
        return entry_text, True
    
    # Try before pdf field
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
    
    # Try before preview field
    preview_match = re.search(r'(\s*)(preview\s*=)', entry_text, re.IGNORECASE)
    if preview_match:
        indent = preview_match.group(1)
        insert_pos = preview_match.start()
        entry_text = (
            entry_text[:insert_pos] +
            f"keywords={{{keyword}}},\n{indent}" +
            entry_text[insert_pos:]
        )
        return entry_text, True
    
    # Last resort: insert before closing brace
    # Find the last field before }
    closing_match = re.search(r'(\n)(\s*)(\})\s*$', entry_text)
    if closing_match:
        indent = closing_match.group(2)
        insert_pos = closing_match.start(3)
        entry_text = (
            entry_text[:insert_pos] +
            f"keywords={{{keyword}}},\n{indent}" +
            entry_text[insert_pos:]
        )
        return entry_text, True
    
    return entry_text, False


def main():
    parser = argparse.ArgumentParser(
        description='Add keywords to papers in papers.bib based on a list in a text file.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python add_keywords_from_list.py workqueue
  python add_keywords_from_list.py makeflow --papers-file my_papers.txt
  python add_keywords_from_list.py taskvine --bib-file /path/to/papers.bib
        """
    )
    parser.add_argument(
        'keyword',
        help='Keyword to add to matching papers (e.g., workqueue, makeflow, taskvine)'
    )
    parser.add_argument(
        '--papers-file',
        default='papers.txt',
        help='Path to text file containing paper entries (default: papers.txt in same directory)'
    )
    parser.add_argument(
        '--bib-file',
        default='../_bibliography/papers.bib',
        help='Path to papers.bib file (default: ../_bibliography/papers.bib)'
    )
    
    args = parser.parse_args()
    
    # Get absolute paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    if not os.path.isabs(args.papers_file):
        papers_file = os.path.join(script_dir, args.papers_file)
    else:
        papers_file = args.papers_file
    
    if not os.path.isabs(args.bib_file):
        bib_file = os.path.join(script_dir, args.bib_file)
    else:
        bib_file = args.bib_file
    
    # Check if files exist
    if not os.path.exists(papers_file):
        print(f"✗ Error: Papers file not found: {papers_file}")
        sys.exit(1)
    
    if not os.path.exists(bib_file):
        print(f"✗ Error: Bib file not found: {bib_file}")
        sys.exit(1)
    
    print(f"\n{'='*70}")
    print(f"ADDING KEYWORD: '{args.keyword}'")
    print(f"{'='*70}")
    
    # Parse paper titles from text file
    print(f"\n📄 Parsing papers from: {papers_file}")
    titles = parse_paper_entries(papers_file)
    print(f"   Found {len(titles)} paper titles in list")
    
    # Create backup
    print(f"\n💾 Creating backup...")
    backup_file = backup_bib_file(bib_file)
    
    # Read bib file
    with open(bib_file, 'r', encoding='utf-8') as f:
        bib_content = f.read()
    
    original_content = bib_content
    
    # Process each title
    print(f"\n🔍 Processing papers...\n")
    updated_count = 0
    not_found = []
    already_has_keyword = []
    
    for i, title in enumerate(titles, 1):
        print(f"{i:2d}. {title[:60]}{'...' if len(title) > 60 else ''}")
        entry_text, start_pos, end_pos = find_entry_by_title(bib_content, title)
        
        if entry_text:
            updated_entry, was_updated = add_keyword_to_entry(entry_text, args.keyword)
            
            if was_updated:
                # Replace the entry in bib_content
                bib_content = bib_content[:start_pos] + updated_entry + bib_content[end_pos:]
                updated_count += 1
                print(f"    ✓ Added keyword '{args.keyword}'")
            else:
                already_has_keyword.append(title)
                print(f"    - Already has keyword '{args.keyword}'")
        else:
            not_found.append(title)
            print(f"    ✗ Not found in bib file")
    
    # Only write if something changed
    if bib_content != original_content:
        with open(bib_file, 'w', encoding='utf-8') as f:
            f.write(bib_content)
        print(f"\n✓ Updated bib file: {bib_file}")
    else:
        print(f"\n- No changes made to bib file")
    
    # Print summary
    print(f"\n{'='*70}")
    print(f"SUMMARY")
    print(f"{'='*70}")
    print(f"  Total papers in list:     {len(titles)}")
    print(f"  ✓ Updated with keyword:   {updated_count}")
    print(f"  - Already had keyword:    {len(already_has_keyword)}")
    print(f"  ✗ Not found in bib:       {len(not_found)}")
    print(f"{'='*70}")
    
    if not_found:
        print(f"\n⚠️  Papers not found in bib file:")
        for title in not_found:
            print(f"  • {title}")
        print()
    
    if updated_count > 0:
        print(f"✓ Successfully added keyword '{args.keyword}' to {updated_count} paper(s)")
    
    print(f"\n💾 Backup: {backup_file}")


if __name__ == '__main__':
    main()
