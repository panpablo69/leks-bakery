/* ==============================================================================
   🏛 Leks Bakery App Script - Premium animations and interactivity with GSAP
   Author: Senior Developer & Architekt AI (15+ years experience)
   ============================================================================== */

// Global translation variables
let currentLang = localStorage.getItem("leks_lang");
if (!currentLang) {
    const userLang = navigator.language || navigator.userLanguage;
    const shortLang = userLang.split('-')[0].toLowerCase();
    currentLang = ["pl", "en", "de", "es"].includes(shortLang) ? shortLang : "pl";
}
let translations = {};

async function loadInitialTranslations() {
    try {
        const response = await fetch(`lang/${currentLang}.json?v=46`);
        if (response.ok) {
            translations = await response.json();
            document.documentElement.setAttribute("lang", currentLang);
            applyTranslations();
            updateLanguageSwitcherUI();
        }
    } catch (error) {
        console.error("Failed to load initial translations:", error);
    }
}

async function loadTranslations(lang) {
    try {
        const response = await fetch(`lang/${lang}.json?v=46`);
        if (!response.ok) throw new Error(`Could not load translations for ${lang}`);
        translations = await response.json();
        currentLang = lang;
        localStorage.setItem("leks_lang", lang);
        document.documentElement.setAttribute("lang", lang);
        
        applyTranslations();
        updateLanguageSwitcherUI();
        
        // Re-render categories & products
        renderKategorie();
        renderCategoryProducts();
        
        // Re-render current year timeline card
        const activeBtn = document.querySelector(".timeline-year-btn.active");
        if (activeBtn) {
            const year = activeBtn.getAttribute("data-year");
            const cardTitle = document.getElementById("timeline-title");
            const cardDesc = document.getElementById("timeline-desc");
            if (cardTitle && cardDesc) {
                const title = translations.about && translations.about.timeline && translations.about.timeline[year] 
                    ? translations.about.timeline[year].title 
                    : timelineData[year].title;
                const desc = translations.about && translations.about.timeline && translations.about.timeline[year] 
                    ? translations.about.timeline[year].desc 
                    : timelineData[year].desc;
                cardTitle.textContent = title;
                cardDesc.textContent = desc;
            }
        }
        
        // Refresh ScrollTrigger to recalculate trigger positions after translations adjust content size
        if (typeof ScrollTrigger !== 'undefined') {
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        }
    } catch (error) {
        console.error("i18n load error:", error);
    }
}

function applyTranslations() {
    if (!translations || Object.keys(translations).length === 0) return;
    
    // 1. data-i18n attributes
    const i18nElements = document.querySelectorAll("[data-i18n]");
    i18nElements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        const value = getTranslationValue(translations, key);
        if (value !== undefined) {
            if (el.tagName === 'OPTION' || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.textContent = value;
            } else {
                el.innerHTML = value;
            }
        }
    });
    
    // 2. data-i18n-placeholder attributes
    const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
    placeholderElements.forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        const value = getTranslationValue(translations, key);
        if (value !== undefined) {
            el.setAttribute("placeholder", value);
        }
    });

    // 3. data-i18n-alt attributes
    const altElements = document.querySelectorAll("[data-i18n-alt]");
    altElements.forEach(el => {
        const key = el.getAttribute("data-i18n-alt");
        const value = getTranslationValue(translations, key);
        if (value !== undefined) {
            el.setAttribute("alt", value);
        }
    });
}

function getTranslationValue(obj, keyPath) {
    if (!obj || !keyPath) return undefined;
    const keys = keyPath.split('.');
    let current = obj;
    for (let key of keys) {
        if (current[key] === undefined) return undefined;
        current = current[key];
    }
    return current;
}

function updateLanguageSwitcherUI() {
    const activeOption = document.querySelector(`.lang-dropdown-menu .lang-option[data-lang="${currentLang}"]`);
    if (activeOption) {
        const activeFlagContainer = document.getElementById("active-lang-flag");
        const activeCodeContainer = document.getElementById("active-lang-code");
        const optionFlag = activeOption.querySelector(".lang-flag");
        
        if (activeFlagContainer && optionFlag) {
            activeFlagContainer.innerHTML = optionFlag.innerHTML;
        }
        if (activeCodeContainer) {
            activeCodeContainer.textContent = currentLang.toUpperCase();
        }
        
        const options = document.querySelectorAll(".lang-dropdown-menu .lang-option");
        options.forEach(opt => {
            if (opt.getAttribute("data-lang") === currentLang) {
                opt.classList.add("active");
            } else {
                opt.classList.remove("active");
            }
        });
    }
}

function initLanguageSwitcher() {
    const dropdown = document.getElementById("lang-dropdown");
    const trigger = document.getElementById("lang-trigger");
    if (!dropdown || !trigger) return;
    
    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("active-open");
    });
    
    const options = dropdown.querySelectorAll(".lang-option");
    options.forEach(opt => {
        opt.addEventListener("click", (e) => {
            e.stopPropagation();
            const lang = opt.getAttribute("data-lang");
            if (lang && lang !== currentLang) {
                loadTranslations(lang);
            }
            dropdown.classList.remove("active-open");
        });
    });
    
    document.addEventListener("click", () => {
        dropdown.classList.remove("active-open");
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    // Rejestracja wtyczki ScrollTrigger w GSAP
    try {
        gsap.registerPlugin(ScrollTrigger);
    } catch(e) { console.error("GSAP register error:", e); }
    
    // Inicjalizacja języka
    await loadInitialTranslations();

    try {
        initNavigation();
    } catch(e) { console.error("initNavigation error:", e); }
    
    try {
        initLanguageSwitcher();
    } catch(e) { console.error("initLanguageSwitcher error:", e); }

    try {
        initHeroAnimations();
    } catch(e) { console.error("initHeroAnimations error:", e); }
    
    try {
        initTimeline();
    } catch(e) { console.error("initTimeline error:", e); }
    
    try {
        initAllProductsCategory();
    } catch(e) { console.error("initAllProductsCategory error:", e); }
    
    try {
        renderKategorie();
    } catch(e) { console.error("renderKategorie error:", e); }
    
    try {
        renderCategoryProducts();
    } catch(e) { console.error("renderCategoryProducts error:", e); }

    try {
        initProductsFilterAndSort();
    } catch(e) { console.error("initProductsFilterAndSort error:", e); }
    
    try {
        initParallax();
    } catch(e) { console.error("initParallax error:", e); }
    
    try {
        initAccordions();
    } catch(e) { console.error("initAccordions error:", e); }
    
    try {
        initB2BModal();
    } catch(e) { console.error("initB2BModal error:", e); }
    
    try {
        initScrollAnimations();
    } catch(e) { console.error("initScrollAnimations error:", e); }
    
    try {
        initSwipers();
    } catch(e) { console.error("initSwipers error:", e); }
    
    try {
        initHotspots();
    } catch(e) { console.error("initHotspots error:", e); }
    
    try {
        initContactForms();
    } catch(e) { console.error("initContactForms error:", e); }
    
    try {
        initPrivacyModal();
    } catch(e) { console.error("initPrivacyModal error:", e); }
    
    try {
        initBlogModal();
    } catch(e) { console.error("initBlogModal error:", e); }
    
    try {
        initCertificates();
    } catch(e) { console.error("initCertificates error:", e); }

    // Odświeżenie na koniec załadowania okna
    window.addEventListener("load", () => {
        setTimeout(() => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 300);
    });
});

/* ==============================================================================
   1. MENU NAWIGACYJNE & MOBILNE HAMBURGER
   ============================================================================== */
