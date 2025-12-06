#!/usr/bin/env python3
"""
Check and validate PDFs and thumbnails for all bib entries.
- Verifies PDF files exist in correct location
- Reports missing PDFs
- Generates missing thumbnails
- Provides detailed audit report
"""

import argparse
import sys
from pathlib import Path
from typing import List, Dict, Tuple
import re

try:
    import fitz  # PyMuPDF
except Exception:
    fitz = None
    print("Warning: PyMuPDF not installed. Thumbnail generation will be skipped.")
    print("Install with: pip install PyMuPDF")


class BibEntry:
    def __init__(self, raw_block: str):
        self.raw = raw_block
        self.key = self._parse_key(raw_block)
        self.fields = self._parse_fields(raw_block)
        self.title = self._clean(self.fields.get("title", ""))
        self.pdf = self.fields.get("pdf", "")
        self.preview = self.fields.get("preview", "")

    def _parse_key(self, raw: str) -> str:
        lines = raw.splitlines()
        for i, ln in enumerate(lines[:4]):
            s = ln.strip()
            if s.startswith('@') and s.endswith('{'):
                if i + 1 < len(lines):
                    return lines[i + 1].strip().rstrip(',').strip()
        m = re.search(r"^@\w+\s*\{\s*([^,\n]+),", raw, re.M)
        return m.group(1).strip() if m else ""

    def _parse_fields(self, raw: str) -> Dict[str, str]:
        fields: Dict[str, str] = {}
        for ln in raw.splitlines():
            m = re.match(r"^\s*(\w+)\s*=\s*(.+?)(,\s*)?$", ln)
            if not m:
                continue
            name = m.group(1).lower()
            val = m.group(2).strip()
            if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                val = val[1:-1]
            if val.startswith('{') and val.endswith('}'):
                val = val[1:-1]
            fields[name] = val.strip()
        return fields

    def _clean(self, s: str) -> str:
        return re.sub(r"\s+", " ", s.strip())
    
    def add_preview_field(self, preview_rel: str) -> str:
        """Add preview field to bib entry if missing."""
        if self.preview:  # Already has preview field
            return self.raw
        
        lines = self.raw.splitlines()
        out: List[str] = []
        
        for ln in lines:
            out.append(ln)
        
        # Find the closing brace position
        closing_brace_idx = -1
        for i in range(len(out) - 1, -1, -1):
            if out[i].strip() == '}':
                closing_brace_idx = i
                break
        
        if closing_brace_idx == -1:
            return self.raw  # Can't find closing brace, return as-is
        
        # Find the last field line (line before closing brace that has content)
        last_field_idx = -1
        for i in range(closing_brace_idx - 1, -1, -1):
            if out[i].strip() and not out[i].strip().startswith('@'):
                last_field_idx = i
                break
        
        # Ensure last field has a comma
        if last_field_idx != -1:
            line = out[last_field_idx].rstrip()
            if not line.endswith(','):
                out[last_field_idx] = line + ','
        
        # Insert preview field before closing brace
        out.insert(closing_brace_idx, f"preview={{{preview_rel}}},")
        
        return "\n".join(out)


def parse_bib(path: Path) -> Tuple[str, List[BibEntry]]:
    """Parse bib file, returning (header_text, entries_list)."""
    text = path.read_text(encoding="utf-8")
    
    # Extract header (everything before first @)
    first_at = text.find('@')
    header = text[:first_at] if first_at > 0 else ""
    
    # Parse entries
    entries: List[BibEntry] = []
    entry_text = text[first_at:] if first_at >= 0 else text
    
    # Split on closing brace followed by newline and optional whitespace
    blocks = re.split(r"\n\}\s*\n", entry_text)
    
    for b in blocks:
        b = b.strip()
        if not b or not b.startswith('@'):
            continue
        entries.append(BibEntry(b + "\n}"))
    
    return header, entries


def generate_thumbnail(pdf_path: Path, thumb_path: Path) -> None:
    """Generate thumbnail from first page of PDF."""
    if fitz is None:
        raise Exception("PyMuPDF not installed")
    thumb_path.parent.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(pdf_path)
    page = doc.load_page(0)
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    thumb_path.write_bytes(pix.tobytes("png"))


