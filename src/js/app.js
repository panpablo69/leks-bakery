/* ==============================================================================
   🏛 Leks Bakery App Script - Premium animations and interactivity with GSAP
   Author: Senior Developer & Architekt AI (15+ years experience)
   ============================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Rejestracja wtyczki ScrollTrigger w GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    initNavigation();
    initHeroSlider(); // Inicjalizacja karuzeli slajdów GSAP
    initTimeline();
    initProductFilters();
    initAccordions();
    initB2BModal();
    initScrollAnimations();
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
    "2018": {
        title: "Lider Bake-off & 1200+ Punktów",
        desc: "Wdrożenie pionierskich linii technologii wypieku odroczonego i głębokiego mrożenia (Bake-off). Nasza zaawansowana flota logistyczna zapewnia codzienne, punktualne dostawy świeżego ciasta do ponad 1200 supermarketów w Europie."
    },
    "2026": {
        title: "Piekarnia Przyszłości & Linia 2AB",
        desc: "Pełna automatyzacja produkcji z zachowaniem tradycyjnego procesu 24-godzinnej fermentacji. Wdrożenie unikalnej linii pieczywa z pradawnej pszenicy 2AB oraz przejście naszych zakładów na 100% zrównoważoną energię odnawialną."
    }
};

function initTimeline() {
    const yearButtons = document.querySelectorAll(".timeline-year-btn");
    const card = document.getElementById("timeline-card");
    const cardTitle = document.getElementById("timeline-title");
    const cardDesc = document.getElementById("timeline-desc");
    
    yearButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Usunięcie klasy aktywnej z innych przycisków
            yearButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const targetYear = btn.getAttribute("data-year");
            const data = timelineData[targetYear];
            
            // Elegancka animacja GSAP: zniknięcie, zmiana tekstu, pojawienie się
            const timelineTl = gsap.timeline();
            
            timelineTl.to(card, {
                opacity: 0,
                x: -30,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                    cardTitle.textContent = data.title;
                    cardDesc.textContent = data.desc;
                }
            });
            
            timelineTl.to(card, {
                opacity: 1,
                x: 0,
                duration: 0.35,
                ease: "power2.out"
            });
        });
    });
}

/* ==============================================================================
   4. DYNAMICZNE FILTROWANIE OFERTY (GSAP GRID SHUFFLE)
   ============================================================================== */
function initProductFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const productCards = document.querySelectorAll(".product-card");
    
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const filterValue = btn.getAttribute("data-filter");
            
            // Animacja chowania i pokazania kart produktów
            gsap.to(productCards, {
                scale: 0.8,
                opacity: 0,
                duration: 0.2,
                stagger: 0.05,
                ease: "power2.in",
                onComplete: () => {
                    productCards.forEach(card => {
                        const cardCategory = card.getAttribute("data-category");
                        if (filterValue === "all" || cardCategory === filterValue) {
                            card.style.display = "block";
                        } else {
                            card.style.display = "none";
                        }
                    });
                    
                    // Pojawianie się przefiltrowanych kart
                    const visibleCards = Array.from(productCards).filter(c => c.style.display !== "none");
                    gsap.to(visibleCards, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.3,
                        stagger: 0.05,
                        ease: "power2.out"
                    });
                }
            });
        });
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
        scrollTrigger: {
            trigger: ".products-grid",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
    
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
                        gsap.to(num, {
                            innerText: target,
                            duration: 1.8,
                            snap: { innerText: 1 },
                            ease: "power2.out"
                        });
                    });
                }
            }
        });
    }
    
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
    const modalCard = modal.querySelector(".modal-card");
    const openButtons = document.querySelectorAll(".open-spec-btn");
    const closeButton = document.getElementById("close-modal");
    
    // Elementy modala do dynamicznej podmiany treści
    const modalTitle = document.getElementById("modal-product-title");
    const modalWeight = document.getElementById("modal-weight");
    const modalPackaging = document.getElementById("modal-packaging");
    const modalShelfLife = document.getElementById("modal-shelf-life");
    const modalCert = document.getElementById("modal-cert");
    const modalDescText = document.getElementById("modal-desc-text");
    
    // Nowe pola logistyczne B2B
    const modalEan = document.getElementById("modal-ean");
    const modalTemp = document.getElementById("modal-temp");
    const modalBake = document.getElementById("modal-bake");
    
    openButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Znajdź najbliższą kartę produktu i wyciągnij z niej dane B2B
            const card = btn.closest(".product-card");
            const title = card.querySelector(".product-title").textContent;
            const weight = card.getAttribute("data-weight");
            const packaging = card.getAttribute("data-packaging");
            const shelfLife = card.getAttribute("data-shelf-life");
            const cert = card.getAttribute("data-cert");
            const descFull = card.getAttribute("data-desc-full");
            
            // Wyciągnij nowe atrybuty B2B
            const ean = card.getAttribute("data-ean") || "-";
            const temp = card.getAttribute("data-temp") || "-";
            const bake = card.getAttribute("data-bake") || "-";
            
            // Podmiana zawartości modala
            modalTitle.textContent = title;
            modalWeight.textContent = weight;
            modalPackaging.textContent = packaging;
            modalShelfLife.textContent = shelfLife;
            modalCert.textContent = cert;
            modalDescText.textContent = descFull;
            
            // Podmiana nowych pól B2B
            if (modalEan) modalEan.textContent = ean;
            if (modalTemp) modalTemp.textContent = temp;
            if (modalBake) modalBake.textContent = bake;
            
            // Dynamiczne przewijanie przycisku CTA w modalu do kontaktu
            const modalContactBtn = document.getElementById("modal-contact-btn");
            modalContactBtn.setAttribute("href", "#contact");
            modalContactBtn.addEventListener("click", () => {
                closeModal();
            });
            
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
        });
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
    
    closeButton.addEventListener("click", closeModal);
    
    // Zamykanie przy kliknięciu w tło modala
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

