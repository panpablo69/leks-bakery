import json
import os

langs = ["pl", "en", "de", "es"]
data = {}

for lang in langs:
    path = f"src/lang/{lang}.json"
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            data[lang] = json.load(f)

def get_keys(d, prefix=""):
    keys = set()
    for k, v in d.items():
        full_key = f"{prefix}.{k}" if prefix else k
        if isinstance(v, dict):
            keys.update(get_keys(v, full_key))
        else:
            keys.add(full_key)
    return keys

all_keys = {}
for lang in langs:
    all_keys[lang] = get_keys(data[lang])

pl_keys = all_keys["pl"]
missing_summary = {}

for lang in ["en", "de", "es"]:
    diff = pl_keys - all_keys[lang]
    if diff:
        missing_summary[lang] = list(diff)
        print(f"[{lang}] Missing {len(diff)} keys present in pl.json: {diff}")
    else:
        print(f"[{lang}] 100% key parity with pl.json!")

if not missing_summary:
    print("\nALL 4 I18N DICTIONARIES HAVE PERFECT 100% KEY PARITY!")
