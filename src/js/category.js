document.addEventListener("DOMContentLoaded", () => {
    // Rejestracja wtyczki ScrollTrigger w GSAP
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    initNavigation();
    initCategoryPage();
});

/* ==============================================================================
   1. MENU NAWIGACYJNE & HAMBURGER (ZGODNIE Z APP.JS)
   ============================================================================== */
function initNavigation() {
    const header = document.getElementById("main-header");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("main-nav");
    
    // Zmiana rozmiaru i tła przy scrollu
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    });
    
    // Otwieranie menu mobilnego
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
            
            // Animacja linków przy wysuwaniu menu
            if (navMenu.classList.contains("active")) {
                gsap.fromTo(".nav-menu ul li", 
                    { opacity: 0, x: 20 },
                    { opacity: 1, x: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" }
                );
            }
        });
    }
}

/* ==============================================================================
   2. OBSŁUGA STRONY KATEGORII (DYNAMICZNY FUNNEL B2B - 7 KATEGORII)
   ============================================================================== */
function initCategoryPage() {
    const container = document.getElementById("products-container");
    if (!container) return;
    
    // Odczytaj parametr kategorii z URL (?cat=...)
    const urlParams = new URLSearchParams(window.location.search);
    let cat = urlParams.get('cat') || 'all';
    
    const validCategories = ['all', 'bread', 'rolls', '2ab', 'sweet', 'cakes', 'savory', 'sandwiches'];
    
    // Korekcja jeśli błędna wartość
    if (!validCategories.includes(cat)) {
        cat = 'all';
    }
    
    // Podświetlenie odpowiedniego przycisku w nagłówku
    const activeBtn = document.getElementById(`btn-cat-${cat}`);
    if (activeBtn) {
        // Usuń active z innych
        document.querySelectorAll(".cat-nav-btn").forEach(btn => btn.classList.remove("active"));
        activeBtn.classList.add("active");
    }
    
    // Dane dla poszczególnych kategorii
    const categoryInfo = {
        "bread": {
            title: "Chleby Tradycyjne",
            subtitle: "Chleby Tradycyjne",
            desc: "Tradycyjne polskie chleby mieszane i żytnie, wypiekane w 100% na naturalnym wielofazowym zakwasie żytnim. Gwarancja doskonałej wilgotności miękiszu, chrupiącej skórki i długiej świeżości (Bake-off / świeże).",
            breadcrumb: "Chleby Tradycyjne"
        },
        "rolls": {
            title: "Bułki i Bagietki",
            subtitle: "Bułki i Bagietki",
            desc: "Bogaty asortyment bułek śniadaniowych, kajzerek oraz chrupiących bagietek. Idealnie zoptymalizowane pod systemy odroczonego wypieku (Bake-off) w supermarketach.",
            breadcrumb: "Bułki i Bagietki"
        },
        "2ab": {
            title: "Pieczywo Pradawne 2AB",
            subtitle: "Pieczywo 2AB",
            desc: "Przełomowe pieczywo funkcjonalne z pradawnej pszenicy 2AB. Lekkostrawna i bogata w składniki odżywcze alternatywa dedykowana dla wrażliwego układu pokarmowego.",
            breadcrumb: "Pieczywo 2AB"
        },
        "sweet": {
            title: "Wyroby Półcukiernicze",
            subtitle: "Półcukiernicze",
            desc: "Puszyste pączki premium z nadzieniem owocowym lub kremowym oraz tradycyjne maślane drożdżówki z kruszonką. Słodkie wypieki generujące stabilne zyski.",
            breadcrumb: "Półcukiernicze"
        },
        "cakes": {
            title: "Katalog Cukierniczy",
            subtitle: "Cukiernia",
            desc: "Luksusowe torty, delikatne serniki, puszyste ciasta drożdżowe i placki z twarogiem. Wyjątkowe wyroby cukiernicze tworzone według mistrzowskich receptur.",
            breadcrumb: "Cukiernia"
        },
        "savory": {
            title: "Słone Przekąski Bake-Off",
            subtitle: "Słone Przekąski",
            desc: "Chrupiące ślimaki ze szpinakiem, bułki z warzywami oraz pożywne słone przekąski z ciasta francuskiego. Gotowe rozwiązania pod systemy dopieku w sklepie.",
            breadcrumb: "Słone Przekąski"
        },
        "sandwiches": {
            title: "Świeże Kanapki Bistro",
            subtitle: "Kanapki",
            desc: "Świeże, codzienne przygotowywane kanapki z najwyższej jakości wędlinami, warzywami i sosami na bazie chrupiącego pieczywa własnej produkcji Leks.",
            breadcrumb: "Kanapki"
        },
        "all": {
            title: "Pełna Oferta Pieczywa B2B",
            subtitle: "Wszystkie Produkty",
            desc: "Kompleksowy asortyment chlebów, bułek, bagietek, wyrobów słodkich, cukierniczych, słonych przekąsek i kanapek produkowany w trzech nowoczesnych i wyspecjalizowanych zakładach piekarniczych Leks Sp. z o.o.",
            breadcrumb: "Wszystko"
        }
    };
    
    // Dynamiczna podmiana tekstów na bannerze
    const info = categoryInfo[cat];
    document.getElementById("cat-title").textContent = info.title;
    document.getElementById("cat-subtitle").textContent = info.subtitle;
    document.getElementById("cat-desc").textContent = info.desc;
    document.getElementById("breadcrumb-current").textContent = info.breadcrumb;
    
    // Renderowanie kart produktów
    container.innerHTML = ""; // Czyszczenie
    let filteredCount = 0;
    
    for (const [id, product] of Object.entries(PRODUCTS_DATA)) {
        if (cat === 'all' || product.category === cat) {
            filteredCount++;
            const card = document.createElement("div");
            card.className = "product-card";
            card.setAttribute("data-category", product.category);
            
            const summary = product.desc.length > 120 
                ? product.desc.substring(0, 117) + "..." 
                : product.desc;
                
            card.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.categoryLabel}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-desc">${summary}</p>
                    <a href="product.html?id=${id}" class="btn btn-sm btn-primary">Specyfikacja B2B</a>
                </div>
            `;
            container.appendChild(card);
        }
    }
    
    // Animacja kart na wejściu (GSAP Stagger)
    if (typeof gsap !== 'undefined' && filteredCount > 0) {
        gsap.from(".product-card", {
            opacity: 0,
            y: 40,
            scale: 0.95,
            stagger: 0.08,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.refresh();
                }
            }
        });
    }
}
