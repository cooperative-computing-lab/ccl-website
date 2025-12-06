#!/usr/bin/env python3
"""
Fix missing PDFs by matching titles in `ccl-papers.html` to entries in `_bibliography/papers.bib`.
Downloads PDFs as `assets/pdf/{key}.pdf`, generates thumbnails `assets/img/publication_preview/{key}.png`,
and updates bib entries with `pdf` and `preview` fields. Supports `--dry-run`.
"""

import argparse
import re
import sys
import shutil
from pathlib import Path
from typing import List, Dict

try:
    import fitz  # PyMuPDF
except Exception:
    fitz = None


class BibEntry:
    def __init__(self, raw_block: str):
        self.raw = raw_block
        self.key = self._parse_key(raw_block)
        self.fields = self._parse_fields(raw_block)
        self.title = self._clean(self.fields.get("title", ""))

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

    def render_with_updates(self, pdf_rel: str, preview_rel: str) -> str:
        """Update bib entry with pdf and preview fields, maintaining proper comma syntax."""
        lines = self.raw.splitlines()
        out: List[str] = []
        have_pdf_field = False
        have_preview_field = False
        
        for ln in lines:
            if re.match(r"^\s*pdf\s*=", ln):
                have_pdf_field = True
            elif re.match(r"^\s*preview\s*=", ln):
                have_preview_field = True
            out.append(ln)
        
        # If fields already exist, return as-is
        if have_pdf_field and have_preview_field:
            return "\n".join(out)
        
        # Find the closing brace position
        closing_brace_idx = -1
        for i in range(len(out) - 1, -1, -1):
            if out[i].strip() == '}':
                closing_brace_idx = i
                break
        
        if closing_brace_idx == -1:
            return "\n".join(out)  # Can't find closing brace, return as-is
        
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
        
        # Insert new fields before closing brace
        insert_lines = []
        if not have_pdf_field:
            insert_lines.append(f"pdf={{{pdf_rel}}},")
        if not have_preview_field:
            insert_lines.append(f"preview={{{preview_rel}}},")
        
        # Insert all new fields
        for line in reversed(insert_lines):
            out.insert(closing_brace_idx, line)
        
        return "\n".join(out)


def parse_bib(path: Path) -> tuple[str, List[BibEntry]]:
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


def normalize_title(t: str) -> str:
    return re.sub(r"\s+", " ", t.strip())


def index_html_titles_to_pdfs(html_path: Path) -> Dict[str, str]:
    html = html_path.read_text(encoding="utf-8")
    mapping: Dict[str, str] = {}
    for m in re.finditer(r"<a\s+href=\"([^\"]+\.pdf)\"[^>]*>.*?<b>(.*?)</b>.*?</a>", html, re.I | re.S):
        href = m.group(1).strip()
        title = normalize_title(m.group(2))
        mapping[title.lower()] = href
    return mapping


def download_pdf(url: str, dest: Path) -> None:
    import requests
    dest.parent.mkdir(parents=True, exist_ok=True)
    r = requests.get(url, timeout=30)
    r.raise_for_status()
    dest.write_bytes(r.content)


def generate_thumbnail(pdf_path: Path, thumb_path: Path) -> None:
    if fitz is None:
        return
    thumb_path.parent.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(pdf_path)
    page = doc.load_page(0)
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    thumb_path.write_bytes(pix.tobytes("png"))


def write_bib(path: Path, header: str, entries: List[str]) -> None:
    """Write bib file with header and entries."""
    backup = path.with_suffix(path.suffix + ".bak")
    shutil.copyfile(path, backup)
    content = header + "\n\n".join(entries) + "\n"
    path.write_text(content, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Fix missing PDFs and update bib.")
    parser.add_argument("--bib", type=Path, default=Path("_bibliography/papers.bib"))
    parser.add_argument("--html", type=Path, default=Path("ccl-papers.html"))
    parser.add_argument("--pdf-dir", type=Path, default=Path("assets/pdf"))
    parser.add_argument("--preview-dir", type=Path, default=Path("assets/img/publication_preview"))
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    bib_path = args.bib
    html_path = args.html
    pdf_dir = args.pdf_dir
    thumb_dir = args.preview_dir

    header, entries = parse_bib(bib_path)
    print(f"Parsed entries: {len(entries)}")
    html_map = index_html_titles_to_pdfs(html_path)
    print(f"Indexed HTML titles: {len(html_map)}")

    updated: List[str] = []
    total_entries = len(entries)
    for idx, e in enumerate(entries, 1):
        print(f"[{idx}/{total_entries}] Processing: {e.key}")
        title = normalize_title(e.title)
        if not title:
            print(f"  No title in bib for key {e.key}")
            updated.append(e.raw)
            continue
        pdf_url = html_map.get(title.lower())
        if not pdf_url:
            for href in html_map.values():
                if e.key and e.key in href:
                    pdf_url = href
                    break
        if not pdf_url:
            print(f"No match for: {e.key} — {title}")
            updated.append(e.raw)
            continue
        pdf_path = pdf_dir / f"{e.key}.pdf"
        thumb_path = thumb_dir / f"{e.key}.png"

        pdf_status = "present"
        thumb_status = "present"
        
        # Only download if missing
        if pdf_path.exists():
            pdf_status = "present"
        else:
            if args.dry_run:
                pdf_status = "would-download"
            else:
                try:
                    download_pdf(pdf_url, pdf_path)
                    pdf_status = "downloaded"
                except Exception as ex:
                    pdf_status = f"failed: {ex}"

        # Only generate thumbnail if missing and PDF exists
        if thumb_path.exists():
            thumb_status = "present"
        elif pdf_path.exists():
            if args.dry_run:
                thumb_status = "would-generate"
            else:
                try:
                    generate_thumbnail(pdf_path, thumb_path)
                    thumb_status = "generated"
                except Exception as ex:
                    thumb_status = f"failed: {ex}"
        else:
            thumb_status = "skipped-no-pdf"

        # Print progress details
        print(f"  Title: {title[:60] + '...' if len(title) > 60 else title}")
        print(f"  Source URL: {pdf_url}")
        print(f"  PDF: {pdf_path} [{pdf_status}]")
        print(f"  Thumbnail: {thumb_path} [{thumb_status}]")
        print()

        # Update bib fields only if missing
        updated.append(e.render_with_updates(pdf_rel=f"{e.key}.pdf", preview_rel=f"{e.key}.png"))

    if args.dry_run:
        print("\n[DRY RUN] Skipping bib write")
    else:
        write_bib(bib_path, header, updated)
    return 0


if __name__ == "__main__":
    sys.exit(main())
