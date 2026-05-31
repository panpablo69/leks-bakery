import re
import os

md_path = r"C:\Users\pawel\.gemini\antigravity\brain\11745733-4d6c-4b0c-b8f2-322c775130e2\.system_generated\steps\2881\content.md"
out_path = r"C:\Users\pawel\.gemini\antigravity\scratch\Pan Pablo\Projekty\leks-bakery\scripts\output.txt"

if os.path.exists(md_path):
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Search for partner, logotyp, or uploads containing logo/partner names
    # Traditional polish retail chains: Biedronka, Dino, Netto, Kaufland, Intermarche, Lidl, Carrefour, Auchan, Żabka, Lewiatan, etc.
    retail_keywords = ["partner", "wspolpraca", "netto", "biedronka", "dino", "kaufland", "intermarche", "lidl", "carrefour", "auchan", "zabka", "lewiatan", "chlebek", "klemens"]
    
    matches = []
    for line in content.splitlines():
        for kw in retail_keywords:
            if re.search(r'\b' + re.escape(kw) + r'\b', line, re.IGNORECASE) or kw in line.lower():
                matches.append(line)
                break
                
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("MATCHING LINES IN FETCHED CONTENT:\n\n")
        for m in matches[:100]: # limit to first 100 lines
            f.write(m + "\n")
else:
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("File content.md not found\n")