def write_bib(path: Path, header: str, entries: List[str]) -> None:
    """Write bib file with header and entries."""
    import shutil
    backup = path.with_suffix(path.suffix + ".bak")
    shutil.copyfile(path, backup)
    content = header + "\n\n".join(entries) + "\n"
    path.write_text(content, encoding="utf-8")
    print(f"Backup created: {backup}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Check PDFs and thumbnails for all bib entries.")
    parser.add_argument("--bib", type=Path, default=Path("_bibliography/papers.bib"))
    parser.add_argument("--pdf-dir", type=Path, default=Path("assets/pdf"))
    parser.add_argument("--preview-dir", type=Path, default=Path("assets/img/publication_preview"))
    parser.add_argument("--generate-thumbs", action="store_true", 
                       help="Generate missing thumbnails (requires PyMuPDF)")
    parser.add_argument("--verbose", "-v", action="store_true", 
                       help="Show all entries, not just issues")
    args = parser.parse_args()

    bib_path = args.bib
    pdf_dir = args.pdf_dir
    thumb_dir = args.preview_dir

    if not bib_path.exists():
        print(f"Error: Bib file not found: {bib_path}")
        return 1

    header, entries = parse_bib(bib_path)
    print(f"Checking {len(entries)} entries...")
    print()

    # Statistics
    stats = {
        "total": len(entries),
        "pdf_missing": 0,
        "pdf_wrong_location": 0,
        "pdf_ok": 0,
        "thumb_missing": 0,
        "thumb_generated": 0,
        "thumb_failed": 0,
        "thumb_ok": 0,
        "no_pdf_field": 0,
        "no_preview_field": 0,
    }

    missing_pdfs = []
    wrong_location_pdfs = []
    missing_thumbs = []
    generated_thumbs = []
    failed_thumbs = []
    updated_entries = []  # Track entries with updated preview fields
    bib_needs_update = False

    for idx, entry in enumerate(entries, 1):
        key = entry.key
        title = entry.title[:60] + "..." if len(entry.title) > 60 else entry.title
        
        # Expected paths
        expected_pdf = pdf_dir / f"{key}.pdf"
        expected_thumb = thumb_dir / f"{key}.png"
        
        pdf_status = "?"
        thumb_status = "?"
        issues = []
        
        # Check PDF
        if not entry.pdf:
            stats["no_pdf_field"] += 1
            pdf_status = "NO_FIELD"
            issues.append("missing pdf field in bib")
        else:
            # Check if PDF exists at expected location
            if expected_pdf.exists():
                stats["pdf_ok"] += 1
                pdf_status = "OK"
            else:
                stats["pdf_missing"] += 1
                pdf_status = "MISSING"
                issues.append(f"PDF missing at {expected_pdf}")
                missing_pdfs.append((key, expected_pdf))
        
        # Check thumbnail
        entry_updated = False
        if not entry.preview:
            stats["no_preview_field"] += 1
            # If PDF exists locally, we can generate thumbnail
            if expected_pdf.exists():
                if not expected_thumb.exists():
                    if args.generate_thumbs:
                        try:
                            generate_thumbnail(expected_pdf, expected_thumb)
                            stats["thumb_generated"] += 1
                            thumb_status = "GENERATED"
                            generated_thumbs.append((key, expected_thumb))
                            # Update entry with preview field
                            entry_updated = True
                        except Exception as ex:
                            stats["thumb_failed"] += 1
                            thumb_status = f"FAILED: {ex}"
                            failed_thumbs.append((key, str(ex)))
                            issues.append("missing preview field in bib")
                    else:
                        thumb_status = "NO_FIELD"
                        issues.append("missing preview field in bib")
                else:
                    thumb_status = "EXISTS_NO_FIELD"
                    # Thumbnail exists but not in bib
                    if args.generate_thumbs:
                        entry_updated = True
                    else:
                        issues.append("missing preview field in bib (thumbnail exists)")
            else:
                thumb_status = "NO_FIELD"
                issues.append("missing preview field in bib")
        else:
            # Check if thumbnail exists
            if expected_thumb.exists():
                stats["thumb_ok"] += 1
                thumb_status = "OK"
            else:
                stats["thumb_missing"] += 1
                thumb_status = "MISSING"
                
                # Try to generate if PDF exists locally and flag is set
                if args.generate_thumbs and expected_pdf.exists():
                    try:
                        generate_thumbnail(expected_pdf, expected_thumb)
                        stats["thumb_generated"] += 1
                        stats["thumb_missing"] -= 1
                        thumb_status = "GENERATED"
                        generated_thumbs.append((key, expected_thumb))
                    except Exception as ex:
                        stats["thumb_failed"] += 1
                        thumb_status = f"FAILED: {ex}"
                        failed_thumbs.append((key, str(ex)))
                else:
                    if expected_pdf.exists():
                        issues.append(f"Thumbnail missing at {expected_thumb}")
                    else:
                        issues.append(f"Thumbnail missing (PDF not found locally)")
                    missing_thumbs.append((key, expected_thumb))
        
        # Add entry to updated list
        if entry_updated:
            updated_entries.append(entry.add_preview_field(f"{key}.png"))
            bib_needs_update = True
        else:
            updated_entries.append(entry.raw)
        
        # Print entry info
        if args.verbose or issues:
            print(f"[{idx}/{stats['total']}] {key}")
            print(f"  Title: {title}")
            print(f"  PDF: {pdf_status}")
            if pdf_status != "OK" and pdf_status != "NO_FIELD":
                print(f"    Expected: {expected_pdf}")
            print(f"  Thumbnail: {thumb_status}")
            if thumb_status == "MISSING":
                print(f"    Expected: {expected_thumb}")
            if issues:
                for issue in issues:
                    print(f"  ⚠️  {issue}")
            print()

    # Summary Report
    print("=" * 80)
    print("SUMMARY REPORT")
    print("=" * 80)
    print(f"Total entries: {stats['total']}")
    print()
    print("PDF Status:")
    print(f"  ✓ OK: {stats['pdf_ok']}")
    print(f"  ✗ Missing: {stats['pdf_missing']}")
    print(f"  ⚠ No pdf field: {stats['no_pdf_field']}")
    print()
    print("Thumbnail Status:")
    print(f"  ✓ OK: {stats['thumb_ok']}")
    print(f"  ✗ Missing: {stats['thumb_missing']}")
    if args.generate_thumbs:
        print(f"  ✓ Generated: {stats['thumb_generated']}")
        print(f"  ✗ Failed: {stats['thumb_failed']}")
    print(f"  ⚠ No preview field: {stats['no_preview_field']}")
    print()

    # Detailed lists
    if missing_pdfs:
        print("=" * 80)
        print("MISSING PDFs")
        print("=" * 80)
        for key, path in missing_pdfs:
            print(f"  {key}: {path}")
        print()

    if missing_thumbs and not args.generate_thumbs:
        print("=" * 80)
        print("MISSING THUMBNAILS")
        print("=" * 80)
        for key, path in missing_thumbs:
            print(f"  {key}: {path}")
        print()
        print("Tip: Run with --generate-thumbs to automatically create missing thumbnails")
        print()

    if generated_thumbs:
        print("=" * 80)
        print("GENERATED THUMBNAILS")
        print("=" * 80)
        for key, path in generated_thumbs:
            print(f"  ✓ {key}: {path}")
        print()

    if failed_thumbs:
        print("=" * 80)
        print("FAILED THUMBNAIL GENERATION")
        print("=" * 80)
        for key, error in failed_thumbs:
            print(f"  ✗ {key}: {error}")
        print()

    # Update bib file if needed
    if bib_needs_update and args.generate_thumbs:
        print("=" * 80)
        print("UPDATING BIB FILE")
        print("=" * 80)
        write_bib(bib_path, header, updated_entries)
        print(f"✓ Updated {bib_path} with preview fields")
        print()

    return 0


if __name__ == "__main__":
    sys.exit(main())
