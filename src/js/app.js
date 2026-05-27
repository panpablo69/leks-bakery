/* ==============================================================================
   🏛 Leks Bakery App Script - Premium animations and interactivity with GSAP
   Author: Senior Developer & Architekt AI (15+ years experience)
   ============================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Rejestracja wtyczki ScrollTrigger w GSAP
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    initNavigation();
    initHeroSlider();       // Inicjalizacja karuzeli slajdów GSAP
    initTimeline();         // Interaktywna oś czasu w O Nas
    initScrollAnimations(); // Animacje ScrollTrigger
    initB2BModal();         // Modal specyfikacji B2B z delegacją zdarzeń
    initCatalogLogic();     // Logika 5 kategorii i dynamicznego katalogu B2B
    initWheatParallax();    // Efekt Parallax dla kłosów pszenicy
    initAccordions();       // Harmonijki rekrutacyjne w sekcji Kariera
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
        if (window.scrollY > 50) {
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
    
    // Obsługa menu mobilnego
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
    
    // Zamknięcie menu po kliknięciu w link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (menuToggle && navMenu) {
                menuToggle.classList.remove("active");
                navMenu.classList.remove("active");
            }
        });
    });
}

/* ==============================================================================
   2. HERO BANNER SLIDER (GSAP SMOOTH FADES & KEN BURNS ZOOM)
   ============================================================================== */