function initNavigation() {
    const header = document.getElementById("main-header");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("main-nav");
    const navLinks = document.querySelectorAll(".nav-link");
    
    // Klasa dodawana przy scrollowaniu (glassmorphism/size change)
    window.addEventListener("scroll", () => {
        const hasHero = document.getElementById("hero") !== null;
        if (!hasHero || window.scrollY > 50) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
        
        // Dynamiczne podświetlanie aktywnej sekcji w menu
        let currentSection = "";
        const sections = document.querySelectorAll("section");
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });
    
    // Przełączanie menu mobilnego (Hamburger)
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
        
        // Animacja pasków hamburgera
        const bars = menuToggle.querySelectorAll(".bar");
        if (menuToggle.classList.contains("active")) {
            gsap.to(bars[0], { y: 8, rotate: 45, duration: 0.2 });
            gsap.to(bars[1], { opacity: 0, duration: 0.2 });
            gsap.to(bars[2], { y: -8, rotate: -45, duration: 0.2 });
        } else {
            gsap.to(bars[0], { y: 0, rotate: 0, duration: 0.2 });
            gsap.to(bars[1], { opacity: 1, duration: 0.2 });
            gsap.to(bars[2], { y: 0, rotate: 0, duration: 0.2 });
        }
    });
    
    // Zamknięcie menu po kliknięciu w link mobilny
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("active");
            const bars = menuToggle.querySelectorAll(".bar");
            gsap.to(bars[0], { y: 0, rotate: 0, duration: 0.2 });
            gsap.to(bars[1], { opacity: 1, duration: 0.2 });
            gsap.to(bars[2], { y: 0, rotate: 0, duration: 0.2 });
        });
    });
}

/* ==============================================================================
   2. ANIMACJA WEJŚCIA HERO & SCROLL INDICATOR
   ============================================================================= */
