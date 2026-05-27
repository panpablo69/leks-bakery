import sys

# Reconfigure stdout to use UTF-8 or ignore errors
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='ignore')

file_path = r"C:\Users\pawel\Downloads\Pan Pablo\Projekty\leks-bakery\scripts\brandbook_summary.txt"
output_path = r"C:\Users\pawel\Downloads\Pan Pablo\Projekty\leks-bakery\scripts\brandbook_details.txt"

pages_to_extract = [19, 25, 31, 32, 33]

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

pages = content.split("=== PAGE ")
extracted_data = []

for page in pages:
    if not page.strip():
        continue
    page_header, *page_lines = page.split("\n")
    try:
        page_num = int(page_header.split(" ===")[0].strip())
    except ValueError:
        continue # Ignore non-page segments
    page_text = "\n".join(page_lines)
    
    if page_num in pages_to_extract:
        extracted_data.append(f"=== PAGE {page_num} ===\n{page_text}\n")

with open(output_path, "w", encoding="utf-8") as f_out:
    for data in extracted_data:
        f_out.write(data)
        f_out.write("-" * 40 + "\n\n")

print(f"Extracted pages {pages_to_extract} to {output_path}")
