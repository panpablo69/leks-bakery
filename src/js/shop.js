/* ==============================================================================
   🏛 Leks Bakery Shop Script - B2C E-commerce interactions and animations
   Author: Senior Developer & Architekt AI (15+ years experience)
   ============================================================================== */

// Global Translation State
let currentLang = localStorage.getItem("leks_lang");
if (!currentLang) {
    const userLang = navigator.language || navigator.userLanguage;
    const shortLang = userLang.split('-')[0].toLowerCase();
    currentLang = ["pl", "en", "de", "es"].includes(shortLang) ? shortLang : "pl";
}
let translations = {};

// Products database
const shopProducts = [
    {
        id: "bulki_4",
        price: 9.99,
        weight: "280g (4x70g)",
        image: "img/bulki_2ab_pack4.png"
    },
    {
        id: "bulki_8",
        price: 18.99,
        weight: "560g (8x70g)",
        image: "img/bulki_2ab_pack8.png"
    },
    {
        id: "chleb",
        price: 12.49,
        weight: "400g",
        image: "img/chleb_2ab_sliced.png"
    },
    {
        id: "zestaw",
        price: 21.99,
        weight: "680g",
        image: "img/zestaw_startowy_2ab.png"
    }
];

// Cart State
let cart = JSON.parse(localStorage.getItem("leks_cart")) || [];

// Translations Loader
async function loadInitialTranslations() {
    try {
        const response = await fetch(`lang/${currentLang}.json?v=${new Date().getTime()}`);
        if (response.ok) {
            translations = await response.json();
            applyTranslations();
            updateLanguageSwitcherUI();
            renderShopProducts();
            updateCartUI();
        }
    } catch (error) {
        console.error("Failed to load initial translations:", error);
    }
}

async function loadTranslations(lang) {
    try {
        const response = await fetch(`lang/${lang}.json?v=${new Date().getTime()}`);
        if (!response.ok) throw new Error(`Could not load translations for ${lang}`);
        translations = await response.json();
        currentLang = lang;
        localStorage.setItem("leks_lang", lang);
        
        applyTranslations();
        updateLanguageSwitcherUI();
        renderShopProducts();
        updateCartUI();
        
        if (typeof ScrollTrigger !== 'undefined') {
            setTimeout(() => { ScrollTrigger.refresh(); }, 100);
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

// Render products dynamically
function renderShopProducts() {
    const listContainer = document.getElementById("shop-products-list");
    if (!listContainer) return;

    listContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    shopProducts.forEach(prod => {
        const title = translations.shop && translations.shop.products && translations.shop.products[prod.id]
            ? translations.shop.products[prod.id].name
            : prod.id;
        const desc = translations.shop && translations.shop.products && translations.shop.products[prod.id]
            ? translations.shop.products[prod.id].desc
            : '';
        const addBtnLabel = translations.shop && translations.shop.add_to_cart ? translations.shop.add_to_cart : "Dodaj do koszyka";

        const card = document.createElement("div");
        card.className = "product-card shop-product-card";
        
        const imagePlaceholder = document.createElement("div");
        imagePlaceholder.className = "product-image-placeholder";
        imagePlaceholder.style.backgroundImage = `url('${prod.image}')`;
        imagePlaceholder.style.backgroundSize = "cover";
        imagePlaceholder.style.backgroundPosition = "center";
        imagePlaceholder.style.height = "220px";
        
        const infoDiv = document.createElement("div");
        infoDiv.className = "product-info";
        
        const catSpan = document.createElement("span");
        catSpan.className = "product-category";
        catSpan.textContent = translations.features_2ab && translations.features_2ab.title ? translations.features_2ab.title : "Pieczywo 2AB";
        
        const titleH3 = document.createElement("h3");
        titleH3.className = "product-title";
        titleH3.textContent = title;
        
        const descP = document.createElement("p");
        descP.className = "product-desc";
        descP.textContent = desc;

        const footerDiv = document.createElement("div");
        footerDiv.className = "shop-card-footer";

        const priceSpan = document.createElement("span");
        priceSpan.className = "shop-product-price";
        priceSpan.textContent = `${prod.price.toFixed(2)} PLN`;

        const btn = document.createElement("button");
        btn.className = "btn btn-primary add-to-cart-btn";
        btn.textContent = addBtnLabel;
        btn.addEventListener("click", () => {
            addToCart(prod.id);
        });
        
        footerDiv.appendChild(priceSpan);
        footerDiv.appendChild(btn);

        infoDiv.appendChild(catSpan);
        infoDiv.appendChild(titleH3);
        infoDiv.appendChild(descP);
        infoDiv.appendChild(footerDiv);
        
        card.appendChild(imagePlaceholder);
        card.appendChild(infoDiv);
        
        fragment.appendChild(card);
    });

    listContainer.appendChild(fragment);
    
    if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => { ScrollTrigger.refresh(); }, 50);
    }
}

// Cart Drawer management
function initCartDrawer() {
    const trigger = document.getElementById("cart-trigger");
    const drawer = document.getElementById("cart-drawer");
    const closeBtn = document.getElementById("cart-close-btn");
    
    if (!trigger || !drawer || !closeBtn) return;
    
    trigger.addEventListener("click", () => {
        openCartDrawer();
    });
    
    closeBtn.addEventListener("click", () => {
        closeCartDrawer();
    });
    
    drawer.addEventListener("click", (e) => {
        if (e.target === drawer) {
            closeCartDrawer();
        }
    });
}

function openCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    if (!drawer) return;
    drawer.classList.add("active");
    gsap.fromTo(drawer.querySelector(".cart-drawer-card"), 
        { xPercent: 100 }, 
        { xPercent: 0, duration: 0.4, ease: "power3.out" }
    );
}