function initHeroAnimations() {
    if (!document.getElementById("hero")) return;
    // Delikatne, eleganckie wejście sekcji Hero przy załadowaniu strony
    const tl = gsap.timeline();
    
    tl.from("#main-header", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
    
    tl.from(".hero-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.4");
    
    tl.from(".hero-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4");
    
    tl.from(".hero-lead", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.5");
    
    tl.from(".hero-actions .btn", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.4");
    
    tl.from("#scroll-arrow", {
        opacity: 0,
        duration: 0.5
    }, "-=0.2");
    
    // Efekt przybliżania tła Hero (parallax przy scrollowaniu)
    gsap.to("#hero-zoom-bg", {
        scale: 1.25,
        xPercent: -2,
        yPercent: -2,
        ease: "none",
        scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
}

/* ==============================================================================
   3. INTERAKTYWNA OŚ CZASU (O NAS) - GSAP CARD SLIDE
   ============================================================================== */
const timelineData = {
    "1989": {
        title: "Założenie Firmy w Sulęcinie",
        desc: "Firma Leks rozpoczyna działalność jako mała piekarnia rodzinna z pasją do tradycyjnych chlebów na naturalnym zakwasie w Sulęcinie."
    },
    "1998": {
        title: "Zdolność Produkcyjna: 50 000 / doba",
        desc: "Wybudowanie pierwszego w pełni zautomatyzowanego zakładu w Sulęcinie. Zdolność produkcyjna wzrasta do 50 tysięcy bochenków na dobę, umożliwiając strategiczne wejście do pierwszych regionalnych sieci handlowych."
    },
    "2005": {
        title: "Wdrożenie Standardów IFS & BRC",
        desc: "Budowa nowoczesnego zakładu w Gorzowie Wielkopolskim. Wdrożenie rygorystycznych międzynarodowych standardów IFS Food oraz BRC Global Standard na poziomie Grade A, otwierające drzwi do współpracy z ogólnopolskimi i europejskimi sieciami supermarketów."
    },
    "2010": {
        title: "Automatyzacja i Rozbudowa",
        desc: "Oddanie do użytku nowoczesnego zaplecza logistyczno-magazynowego w Sulęcinie oraz wdrożenie zaawansowanych systemów zarządzania pakowaniem, gwarantujących bezbłędną realizację zamówień."
    },
    "2018": {
        title: "Lider Bake-off & 1200+ Punktów",
        desc: "Wdrożenie pionierskich linii technologii wypieku odroczonego i głębokiego mrożenia (Bake-off). Nasza zaawansowana flota logistyczna zapewnia codzienne, punktualne dostawy świeżego ciasta do ponad 1200 supermarketów w Europie."
    },
    "2026": {
        title: "Piekarnia Przyszłości & Linia 2AB",
        desc: "Pełna automatyzacja produkcji z zachowaniem tradycyjnego procesu 24-godzinnej fermentacji. Wdrożenie unikalnej linii pieczywa z pradawnej pszenicy 2AB oraz przejście naszych zakładów na 100% zrównoważoną energię odnawialną."
    }
};

const mascotYearScales = {
    "1989": 0.72,
    "1998": 0.80,
    "2005": 0.88,
    "2010": 0.96,
    "2018": 1.05,
    "2026": 1.15
};

function updateMascotScale(year) {
    const mascotContainer = document.getElementById("timeline-mascot-slider") || document.querySelector(".timeline-mascot-container");
    if (!mascotContainer) return;
    const targetScale = mascotYearScales[year] !== undefined ? mascotYearScales[year] : 1;
    if (typeof gsap !== "undefined") {
        gsap.to(mascotContainer, {
            scale: targetScale,
            duration: 0.55,
            ease: "back.out(1.4)",
            transformOrigin: "bottom center"
        });
    } else {
        mascotContainer.style.transform = `translateX(-50%) scale(${targetScale})`;
    }
}

function positionTimelineElements(button, animate = true) {
    const card = document.getElementById("timeline-card");
    const mascotSlider = document.getElementById("timeline-mascot-slider") || document.querySelector(".timeline-mascot-container");
    const isMobile = window.innerWidth <= 768;
    
    if (!button || !card) return;
    
    const year = button.getAttribute("data-year");
    const targetScale = mascotYearScales[year] !== undefined ? mascotYearScales[year] : 1;
    
    if (isMobile) {
        // Pionowe pozycjonowanie na urządzeniach mobilnych
        const btnTop = button.offsetTop + button.offsetHeight / 2;
        card.style.left = "0px";
        card.classList.add("active");

        if (mascotSlider) {
            if (animate && typeof gsap !== "undefined") {
                gsap.to(mascotSlider, {
                    top: (button.offsetTop - 12) + "px",
                    left: "32px",
                    scale: targetScale,
                    duration: 0.55,
                    ease: "back.out(1.4)",
                    transformOrigin: "bottom center"
                });
            } else {
                mascotSlider.style.top = (button.offsetTop - 12) + "px";
                mascotSlider.style.left = "32px";
                mascotSlider.style.transform = `translate(-50%, -100%) scale(${targetScale})`;
            }
        }
    } else {
        // Poziome pozycjonowanie na wersjach desktopowych
        const btnCenter = button.offsetLeft + button.offsetWidth / 2;
        card.style.left = btnCenter + "px";
        card.classList.add("active");

        if (mascotSlider) {
            if (animate && typeof gsap !== "undefined") {
                gsap.to(mascotSlider, {
                    left: btnCenter + "px",
                    top: "0px",
                    scale: targetScale,
                    duration: 0.55,
                    ease: "back.out(1.4)",
                    transformOrigin: "bottom center"
                });
            } else {
                mascotSlider.style.left = btnCenter + "px";
                mascotSlider.style.top = "0px";
                mascotSlider.style.transform = `translateX(-50%) scale(${targetScale})`;
            }
        }
    }
}

function initTimeline() {
    const yearButtons = document.querySelectorAll(".timeline-year-btn");
    const card = document.getElementById("timeline-card");
    const mascotSlider = document.getElementById("timeline-mascot-slider");
    const cardTitle = document.getElementById("timeline-title");
    const cardDesc = document.getElementById("timeline-desc");
    
    const percentages = { "1989": 0, "1998": 20, "2005": 40, "2010": 60, "2018": 80, "2026": 100 };
    const nav = document.getElementById("timeline-years");
    
    if (!card || !nav) return;
    
    // Ustawienie początkowej pozycji bez animacji przejścia na start
    const activeBtn = document.querySelector(".timeline-year-btn.active");
    if (activeBtn) {
        card.style.transition = "none";
        if (mascotSlider) mascotSlider.style.transition = "none";
        
        const initYear = activeBtn.getAttribute("data-year");
        if (percentages[initYear] !== undefined) {
            nav.style.setProperty("--timeline-progress", percentages[initYear] + "%");
        }
        
        const data = timelineData[initYear];
        if (data && cardTitle && cardDesc) {
            const title = translations.about && translations.about.timeline && translations.about.timeline[initYear] 
                ? translations.about.timeline[initYear].title 
                : data.title;
            const desc = translations.about && translations.about.timeline && translations.about.timeline[initYear] 
                ? translations.about.timeline[initYear].desc 
                : data.desc;
            cardTitle.textContent = title;
            cardDesc.textContent = desc;
        }
        
        positionTimelineElements(activeBtn, false);
        updateMascotScale(initYear);
        
        // Przywrócenie transition po krótkiej chwili
        setTimeout(() => {
            card.style.transition = "";
            if (mascotSlider) mascotSlider.style.transition = "";
        }, 50);
    }
    
    yearButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.classList.contains("active")) return;
            
            // Usunięcie klasy aktywnej z innych przycisków
            yearButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const targetYear = btn.getAttribute("data-year");
            const data = timelineData[targetYear];
            const title = translations.about && translations.about.timeline && translations.about.timeline[targetYear] 
                ? translations.about.timeline[targetYear].title 
                : data.title;
            const desc = translations.about && translations.about.timeline && translations.about.timeline[targetYear] 
                ? translations.about.timeline[targetYear].desc 
                : data.desc;
            
            // Dynamiczne sterowanie kolorem linii
            if (percentages[targetYear] !== undefined) {
                nav.style.setProperty("--timeline-progress", percentages[targetYear] + "%");
            }
            
            // Animacja wzrostu maskotki w zależności od wybranego roku
            updateMascotScale(targetYear);
            
            // Elegancka animacja GSAP: zniknięcie, zmiana tekstu i pozycji, pojawienie się
            const timelineTl = gsap.timeline();
            
            timelineTl.to([cardTitle, cardDesc], {
                opacity: 0,
                y: -10,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    cardTitle.textContent = title;
                    cardDesc.textContent = desc;
                    
                    // Pozycjonuj całą kartę i suwak do nowego aktywnego przycisku
                    positionTimelineElements(btn);
                }
            });
            
            timelineTl.to([cardTitle, cardDesc], {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Przeliczanie pozycji przy zmianie rozmiaru okna
    window.addEventListener("resize", () => {
        const currentActive = document.querySelector(".timeline-year-btn.active");
        if (currentActive) {
            card.style.transition = "none";
            if (mascotSlider) mascotSlider.style.transition = "none";
            
            positionTimelineElements(currentActive);
            
            requestAnimationFrame(() => {
                card.style.transition = "";
                if (mascotSlider) mascotSlider.style.transition = "";
            });
        }
    });
}

function initAllProductsCategory() {
    if (typeof kategorieProduktow === 'undefined') return;
    let allCategory = kategorieProduktow.find(k => k.id === "all");
    if (!allCategory) {
        allCategory = {
            id: "all",
            name: "Wszystkie produkty",
            description: "Pełny asortyment tradycyjnego pieczywa, bułek, wyrobów cukierniczych i przekąsek Leks.",
            image: "img/kat_chleby.png",
            products: []
        };
        kategorieProduktow.unshift(allCategory);
    }
    const allProducts = [];
    const seenIds = new Set();
    kategorieProduktow.forEach(kat => {
        try {
            if (kat && kat.id !== "all" && Array.isArray(kat.products)) {
                kat.products.forEach(prod => {
                    if (prod && prod.id && !seenIds.has(prod.id)) {
                        seenIds.add(prod.id);
                        allProducts.push({
                            ...prod,
                            categoryId: kat.id,
                            categoryName: kat.name
                        });
                    }
                });
            }
        } catch(e) {
            console.error("Error aggregating products for category:", kat, e);
        }
    });
    allCategory.products = allProducts;
}

function parseWeightInGrams(weightStr) {
    if (!weightStr) return 0;
    const lower = String(weightStr).toLowerCase();
    if (lower.includes("kg")) {
        const match = lower.match(/(\d+([.,]\d+)?)\s*kg/);
        if (match) {
            return parseFloat(match[1].replace(',', '.')) * 1000;
        }
        return 1000;
    }
    const match = lower.match(/(\d+)\s*g/);
    if (match) {
        return parseInt(match[1], 10);
    }
    return 0;
}

/* ==============================================================================
   4. RENDEROWANIE KATEGORII (DYNAMICZNE) & PARALLAX
   ============================================================================== */
function renderKategorie() {
    const container = document.getElementById("products-container");
    if (!container || typeof kategorieProduktow === 'undefined') return;

    container.textContent = '';
    const fragment = document.createDocumentFragment();

    kategorieProduktow.forEach(kat => {
        try {
            if (!kat || !kat.id || kat.id === "all") return; // Pomija niepoprawne, puste lub syntetyczną kategorię 'all'

            const card = document.createElement("div");
            card.className = "product-card category-card";

            // Kontener zdjęcia z poprawną ścieżką z data.js i bezpiecznym fallbackiem
            const imageContainer = document.createElement("div");
            imageContainer.className = "image-container";
            const imgSrc = kat.image || "img/kat_chleby.png";
            imageContainer.style.backgroundImage = `url('${imgSrc}')`;

            const infoDiv = document.createElement("div");
            infoDiv.className = "product-info";

            const catSpan = document.createElement("span");
            catSpan.className = "product-category";
            catSpan.textContent = translations.products && translations.products.subtitle ? translations.products.subtitle : "Kategoria";

            const titleH3 = document.createElement("h3");
            titleH3.className = "product-title";
            titleH3.textContent = translations.categories && translations.categories[kat.id] 
                ? translations.categories[kat.id].name 
                : (kat.name || "Bez nazwy");

            const descP = document.createElement("p");
            descP.className = "product-desc";
            descP.textContent = translations.categories && translations.categories[kat.id] 
                ? translations.categories[kat.id].description 
                : (kat.description || "");

            const linkA = document.createElement("a");
            linkA.className = "btn btn-sm btn-primary";
            linkA.href = `category.html?cat=${kat.id}`;
            linkA.textContent = translations.hero && translations.hero.btn_offer ? translations.hero.btn_offer : "Zobacz produkty";

            infoDiv.appendChild(catSpan);
            infoDiv.appendChild(titleH3);
            infoDiv.appendChild(descP);
            infoDiv.appendChild(linkA);

            card.appendChild(imageContainer);
            card.appendChild(infoDiv);
            fragment.appendChild(card);
        } catch(e) {
            console.error("Error rendering category card in loop:", kat, e);
        }
    });

    container.appendChild(fragment);

    // Refresh ScrollTrigger to ensure triggers are recalculating height
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}


let catSelectInitialized = false;

function renderCategoryProducts() {
    const container = document.getElementById("category-products-container");
    if (!container || typeof kategorieProduktow === 'undefined') return;
    
    initAllProductsCategory();
    
    const params = new URLSearchParams(window.location.search);
    const urlCat = params.get('cat');
    
    const catSelect = document.getElementById("filter-category");
    const stateSelect = document.getElementById("filter-state");
    const sortSelect = document.getElementById("sort-by");
    const searchInput = document.getElementById("filter-search");
    const countBadge = document.getElementById("filter-count-badge");
    
    let activeCatId = "all";
    if (!catSelectInitialized) {
        if (urlCat && kategorieProduktow.some(k => k.id === urlCat)) {
            activeCatId = urlCat;
            if (catSelect) catSelect.value = urlCat;
        } else if (catSelect) {
            activeCatId = "all";
            catSelect.value = "all";
        }
        catSelectInitialized = true;
    } else {
        if (catSelect && catSelect.value) {
            activeCatId = catSelect.value;
        } else if (urlCat && kategorieProduktow.some(k => k.id === urlCat)) {
            activeCatId = urlCat;
        }
    }
    
    const category = kategorieProduktow.find(k => k.id === activeCatId) || kategorieProduktow.find(k => k.id === "all");
    
    if (!category) {
        document.getElementById("cat-title").textContent = "Kategoria nie znaleziona";
        return;
    }
    
    const catName = translations.categories && translations.categories[activeCatId] 
        ? translations.categories[activeCatId].name 
        : category.name;
    const catDesc = translations.categories && translations.categories[activeCatId] 
        ? translations.categories[activeCatId].description 
        : category.description;

    const titleEl = document.getElementById("cat-title");
    const descEl = document.getElementById("cat-desc");
    if (titleEl) titleEl.textContent = catName;
    if (descEl) descEl.textContent = catDesc;
    
    // Czyszczenie za pomocą usuwania węzłów (bezpieczne przed XSS)
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    let productsList = [...(category.products || [])];
    
    // Filtracja według opcji Świeże / Mrożone
    const filterState = stateSelect ? stateSelect.value : "all";
    if (filterState === "fresh") {
        productsList = productsList.filter(p => p.isFresh);
    } else if (filterState === "frozen") {
        productsList = productsList.filter(p => p.isFrozen);
    }
    
    // Wyszukiwanie tekstu
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    if (query) {
        productsList = productsList.filter(prod => {
            const name = (prod.name || "").toLowerCase();
            const desc = (prod.description || "").toLowerCase();
            return name.includes(query) || desc.includes(query);
        });
    }
    
    // Sortowanie
    const sortBy = sortSelect ? sortSelect.value : "default";
    if (sortBy === "name-asc") {
        productsList.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortBy === "name-desc") {
        productsList.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
    } else if (sortBy === "weight-asc") {
        productsList.sort((a, b) => parseWeightInGrams(a.weight) - parseWeightInGrams(b.weight));
    } else if (sortBy === "weight-desc") {
        productsList.sort((a, b) => parseWeightInGrams(b.weight) - parseWeightInGrams(a.weight));
    } else if (sortBy === "category") {
        productsList.sort((a, b) => (a.categoryId || "").localeCompare(b.categoryId || ""));
    } else if (sortBy === "state") {
        productsList.sort((a, b) => (b.isFresh ? 1 : 0) - (a.isFresh ? 1 : 0));
    }
    
    if (countBadge) {
        const prodWord = productsList.length === 1 ? "produkt" : (productsList.length > 1 && productsList.length < 5 ? "produkty" : "produktów");
        countBadge.textContent = `${productsList.length} ${prodWord}`;
    }
    
    if (productsList.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.style.gridColumn = "1/-1";
        emptyMsg.style.textAlign = "center";
        emptyMsg.style.padding = "40px 20px";
        emptyMsg.style.color = "var(--color-text-muted)";
        emptyMsg.style.fontSize = "16px";
        emptyMsg.textContent = "Brak produktów spełniających wybrane kryteria.";
        container.appendChild(emptyMsg);
        return;
    }
    
    const fragment = document.createDocumentFragment();
    
    productsList.forEach(prod => {
        const card = document.createElement("div");
        card.className = "product-card";
        
        // Dynamic translation and fallbacks
        let prodName = prod.name;
        let prodWeight = prod.weight || "Zgodnie ze specyfikacją";
        let prodPackaging = prod.packaging || "Według zamówienia";
        let prodShelfLife = prod.shelfLife || "Zgodnie ze specyfikacją";
        let prodCert = prod.cert || "IFS, BRC (Grade A)";
        let prodDesc = prod.description || "Skontaktuj się z naszym działem handlowym w celu uzyskania pełnej specyfikacji technologicznej i logistycznej produktu.";
        
        if (prod.id && translations.products_chleby && translations.products_chleby[prod.id]) {
            const tProd = translations.products_chleby[prod.id];
            if (tProd.name) prodName = tProd.name;
            if (tProd.weight) prodWeight = tProd.weight;
            if (tProd.packaging) prodPackaging = tProd.packaging;
            if (tProd.shelfLife) prodShelfLife = tProd.shelfLife;
            if (tProd.cert) prodCert = tProd.cert;
            if (tProd.description) prodDesc = tProd.description;
        } else if (prod.id && translations.products_bulki && translations.products_bulki[prod.id]) {
            const tProd = translations.products_bulki[prod.id];
            if (tProd.name) prodName = tProd.name;
            if (tProd.weight) prodWeight = tProd.weight;
            if (tProd.packaging) prodPackaging = tProd.packaging;
            if (tProd.shelfLife) prodShelfLife = tProd.shelfLife;
            if (tProd.cert) prodCert = tProd.cert;
            if (tProd.description) prodDesc = tProd.description;
        } else if (prod.id && translations.products_polcukiernicze && translations.products_polcukiernicze[prod.id]) {
            const tProd = translations.products_polcukiernicze[prod.id];
            if (tProd.name) prodName = tProd.name;
            if (tProd.weight) prodWeight = tProd.weight;
            if (tProd.packaging) prodPackaging = tProd.packaging;
            if (tProd.shelfLife) prodShelfLife = tProd.shelfLife;
            if (tProd.cert) prodCert = tProd.cert;
            if (tProd.description) prodDesc = tProd.description;
        } else if (prod.id && translations.products_cukiernia && translations.products_cukiernia[prod.id]) {
            const tProd = translations.products_cukiernia[prod.id];
            if (tProd.name) prodName = tProd.name;
            if (tProd.weight) prodWeight = tProd.weight;
            if (tProd.packaging) prodPackaging = tProd.packaging;
            if (tProd.shelfLife) prodShelfLife = tProd.shelfLife;
            if (tProd.cert) prodCert = tProd.cert;
            if (tProd.description) prodDesc = tProd.description;
        } else if (prod.id && translations.products_2ab && translations.products_2ab[prod.id]) {
            const tProd = translations.products_2ab[prod.id];
            if (tProd.name) prodName = tProd.name;
            if (tProd.weight) prodWeight = tProd.weight;
            if (tProd.packaging) prodPackaging = tProd.packaging;
            if (tProd.shelfLife) prodShelfLife = tProd.shelfLife;
            if (tProd.cert) prodCert = tProd.cert;
            if (tProd.description) prodDesc = tProd.description;
        } else if (prod.id && translations.products_przekaski && translations.products_przekaski[prod.id]) {
            const tProd = translations.products_przekaski[prod.id];
            if (tProd.name) prodName = tProd.name;
            if (tProd.weight) prodWeight = tProd.weight;
            if (tProd.packaging) prodPackaging = tProd.packaging;
            if (tProd.shelfLife) prodShelfLife = tProd.shelfLife;
            if (tProd.cert) prodCert = tProd.cert;
            if (tProd.description) prodDesc = tProd.description;
        }
        
        // Zapisywanie danych specyfikacji
        card.setAttribute("data-weight", prodWeight);
        card.setAttribute("data-packaging", prodPackaging);
        card.setAttribute("data-shelf-life", prodShelfLife);
        card.setAttribute("data-cert", prodCert);
        card.setAttribute("data-desc-full", prodDesc);
        card.setAttribute("data-overview-image", prod.isOverviewImage ? "true" : "false");
        card.setAttribute("data-is-fresh", prod.isFresh ? "true" : "false");
        card.setAttribute("data-is-frozen", prod.isFrozen ? "true" : "false");
        
        const imgPlaceholder = document.createElement("div");
        imgPlaceholder.className = "product-image-placeholder";
        imgPlaceholder.style.backgroundImage = `url('${prod.image}')`;
        imgPlaceholder.style.backgroundSize = "contain";
        imgPlaceholder.style.backgroundRepeat = "no-repeat";
        imgPlaceholder.style.backgroundPosition = "center";
        imgPlaceholder.style.backgroundColor = "#ffffff";
        imgPlaceholder.style.height = "200px";
        imgPlaceholder.style.position = "relative";
        
        const badgesContainer = document.createElement("div");
        badgesContainer.className = "delivery-badges-container";
        badgesContainer.style.position = "absolute";
        badgesContainer.style.top = "8px";
        badgesContainer.style.right = "8px";
        badgesContainer.style.display = "flex";
        badgesContainer.style.flexDirection = "column";
        badgesContainer.style.alignItems = "flex-end";
        badgesContainer.style.gap = "4px";
        badgesContainer.style.zIndex = "10";
        
        if (prod.isFresh) {
            const freshBadge = document.createElement("span");
            freshBadge.className = "delivery-badge delivery-badge-fresh";
            freshBadge.textContent = (translations.products && translations.products.badge_fresh) || "Świeże";
            freshBadge.style.backgroundColor = "#2E7D32";
            freshBadge.style.color = "#ffffff";
            freshBadge.style.fontSize = "11px";
            freshBadge.style.fontWeight = "700";
            freshBadge.style.padding = "3px 8px";
            freshBadge.style.borderRadius = "12px";
            freshBadge.style.letterSpacing = "0.5px";
            freshBadge.style.textTransform = "uppercase";
            freshBadge.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
            freshBadge.style.whiteSpace = "nowrap";
            freshBadge.style.lineHeight = "1";
            freshBadge.style.pointerEvents = "none";
            freshBadge.style.display = "inline-block";
            badgesContainer.appendChild(freshBadge);
        }
        
        if (prod.isFrozen) {
            const frozenBadge = document.createElement("span");
            frozenBadge.className = "delivery-badge delivery-badge-frozen";
            frozenBadge.textContent = (translations.products && translations.products.badge_frozen) || "Mrożone";
            frozenBadge.style.backgroundColor = "#0277BD";
            frozenBadge.style.color = "#ffffff";
            frozenBadge.style.fontSize = "11px";
            frozenBadge.style.fontWeight = "700";
            frozenBadge.style.padding = "3px 8px";
            frozenBadge.style.borderRadius = "12px";
            frozenBadge.style.letterSpacing = "0.5px";
            frozenBadge.style.textTransform = "uppercase";
            frozenBadge.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
            frozenBadge.style.whiteSpace = "nowrap";
            frozenBadge.style.lineHeight = "1";
            frozenBadge.style.pointerEvents = "none";
            frozenBadge.style.display = "inline-block";
            badgesContainer.appendChild(frozenBadge);
        }
        
        if (badgesContainer.children.length > 0) {
            imgPlaceholder.appendChild(badgesContainer);
        }
        
        if (prod.isOverviewImage) {
            const badge = document.createElement("span");
            badge.className = "overview-badge";
            badge.textContent = translations.illustrative_photo || "Zdjęcie poglądowe";
            badge.style.position = "absolute";
            badge.style.bottom = "8px";
            badge.style.left = "8px";
            badge.style.backgroundColor = "rgba(44, 30, 22, 0.85)";
            badge.style.color = "#ffffff";
            badge.style.fontSize = "11px";
            badge.style.fontWeight = "500";
            badge.style.padding = "3px 8px";
            badge.style.borderRadius = "4px";
            badge.style.letterSpacing = "0.5px";
            badge.style.zIndex = "5";
            badge.style.whiteSpace = "nowrap";
            badge.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
            badge.style.pointerEvents = "none";
            badge.style.display = "inline-block";
            imgPlaceholder.appendChild(badge);
        }
        
        const infoDiv = document.createElement("div");
        infoDiv.className = "product-info";
        
        const catSpan = document.createElement("span");
        catSpan.className = "product-category";
        const itemCatName = prod.categoryName || catName;
        catSpan.textContent = itemCatName;
        
        const titleH3 = document.createElement("h3");
        titleH3.className = "product-title";
        titleH3.textContent = prodName;
        
        const b2bLabel = translations.products && translations.products.b2b_badge ? translations.products.b2b_badge : "Opis";
        const btn = document.createElement("button");
        btn.className = "btn btn-sm btn-primary open-spec-btn";
        btn.style.marginTop = "auto";
        btn.textContent = b2bLabel;
        
        infoDiv.appendChild(catSpan);
        infoDiv.appendChild(titleH3);
        infoDiv.appendChild(btn);
        
        card.appendChild(imgPlaceholder);
        card.appendChild(infoDiv);
        
        fragment.appendChild(card);
    });
    
    container.appendChild(fragment);
}

function initProductsFilterAndSort() {
    const filterBar = document.getElementById("products-filter-bar");
    if (!filterBar) return;
    
    const catSelect = document.getElementById("filter-category");
    const stateSelect = document.getElementById("filter-state");
    const sortSelect = document.getElementById("sort-by");
    const searchInput = document.getElementById("filter-search");
    
    const onChange = () => {
        if (catSelect && catSelect.value) {
            const newUrl = `${window.location.pathname}?cat=${catSelect.value}`;
            window.history.replaceState(null, '', newUrl);
        }
        renderCategoryProducts();
    };
    
    if (catSelect) catSelect.addEventListener("change", onChange);
    if (stateSelect) stateSelect.addEventListener("change", onChange);
    if (sortSelect) sortSelect.addEventListener("change", onChange);
    if (searchInput) searchInput.addEventListener("input", onChange);
}

function initParallax() {
    // Elegancki i ultra-płynny efekt parallax przy użyciu GSAP ScrollTrigger dla wszystkich grafik kłosów
    const wheats = [
        { id: "#wheat-1", y: -120, rotate: 20 },
        { id: "#wheat-2", y: 100, rotate: -15 },
        { id: "#wheat-about", y: -90, rotate: -30 },
        { id: "#wheat-2ab", y: 130, rotate: 50 },
        { id: "#wheat-blog", y: -100, rotate: -20 },
        { id: "#wheat-career", y: 110, rotate: 35 },
        { id: "#wheat-contact", y: -120, rotate: -45 }
    ];
    
    wheats.forEach(item => {
        const el = document.querySelector(item.id);
        if (el) {
            // Ustawienie punktu startowego bez przeskoków
            gsap.set(el, { y: item.y * -0.3, rotation: item.rotate });
            
            gsap.to(el, {
                y: item.y,
                rotation: item.rotate * 1.2,
                ease: "none",
                scrollTrigger: {
                    trigger: el.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.6 // Nadaje piękny, organiczny efekt opóźnienia ("liquid lag")
                }
            });
        }
    });
}

/* ==============================================================================
   5. HARMONIJKI REKRUTACYJNE (KARIERA ACCORDIONS)
   ============================================================================== */
function initAccordions() {
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector(".accordion-icon");
            
            const isOpen = content.style.display === "block";
            
            // Zamykamy inne otwarte harmonijki (Single Accordion Pattern)
            const allContents = document.querySelectorAll(".accordion-content");
            const allIcons = document.querySelectorAll(".accordion-icon");
            allContents.forEach(c => c.style.display = "none");
            allIcons.forEach(i => i.textContent = "+");
            
            if (!isOpen) {
                content.style.display = "block";
                icon.textContent = "-";
                // Płynna animacja pojawienia się treści
                gsap.fromTo(content, 
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
                );
            }
        });
    });
}

/* ==============================================================================
   6. SCROLL REVEAL ANIMATIONS (GSAP SCROLLTRIGGER)
   ============================================================================== */
function initScrollAnimations() {
    // Animacja pojawiania się nagłówków sekcji
    const sectionHeaders = document.querySelectorAll(".section-header");
    sectionHeaders.forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: header,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Animacja siatki produktów przy pierwszym wejściu
    gsap.from(".product-card", {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "opacity,transform",
        scrollTrigger: {
            trigger: "#products",
            start: "top 85%",
            toggleActions: "play none none none"
        }
    });
    
    // Animacja formularza i panelu kontaktowego
    gsap.from(".contact-info-panel", {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 80%"
        }
    });
    
    gsap.from(".contact-form-panel", {
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".contact-grid",
            start: "top 80%"
        }
    });
}