function initHeroSlider() {
    const slider = document.getElementById("hero-slider");
    if (!slider) return;
    
    const slides = slider.querySelectorAll(".hero-slide");
    if (slides.length === 0) return;
    
    let currentIdx = 0;
    const intervalTime = 6000; // 6 sekund na slajd
    
    // Konfiguracja kropek paginacji
    const dotsContainer = document.createElement("div");
    dotsContainer.className = "hero-dots";
    slides.forEach((_, idx) => {
        const dot = document.createElement("button");
        dot.className = `hero-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute("aria-label", `Przejdź do slajdu ${idx + 1}`);
        dot.addEventListener("click", () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });
    slider.appendChild(dotsContainer);
    
    const dots = dotsContainer.querySelectorAll(".hero-dot");
    
    // Strzałki nawigacyjne
    const prevBtn = document.createElement("button");
    prevBtn.className = "hero-arrow hero-arrow-left";
    prevBtn.innerHTML = "&lsaquo;";
    prevBtn.setAttribute("aria-label", "Poprzedni slajd");
    prevBtn.addEventListener("click", prevSlide);
    
    const nextBtn = document.createElement("button");
    nextBtn.className = "hero-arrow hero-arrow-right";
    nextBtn.innerHTML = "&rsaquo;";
    nextBtn.setAttribute("aria-label", "Następny slajd");
    nextBtn.addEventListener("click", nextSlide);
    
    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);
    
    // Funkcja przejścia do konkretnego slajdu
    function goToSlide(index) {
        if (index === currentIdx) return;
        
        const currentSlide = slides[currentIdx];
        const nextSlide = slides[index];
        
        // Zmień kropki
        dots[currentIdx].classList.remove("active");
        dots[index].classList.add("active");
        
        // Animacja chowania bieżącego slajdu
        gsap.to(currentSlide, { opacity: 0, duration: 1, onComplete: () => {
            currentSlide.classList.remove("active");
        }});
        
        // Animacja pokazywania nowego slajdu
        nextSlide.classList.add("active");
        gsap.fromTo(nextSlide, 
            { opacity: 0 }, 
            { opacity: 1, duration: 1 }
        );
        
        // Animacja zawartości nowego slajdu
        gsap.fromTo(nextSlide.querySelector(".hero-slide-content"), 
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
        );
        
        currentIdx = index;
    }
    
    function nextSlide() {
        let next = currentIdx + 1;
        if (next >= slides.length) next = 0;
        goToSlide(next);
    }
    
    function prevSlide() {
        let prev = currentIdx - 1;
        if (prev < 0) prev = slides.length - 1;
        goToSlide(prev);
    }
    
    // Automatyczne przewijanie karuzeli
    let autoSlideInterval = setInterval(nextSlide, intervalTime);
    
    // Zresetuj interwał przy kliknięciu strzałek/kropek
    slider.addEventListener("click", () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, intervalTime);
    });
}

/* ==============================================================================
   3. O NAS (INTERAKTYWNA OŚ CZASU)
   ============================================================================== */
function initTimeline() {
    const yearsNav = document.getElementById("timeline-years");
    const timelineCard = document.getElementById("timeline-card");
    if (!yearsNav || !timelineCard) return;
    
    const yearButtons = yearsNav.querySelectorAll(".timeline-year-btn");
    
    const timelineData = {
        "1989": {
            title: "Założenie Firmy",
            desc: "Firma Leks rozpoczęła swoją działalność jako mała piekarnia rodzinna z pasją do tworzenia tradycyjnych chlebów na naturalnym zakwasie w Sulęcinie."
        },
        "1998": {
            title: "Rozbudowa Zakładu w Sulęcinie",
            desc: "Wzrost zapotrzebowania i wolumenu dostaw wymusił modernizację parku maszynowego i wdrożenie pierwszych zautomatyzowanych linii produkcyjnych."
        },
        "2005": {
            title: "Nowy Zakład w Gorzowie Wlkp.",
            desc: "Otwarcie drugiego, nowoczesnego zakładu piekarniczego specjalizującego się w wypieku bułek śniadaniowych i bagietek na ogromną skalę."
        },
        "2018": {
            title: "Certyfikacja IFS & BRC Grade A",
            desc: "Otrzymanie prestiżowych certyfikacji IFS Food i BRC Global Standard na najwyższym poziomie, co otworzyło firmie drogę do współpracy z międzynarodowymi sieciami handlowymi."
        },
        "2026": {
            title: "Technologiczny Lider",
            desc: "Leks dysponuje trzema fabrykami (Sulęcin, Gorzów, Tarnów Bycki) wypiekającymi ponad 100 000 sztuk pieczywa na dobę w technologii głębokiego mrożenia i Bake-off."
        }
    };
    
    yearButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Zmień aktywny przycisk
            yearButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const year = btn.getAttribute("data-year");
            const data = timelineData[year];
            
            // Animacja zmiany karty w osi czasu
            gsap.to(timelineCard, {
                x: -30,
                opacity: 0,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                    document.getElementById("timeline-title").textContent = data.title;
                    document.getElementById("timeline-desc").textContent = data.desc;
                    
                    gsap.fromTo(timelineCard, 
                        { x: 30, opacity: 0 },
                        { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
                    );
                }
            });
        });
    });
}

/* ==============================================================================
   4. LOGIKA 5 KATEGORII I DYNAMICZNEGO KATALOGU B2B
   ============================================================================== */
function initCatalogLogic() {
    const categoryGrid = document.getElementById("homepage-category-grid");
    const catalogWrapper = document.getElementById("catalog-dynamic-wrapper");
    const container = document.getElementById("products-container");
    const backBtn = document.getElementById("catalog-back-btn");
    
    if (!categoryGrid || !catalogWrapper || !container) return;
    
    // Dane o 5 głównych kategoriach do opisu w katalogu
    const categoryMetadata = {
        "2ab": {
            title: "Pieczywo Leks 2ab",
            desc: "Innowacyjna i lekkostrawna gama pieczywa premium wypiekanego z pradawnej odmiany pszenicy 2AB (prastare ziarno Triticum turgidum). Produkty te charakteryzują się bardzo niskim poziomem glutenu typu A, są bogate w selen i cynk i stanowią idealne rozwiązanie funkcjonalne dla wrażliwego układu pokarmowego. Certyfikowane standardami IFS/BRC."
        },
        "bread_rolls": {
            title: "Pieczywo (Chleby i Bułki)",
            desc: "Sercem naszej piekarni są klasyczne polskie chleby rzemieślnicze produkowane w 100% na naturalnym wielofazowym zakwasie żytnim wyhodowanym w Sulęcinie oraz bogata gama chrupiących bułek śniadaniowych, kajzerek i bagietek. Wszystkie wyroby są idealnie zoptymalizowane pod systemy odroczonego wypieku (Bake-off) w supermarketach."
        },
        "cakes": {
            title: "Cukiernia (Ciasta i Torty)",
            desc: "Wykwintna cukiernia B2B stworzona na potrzeby stoisk cukierniczych oraz sieci handlowych. Oferujemy luksusowe torty śmietankowe i czekoladowe, puszyste serniki rzemieślnicze, ciasta drożdżowe, placki z twarogiem oraz miniptysie. Wygodne rozwiązania mrożone w blachach (Thaw & Serve) gwarantujące zero strat."
        },
        "sweet": {
            title: "Wyroby Półcukiernicze",
            desc: "Kolekcja puszystych słodkich wypieków o wysokiej rotacji i marży. W jej skład wchodzą ręcznie plecione maślane warkocze z lukrem, puszyste pączki premium z nadzieniami wiśniowym, malinowym i pistacjowym oraz tradycyjne drożdżówki z kruszonką. Idealne pod dopiek Bake-off lub w technologii Thaw & Serve."
        },
        "bistro": {
            title: "Kanapki i Słone Przekąski",
            desc: "Kompleksowa strefa Bistro & Food-to-go dedykowana stacjom paliw i supermarketom. Obejmuje świeże kanapki przygotowywane na bazie pieczywa rzemieślniczego własnej produkcji, pakowane w atmosferze ochronnej MAP Flow-pack, a także chrupiące słone przekąski (ślimaki ze szpinakiem, paluchy z serem, przekąski warzywne)."
        }
    };

    let activeCategory = "";
    let activeSubcategory = "all";

    // Obsługa kliknięcia w kafelki kategorii na głównej stronie
    const categoryCards = categoryGrid.querySelectorAll(".category-card");
    categoryCards.forEach(card => {
        card.addEventListener("click", () => {
            const catKey = card.getAttribute("data-category-link");
            showCatalog(catKey);
        });
    });

    // Płynne pokazanie katalogu i render produktów
    function showCatalog(catKey) {
        activeCategory = catKey;
        activeSubcategory = "all";
        
        // Zaktualizuj tytuł i opis kategorii
        const meta = categoryMetadata[catKey];
        document.getElementById("catalog-current-title").textContent = meta.title;
        document.getElementById("catalog-current-desc").textContent = meta.desc;

        // Kontrola podkategorii (Tylko dla Pieczywo 'bread_rolls' - Chleby i Bułki)
        const subFilterContainer = document.getElementById("subcategory-filters-container");
        if (catKey === "bread_rolls") {
            subFilterContainer.style.display = "flex";
            // Ustaw "Wszystko" jako aktywny przycisk podkategorii
            subFilterContainer.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
            subFilterContainer.querySelector('[data-subcategory="all"]').classList.add("active");
        } else {
            subFilterContainer.style.display = "none";
        }

        // Wyrenderuj produkty
        renderProducts(catKey, "all");

        // Animacja GSAP: Ukrycie kafli kategorii, pokazanie katalogu
        gsap.to(categoryGrid, {
            opacity: 0,
            y: -20,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                categoryGrid.style.display = "none";
                
                catalogWrapper.style.display = "block";
                gsap.fromTo(catalogWrapper, 
                    { opacity: 0, y: 30, scale: 0.98 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out", onComplete: () => {
                        ScrollTrigger.refresh();
                    }}
                );
            }
        });
    }

    // Obsługa przycisku powrotu do kategorii
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            gsap.to(catalogWrapper, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    catalogWrapper.style.display = "none";
                    
                    categoryGrid.style.display = "grid";
                    gsap.fromTo(categoryGrid, 
                        { opacity: 0, y: -20 },
                        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", onComplete: () => {
                            ScrollTrigger.refresh();
                        }}
                    );
                }
            });
        });
    }

    // Obsługa filtrów podkategorii wewnątrz kategorii Pieczywo
    const subFilterButtons = document.querySelectorAll(".subcategory-filters .filter-btn");
    subFilterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            subFilterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const sub = btn.getAttribute("data-subcategory");
            activeSubcategory = sub;
            
            // Animacja przełączenia
            const cards = container.querySelectorAll(".product-card");
            gsap.to(cards, {
                scale: 0.9,
                opacity: 0,
                duration: 0.2,
                stagger: 0.03,
                ease: "power2.in",
                onComplete: () => {
                    renderProducts(activeCategory, activeSubcategory);
                    
                    const newCards = container.querySelectorAll(".product-card");
                    gsap.fromTo(newCards,
                        { scale: 0.9, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.35, stagger: 0.04, ease: "power2.out", onComplete: () => {
                            ScrollTrigger.refresh();
                        }}
                    );
                }
            });
        });
    });

    // Funkcja renderująca produkty w katalogu
    function renderProducts(catKey, subcatFilter) {
        container.innerHTML = "";
        
        for (const [id, product] of Object.entries(PRODUCTS_DATA)) {
            // Sprawdzenie głównej kategorii
            if (product.category === catKey) {
                // Sprawdzenie podkategorii (jeśli filtrujemy pieczywo)
                if (subcatFilter !== "all" && product.subcategory !== subcatFilter) {
                    continue;
                }
                
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
                        <button class="btn btn-sm btn-primary open-spec-btn" data-product-id="${id}">Specyfikacja B2B</button>
                    </div>
                `;
                container.appendChild(card);
            }
        }
    }
}