function closeCartDrawer() {
    const drawer = document.getElementById("cart-drawer");
    if (!drawer) return;
    gsap.to(drawer.querySelector(".cart-drawer-card"), {
        xPercent: 100,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
            drawer.classList.remove("active");
        }
    });
}

// Add item to cart
function addToCart(productId) {
    const product = shopProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: productId,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    openCartDrawer();
    
    // Animate cart badge feedback
    const badge = document.getElementById("cart-count");
    if (badge) {
        gsap.fromTo(badge, 
            { scale: 0.8 }, 
            { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.out" }
        );
    }
}

// Quantity updates
function updateCartItemCount(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    
    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    
    saveCart();
    updateCartUI();
}

function removeCartItem(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem("leks_cart", JSON.stringify(cart));
}

// Update cart elements in UI
function updateCartUI() {
    const container = document.getElementById("cart-items-container");
    const emptyMsg = document.getElementById("cart-empty-message");
    const totalText = document.getElementById("cart-total-price");
    const badge = document.getElementById("cart-count");
    const checkoutBtn = document.getElementById("checkout-btn");
    
    if (!container || !emptyMsg || !totalText || !badge || !checkoutBtn) return;
    
    // Update badge count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "flex" : "none";
    
    if (cart.length === 0) {
        container.innerHTML = '';
        emptyMsg.style.display = "block";
        totalText.textContent = "0.00 PLN";
        checkoutBtn.disabled = true;
        return;
    }
    
    emptyMsg.style.display = "none";
    checkoutBtn.disabled = false;
    container.innerHTML = '';
    
    const fragment = document.createDocumentFragment();
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const title = translations.shop && translations.shop.products && translations.shop.products[item.id]
            ? translations.shop.products[item.id].name
            : item.id;
            
        const card = document.createElement("div");
        card.className = "cart-item";
        card.style.display = "flex";
        card.style.alignItems = "center";
        card.style.gap = "12px";
        card.style.padding = "12px 0";
        card.style.borderBottom = "1px solid var(--color-border)";
        
        const img = document.createElement("div");
        img.className = "cart-item-img";
        img.style.width = "60px";
        img.style.height = "60px";
        img.style.borderRadius = "var(--radius-sm)";
        img.style.backgroundImage = `url('${item.image}')`;
        img.style.backgroundSize = "cover";
        img.style.backgroundPosition = "center";
        img.style.flexShrink = "0";
        
        const details = document.createElement("div");
        details.className = "cart-item-details";
        details.style.flex = "1";
        
        const titleH4 = document.createElement("h4");
        titleH4.style.fontSize = "0.9rem";
        titleH4.style.fontWeight = "600";
        titleH4.style.color = "var(--color-primary)";
        titleH4.style.marginBottom = "4px";
        titleH4.textContent = title;
        
        const priceP = document.createElement("p");
        priceP.style.fontSize = "0.85rem";
        priceP.style.color = "var(--color-accent)";
        priceP.style.fontWeight = "600";
        priceP.textContent = `${item.price.toFixed(2)} PLN`;
        
        details.appendChild(titleH4);
        details.appendChild(priceP);
        
        const controls = document.createElement("div");
        controls.className = "cart-item-controls";
        controls.style.display = "flex";
        controls.style.alignItems = "center";
        controls.style.gap = "8px";
        
        const decBtn = document.createElement("button");
        decBtn.className = "qty-btn";
        decBtn.textContent = "-";
        decBtn.addEventListener("click", () => updateCartItemCount(item.id, -1));
        
        const qtySpan = document.createElement("span");
        qtySpan.textContent = item.quantity;
        qtySpan.style.fontWeight = "600";
        
        const incBtn = document.createElement("button");
        incBtn.className = "qty-btn";
        incBtn.textContent = "+";
        incBtn.addEventListener("click", () => updateCartItemCount(item.id, 1));
        
        controls.appendChild(decBtn);
        controls.appendChild(qtySpan);
        controls.appendChild(incBtn);
        
        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-item-btn";
        removeBtn.innerHTML = "&times;";
        removeBtn.addEventListener("click", () => removeCartItem(item.id));
        
        card.appendChild(img);
        card.appendChild(details);
        card.appendChild(controls);
        card.appendChild(removeBtn);
        
        fragment.appendChild(card);
    });
    
    container.appendChild(fragment);
    totalText.textContent = `${subtotal.toFixed(2)} PLN`;
    
    // Update checkout summary as well if it's visible
    updateCheckoutSummary();
}

