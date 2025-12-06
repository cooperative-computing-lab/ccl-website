#!/usr/bin/env python3
"""
Download PDFs and generate preview thumbnails for papers in papers.bib

This script:
1. Parses papers.bib to extract paper entries
2. Downloads PDFs from https://ccl.cse.nd.edu/research/papers/{key}.pdf
3. Generates preview thumbnails from the first page of each PDF
4. Updates papers.bib with pdf= and preview= fields
5. Generates a report of successes and failures
"""

import argparse
import re
import os
import sys
import urllib.request
import urllib.error
from pathlib import Path
from typing import List, Tuple, Dict, Optional

try:
    from PIL import Image
    import fitz  # PyMuPDF
except ImportError:
    print("ERROR: Required dependencies not installed.")
    print("Please install: pip install Pillow PyMuPDF")
    sys.exit(1)


class PaperEntry:
    """Represents a single paper entry from the bib file"""

    def __init__(self, entry_text: str, start_pos: int, end_pos: int):
        self.original_text = entry_text
        self.start_pos = start_pos
        self.end_pos = end_pos
        self.key = self._extract_key()
        self.year = self._extract_year()
        self.has_pdf = "pdf=" in entry_text
        self.has_preview = "preview=" in entry_text

    def _extract_key(self) -> Optional[str]:
        """Extract the citation key from the entry"""
        match = re.search(r"@\w+\s*\{\s*([^,\s]+)", self.original_text)
        return match.group(1) if match else None

    def _extract_year(self) -> Optional[str]:
        """Extract the year from the entry"""
        match = re.search(r'year\s*=\s*["{]?(\d{4})["}]?', self.original_text)
        return match.group(1) if match else None

    def get_pdf_filename(self) -> str:
        """Get the expected PDF filename"""
        return f"{self.key}.pdf"

    def get_preview_filename(self) -> str:
        """Get the expected preview image filename"""
        return f"{self.key}.png"

    def get_pdf_url(self) -> str:
        """Get the URL to download the PDF from"""
        return f"https://ccl.cse.nd.edu/research/papers/{self.get_pdf_filename()}"

    def update_entry(self, has_pdf: bool, has_preview: bool) -> str:
        """Update the entry text to include pdf and preview fields"""
        text = self.original_text

        # Find the closing brace
        closing_brace_match = re.search(r"\n\}", text)
        if not closing_brace_match:
            return text

        insert_pos = closing_brace_match.start()
        closing_brace = text[closing_brace_match.start() :]  # Save the closing brace

        # Build the fields to insert
        fields_to_add = []

        if has_pdf and not self.has_pdf:
            fields_to_add.append(f"pdf={{{self.get_pdf_filename()}}}")

        if has_preview and not self.has_preview:
            fields_to_add.append(f"preview={{{self.get_preview_filename()}}}")

        if fields_to_add:
            # Check if the last line has a comma
            lines = text[:insert_pos].rstrip().split("\n")
            if lines and not lines[-1].rstrip().endswith(","):
                # Add comma to last field
                text = text[:insert_pos].rstrip() + ","
                insert_pos = len(text)

            # Insert new fields with proper formatting, then add back the closing brace
            insertion = "\n" + ",\n".join(f"{field}" for field in fields_to_add)
            text = text[:insert_pos] + insertion + closing_brace

        return text

    def replace_preview_field(self, new_preview_filename: str) -> str:
        """Replace existing preview field with standardized filename"""
        text = self.original_text

        # Find and replace the preview field
        # Match patterns like: preview={anything.jpg}, preview={anything.png}, etc.
        preview_pattern = r"preview\s*=\s*\{[^}]+\}"

        if re.search(preview_pattern, text):
            # Replace with standardized preview filename
            text = re.sub(preview_pattern, f"preview={{{new_preview_filename}}}", text)

        return text


def parse_bib_file(bib_path: Path) -> Tuple[str, List[PaperEntry]]:
    """Parse the bib file and extract all entries"""
    with open(bib_path, "r", encoding="utf-8") as f:
        content = f.read()

    entries = []

    # Find all @type { ... } entries
    pattern = r"(@\w+\s*\{[^@]*?\n\})"
    matches = re.finditer(pattern, content, re.DOTALL)

    for match in matches:
        entry = PaperEntry(match.group(0), match.start(), match.end())
        if entry.key:  # Only add if we successfully extracted a key
            entries.append(entry)

    return content, entries


