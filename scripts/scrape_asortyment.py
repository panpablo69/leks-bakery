import os
import sys
import requests
from bs4 import BeautifulSoup

url = "https://leks.com.pl/asortyment/"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

print(f"Scraping products from: {url}")

try:
    response = requests.get(url, headers=headers, timeout=15)
    response.raise_for_status()
    print("[OK] Fetch successful!")
    
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Let's search for product containers, names, and categories.
    # Typically, WordPress sites list products in specific blocks or elements.
    # Let's write the HTML to a file or search for products.
    # Let's extract all headings, links, or articles.
    
    products = []
    
    # We will search for all elements that might contain product information
    # E.g. elements with classes like product, portfolio-item, post, entry-title etc.
    # Or let's just print all headings to see the structure first.
    
    headings = soup.find_all(["h1", "h2", "h3", "h4", "h5", "a"])
    print(f"Found {len(headings)} elements.")
    
    # Let's write a generic parser that looks at the page structure and finds product links/names.
    # We will save the HTML to parse it properly.
    html_sample_path = r"C:\Users\pawel\Downloads\Pan Pablo\Projekty\leks-bakery\scripts\asortyment.html"
    with open(html_sample_path, "w", encoding="utf-8") as f:
        f.write(response.text)
    print(f"[OK] Saved raw HTML to {html_sample_path} for structural analysis.")

except Exception as e:
    print(f"[ERR] Failed to scrape: {e}")