/* ==============================================================================
   🎬 ELEGANCKI SLIDER HERO Z EFEKTEM KEN BURNS & ANIMACJĄ GSAP
   ============================================================================== */
function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".slider-pagination .dot");
    const prevBtn = document.querySelector(".prev-arrow");
    const nextBtn = document.querySelector(".next-arrow");
    const header = document.getElementById("main-header");
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 6500); // Automatyczna zmiana co 6.5 sekundy
    
    // Delikatna animacja wejścia nagłówka przy starcie strony
    gsap.from(header, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
    
    // Animacja startowa pierwszego slajdu
    const firstSlide = slides[0];
    const firstContent = firstSlide.querySelector(".hero-slide-content");
    const firstBg = firstSlide.querySelector(".hero-slide-bg");
    
    gsap.fromTo(firstContent.querySelector(".hero-subtitle"), 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: "power2.out" }
    );
    gsap.fromTo(firstContent.querySelector(".hero-title"), 
        { opacity: 0, y: 25 }, 
        { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: "power3.out" }
    );
    gsap.fromTo(firstContent.querySelector(".hero-lead"), 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.6, delay: 0.9, ease: "power2.out" }
    );
    gsap.fromTo(firstContent.querySelectorAll(".hero-actions .btn"), 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, delay: 1.1, ease: "power2.out" }
    );
    
    // Ken Burns dla pierwszego slajdu
    gsap.fromTo(firstBg,
        { scale: 1.05 },
        { scale: 1.15, duration: 6.5, ease: "sine.out" }
    );
    
    function goToSlide(index) {
        if (index === currentSlide) return;
        
        // Resetowanie automatycznego interwału
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 6500);
        
        const activeSlide = slides[currentSlide];
        const nextSlideElem = slides[index];
        
        // 1. Zniknięcie aktywnego slajdu
        gsap.to(activeSlide.querySelector(".hero-slide-content"), {
            opacity: 0,
            y: -25,
            duration: 0.4,
            ease: "power2.in"
        });
        
        gsap.to(activeSlide, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
                activeSlide.classList.remove("active");
            }
        });
        
        // Reset skali tła schodzącego slajdu
        gsap.set(activeSlide.querySelector(".hero-slide-bg"), { scale: 1.05 });
        
        // 2. Pojawienie się nowego slajdu
        nextSlideElem.classList.add("active");
        gsap.fromTo(nextSlideElem, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.7, ease: "power2.inOut" }
        );
        
        // Animacja tła (Ken Burns) dla nowego slajdu
        gsap.fromTo(nextSlideElem.querySelector(".hero-slide-bg"),
            { scale: 1.05 },
            { scale: 1.15, duration: 6.5, ease: "sine.out" }
        );
        
        // Animacja wsuwania tekstów nowego slajdu
        const nextContent = nextSlideElem.querySelector(".hero-slide-content");
        gsap.fromTo(nextContent.querySelector(".hero-subtitle"), 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.5, delay: 0.3, ease: "power2.out" }
        );
        gsap.fromTo(nextContent.querySelector(".hero-title"), 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: "power3.out" }
        );
        gsap.fromTo(nextContent.querySelector(".hero-lead"), 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.5, delay: 0.6, ease: "power2.out" }
        );
        gsap.fromTo(nextContent.querySelectorAll(".hero-actions .btn"), 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, stagger: 0.15, duration: 0.5, delay: 0.7, ease: "power2.out" }
        );
        
        // Aktualizacja kropek paginacji
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
        
        currentSlide = index;
    }
    
    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        goToSlide(next);
    }
    
    function prevSlide() {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }
    
    // Obsługa strzałek nawigacji
    if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
            e.preventDefault();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
            e.preventDefault();
            nextSlide();
        });
    }
    
    // Obsługa klikania kropek (Paginacji)
    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            e.preventDefault();
            const target = parseInt(dot.getAttribute("data-slide"), 10);
            goToSlide(target);
        });
    });
}
