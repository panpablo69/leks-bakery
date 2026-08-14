/* ==============================================================================
   🍪 Leks Bakery - Cookie Consent Banner (Google Consent Mode v2 & GDPR)
   ============================================================================== */

(function () {
    // 1. Initialize Google Consent Mode v2 defaults
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }

    const savedConsent = localStorage.getItem("leks_cookie_consent");

    if (savedConsent === "granted") {
        gtag("consent", "default", {
            "ad_storage": "granted",
            "analytics_storage": "granted",
            "ad_user_data": "granted",
            "ad_personalization": "granted"
        });
    } else {
        gtag("consent", "default", {
            "ad_storage": "denied",
            "analytics_storage": "denied",
            "ad_user_data": "denied",
            "ad_personalization": "denied",
            "wait_for_update": 500
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        if (savedConsent) return; // Banner already handled

        // Build Cookie Banner DOM element
        const banner = document.createElement("div");
        banner.id = "leks-cookie-banner";
        banner.className = "cookie-banner-glass";
        banner.setAttribute("role", "dialog");
        banner.setAttribute("aria-label", "Zgoda na pliki cookie");

        banner.innerHTML = `
            <div class="cookie-banner-container">
                <div class="cookie-banner-text">
                    <p><strong>dbamy o Twoją prywatność 🍪</strong></p>
                    <p>Używamy plików cookie oraz podobnych technologii, aby zapewnić prawidłowe działanie serwisu, analizować ruch oraz dostosowywać treści. Więcej informacji znajdziesz w naszej <a href="#" id="cookie-policy-link">Polityce Prywatności</a>.</p>
                </div>
                <div class="cookie-banner-actions">
                    <button id="cookie-accept-necessary" class="btn btn-outline btn-sm">Tylko niezbędne</button>
                    <button id="cookie-accept-all" class="btn btn-primary btn-sm">Akceptuję wszystkie</button>
                </div>
            </div>
        `;

        // Inject Banner Styles if not already present
        const style = document.createElement("style");
        style.textContent = `
            .cookie-banner-glass {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                width: calc(100% - 40px);
                max-width: 960px;
                background: rgba(255, 255, 255, 0.92);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(220, 224, 230, 0.8);
                box-shadow: 0 12px 32px rgba(0, 58, 115, 0.15);
                border-radius: 16px;
                padding: 18px 24px;
                z-index: 99999;
                font-family: 'Montserrat', sans-serif;
                font-size: 0.88rem;
                color: #2b2b2b;
                transition: all 0.3s ease;
            }
            .cookie-banner-container {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
                flex-wrap: wrap;
            }
            .cookie-banner-text p {
                margin: 0 0 4px 0;
                line-height: 1.4;
            }
            .cookie-banner-text a {
                color: #003a73;
                text-decoration: underline;
                font-weight: 600;
            }
            .cookie-banner-actions {
                display: flex;
                gap: 10px;
                align-items: center;
                flex-shrink: 0;
            }
            @media (max-width: 768px) {
                .cookie-banner-glass {
                    bottom: 12px;
                    width: calc(100% - 24px);
                    padding: 16px;
                    border-radius: 12px;
                }
                .cookie-banner-container {
                    flex-direction: column;
                    align-items: stretch;
                }
                .cookie-banner-actions {
                    justify-content: flex-end;
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(banner);

        // Add event listeners
        document.getElementById("cookie-accept-all").addEventListener("click", function () {
            localStorage.setItem("leks_cookie_consent", "granted");
            gtag("consent", "update", {
                "ad_storage": "granted",
                "analytics_storage": "granted",
                "ad_user_data": "granted",
                "ad_personalization": "granted"
            });
            banner.style.opacity = "0";
            banner.style.transform = "translate(-50%, 20px)";
            setTimeout(() => banner.remove(), 300);
        });

        document.getElementById("cookie-accept-necessary").addEventListener("click", function () {
            localStorage.setItem("leks_cookie_consent", "denied");
            banner.style.opacity = "0";
            banner.style.transform = "translate(-50%, 20px)";
            setTimeout(() => banner.remove(), 300);
        });

        document.getElementById("cookie-policy-link").addEventListener("click", function (e) {
            e.preventDefault();
            const privacyBtn = document.getElementById("nav-privacy") || document.getElementById("footer-privacy-link");
            if (privacyBtn) {
                privacyBtn.click();
            } else {
                alert("Polityka prywatności Leks Sp. z o.o.: dbamy o pełne bezpieczeństwo Twoich danych osobowych zgodnie z RODO.");
            }
        });
    });
})();
