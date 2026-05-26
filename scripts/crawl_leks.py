import os
import sys
import time
from datetime import datetime
from urllib.parse import urljoin, urlparse
from playwright.sync_api import sync_playwright

BASE_URL = "http://dev.leks.com.pl"
FALLBACK_URL = "http://leks.com.pl"
OUTPUT_FILE = "specyfikacja_leks.md"

def crawl_site():
    print("[INFO] Uruchamianie Playwright...")
    
    # Lista do gromadzenia informacji o podstronach
    site_pages = {}
    
    with sync_playwright() as p:
        # Uruchamiamy Chromium w trybie headless
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = context.new_page()
        
        # Próba wejścia na stronę deweloperską, z fallbackiem na oficjalną
        url = BASE_URL
        print(f"[DRIVE] Nawigacja do strony głównej: {url}...")
        try:
            response = page.goto(url, timeout=15000)
            if not response or response.status >= 400:
                print(f"[WARN] Strona deweloperska dev.leks.com.pl zwróciła status {response.status if response else 'brak'}. Przełączanie na fallback: {FALLBACK_URL}...")
                url = FALLBACK_URL
                page.goto(url, timeout=15000)
        except Exception as e:
            print(f"[WARN] Błąd połączenia z dev.leks.com.pl ({e}). Przełączanie na fallback: {FALLBACK_URL}...")
            url = FALLBACK_URL
            try:
                page.goto(url, timeout=15000)
            except Exception as e2:
                print(f"[ERR] Nie można nawiązać połączenia z żadną wersją witryny ({e2})")
                sys.exit(1)
                
        # Zapisujemy adres, z którego ostatecznie korzystamy
        final_base_url = page.url
        print(f"[OK] Pomyślnie załadowano stronę główną: {final_base_url}")
        time.sleep(2) # Czekamy na załadowanie JS
        
        # Pobieramy informacje ze strony głównej
        title = page.title()
        site_pages[final_base_url] = {
            "title": title,
            "heading": page.locator("h1").first.text_content() if page.locator("h1").count() > 0 else "Brak H1",
            "content_summary": "Strona główna serwisu."
        }
        
        # Wyciągamy wszystkie linki nawigacyjne (wewnętrzne)
        print("[INFO] Wyszukiwanie linków nawigacyjnych na stronie głównej...")
        links = page.locator("a").all()
        urls_to_crawl = set()
        
        parsed_base = urlparse(final_base_url)
        base_domain = parsed_base.netloc
        
        for link in links:
            try:
                href = link.get_attribute("href")
                if not href:
                    continue
                    
                full_url = urljoin(final_base_url, href)
                parsed_url = urlparse(full_url)
                
                # Interesują nas tylko linki w obrębie tej samej domeny i bez hashy (#)
                if parsed_url.netloc == base_domain and not parsed_url.fragment:
                    # Wykluczamy pliki i specyficzne linki
                    if not any(full_url.endswith(ext) for ext in ['.pdf', '.jpg', '.png', '.zip', '.doc']):
                        urls_to_crawl.add(full_url)
            except Exception:
                continue
                
        print(f"[INFO] Znaleziono {len(urls_to_crawl)} unikalnych adresów wewnętrznych do zbadania.")
        
        # Przechodzimy przez unikalne podstrony (limitujemy do 8 najważniejszych, aby oszczędzać czas i zasoby)
        pages_to_process = list(urls_to_crawl)[:10]
        
        for target_url in pages_to_process:
            if target_url == final_base_url:
                continue
                
            print(f"[DRIVE] Badanie podstrony: {target_url}...")
            try:
                page.goto(target_url, timeout=10000)
                time.sleep(1) # Czekamy na skrypty
                
                # Ekstrakcja kluczowych sekcji
                title = page.title()
                h1_elements = page.locator("h1").all()
                h1_text = h1_elements[0].text_content().strip() if h1_elements else "Brak"
                
                # Zbieranie głównego tekstu
                body_text = page.locator("body").text_content()
                # Usuwamy zbędne białe znaki i skracamy do podsumowania
                body_clean = " ".join(body_text.split())
                summary = body_clean[:300] + "..." if len(body_clean) > 300 else body_clean
                
                site_pages[target_url] = {
                    "title": title,
                    "heading": h1_text,
                    "content_summary": summary
                }
                print(f"[OK] Zbadano pomyślnie podstronę: {title}")
            except Exception as e:
                print(f"[WARN] Nie udało się zbadać podstrony {target_url} ({e})")
                
        # Zamykamy przeglądarkę
        browser.close()
        
    # Generujemy manual techniczny (specyfikacja_leks.md)
    print(f"[ZIP] Generowanie pliku specyfikacji: {OUTPUT_FILE}...")
    
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("# 📑 Techniczna Specyfikacja i Manual Struktury Serwisu Leks Sp. z o.o.\n\n")
        f.write("Raport wygenerowany automatycznie za pomocą modułu **Playwright Crawler**.\n")
        f.write(f"Data analizy: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"Główny analizowany adres: {final_base_url}\n\n")
        
        f.write("## 1. Ogólne Informacje o Witrynie\n")
        f.write(f"- **Tytuł Strony Głównej**: {site_pages.get(final_base_url, {}).get('title', 'Brak')}\n")
        f.write(f"- **Główny Nagłówek (H1)**: {site_pages.get(final_base_url, {}).get('heading', 'Brak')}\n\n")
        
        f.write("## 2. Zmapowana Struktura Podstron i Zawartość\n\n")
        
        for p_url, p_data in site_pages.items():
            parsed_url = urlparse(p_url)
            path = parsed_url.path if parsed_url.path else "/"
            
            f.write(f"### Podstrona: `{path}`\n")
            f.write(f"- **URL**: {p_url}\n")
            f.write(f"- **Meta-Title**: {p_data.get('title')}\n")
            f.write(f"- **Nagłówek (H1)**: {p_data.get('heading')}\n")
            f.write(f"- **Skrót Treści**:\n  > {p_data.get('content_summary')}\n\n")
            f.write("---\n\n")
            
        f.write("## 3. Wytyczne Techniczne do Odtworzenia Witryny (Senior Architect Recommendation)\n\n")
        f.write("Opierając się na strukturze Leks, wdrożymy witrynę o wysokiej wydajności (Opcja A) z następującymi usprawnieniami:\n\n")
        f.write("1. **Przejrzysta Nawigacja (Sticky Header)**: Płynne menu górne z efektem rozmycia tła (backdrop-filter) i animacją chowania/pokazywania przy scrollowaniu (GSAP).\n")
        f.write("2. **Sekcja Oferta (Dynamic Grid)**: Interaktywny podział produktów (chleb, bułki, wyroby cukiernicze) z płynnym filtrowaniem bez przeładowania strony.\n")
        f.write("3. **Klimatyczny Design Premium**: Harmonia ciepłych beżów, kremowych bieli i czekoladowych brązów z nowoczesną typografią (np. Google Fonts - Inter lub Playfair Display dla nagłówków rustykalnych).\n")
        f.write("4. **Playwright E2E Testing**: Wykorzystamy Playwrighta do zautomatyzowanych testów sprawdzających poprawność renderowania oraz szybkość ładowania nowej strony.\n")

    print(f"[OK] Specyfikacja pomyślnie wygenerowana w pliku: {OUTPUT_FILE}")

if __name__ == "__main__":
    # Upewniamy się, że działamy we właściwym katalogu roboczym
    crawl_site()