/* ==============================================================================
   7. MODAL SPECYFIKACJI LOGISTYCZNEJ B2B (GSAP ANIMATION)
   ============================================================================== */
function initB2BModal() {
    const modal = document.getElementById("b2b-modal");
    if (!modal) return;
    
    const modalCard = modal.querySelector(".modal-card");
    const closeButton = document.getElementById("close-modal");
    const closeActionBtn = document.getElementById("modal-close-action");
    
    // Elementy modala do dynamicznej podmiany treści
    const modalTitle = document.getElementById("modal-product-title");
    const modalCat = document.getElementById("modal-product-cat");
    const modalImg = document.getElementById("modal-product-img");
    const modalWeight = document.getElementById("modal-weight");
    const modalPackaging = document.getElementById("modal-packaging");
    const modalShelfLife = document.getElementById("modal-shelf-life");
    const modalCert = document.getElementById("modal-cert");
    const modalDesc = document.getElementById("modal-product-desc");
    
    // Event Delegation
    document.addEventListener("click", (e) => {
        if (e.target.matches(".open-spec-btn")) {
            e.preventDefault();
            const btn = e.target;
            
            // Znajdź najbliższą kartę produktu i wyciągnij z niej dane
            const card = btn.closest(".product-card");
            if (!card) return;
            
            // Pobieranie danych tekstowych
            const title = card.querySelector(".product-title")?.textContent || "Brak nazwy";
            const cat = card.querySelector(".product-category")?.textContent || "Kategoria";
            
            // Pobieranie obrazka z background-image
            const imgDiv = card.querySelector(".product-image-placeholder");
            let imgSrc = "";
            if (imgDiv && imgDiv.style.backgroundImage) {
                // Wyciąga adres z url("...")
                imgSrc = imgDiv.style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            }
            
            // Dane techniczne z atrybutów data-* (z przycisku lub z karty)
            const weight = btn.dataset.weight || card.dataset.weight || "-";
            const packaging = btn.dataset.packaging || card.dataset.packaging || "-";
            const shelfLife = btn.dataset.shelfLife || card.dataset.shelfLife || "Zgodnie ze specyfikacją";
            const cert = btn.dataset.cert || card.dataset.cert || "IFS, BRC (Grade A)";
            const descFull = card.getAttribute("data-desc-full") || "";
            
            // Podmiana zawartości modala (wyłącznie bezpiecznymi metodami)
            if (modalTitle) modalTitle.textContent = title;
            if (modalCat) modalCat.textContent = cat;
            if (modalImg && imgSrc) {
                modalImg.src = imgSrc;
                modalImg.alt = title;
            }
            if (modalWeight) modalWeight.textContent = weight;
            if (modalPackaging) modalPackaging.textContent = packaging;
            if (modalShelfLife) modalShelfLife.textContent = shelfLife;
            if (modalCert) modalCert.textContent = cert;
            if (modalDesc) modalDesc.textContent = descFull;
            
            const modalOverviewBadge = document.getElementById("modal-overview-badge");
            if (modalOverviewBadge) {
                const isOverview = card.getAttribute("data-overview-image") === "true";
                modalOverviewBadge.style.display = isOverview ? "inline-block" : "none";
                modalOverviewBadge.textContent = translations.illustrative_photo || "Zdjęcie poglądowe";
            }
            
            let modalBadgesContainer = document.getElementById("modal-delivery-badges");
            if (!modalBadgesContainer) {
                const modalImageCol = document.querySelector(".modal-image-col");
                if (modalImageCol) {
                    modalBadgesContainer = document.createElement("div");
                    modalBadgesContainer.id = "modal-delivery-badges";
                    modalBadgesContainer.className = "modal-delivery-badges-container";
                    modalImageCol.appendChild(modalBadgesContainer);
                }
            }
            
            if (modalBadgesContainer) {
                modalBadgesContainer.innerHTML = '';
                const isFresh = card.getAttribute("data-is-fresh") === "true";
                const isFrozen = card.getAttribute("data-is-frozen") === "true";
                
                modalBadgesContainer.style.position = "absolute";
                modalBadgesContainer.style.top = "10px";
                modalBadgesContainer.style.right = "10px";
                modalBadgesContainer.style.display = "flex";
                modalBadgesContainer.style.flexDirection = "column";
                modalBadgesContainer.style.alignItems = "flex-end";
                modalBadgesContainer.style.gap = "4px";
                modalBadgesContainer.style.zIndex = "10";
                
                if (isFresh) {
                    const freshBadge = document.createElement("span");
                    freshBadge.className = "delivery-badge delivery-badge-fresh";
                    freshBadge.textContent = (translations.products && translations.products.badge_fresh) || "Świeże";
                    freshBadge.style.backgroundColor = "#2E7D32";
                    freshBadge.style.color = "#ffffff";
                    freshBadge.style.fontSize = "11px";
                    freshBadge.style.fontWeight = "700";
                    freshBadge.style.padding = "3px 8px";
                    freshBadge.style.borderRadius = "12px";
                    freshBadge.style.letterSpacing = "0.5px";
                    freshBadge.style.textTransform = "uppercase";
                    freshBadge.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
                    freshBadge.style.whiteSpace = "nowrap";
                    freshBadge.style.lineHeight = "1";
                    freshBadge.style.pointerEvents = "none";
                    freshBadge.style.display = "inline-block";
                    modalBadgesContainer.appendChild(freshBadge);
                }
                if (isFrozen) {
                    const frozenBadge = document.createElement("span");
                    frozenBadge.className = "delivery-badge delivery-badge-frozen";
                    frozenBadge.textContent = (translations.products && translations.products.badge_frozen) || "Mrożone";
                    frozenBadge.style.backgroundColor = "#0277BD";
                    frozenBadge.style.color = "#ffffff";
                    frozenBadge.style.fontSize = "11px";
                    frozenBadge.style.fontWeight = "700";
                    frozenBadge.style.padding = "3px 8px";
                    frozenBadge.style.borderRadius = "12px";
                    frozenBadge.style.letterSpacing = "0.5px";
                    frozenBadge.style.textTransform = "uppercase";
                    frozenBadge.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
                    frozenBadge.style.whiteSpace = "nowrap";
                    frozenBadge.style.lineHeight = "1";
                    frozenBadge.style.pointerEvents = "none";
                    frozenBadge.style.display = "inline-block";
                    modalBadgesContainer.appendChild(frozenBadge);
                }
            }
            
            // Dynamiczne przewijanie przycisku CTA w modalu do kontaktu
            const modalContactBtn = document.getElementById("modal-contact-btn");
            if (modalContactBtn) {
                modalContactBtn.addEventListener("click", () => {
                    closeModal();
                });
            }
            
            // Zablokowanie scrollowania body
            document.body.style.overflow = "hidden";
            
            // Otwieranie Modala z płynną animacją GSAP (Back Ease)
            modal.classList.add("active");
            gsap.fromTo(modal, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            );
            gsap.fromTo(modalCard, 
                { y: 60, scale: 0.9, opacity: 0 }, 
                { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.1)" }
            );
        }
    });
    
    // Zamykanie Modala
    function closeModal() {
        if (!modal.classList.contains("active")) return;
        
        gsap.to(modalCard, {
            y: 40,
            scale: 0.95,
            opacity: 0,
            duration: 0.3,
            ease: "power2.in"
        });
        
        gsap.to(modal, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                modal.classList.remove("active");
                // Odblokowanie scrollowania body
                document.body.style.overflow = "";
            }
        });
    }
    
    if (closeButton) closeButton.addEventListener("click", closeModal);
    if (closeActionBtn) closeActionBtn.addEventListener("click", closeModal);
    
    // Zamykanie przy kliknięciu w tło modala (overlay)
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Zamykanie modala klawiszem ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
}

