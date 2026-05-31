import os

md_path = r"C:\Users\pawel\.gemini\antigravity\brain\11745733-4d6c-4b0c-b8f2-322c775130e2\.system_generated\steps\2881\content.md"
out_path = r"C:\Users\pawel\.gemini\antigravity\scratch\Pan Pablo\Projekty\leks-bakery\scripts\output.txt"

if os.path.exists(md_path):
    with open(md_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
        
    # Find the line index containing "Nasi partnerzy"
    partner_idx = -1
    for idx, line in enumerate(lines):
        if "Nasi partnerzy" in line:
            partner_idx = idx
            break
            
    with open(out_path, "w", encoding="utf-8") as f:
        if partner_idx != -1:
            f.write(f"FOUND PARTNER SECTION AT LINE {partner_idx+1}\n\n")
            # Write 50 lines before and 100 lines after
            start = max(0, partner_idx - 50)
            end = min(len(lines), partner_idx + 100)
            for i in range(start, end):
                f.write(f"Line {i+1}: {lines[i]}")
        else:
            f.write("Partner section not found\n")
else:
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("content.md not found\n")