def download_pdf(url: str, output_path: Path) -> bool:
    """Download a PDF from the given URL"""
    try:
        headers = {"User-Agent": "Mozilla/5.0 (compatible; PaperDownloader/1.0)"}
        req = urllib.request.Request(url, headers=headers)

        with urllib.request.urlopen(req, timeout=30) as response:
            if response.status == 200:
                with open(output_path, "wb") as f:
                    f.write(response.read())
                return True
    except urllib.error.HTTPError as e:
        print(f"  HTTP Error {e.code}: {url}")
    except urllib.error.URLError as e:
        print(f"  URL Error: {e.reason}")
    except Exception as e:
        print(f"  Error: {str(e)}")

    return False


def generate_thumbnail(
    pdf_path: Path, output_path: Path, max_height: int = 400, apng: bool = False
) -> bool:
    """Generate a PNG thumbnail from the first page(s) of a PDF"""
    try:
        # Open PDF
        doc = fitz.open(pdf_path)

        if len(doc) == 0:
            print(f"  PDF has no pages: {pdf_path}")
            return False

        # Determine how many pages to use (1 or 2 for APNG)
        num_pages = min(2, len(doc)) if apng else 1
        frames = []

        for page_num in range(num_pages):
            page = doc[page_num]

            # Render page to image at higher resolution for better quality
            # 3x for static, 2x for APNG (to keep file size reasonable)
            zoom = 2.0 if apng else 4.0
            mat = fitz.Matrix(zoom, zoom)
            pix = page.get_pixmap(matrix=mat)

            # Convert to PIL Image
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

            # Resize to max height while maintaining aspect ratio
            aspect_ratio = img.width / img.height
            new_height = max_height
            new_width = int(new_height * aspect_ratio)

            img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            frames.append(img_resized)

        # Save as animated PNG if APNG mode and we have 2 frames, otherwise static PNG
        if apng and len(frames) > 1:
            # Save as animated PNG (APNG)
            frames[0].save(
                output_path,
                "PNG",
                save_all=True,
                append_images=[frames[1]],
                duration=2000,  # 2 seconds per frame
                loop=0,  # Infinite loop
                optimize=True,
            )
        else:
            # Save as static PNG (high quality)
            frames[0].save(output_path, "PNG", optimize=True)

        doc.close()
        return True

    except Exception as e:
        print(f"  Error generating thumbnail: {str(e)}")
        return False


def process_papers(
    entries: List[PaperEntry],
    pdf_dir: Path,
    preview_dir: Path,
    force_download: bool = False,
    force_preview: bool = False,
    preview_only: bool = False,
    apng: bool = False,
) -> Dict[str, List[str]]:
    """Process all paper entries to download PDFs and generate previews"""

    results = {
        "pdf_success": [],
        "pdf_failed": [],
        "pdf_skipped": [],
        "pdf_missing": [],
        "preview_success": [],
        "preview_failed": [],
        "preview_skipped": [],
    }

    total = len(entries)

    for i, entry in enumerate(entries, 1):
        print(f"\n[{i}/{total}] Processing: {entry.key}")

        pdf_path = pdf_dir / entry.get_pdf_filename()
        preview_path = preview_dir / entry.get_preview_filename()

        # Download PDF (skip if preview_only mode)
        if not preview_only:
            if not pdf_path.exists():
                # Download PDF
                print(f"  Downloading PDF from: {entry.get_pdf_url()}")
                if download_pdf(entry.get_pdf_url(), pdf_path):
                    print(f"  ✓ Downloaded: {entry.get_pdf_filename()}")
                    results["pdf_success"].append(entry.key)
                else:
                    print(f"  ✗ Failed to download PDF")
                    results["pdf_failed"].append(entry.key)
                    # Skip thumbnail generation if PDF download failed
                    results["preview_failed"].append(entry.key)
                    continue
            else:
                print(f"  PDF already exists: {entry.get_pdf_filename()}")
                results["pdf_skipped"].append(entry.key)

        # Generate thumbnail
        if not pdf_path.exists():
            print(f"  ✗ Cannot generate thumbnail: PDF missing")
            results["pdf_missing"].append(entry.key)
            results["preview_failed"].append(entry.key)
            continue

        # Force preview regeneration or check if it exists
        should_generate = force_preview or not preview_path.exists() or force_download

        if should_generate:
            mode_str = "animated PNG" if apng else "static PNG (high quality)"
            print(f"  Generating {mode_str} thumbnail from PDF...")
            if generate_thumbnail(pdf_path, preview_path, apng=apng):
                print(f"  ✓ Generated: {entry.get_preview_filename()}")
                results["preview_success"].append(entry.key)
            else:
                print(f"  ✗ Failed to generate thumbnail")
                results["preview_failed"].append(entry.key)
        else:
            print(f"  Preview already exists: {entry.get_preview_filename()}")
            results["preview_skipped"].append(entry.key)

    return results