/* ==============================================================================
   9. INICJALIZACJA SWIPER.JS (Karuzele Premium)
   ============================================================================== */
function initSwipers() {
    // Sprawdzenie, czy Swiper jest dostępny globalnie
    if (typeof Swiper === 'undefined') return;

    // Blog Swiper
    if (document.querySelector('.blog-swiper')) {
        new Swiper('.blog-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.blog-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.blog-next',
                prevEl: '.blog-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            }
        });
    }

    /* Career Swiper is disabled - replaced by static responsive CSS Grid
    if (document.querySelector('.career-swiper')) {
        new Swiper('.career-swiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            pagination: {
                el: '.career-swiper .swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.career-next',
                prevEl: '.career-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
            },
            autoplay: {
                delay: 6000, // Powolne i płynne przewijanie
                disableOnInteraction: false,
            }
        });
    }
    */

    // Partners Swiper
    if (document.querySelector('.partners-swiper')) {
        new Swiper('.partners-swiper', {
            slidesPerView: 2,
            spaceBetween: 20,
            loop: true,
            breakpoints: {
                576: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 }
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            }
        });
    }
}

/* ==============================================================================
   10. HOTSPOT 2AB - INTERAKCJA
   ============================================================================== */
function initHotspots() {
    const hotspots = document.querySelectorAll('.hotspot');
    
    hotspots.forEach(hotspot => {
        // Toggle na kliknięcie dla urządzeń mobilnych (lub jako alternatywa hovera)
        hotspot.addEventListener('click', function(e) {
            e.stopPropagation();
            // Usuń active z innych
            hotspots.forEach(h => {
                if(h !== this) h.classList.remove('active');
            });
            this.classList.toggle('active');
        });
    });

    // Zamykanie tooltipów po kliknięciu w inne miejsce
    document.addEventListener('click', () => {
        hotspots.forEach(h => h.classList.remove('active'));
    });
}

