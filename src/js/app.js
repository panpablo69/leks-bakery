/* ==============================================================================
   🏛 Leks Bakery App Script - Premium animations and interactivity with GSAP
   Author: Senior Developer & Architekt AI (15+ years experience)
   ============================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Rejestracja wtyczki ScrollTrigger w GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    initNavigation();
    initHeroAnimations();
    initTimeline();
    initProductFilters();
    initAccordions();
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
        title: "Założenie Firmy",
        desc: "Firma Leks rozpoczęła swoją działalność jako mała piekarnia rodzinna z pasją do tworzenia tradycyjnych chlebów na naturalnym zakwasie w Sulęcinie."
    },
    "1998": {
        title: "Pierwszy Duży Zakład",
        desc: "Otwarcie nowoczesnego, zautomatyzowanego zakładu produkcyjnego w Sulęcinie, co pozwoliło znacznie rozszerzyć asortyment bułek oraz drobnego pieczywa."
    },
    "2005": {
        title: "Nowy Zakład w Gorzowie Wlkp.",
        desc: "Uruchomienie drugiego, dużego zakładu produkcyjnego w Gorzowie Wielkopolskim, skupionego na eksporcie oraz zaopatrywaniu zachodnich województw Polski."
    },
    "2018": {
        title: "Akwizycja & Sieci Handlowe",
        desc: "Nawiązanie kluczowej współpracy z wiodącymi sieciami handlowymi w Europie Środkowej i wdrożenie zaawansowanego systemu chłodniczego do wypieku na miejscu (Bake-off)."
    },
    "2026": {
        title: "Piekarnia Przyszłości Leks 2AB",
        desc: "Pełne wdrożenie zrównoważonej produkcji piekarniczej z zerowym śladem węglowym oraz linii pieczywa zdrowotnego z pradawnej pszenicy 2AB."
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
