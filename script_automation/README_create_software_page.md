# Create Software Page Script

This script automatically creates a software page by downloading and parsing an existing CCL software webpage.

## Installation

First, install the required Python packages:

```bash
pip3 install requests beautifulsoup4 html2text
```

## Usage

```bash
python create_software_page.py URL NAME [OPTIONS]
```

### Arguments

- `URL` (required): URL of the CCL software page to download (e.g., `https://ccl.cse.nd.edu/software/parrot/`)
- `NAME` (required): Software name (e.g., `parrot`, `workqueue`, `chirp`)

### Options

- `--order N`: Order in the software list (default: 9)
- `--carousel`: Enable carousel display (default: false)
- `--bib-file PATH`: Path to papers.bib file (default: `../_bibliography/papers.bib`)

## Examples

```bash
# Basic usage
python create_software_page.py https://ccl.cse.nd.edu/software/parrot/ parrot

# With custom order
python create_software_page.py https://ccl.cse.nd.edu/software/workqueue/ workqueue --order 5

# Enable carousel
python create_software_page.py https://ccl.cse.nd.edu/software/chirp/ chirp --carousel

# Custom bib file location
python create_software_page.py https://ccl.cse.nd.edu/software/makeflow/ makeflow --bib-file /path/to/papers.bib
```

## What It Does

1. **Downloads HTML** from the specified CCL software page
2. **Extracts logo image** and saves to `assets/img/software/`
3. **Extracts description** and converts HTML to Markdown
4. **Finds manual link** from the "More Info" section
5. **Extracts keyword** from publications section (e.g., "parrot")
6. **Extracts paper titles** from the publications list
7. **Creates markdown file** in `_softwares/NAME.md` with:
   - Front matter (name, layout, order, carousel, hero image)
   - Description content
   - Documentation link
8. **Updates papers.bib** by adding the keyword to all matching papers

## Output Structure

### Software Markdown File (`_softwares/NAME.md`)

```yaml
---
layout: software
name: Parrot
order: 9
carousel: false
hero: /assets/img/software/parrot-logo.png
---

[Description in Markdown format]

## Documentation

- [User Manual](https://ccl.cse.nd.edu/software/manuals/parrot.html)
```

### Downloaded Images

- Location: `assets/img/software/`
- Naming: `{software-name}-logo.{ext}` (e.g., `parrot-logo.png`)

### Papers.bib Updates

- Creates timestamped backup before changes
- Adds `keywords={KEYWORD},` to matching papers
- Handles existing keywords by appending
- Reports which papers were updated, already tagged, or not found

## Features

- ✓ Automatic HTML parsing and content extraction
- ✓ Image download with proper naming
- ✓ HTML to Markdown conversion
- ✓ Fuzzy title matching for papers
- ✓ Automatic backup before bib changes
- ✓ Detailed progress and summary reports
- ✓ Handles existing keywords gracefully

## Error Handling

The script will:

- Report download errors
- Continue if image download fails
- Use software name as keyword if none found
- Report papers that couldn't be matched in bib file

## Notes

- Requires internet connection to download from CCL website
- Only works with CCL software pages that follow the standard format
- Creates backups of papers.bib with timestamp (e.g., `papers.bib.bak.20241228_143022`)
- Logo images are automatically renamed to match software name

## Troubleshooting

**Missing packages error:**

```bash
pip3 install requests beautifulsoup4 html2text
```

**Permission denied:**

```bash
chmod +x create_software_page.py
```

**No papers found:**

- Check if the URL has a publications section
- The script uses the keyword from "Showing papers with tag X"
- If no keyword found, it uses the software name

**Papers not matching in bib:**

- The script uses fuzzy title matching
- Check the summary report for papers that weren't found
- You can manually add keywords to those papers later