/* ==============================================================================
   11. MODAL POLITYKI PRYWATNOŚCI RODO (GSAP ANIMATION)
   ============================================================================== */
function initPrivacyModal() {
    const modal = document.getElementById("privacy-modal");
    if (!modal) return;
    
    const trigger = document.getElementById("trigger-privacy-modal");
    const closeBtn = document.getElementById("close-privacy-modal");
    const closeActionBtn = document.getElementById("close-privacy-action-btn");
    const modalCard = modal.querySelector(".privacy-modal-card");
    
    if (trigger) {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Zablokowanie scrollowania body
            document.body.style.overflow = "hidden";
            
            // Otwieranie Modala z płynną animacją GSAP
            modal.classList.add("active");
            gsap.fromTo(modal, 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.3, ease: "power2.out" }
            );
            gsap.fromTo(modalCard, 
                { y: 60, scale: 0.95, opacity: 0 }, 
                { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
            );
        });
    }
    
    function closeModal() {
        if (!modal.classList.contains("active")) return;
        
        gsap.to(modalCard, {
            y: 40,
            scale: 0.97,
            opacity: 0,
            duration: 0.25,
            ease: "power2.in"
        });
        
        gsap.to(modal, {
            opacity: 0,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
                modal.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }
    
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (closeActionBtn) closeActionBtn.addEventListener("click", closeModal);
    
    // Zamykanie przy kliknięciu w tło
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Zamykanie klawiszem ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });
}