/* ==============================================================================
   5. DELEGACJA MODALA SPECYFIKACJI LOGISTYCZNEJ B2B
   ============================================================================== */
function initB2BModal() {
    const modal = document.getElementById("b2b-modal");
    if (!modal) return;
    
    const modalCard = modal.querySelector(".modal-card");
    const container = document.getElementById("products-container");
    const closeButton = document.getElementById("close-modal");
    
    // Elementy modala
    const modalTitle = document.getElementById("modal-product-title");
    const modalWeight = document.getElementById("modal-weight");
    const modalPackaging = document.getElementById("modal-packaging");
    const modalShelfLife = document.getElementById("modal-shelf-life");
    const modalCert = document.getElementById("modal-cert");
    const modalDescText = document.getElementById("modal-desc-text");
    const modalEan = document.getElementById("modal-ean");
    const modalTemp = document.getElementById("modal-temp");
    const modalBake = document.getElementById("modal-bake");
    
    // 1. Delegacja zdarzeń: Nasłuchujemy kliknięcia przycisku otwierania modala na całym kontenerze siatki!
    container.addEventListener("click", (e) => {
        const btn = e.target.closest(".open-spec-btn");
        if (!btn) return;
        
        const productId = btn.getAttribute("data-product-id");
        const product = PRODUCTS_DATA[productId];
        
        if (!product) return;
        
        // Podmiana zawartości w modalu
        modalTitle.textContent = product.title;
        modalWeight.textContent = product.weight || "-";
        modalPackaging.textContent = product.packaging || "-";
        modalShelfLife.textContent = product.shelfLife || "-";
        modalCert.textContent = product.cert || "-";
        modalDescText.textContent = product.desc || "-";
        modalEan.textContent = product.ean || "-";
        modalTemp.textContent = product.temp || "-";
        modalBake.textContent = product.bake || "-";
        
        // Dynamiczne powiązanie przycisku CTA w modalu
        const modalContactBtn = document.getElementById("modal-contact-btn");
        if (modalContactBtn) {
            modalContactBtn.setAttribute("href", "#contact");
            modalContactBtn.addEventListener("click", () => {
                closeModal();
            });
        }
        
        // Otwieranie Modala z płynną animacją GSAP
        modal.classList.add("active");
        gsap.fromTo(modal, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(modalCard, 
            { y: 60, scale: 0.9, opacity: 0 }, 
            { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.1)" }
        );
    });
    
    // Zamykanie Modala
    function closeModal() {
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
            }
        });
    }
    
    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }
    
    // Zamykanie przez kliknięcie w tło
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