def update_bib_file(
    bib_path: Path,
    original_content: str,
    entries: List[PaperEntry],
    pdf_dir: Path,
    preview_dir: Path,
    dry_run: bool = False,
    force_preview: bool = False,
) -> None:
    """Update the papers.bib file with pdf and preview fields"""

    # Sort entries by position in reverse order so we can update from end to beginning
    entries_sorted = sorted(entries, key=lambda e: e.start_pos, reverse=True)

    updated_content = original_content
    update_count = 0

    for entry in entries_sorted:
        pdf_path = pdf_dir / entry.get_pdf_filename()
        preview_path = preview_dir / entry.get_preview_filename()

        has_pdf = pdf_path.exists()
        has_preview = preview_path.exists()

        # Check if we need to update this entry
        # In force_preview mode, update preview field even if it exists (to standardize naming)
        needs_update = (has_pdf and not entry.has_pdf) or (
            has_preview and not entry.has_preview
        )

        # If force_preview and preview exists, also update to standardize the filename
        if force_preview and has_preview and entry.has_preview:
            # Need to replace the old preview field with standardized one
            needs_update = True
            # This requires special handling - replace the preview field
            updated_entry = entry.replace_preview_field(entry.get_preview_filename())
            updated_content = (
                updated_content[: entry.start_pos]
                + updated_entry
                + updated_content[entry.end_pos :]
            )
            update_count += 1
        elif needs_update:
            updated_entry = entry.update_entry(has_pdf, has_preview)
            updated_content = (
                updated_content[: entry.start_pos]
                + updated_entry
                + updated_content[entry.end_pos :]
            )
            update_count += 1

    if update_count > 0:
        if dry_run:
            print(f"\n[DRY RUN] Would update {update_count} entries in {bib_path}")
        else:
            # Backup original file
            backup_path = bib_path.with_suffix(".bib.backup")
            with open(backup_path, "w", encoding="utf-8") as f:
                f.write(original_content)
            print(f"\nBacked up original to: {backup_path}")

            # Write updated content
            with open(bib_path, "w", encoding="utf-8") as f:
                f.write(updated_content)
            print(f"Updated {update_count} entries in {bib_path}")
    else:
        print(f"\nNo updates needed for {bib_path}")


def print_report(results: Dict[str, List[str]], preview_only: bool = False) -> None:
    """Print a summary report of the processing results"""

    print("\n" + "=" * 70)
    print("PROCESSING REPORT")
    print("=" * 70)

    if not preview_only:
        print(f"\nPDF Downloads:")
        print(f"  ✓ Success: {len(results['pdf_success'])}")
        print(f"  ✗ Failed:  {len(results['pdf_failed'])}")
        print(f"  - Skipped: {len(results['pdf_skipped'])}")

    print(f"\nPreview Generation:")
    print(f"  ✓ Success: {len(results['preview_success'])}")
    print(f"  ✗ Failed:  {len(results['preview_failed'])}")
    print(f"  - Skipped: {len(results['preview_skipped'])}")

    if results.get("pdf_missing"):
        print(f"  ⚠ PDF Missing: {len(results['pdf_missing'])}")

    if not preview_only and results["pdf_failed"]:
        print(f"\nFailed PDF Downloads ({len(results['pdf_failed'])}):")
        for key in sorted(results["pdf_failed"]):
            print(f"  - {key}")

    if results.get("pdf_missing"):
        print(
            f"\nPDFs Not Found (Cannot Generate Preview) ({len(results['pdf_missing'])}):"
        )
        for key in sorted(results["pdf_missing"]):
            print(f"  - {key}")

    if results["preview_failed"] and not results.get("pdf_missing"):
        print(f"\nFailed Preview Generation ({len(results['preview_failed'])}):")
        for key in sorted(results["preview_failed"]):
            print(f"  - {key}")

    print("\n" + "=" * 70)