/* ==============================================================================
   11. MODAL ARTYKUŁÓW BLOGOWYCH (INTERAKCJA I CZYTANIE)
   ============================================================================== */
function initBlogModal() {
    const modal = document.getElementById("blog-article-modal");
    if (!modal) return;
    
    const closeBtn = document.getElementById("close-blog-modal");
    const closeActionBtn = document.getElementById("close-blog-action-btn");
    const modalCard = modal.querySelector(".blog-modal-card");
    
    const imgEl = document.getElementById("blog-modal-img");
    const categoryEl = document.getElementById("blog-modal-category");
    const dateEl = document.getElementById("blog-modal-date");
    const readTimeEl = document.getElementById("blog-modal-read-time");
    const titleEl = document.getElementById("blog-modal-title");
    const contentEl = document.getElementById("blog-modal-content");
    
    const imgSrcMap = {
        'p1': 'img/blog_logistics.png?v=8',
        'p2': 'img/blog_diet.png?v=8',
        'p3': 'img/blog_tradition.png?v=8',
        'p4': 'img/blog_ecology.png?v=8'
    };
    
    const fallbackArticles = {
        'p1': {
            title: "Logistyka świeżości: Standard na europejską skalę",
            category: "Logistyka & Świeżość",
            date: "14 Lutego 2026",
            readTime: "4 min czytania",
            content: "<p>W Piekarni LEKS wiemy, że chrupiąca skórka i wyjątkowy zapach świeżego chleba to efekt nie tylko doskonałej receptury, ale przede wszystkim precyzyjnej i nowoczesnej logistyki. W 2026 roku dostarczamy pieczywo do setek punktów w Polsce i Europie Zachodniej w rekordowo krótkim czasie od momentu wyjęcia z pieca.</p><h3>Flota chłodnicza i kontrola temperatury</h3><p>Każdy z naszych pojazdów dostawczych wyposażony jest w zaawansowane systemy monitorowania temperatury i wilgotności w czasie rzeczywistym. Dzięki temu pieczywo dociera do sklepów, kawiarni i sieci partnerskich dokładnie w takich warunkach, jakich wymaga zachowanie pełnych walorów smakowych i odżywczych.</p><h3>Innowacyjne pakowanie próżniowe</h3><p>Dla wybranych linii produktów – w tym naszego flagowego pieczywa 2AB – wdrożyliśmy sterylną technologię pakowania w atmosferze modyfikowanej (MAP). Pozwala to cieszyć się tradycyjnym smakiem chleba bez konieczności stosowania chemicznych konserwantów.</p><blockquote>Logistyka w LEKS to most łączący gorący piec rzemieślniczy z porannym stołem naszych konsumentów.</blockquote>"
        },
        'p2': {
            title: "Pieczywo w diecie nowoczesnego konsumenta",
            category: "Zdrowie & Odżywianie",
            date: "10 Lutego 2026",
            readTime: "5 min czytania",
            content: "<p>Współczesny konsument zwraca ogromną uwagę na skład produktów spożywczych. Pieczywo przestało być jedynie podstawowym dodatkiem do posiłku – stało się kluczowym elementem zbilansowanej diety wspierającej odporność, trawienie i dobre samopoczucie.</p><h3>Potęga praziarna 2AB</h3><p>Przełomem w naszej ofercie jest wykorzystanie starożytnej odmiany pszenicy 2AB (Aegilops Tauschii & Speltoides). Posiada ona unikalną strukturę białkową, która jest znacznie łatwiej przyswajalna przez ludzki układ pokarmowy niż współczesna pszenica modyfikowana.</p><h3>Naturalne minerały i niski indeks glikemiczny</h3><p>Pieczywo z praziarna 2AB wyróżnia się naturalnie wysoką zawartością cynku, selenu oraz błonnika pokarmowego. Charakteryzuje się również niższym indeksem glikemicznym, co pomaga w utrzymaniu stabilnego poziomu cukru we krwi przez cały dzień.</p><blockquote>Prawdziwe zdrowie zaczyna się od ziarna, które szanuje naturalny metabolizm człowieka.</blockquote>"
        },
        'p3': {
            title: "Od ziarna do bochenka. Tradycja spotyka technologię",
            category: "Tradycja & Technologia",
            date: "02 Lutego 2026",
            readTime: "4 min czytania",
            content: "<p>W Piekarni LEKS łączymy wielopokoleniową tradycję piekarniczą z najnowocześniejszymi rozwiązaniami technologicznymi. Zastąpienie pracy ręcznej w powtarzalnych etapach procesami automatycznymi pozwala nam zachować najwyższą i powtarzalną jakość przy zachowaniu tradycyjnych receptur.</p><h3>Długotrwała fermentacja na żywym zakwasie</h3><p>Sercem naszej produkcji jest własny, naturalny zakwas żytni i pszenny, pielęgnowany według sprawdzonych receptur od kilkudziesięciu lat. Ciasto przechodzi wielogodzinny proces powolnej fermentacji, co nadaje pieczywu głęboki aromat, chrupiącą skórkę i elastyczny miąższ.</p><h3>Nowoczesne piece przelotowe</h3><p>Nasi mistrzowie piekarnictwa nadzorują proces wypieku w komputerowo sterowanych piecach przelotowych, które gwarantują idealną dystrybucję ciepła i pary wodnej. Dzięki temu każdy bochenek opuszczający naszą piekarnię smakuje jak z tradycyjnej wiejskiej piecowni.</p><blockquote>Technologia nie zastępuje serca piekarza – ona pomaga mu chronić tradycyjny smak.</blockquote>"
        },
        'p4': {
            title: "Eko-Piekarnia: Nasza droga do 100% zielonej energii",
            category: "Ekologia & Zrównoważony Rozwój",
            date: "25 Stycznia 2026",
            readTime: "3 min czytania",
            content: "<p>Ochrona środowiska to dla Piekarni LEKS jeden z priorytetów strategicznych. W 2026 roku z dumą ogłaszamy, że nasze zakłady produkcyjne w Sulęcinie i Gorzowie Wielkopolskim osiągnęły pełną samowystarczalność energetyczną opartą na odnawialnych źródłach energii.</p><h3>Fotowoltaika i odzysk ciepła z pieców</h3><p>Na dachach naszych hal produkcyjnych zainstalowaliśmy nowoczesne panele fotowoltaiczne o łącznej mocy rzędu kilkuset kilowatów. Dodatkowo wdrożyliśmy zaawansowany system odzysku ciepła odpadowego z pieców piekarniczych, które wykorzystujemy do ogrzewania wody i pomieszczeń zakładowych.</p><h3>Opakowania w 100% biodegradowalne</h3><p>Zredukowaliśmy zużycie plastiku o 85%, wprowadzając papierowe torby z recyklingu oraz biodegradowalne folie kompostowalne. Nasze cele na kolejne lata to zero odpadów organicznych oraz całkowita elektryfikacja floty pojazdów pomocniczych.</p><blockquote>Zrównoważony piekarz piecze z szacunkiem zarówno dla ludzi, jak i dla planety.</blockquote>"
        }
    };
    
    function openModal(postId) {
        const fb = fallbackArticles[postId] || {};
        const prefix = postId; // 'p1', 'p2', 'p3', 'p4'
        const b = (translations && translations.blog) ? translations.blog : {};
        
        const title = b[`${prefix}_title`] || fb.title || "";
        const category = b[`${prefix}_category`] || fb.category || "";
        const date = b[`${prefix}_date`] || fb.date || "";
        const readTime = b[`${prefix}_read_time`] || fb.readTime || "";
        const content = b[`${prefix}_content`] || fb.content || "";
        
        if (imgEl) imgEl.src = imgSrcMap[postId] || 'img/blog_logistics.png';
        if (categoryEl) categoryEl.textContent = category;
        if (dateEl) dateEl.textContent = date;
        if (readTimeEl) readTimeEl.textContent = readTime;
        if (titleEl) titleEl.textContent = title;
        if (contentEl) contentEl.innerHTML = content;
        
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
        
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
            gsap.fromTo(modalCard, { y: 40, scale: 0.95, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });
        }
    }
    
    function closeModal() {
        if (!modal.classList.contains("active")) return;
        if (typeof gsap !== 'undefined') {
            gsap.to(modalCard, { y: 30, scale: 0.97, opacity: 0, duration: 0.25, ease: "power2.in" });
            gsap.to(modal, {
                opacity: 0,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                    modal.classList.remove("active");
                    document.body.style.overflow = "";
                }
            });
        } else {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    }
    
    // Obsługa kliknięcia w kafelki bloga oraz ich elementy (przycisk Więcej, tytuł, obrazek)
    document.querySelectorAll(".blog-card").forEach(card => {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            const postId = card.getAttribute("data-post-id");
            if (postId) openModal(postId);
        });
    });
    
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (closeActionBtn) closeActionBtn.addEventListener("click", closeModal);
    
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
    });
}