// Checkout integration
function initCheckout() {
    const checkoutBtn = document.getElementById("checkout-btn");
    const checkoutSec = document.getElementById("checkout-section");
    const placeOrderBtn = document.getElementById("place-order-btn");
    const successModal = document.getElementById("success-modal");
    const successClose = document.getElementById("success-close-btn");
    
    if (!checkoutBtn || !checkoutSec || !placeOrderBtn || !successModal || !successClose) return;
    
    checkoutBtn.addEventListener("click", () => {
        closeCartDrawer();
        checkoutSec.style.display = "block";
        updateCheckoutSummary();
        
        gsap.fromTo(checkoutSec, 
            { opacity: 0, y: 30 }, 
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );
        
        // Scroll to checkout section
        setTimeout(() => {
            checkoutSec.scrollIntoView({ behavior: "smooth" });
        }, 100);
    });
    
    // Shipping method change handler
    const shippingRadios = document.querySelectorAll('input[name="shipping-method"]');
    shippingRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            // Manage active styles for cards
            const parentCard = e.target.closest(".radio-card");
            const allCards = document.querySelectorAll('input[name="shipping-method"]').forEach(r => {
                r.closest(".radio-card").classList.remove("active");
            });
            if (parentCard) parentCard.classList.add("active");
            updateCheckoutSummary();
        });
    });

    // Payment method change handler
    const paymentRadios = document.querySelectorAll('input[name="payment-method"]');
    paymentRadios.forEach(radio => {
        radio.addEventListener("change", (e) => {
            const parentCard = e.target.closest(".radio-card");
            const allCards = document.querySelectorAll('input[name="payment-method"]').forEach(r => {
                r.closest(".radio-card").classList.remove("active");
            });
            if (parentCard) parentCard.classList.add("active");
        });
    });
    
    // Order submission simulator
    placeOrderBtn.addEventListener("click", () => {
        const name = document.getElementById("checkout-name");
        const email = document.getElementById("checkout-email");
        const phone = document.getElementById("checkout-phone");
        const address = document.getElementById("checkout-address");
        
        if (!name.value || !email.value || !phone.value || !address.value) {
            alert(currentLang === 'pl' ? "Proszę uzupełnić wszystkie pola formularza dostawy!" : "Please fill in all shipping details!");
            return;
        }
        
        // Show success modal
        successModal.classList.add("active");
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartUI();
    });
    
    successClose.addEventListener("click", () => {
        successModal.classList.remove("active");
        checkoutSec.style.display = "none";
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function updateCheckoutSummary() {
    const container = document.getElementById("checkout-summary-items");
    const subtotalText = document.getElementById("summary-subtotal");
    const shippingText = document.getElementById("summary-shipping");
    const totalText = document.getElementById("summary-total");
    
    if (!container || !subtotalText || !shippingText || !totalText) return;
    
    container.innerHTML = '';
    
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const title = translations.shop && translations.shop.products && translations.shop.products[item.id]
            ? translations.shop.products[item.id].name
            : item.id;
            
        const div = document.createElement("div");
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.fontSize = "0.9rem";
        div.style.marginBottom = "8px";
        div.style.color = "var(--color-primary)";
        div.textContent = `${title} x${item.quantity}`;
        
        const priceSpan = document.createElement("span");
        priceSpan.style.fontWeight = "600";
        priceSpan.textContent = `${(item.price * item.quantity).toFixed(2)} PLN`;
        
        div.appendChild(priceSpan);
        container.appendChild(div);
    });
    
    // Determine shipping price
    const activeShipping = document.querySelector('input[name="shipping-method"]:checked');
    const shippingCost = activeShipping && activeShipping.value === "courier" ? 15.99 : 12.99;
    
    subtotalText.textContent = `${subtotal.toFixed(2)} PLN`;
    shippingText.textContent = `${shippingCost.toFixed(2)} PLN`;
    totalText.textContent = `${(subtotal + shippingCost).toFixed(2)} PLN`;
}

