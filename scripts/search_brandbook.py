import re
import sys

# Reconfigure stdout to use UTF-8 or ignore errors
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='ignore')

file_path = r"C:\Users\pawel\Downloads\Pan Pablo\Projekty\leks-bakery\scripts\brandbook_summary.txt"

keywords = ["kolor", "color", "cmyk", "rgb", "pantone", "hex", "font", "czcion", "krój", "typograf", "logo", "sygnet"]

print(f"Searching in: {file_path}")

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

pages = content.split("=== PAGE ")
for page in pages:
    if not page.strip():
        continue
    page_header, *page_lines = page.split("\n")
    page_num = page_header.split(" ===")[0].strip()
    page_text = "\n".join(page_lines)
    
    matches = []
    for kw in keywords:
        if re.search(r'\b' + re.escape(kw) + r'\w*', page_text, re.IGNORECASE):
            matches.append(kw)
            
    if matches:
        # Safe printing by filtering encoding errors
        header = f"\n--- PAGE {page_num} (Matched: {', '.join(matches)}) ---"
        print(header.encode('ascii', errors='replace').decode('ascii'))
        lines = page_text.split("\n")
        for line in lines:
            if any(re.search(r'\b' + re.escape(kw) + r'\w*', line, re.IGNORECASE) for kw in keywords):
                # Encode to ASCII or replace to prevent console encoding crashes
                safe_line = line.strip().encode('ascii', errors='replace').decode('ascii')
                print(f"  {safe_line}")