/* ==============================================================================
   11. SEKCJA CERTYFIKATÓW i NORM (ROZWIJANIE & STAGGER ANIMATION GSAP)
   ============================================================================== */
function initCertificates() {
    const toggleBtn = document.getElementById("toggle-certs-btn");
    const grid = document.getElementById("certificates-grid");
    
    if (!toggleBtn || !grid) return;
    
    const toggleText = toggleBtn.querySelector("span");
    const certCards = grid.querySelectorAll(".cert-card");
    
    toggleBtn.addEventListener("click", () => {
        const isActive = grid.classList.contains("active");
        
        if (!isActive) {
            // Rozwijanie
            grid.classList.add("active");
            toggleBtn.classList.add("active");
            if (toggleText) toggleText.textContent = "Ukryj Certyfikaty";
            
            // Animacja wejścia GSAP (stagger) dla kafelków
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(certCards, 
                    { opacity: 0, y: 30, scale: 0.95 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1, 
                        duration: 0.5, 
                        stagger: 0.08, 
                        ease: "power2.out",
                        clearProps: "transform,opacity", // Czyszczenie stylów po animacji dla hovera w CSS
                        delay: 0.1
                    }
                );
            }
        } else {
            // Zwijanie
            // Najpierw animujemy zanikanie kart
            if (typeof gsap !== 'undefined') {
                gsap.to(certCards, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3,
                    stagger: 0.04,
                    ease: "power2.in",
                    onComplete: () => {
                        grid.classList.remove("active");
                        toggleBtn.classList.remove("active");
                        if (toggleText) toggleText.textContent = "Pokaż Certyfikaty";
                        
                        // Scrollujemy lekko do baneru, jeśli po zwinięciu grid zniknął i użytkownik stracił orientację
                        const bannerRect = toggleBtn.getBoundingClientRect();
                        const absoluteBannerTop = window.pageYOffset + bannerRect.top - 120;
                        if (window.scrollY > absoluteBannerTop) {
                            window.scrollTo({
                                top: absoluteBannerTop,
                                behavior: "smooth"
                            });
                        }
                    }
                });
            } else {
                grid.classList.remove("active");
                toggleBtn.classList.remove("active");
                if (toggleText) toggleText.textContent = "Pokaż Certyfikaty";
            }
        }
    });
}

/* ==============================================================================
   12. FORMULARZE KONTAKTOWE (WEB3FORMS + VALIDATION + DATALAYER)
   ============================================================================== */
function initContactForms() {
    const forms = [
        { formId: "leks-contact-form", btnId: "form-submit-btn", statusId: "form-status" },
        { formId: "b2b-contact-form", btnId: "b2b-submit-btn", statusId: "b2b-form-status" }
    ];

    forms.forEach(({ formId, btnId, statusId }) => {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById(btnId);
            const statusDiv = document.getElementById(statusId);
            const botcheck = form.querySelector('input[name="botcheck"]');

            // Honeypot check
            if (botcheck && botcheck.checked) {
                console.warn("Spam submission blocked by honeypot.");
                return;
            }

            const getMsg = (key, fallback) => {
                if (typeof getTranslationValue === "function" && typeof translations !== "undefined") {
                    return getTranslationValue(translations, key) || fallback;
                }
                return fallback;
            };

            const sendingMsg = getMsg("contact.sending", "Wysyłanie...");
            const successMsg = getMsg("contact.success", "Wiadomość została wysłana! Dziękujemy za kontakt.");
            const errorMsg = getMsg("contact.error", "Wystąpił błąd podczas wysyłania. Napisz bezpośrednio na: biuro@leks.com.pl");

            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : "";
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = sendingMsg;
            }
            if (statusDiv) {
                statusDiv.textContent = "";
                statusDiv.className = "form-status-msg";
                statusDiv.style.color = "var(--color-primary, #003a73)";
            }

            try {
                const formData = new FormData(form);
                const dataObj = {};
                formData.forEach((val, key) => { dataObj[key] = val; });

                let success = false;

                // 1. Spróbuj wysłać przez natywny PHP endpoint na serwerze SEOHOST (api/contact.php)
                try {
                    const phpResponse = await fetch("api/contact.php", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(dataObj)
                    });
                    if (phpResponse.ok) {
                        const phpResult = await phpResponse.json();
                        if (phpResult.success) {
                            success = true;
                        }
                    }
                } catch (phpErr) {
                    console.log("PHP backend endpoint not available, trying cloud fallback...", phpErr);
                }

                // 2. Jeśli PHP backend nie odpowiedział (np. Vercel / serwis statyczny), użyj FormSubmit AJAX endpoint
                if (!success) {
                    const formSubmitUrl = "https://formsubmit.co/ajax/biuro@leks.com.pl";
                    const fsResponse = await fetch(formSubmitUrl, {
                        method: "POST",
                        headers: { 
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            _subject: `[Leks Website] ${dataObj.subject || 'Nowe zapytanie'}`,
                            _template: "table",
                            "Imię i nazwisko": dataObj.name || '',
                            "Adres E-mail": dataObj.email || '',
                            "Firma": dataObj.company || '-',
                            "Telefon": dataObj.phone || '-',
                            "Temat": dataObj.subject || '',
                            "Wiadomość": dataObj.message || '',
                            "Źródło": dataObj.from_name || 'Formularz Leks'
                        })
                    });

                    if (fsResponse.ok) {
                        const fsResult = await fsResponse.json();
                        if (fsResult.success === "true" || fsResult.success === true) {
                            success = true;
                        }
                    }
                }

                if (success) {
                    if (statusDiv) {
                        statusDiv.textContent = successMsg;
                        statusDiv.style.color = "#155724"; // Success Green
                        statusDiv.style.backgroundColor = "#d4edda";
                        statusDiv.style.borderColor = "#c3e6cb";
                        statusDiv.style.padding = "12px 16px";
                        statusDiv.style.borderRadius = "8px";
                    }
                    form.reset();
                    
                    // Push dataLayer event for conversion tracking
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        event: "contact_form_submit",
                        form_id: formId
                    });
                } else {
                    throw new Error("Form submission failed on all endpoints.");
                }
            } catch (err) {
                console.error("Contact form submission error:", err);
                if (statusDiv) {
                    statusDiv.innerHTML = `${errorMsg} <br><a href="mailto:biuro@leks.com.pl" style="color: #721c24; text-decoration: underline; font-weight: bold;">biuro@leks.com.pl</a>`;
                    statusDiv.style.color = "#721c24"; // Error Red
                    statusDiv.style.backgroundColor = "#f8d7da";
                    statusDiv.style.borderColor = "#f5c6cb";
                    statusDiv.style.padding = "12px 16px";
                    statusDiv.style.borderRadius = "8px";
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHtml;
                }
            }
        });
    });
}

