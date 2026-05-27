import os
from pypdf import PdfReader

pdf_path = r"C:\Users\pawel\Downloads\Pan Pablo\Leks\brandbook\Leks2020Brandbook_prepress05.pdf"
output_path = r"C:\Users\pawel\Downloads\Pan Pablo\Projekty\leks-bakery\scripts\brandbook_summary.txt"

print(f"Reading PDF from: {pdf_path}")
if not os.path.exists(pdf_path):
    print("PDF file does not exist!")
    exit(1)

reader = PdfReader(pdf_path)
print(f"Total pages: {len(reader.pages)}")

with open(output_path, "w", encoding="utf-8") as f:
    f.write(f"--- BRANDBOOK LEKS SUMMARY ---\n")
    f.write(f"Path: {pdf_path}\n")
    f.write(f"Total Pages: {len(reader.pages)}\n\n")
    
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        f.write(f"=== PAGE {i+1} ===\n")
        f.write(text)
        f.write("\n\n")

print(f"Summary written to {output_path}")
