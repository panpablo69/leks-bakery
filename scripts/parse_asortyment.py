import re
from bs4 import BeautifulSoup

html_path = r"C:\Users\pawel\Downloads\Pan Pablo\Projekty\leks-bakery\scripts\asortyment.html"

with open(html_path, "r", encoding="utf-8") as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, "html.parser")
images = soup.find_all("img")

print(f"Total images found: {len(images)}")
print("Scanning image attributes for product data...")

products_found = []

for idx, img in enumerate(images):
    src = img.get("src", "")
    alt = img.get("alt", "").strip()
    
    # Let's filter out decorative images, icons, or logos
    if "logo" in src.lower() or "logo" in alt.lower() or "instagram" in src.lower() or "facebook" in src.lower():
        continue
        
    # Let's find nearby text. We check:
    # 1. Parent elements for text
    # 2. Preceding/succeeding text elements
    parent_text = ""
    if img.parent:
        parent_text = img.parent.text.strip()
    
    # If parent_text is empty or too long, check siblings
    sibling_text = ""
    sib = img.next_element
    for _ in range(15): # Look up to 15 nodes ahead
        if not sib:
            break
        if isinstance(sib, str) and sib.strip():
            sibling_text = sib.strip()
            if len(sibling_text) > 3:
                break
        sib = sib.next_element
        
    # Let's clean up values
    products_found.append({
        "index": idx + 1,
        "src": src,
        "alt": alt,
        "parent_text": parent_text[:60] if parent_text else "",
        "sibling_text": sibling_text[:60] if sibling_text else ""
    })

print("\n--- EXTRACTED BREADS AND BAKERY ITEMS ---")
for p in products_found:
    if p["alt"] or p["sibling_text"]:
        print(f"[{p['index']}] Src: {p['src'].split('/')[-1]} | Alt: {p['alt']} | Near Text: {p['sibling_text']}")