def main():
    parser = argparse.ArgumentParser(
        description="Download PDFs and generate preview thumbnails for papers.bib",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Example usage:
  # Download PDFs and generate previews for papers without them
  %(prog)s papers.bib assets/pdf assets/img/publication_preview
  
  # Force re-download everything
  %(prog)s papers.bib assets/pdf assets/img/publication_preview --force
  
  # Regenerate all previews with standardized naming (key.png) - static high quality
  %(prog)s papers.bib assets/pdf assets/img/publication_preview --force-preview
  
  # Only regenerate previews (skip PDF downloads) - static high quality
  %(prog)s papers.bib assets/pdf assets/img/publication_preview --preview-only --force-preview
  
  # Generate animated PNG from first two pages
  %(prog)s papers.bib assets/pdf assets/img/publication_preview --force-preview --apng
  
  # Dry run to see what would happen
  %(prog)s papers.bib assets/pdf assets/img/publication_preview --dry-run
        """,
    )

    parser.add_argument("bib_file", type=Path, help="Path to papers.bib file")

    parser.add_argument("pdf_dir", type=Path, help="Directory to store downloaded PDFs")

    parser.add_argument(
        "preview_dir", type=Path, help="Directory to store generated preview images"
    )

    parser.add_argument(
        "--force", action="store_true", help="Force re-download of existing files"
    )

    parser.add_argument(
        "--force-preview",
        action="store_true",
        help="Force regeneration of all previews with standardized naming (key.png), updating bib file",
    )

    parser.add_argument(
        "--preview-only",
        action="store_true",
        help="Only generate previews, skip PDF downloads (requires existing PDFs)",
    )

    parser.add_argument(
        "--apng",
        action="store_true",
        help="Generate animated PNG from first two pages (default: static PNG from first page only)",
    )

    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be done without making changes",
    )

    parser.add_argument(
        "--no-update", action="store_true", help="Do not update the papers.bib file"
    )

    args = parser.parse_args()

    # Validate inputs
    if not args.bib_file.exists():
        print(f"ERROR: Bibliography file not found: {args.bib_file}")
        sys.exit(1)

    # Create output directories
    args.pdf_dir.mkdir(parents=True, exist_ok=True)
    args.preview_dir.mkdir(parents=True, exist_ok=True)

    print(f"Reading bibliography from: {args.bib_file}")
    print(f"PDF directory: {args.pdf_dir}")
    print(f"Preview directory: {args.preview_dir}")

    # Parse bib file
    original_content, entries = parse_bib_file(args.bib_file)
    print(f"\nFound {len(entries)} paper entries")

    # Display mode information
    if args.force_preview:
        print(
            "\n[FORCE PREVIEW MODE - All previews will be regenerated with standardized naming]"
        )
    if args.preview_only:
        print("\n[PREVIEW ONLY MODE - PDFs will not be downloaded]")
    if args.apng:
        print("\n[APNG MODE - Generating animated PNG from first two pages]")
    else:
        print(
            "\n[STATIC PNG MODE - Generating high-quality static PNG from first page only]"
        )

    if args.dry_run:
        print("\n[DRY RUN MODE - No files will be downloaded or modified]")
        return

    # Process papers
    results = process_papers(
        entries,
        args.pdf_dir,
        args.preview_dir,
        args.force,
        args.force_preview,
        args.preview_only,
        args.apng,
    )

    # Print report
    print_report(results, args.preview_only)

    # Update bib file
    if not args.no_update:
        update_bib_file(
            args.bib_file,
            original_content,
            entries,
            args.pdf_dir,
            args.preview_dir,
            args.dry_run,
            args.force_preview,
        )
    else:
        print("\n[Skipping bib file update due to --no-update flag]")


if __name__ == "__main__":
    main()