/* ==============================================================================
   6. EFEKT PARALLAX DLA DEKORACYJNYCH KŁOSÓW PSZENICY
   ============================================================================== */
function initWheatParallax() {
    const wheatLeft = document.querySelector(".wheat-left");
    const wheatRight = document.querySelector(".wheat-right");
    
    if (!wheatLeft && !wheatRight) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.scrollY;
        
        // Płynne przesuwanie w pionie (klasa zwalniająca - kłosy przesuwają się o 15% prędkości scrolla)
        if (wheatLeft) {
            wheatLeft.style.transform = `translateY(${scrollY * 0.12}px) rotate(${scrollY * 0.02}deg)`;
        }
        if (wheatRight) {
            wheatRight.style.transform = `translateY(${scrollY * 0.15}px) rotate(-${scrollY * 0.015}deg)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

/* ==============================================================================
   7. ANIMACJE SCROLLTRIGGER (PŁYNNE POJAWIANIE SIĘ ELEMENTÓW)
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
    
    // Animacja kafli 5 kategorii na stronie głównej
    if (document.querySelector(".category-card")) {
        gsap.from(".category-card", {
            opacity: 0,
            y: 45,
            scale: 0.96,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#homepage-category-grid",
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    }
    
    // Animacja liczników KPI przy przewijaniu
    const kpiSection = document.getElementById("kpi-section");
    if (kpiSection) {
        gsap.from(".kpi-card", {
            opacity: 0,
            y: 35,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: kpiSection,
                start: "top 85%",
                onEnter: () => {
                    const kpiNumbers = document.querySelectorAll(".kpi-number");
                    kpiNumbers.forEach(num => {
                        const target = parseInt(num.getAttribute("data-target"), 10);
                        const suffix = num.parentNode.querySelector(".kpi-suffix") ? "" : "";
                        
                        let current = 0;
                        const steps = 60;
                        const stepVal = target / steps;
                        let count = 0;
                        
                        const interval = setInterval(() => {
                            count++;
                            current += stepVal;
                            if (count >= steps) {
                                num.textContent = target;
                                clearInterval(interval);
                            } else {
                                num.textContent = Math.round(current);
                            }
                        }, 16);
                    });
                }
            }
        });
    }
}

/* ==============================================================================
   8. HARMONIJKI REKRUTACYJNE (KARIERA ACCORDIONS)
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
