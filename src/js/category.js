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
   2. OBSŁUGA STRONY KATEGORII (DYNAMICZNY FUNNEL B2B)
   ============================================================================== */
function initCategoryPage() {
    const container = document.getElementById("products-container");
    if (!container) return;
    
    // Odczytaj parametr kategorii z URL (?cat=...)
    const urlParams = new URLSearchParams(window.location.search);
    let cat = urlParams.get('cat') || 'all';
    
    // Korekcja jeśli błędna wartość
    if (!['all', 'bread', 'rolls', 'sweet'].includes(cat)) {
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
            title: "Chleby Tradycyjne i Rzemieślnicze",
            subtitle: "Chleby Tradycyjne",
            desc: "Naturalny, wielofazowy zakwas żytni wyhodowany w Sulęcinie, wysoka wilgotność miękiszu i niepowtarzalny tradycyjny smak w skali makro. Spełniamy najwyższe standardy B2B zatwierdzone przez międzynarodowych audytorów (IFS, BRC).",
            breadcrumb: "Chleby"
        },
        "rolls": {
            title: "Bułki, Bagietki i Galanteria",
            subtitle: "Bułki i Bagietki",
            desc: "Bogaty asortyment bułek i bagietek dopasowany pod systemy odroczonego wypieku (Bake-off) w sieciach handlowych. Niezrównana chrupkość, stabilna waga i pełna powtarzalność logistyczna.",
            breadcrumb: "Bułki i Bagietki"
        },
        "sweet": {
            title: "Wyroby Słodkie i Półcukiernicze",
            subtitle: "Wyroby Słodkie",
            desc: "Puszyste pączki premium, słodkie drożdżówki z kruszonką i tradycyjne wyroby półcukiernicze. Gotowe rozwiązania mrożone (Bake-off / Thaw & Serve) optymalizujące straty w sklepie.",
            breadcrumb: "Wyroby Słodkie"
        },
        "all": {
            title: "Pełna Oferta Pieczywa B2B",
            subtitle: "Wszystkie Produkty",
            desc: "Kompleksowy asortyment chlebów, bułek, bagietek oraz wyrobów słodkich produkowany w trzech nowoczesnych i wyspecjalizowanych zakładach piekarniczych Leks Sp. z o.o.",
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
