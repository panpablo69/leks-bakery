# Technical Context: Leks Bakery Website

## Stos Technologiczny (Tech Stack)
Wybór oparty na wytycznych wydajnościowych, stabilności i estetyce Premium (Opcja A):

1. **Rdzeń (Core)**: HTML5 & Vanilla JavaScript (ES6+).
2. **Warstwa Wizualna (Styling)**: Nowoczesny CSS3 z wykorzystaniem zaawansowanych zmiennych CSS (Custom Properties) dla spójnego systemu typografii, kolorów i motywów.
3. **Silnik Animacji (Visual Magic)**: **GSAP 3** (GreenSock Animation Platform) + **ScrollTrigger** do płynnych animacji uruchamianych przewijaniem strony.
4. **Testowanie i Automatyzacja**: **Playwright** (Python/JS) do walidacji renderowania i testów E2E na różnych rozdzielczościach ekranu.
5. **System Zarządzania Kodem**: Git & GitHub (repozytorium: `panpablo69/leks-bakery`).

## Paleta Barw (Premium Bakery Theme)
- **Tło Główne (Warm White)**: `#FDFBF7` (kremowa, organiczna biel).
- **Kolor Akcentowy (Gold Bread)**: `#D4AF37` / `#C5A059` (złocisty odcień chrupiącej skórki).
- **Kolor Głęboki (Chocolate/Grain)**: `#3E2723` (ciemna czekolada, nawiązanie do tradycyjnego żytniego chleba na zakwasie).
- **Kolor Tekstu (Charcoal)**: `#2D2A26` (bardzo ciemny szary, zapewniający idealny kontrast).

## Założenia Architektoniczne
- **Mobile-First & Fluid Responsiveness**: Layout skalujący się płynnie od 320px do 1920px bez skoków.
- **Zero Framework Bloat**: Czysty HTML/CSS ładowany w milisekundy. Wykorzystanie pre-loadingu dla kluczowych grafik pieczywa.
- **SEO Ready**: Prawidłowa hierarchia nagłówków (H1 na każdej podstronie), metadane, mikroformaty Schema.org dla lokalnych biznesów (LocalBusiness / Bakery).
