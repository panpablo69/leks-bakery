import os
from PIL import Image

def optimize_images(img_dir="src/img"):
    total_original = 0
    total_webp = 0
    converted_count = 0

    print(f"Scanning {img_dir} for images to optimize...")

    for root, _, files in os.walk(img_dir):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in [".png", ".jpg", ".jpeg"]:
                src_path = os.path.join(root, file)
                base_name = os.path.splitext(file)[0]
                webp_path = os.path.join(root, base_name + ".webp")

                orig_size = os.path.getsize(src_path)
                total_original += orig_size

                try:
                    with Image.open(src_path) as img:
                        # Convert RGBA/P to RGB if needed for JPEG-style webp, else keep RGBA
                        if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                            save_img = img.convert("RGBA")
                        else:
                            save_img = img.convert("RGB")

                        save_img.save(webp_path, "WEBP", quality=82, optimize=True)
                        webp_size = os.path.getsize(webp_path)
                        total_webp += webp_size
                        converted_count += 1
                except Exception as e:
                    print(f"Error processing {src_path}: {e}")

    # Create hero_poster.webp if not present
    hero_bg = os.path.join(img_dir, "kat_chleby.png")
    poster_path = os.path.join(img_dir, "hero_poster.webp")
    if os.path.exists(hero_bg) and not os.path.exists(poster_path):
        with Image.open(hero_bg) as img:
            img.convert("RGB").save(poster_path, "WEBP", quality=82, optimize=True)
            print("Created hero_poster.webp")

    mb_orig = total_original / (1024 * 1024)
    mb_webp = total_webp / (1024 * 1024)
    savings = ((total_original - total_webp) / total_original * 100) if total_original > 0 else 0

    print("\n--- Image Optimization Results ---")
    print(f"Total images converted: {converted_count}")
    print(f"Original total size:   {mb_orig:.2f} MB")
    print(f"WebP total size:       {mb_webp:.2f} MB")
    print(f"Total savings:         {savings:.1f}%")

if __name__ == "__main__":
    optimize_images()
