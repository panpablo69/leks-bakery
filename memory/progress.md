# Project Progress: Leks Bakery Website

## Stan Projektu
- **Faza 1: Przygotowanie**: Ukończona (katalogi, Git, GitHub CLI).
- **Faza 2: Crawling & Analiza**: Ukończona (specyfikacja `dev.leks.com.pl` wygenerowana crawlerem Playwright).
- **Faza 3: Integracja z GitHub**: Ukończona (repozytorium `panpablo69/leks-bakery` utworzone i zsynchronizowane).
- **Faza 4: Wdrożenie witryny**: W toku (Inicjalizacja Memory Banku zakończona).

---

## Lista Zadań (TODO Checklist)

### 📈 Inżynieria i Szkielet Aplikacji
- `[x]` Inicjalizacja folderu `memory/` z plikami stanu
- `[x]` Stworzenie szkieletu struktury plików (`src/index.html`, `src/css/style.css`, `src/js/app.js`)
- `[x]` Skonfigurowanie czcionek i zmiennych CSS w `style.css`

### 🎨 Projektowanie Podstron i Interakcji
- `[x]` **Strona Główna**: Imponujący baner hero z efektem dynamicznego przybliżania przy przewijaniu (GSAP ScrollTrigger)
- `[x]` **O Nas**: Wdrożenie interaktywnej osi czasu (1989-2026) z płynnym wysuwaniem opisów historycznych
- `[x]` **Certyfikaty (2026)**: Podmiana certyfikatów IFS PL/EN na 2026, podłączenie lokalnego certyfikatu ISO 22000, oraz usunięcie niepotrzebnych kart (Polityka Bezpieczeństwa, Deklaracja Zarządu, Ekogwarancja PTRE)
- `[x]` **Oferta / Sklep**: Dynamiczny katalog ponad 300 produktów z funkcją natychmiastowego filtrowania (chleby, bułki, ciasta) oraz nowa podstrona sklepu B2C
- `[x]` **Kariera**: Elegancka, czytelna sekcja rekrutacyjna z kafelkami stanowisk
- `[ ]` **Kontakt**: Nowoczesny formularz zintegrowany z Gmail API z naszego systemu deweloperskiego

### 🔒 Testowanie i Weryfikacja
- `[ ]` Uruchomienie skryptów testowych Playwright do walidacji responsywności
- `[ ]` Weryfikacja szybkości ładowania strony (Lighthouse score > 95)
