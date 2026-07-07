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
        const response = await fetch(`lang/${currentLang}.json?v=43`);
        if (response.ok) {
            translations = await response.json();
            applyTranslations();
            updateLanguageSwitcherUI();
        }
    } catch (error) {
        console.error("Failed to load initial translations:", error);
    }
}

async function loadTranslations(lang) {
    try {
        const response = await fetch(`lang/${lang}.json?v=43`);
        if (!response.ok) throw new Error(`Could not load translations for ${lang}`);
        translations = await response.json();
        currentLang = lang;
        localStorage.setItem("leks_lang", lang);
        
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
        renderKategorie();
    } catch(e) { console.error("renderKategorie error:", e); }
    
    try {
        renderCategoryProducts();
    } catch(e) { console.error("renderCategoryProducts error:", e); }
    
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
        initPrivacyModal();
    } catch(e) { console.error("initPrivacyModal error:", e); }
    
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

function positionTimelineElements(button) {
    const card = document.getElementById("timeline-card");
    const mascotSlider = document.getElementById("timeline-mascot-slider");
    const mascotVideo = document.getElementById("timeline-mascot-video");
    
    if (!button || !card) return;
    
    // Oblicz środek przycisku relatywnie do timeline-navigation
    const btnCenter = button.offsetLeft + button.offsetWidth / 2;
    
    // Ustaw dynamicznie współrzędne left
    card.style.left = btnCenter + "px";
    if (mascotSlider) {
        mascotSlider.style.left = btnCenter + "px";
    }
    
    // Aktywuj kartę i zresetuj wideo
    card.classList.add("active");
    if (mascotVideo) {
        mascotVideo.currentTime = 0;
        mascotVideo.play().catch(e => console.log("Video playback prevented:", e));
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
        
        positionTimelineElements(activeBtn);
        
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
    const allCategory = kategorieProduktow.find(k => k.id === "all");
    if (allCategory) {
        const allProducts = [];
        kategorieProduktow.forEach(kat => {
            try {
                if (kat && kat.id !== "all" && Array.isArray(kat.products)) {
                    // Skopiuj produkty z innych kategorii
                    allProducts.push(...kat.products);
                }
            } catch(e) {
                console.error("Error aggregating products for category:", kat, e);
            }
        });
        allCategory.products = allProducts;
    }
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
            if (!kat || !kat.id) return; // Pomija niepoprawne lub puste elementy

            const card = document.createElement("div");
            card.className = "product-card category-card";

            // Kontener zdjęcia z poprawną ścieżką z data.js i bezpiecznym fallbackiem
            const imageContainer = document.createElement("div");
            imageContainer.className = "image-container";
            const imgSrc = kat.image || "img/kat_all.png";
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


function renderCategoryProducts() {
    const container = document.getElementById("category-products-container");
    if (!container || typeof kategorieProduktow === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const catId = params.get('cat');
    
    const category = kategorieProduktow.find(k => k.id === catId);
    
    if (!category) {
        document.getElementById("cat-title").textContent = "Kategoria nie znaleziona";
        return;
    }
    
    const catName = translations.categories && translations.categories[catId] 
        ? translations.categories[catId].name 
        : category.name;
    const catDesc = translations.categories && translations.categories[catId] 
        ? translations.categories[catId].description 
        : category.description;

    document.getElementById("cat-title").textContent = catName;
    document.getElementById("cat-desc").textContent = catDesc;
    
    // Czyszczenie za pomocą usuwania węzłów (bezpieczne przed XSS)
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    if (!category.products || category.products.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.style.gridColumn = "1/-1";
        emptyMsg.style.textAlign = "center";
        emptyMsg.style.color = "var(--color-text-muted)";
        emptyMsg.textContent = "Brak produktów w tej kategorii.";
        container.appendChild(emptyMsg);
        return;
    }
    
    const fragment = document.createDocumentFragment();
    
    category.products.forEach(prod => {
        const card = document.createElement("div");
        card.className = "product-card";
        
        // Zapisywanie danych specyfikacji
        card.setAttribute("data-weight", prod.weight || "Zgodnie ze specyfikacją");
        card.setAttribute("data-packaging", prod.packaging || "Według zamówienia");
        card.setAttribute("data-shelf-life", prod.shelfLife || "Zgodnie ze specyfikacją");
        card.setAttribute("data-cert", prod.cert || "IFS, BRC (Grade A)");
        card.setAttribute("data-desc-full", "Skontaktuj się z naszym działem handlowym w celu uzyskania pełnej specyfikacji technologicznej i logistycznej produktu.");
        
        const imgPlaceholder = document.createElement("div");
        imgPlaceholder.className = "product-image-placeholder";
        imgPlaceholder.style.backgroundImage = `url('${prod.image}')`;
        imgPlaceholder.style.backgroundSize = "cover";
        imgPlaceholder.style.backgroundPosition = "center";
        imgPlaceholder.style.height = "200px";
        
        const infoDiv = document.createElement("div");
        infoDiv.className = "product-info";
        
        const catSpan = document.createElement("span");
        catSpan.className = "product-category";
        catSpan.textContent = catName;
        
        const titleH3 = document.createElement("h3");
        titleH3.className = "product-title";
        titleH3.textContent = prod.name;
        
        const weightLabel = translations.products && translations.products.weight ? translations.products.weight : "Waga:";
        const packagingLabel = translations.products && translations.products.packaging ? translations.products.packaging : "Pakowanie:";
        
        const descP = document.createElement("p");
        descP.className = "product-desc";
        descP.textContent = `${weightLabel} ${prod.weight} | ${packagingLabel} ${prod.packaging}`;
        
        const b2bLabel = translations.products && translations.products.b2b_badge ? translations.products.b2b_badge : "Specyfikacja B2B";
        const btn = document.createElement("button");
        btn.className = "btn btn-sm btn-primary open-spec-btn";
        btn.textContent = b2bLabel;
        
        infoDiv.appendChild(catSpan);
        infoDiv.appendChild(titleH3);
        infoDiv.appendChild(descP);
        infoDiv.appendChild(btn);
        
        card.appendChild(imgPlaceholder);
        card.appendChild(infoDiv);
        
        fragment.appendChild(card);
    });
    
    container.appendChild(fragment);

    // Refresh ScrollTrigger to ensure triggers are recalculating height
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
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