function initParallax() {
    // Elegant kłosy pszenicy parallax logic matching index.html
    const wheats = [
        { id: "#wheat-1", y: -120, rotate: 20 },
        { id: "#wheat-2", y: 100, rotate: -15 }
    ];
    
    wheats.forEach(item => {
        const el = document.querySelector(item.id);
        if (el) {
            gsap.set(el, { y: item.y * -0.3, rotation: item.rotate });
            gsap.to(el, {
                y: item.y,
                rotation: item.rotate * 1.2,
                ease: "none",
                scrollTrigger: {
                    trigger: el.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.6
                }
            });
        }
    });
}

function initShopAnimations() {
    const tl = gsap.timeline();
    
    tl.from("#main-header", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
    
    tl.from(".shop-hero-section .section-subtitle", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.4");
    
    tl.from(".shop-hero-section .section-title", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4");
    
    tl.from(".shop-hero-section .section-lead", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.5");
    
    // Staggered enter animation for products
    gsap.from(".shop-product-card", {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
            trigger: "#shop-products-list",
            start: "top 80%"
        },
        onComplete: function() {
            document.querySelectorAll(".shop-product-card").forEach(card => {
                card.classList.add("animation-done");
            });
        }
    });
}

// Mobile navigation clone matching index.html
function initMobileNavigation() {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("main-nav");
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuToggle.classList.toggle("active");
        
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
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        gsap.registerPlugin(ScrollTrigger);
    } catch(e) { console.error("GSAP register error:", e); }
    
    await loadInitialTranslations();
    
    initLanguageSwitcher();
    initMobileNavigation();
    initCartDrawer();
    initCheckout();
    initParallax();
    initShopAnimations();
    
    window.addEventListener("load", () => {
        setTimeout(() => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 300);
    });
});
