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
    
    const validCategories = ['all', '2ab', 'bread_rolls', 'cakes', 'sweet', 'bistro'];
    
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
        "2ab": {
            title: "Pieczywo Leks 2ab",
            subtitle: "Z Pradawnej Odmiany Pszenicy",
            desc: "Innowacyjna i lekkostrawna gama pieczywa premium wypiekanego z pradawnej pszenicy 2AB. Idealne, naturalne wsparcie dla wrażliwego układu pokarmowego.",
            breadcrumb: "Pieczywo Leks 2ab"
        },
        "bread_rolls": {
            title: "Pieczywo (Chleby i Bułki)",
            subtitle: "Baza Asortymentu",
            desc: "Tradycyjne polskie chleby na naturalnym zakwasie żytnim oraz szeroki wybór chrupiących bułek śniadaniowych, kajzerek i bagietek dopasowanych pod stoiska dopieku.",
            breadcrumb: "Pieczywo (Chleby i Bułki)"
        },
        "cakes": {
            title: "Cukiernia (Ciasta i Torty)",
            subtitle: "Wykwintne Wyroby",
            desc: "Luksusowe torty śmietankowe i czekoladowe, puszyste serniki rzemieślnicze oraz tradycyjne blachy pysznych ciast owocowych tworzone według mistrzowskich receptur.",
            breadcrumb: "Cukiernia (Ciasta i Torty)"
        },
        "sweet": {
            title: "Wyroby półcukiernicze",
            subtitle: "Słodki Impuls",
            desc: "Puszyste pączki premium z nadzieniami wiśniowym, malinowym i pistacjowym, maślane drożdżówki oraz puszyste donuty. Słodkie impulsy generujące doskonałą marżę detaliczną.",
            breadcrumb: "Wyroby półcukiernicze"
        },
        "bistro": {
            title: "Kanapki i Słone przekąski",
            subtitle: "Strefa Bistro & Go",
            desc: "Świeże, codziennie przygotowywane kanapki w technologii Flow-pack MAP oraz chrupiące ślimaki ze szpinakiem, bułki z warzywami i paluchy z serem idealne pod strefy bistro.",
            breadcrumb: "Kanapki i Słone przekąski"
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
