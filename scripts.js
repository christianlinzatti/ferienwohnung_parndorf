document.addEventListener('DOMContentLoaded', () => {

    // --- SLIDESHOW LOGIC ---
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        // ... (Deine komplette Slideshow-Logik bleibt hier unverändert)
        const slides = slideshowContainer.querySelectorAll('.slide');
        const btnPrev = slideshowContainer.querySelector('.btn-prev');
        const btnNext = slideshowContainer.querySelector('.btn-next');
        const dotsContainer = slideshowContainer.querySelector('.dots-container');
        const popupContainer = document.querySelector('.popup-container');
        const popupImg = document.querySelector('.popup-img');
        const popupClose = document.querySelector('.popup-close');

        let currentIndex = 0;
        let slideInterval;
        let touchStartX = 0;
        let touchEndX = 0;

        const initSlideshow = () => {
            slides.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.addEventListener('click', () => {
                    showSlide(i);
                    resetInterval();
                });
                dotsContainer.appendChild(dot);
            });

            slides.forEach((slide, index) => {
                slide.addEventListener('click', () => openPopup(index));
            });

            showSlide(currentIndex);
            startInterval();
        };

        const showSlide = (index) => {
            const currentActiveSlide = slideshowContainer.querySelector('.slide.active');
            if (currentActiveSlide) currentActiveSlide.classList.remove('active');
            
            const currentActiveDot = dotsContainer.querySelector('.dot.active');
            if (currentActiveDot) currentActiveDot.classList.remove('active');

            currentIndex = index;
            slides[currentIndex].classList.add('active');
            dotsContainer.children[currentIndex].classList.add('active');
        };

        const nextSlide = () => showSlide((currentIndex + 1) % slides.length);
        const prevSlide = () => showSlide((currentIndex - 1 + slides.length) % slides.length);

        const startInterval = () => slideInterval = setInterval(nextSlide, 5000);
        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        btnNext.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        btnPrev.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        slideshowContainer.addEventListener('touchstart', (e) => touchStartX = e.changedTouches[0].screenX);
        slideshowContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        const handleSwipe = () => {
            if (touchEndX < touchStartX - 50) { // Swipe left
                nextSlide();
                resetInterval();
            }
            if (touchEndX > touchStartX + 50) { // Swipe right
                prevSlide();
                resetInterval();
            }
        };
        
        const openPopup = (index) => {
            popupImg.src = slides[index].querySelector('img').src;
            popupContainer.classList.add('open');
            clearInterval(slideInterval);
        };

        const closePopup = () => {
            popupContainer.classList.remove('open');
            startInterval();
        };

        popupClose.addEventListener('click', closePopup);
        popupContainer.addEventListener('click', (e) => {
            if (e.target === popupContainer) closePopup();
        });

        initSlideshow();
    }

    // --- TRANSLATION LOGIC ---
    const translations = {
        de: {
            document_title: "Ferienwohnung Parndorf - Gemütliches Apartment in Top-Lage",
            meta_description: "Ferienwohnung Parndorf - gemütliches Apartment in Top-Lage. Nur 2 km vom Designer Outlet entfernt. Ideal für Shopping, Erholung am Neusiedler See und Dienstreisen.",
            // ... (alle anderen deutschen Übersetzungen) ...
            country: "Österreich",
            footer_contact_title: "Kontakt",
            // ++ HINZUGEFÜGT ++
            map_consent_text: "Um die Karte anzuzeigen, ist Ihre Zustimmung zum Laden von Inhalten von Google Maps erforderlich. Dabei werden möglicherweise personenbezogene Daten an Google übermittelt.",
            map_consent_button: "Karte laden"
        },
        en: {
            document_title: "Holiday Apartment Parndorf - Cozy Flat in a Prime Location",
            meta_description: "Holiday Apartment Parndorf - cozy flat in a prime location. Only 2 km from the Designer Outlet. Ideal for shopping, relaxing at Lake Neusiedl, and business trips.",
            // ... (alle anderen englischen Übersetzungen) ...
            country: "Austria",
            footer_contact_title: "Contact",
            // ++ HINZUGEFÜGT ++
            map_consent_text: "To display the map, your consent is required to load content from Google Maps. Personal data may be transmitted to Google in the process.",
            map_consent_button: "Load Map"
        }
    };

    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        // ... (Deine komplette Sprachauswahl-Logik bleibt hier unverändert)
        const flags = languageSelector.querySelectorAll('img');

        const setLanguage = (lang) => {
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translations[lang] && translations[lang][key]) {
                    element.innerHTML = translations[lang][key];
                }
            });

            document.querySelectorAll('[data-translate-attr]').forEach(element => {
                const attrs = element.getAttribute('data-translate-attr').split(';');
                attrs.forEach(attrData => {
                    const [attrName, key] = attrData.split(':').map(s => s.trim());
                    if (translations[lang] && translations[lang][key]) {
                        element.setAttribute(attrName, translations[lang][key]);
                    }
                });
            });

            document.documentElement.lang = lang;
            localStorage.setItem('language', lang);

            flags.forEach(flag => {
                flag.classList.toggle('active', flag.dataset.lang === lang);
            });
        };

        flags.forEach(flag => {
            flag.addEventListener('click', (event) => {
                const selectedLang = event.target.getAttribute('data-lang');
                setLanguage(selectedLang);
            });
        });

        const savedLang = localStorage.getItem('language');
        const browserLang = navigator.language.substring(0, 2);
        let initialLang = 'de';
        if (savedLang && translations[savedLang]) {
            initialLang = savedLang;
        } else if (browserLang && translations[browserLang]) {
            initialLang = browserLang;
        }
        setLanguage(initialLang);
    }

    // --- AIRBNB WIDGET LOGIC ---
    (function () {
        function loadScript(src, onload) {
            const s = document.createElement('script');
            s.src = src;
            s.async = true;
            s.onload = onload;
            s.onerror = () => console.error('Could not load script:', src);
            document.head.appendChild(s);
        }

        function initSuperhost() {
            if (window.AirbnbSuperhostWidget) {
                AirbnbSuperhostWidget.create('airbnb-superhost-widget-24131580', '24131580');
            } else {
                setTimeout(initSuperhost, 150);
            }
        }
        
        loadScript('https://airbnb-proxy.elgordoraba.workers.dev/widget.js', initSuperhost);
    })();
    
    document.querySelector('.clickable-div')?.addEventListener('click', () => {
        window.open('https://www.airbnb.at/rooms/24131580', '_blank');
    });

    // --- DSGVO-KONFORME GOOGLE MAPS LOGIK (JETZT AN DER RICHTIGEN STELLE) ---
    const loadMapBtn = document.getElementById('load-map-btn');
    const mapPlaceholder = document.getElementById('map-placeholder');
    const mapContainer = document.getElementById('map');
    let mapInitialized = false;

    const loadGoogleMapsScript = () => {
        if (document.querySelector('script[src*="maps.googleapis.com"]')) {
            return;
        }
        const script = document.createElement('script');
        // ACHTUNG: Es ist unsicher, deinen API-Key direkt im Code zu haben. Besser wäre es, diesen serverseitig zu schützen.
        script.src = `https://maps.googleapis.com/maps/api/js?key=DEIN_API_KEY&callback=initMap&v=beta&libraries=marker`;
        script.async = true;
        document.head.appendChild(script);
    };

    window.initMap = () => {
        const location = { lat: 48.0007115, lng: 16.8640465 };
        const map = new google.maps.Map(mapContainer, {
            zoom: 15,
            center: location,
            disableDefaultUI: true,
            mapId: "1f521e152f97485fa96f0a37"
        });

        const contentString = `
          <div style="max-width:280px; font-family: 'Poppins', sans-serif;">
            <h3 style="margin: 0 0 5px; color: #004d40;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=48.0007115,16.8640465"
                 target="_blank" rel="noopener noreferrer"
                 style="color: #004d40; text-decoration: none;">
                Ferienwohnung Parndorf
              </a>
            </h3>
            <p style="margin: 0 0 10px; font-size: 14px;">Obere Wunkau 38, 7111 Parndorf</p>
            <p style="margin-top:10px; font-size: 14px;">
              <a href="https://www.google.com/maps/dir/?api=1&destination=48.0007115,16.8640465"
                 target="_blank" rel="noopener noreferrer"
                 style="color: #0071c2; text-decoration: none; font-weight: bold;">
                Route planen
              </a>
            </p>
          </div>`;

        const infowindow = new google.maps.InfoWindow({ content: contentString });
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: location,
            map: map,
            title: "Ferienwohnung Parndorf",
        });

        marker.addListener("click", () => infowindow.open(map, marker));
        infowindow.open(map, marker);

        if (mapPlaceholder) mapPlaceholder.style.display = 'none';
        if (mapContainer) mapContainer.style.display = 'block';
    };

    if (loadMapBtn) {
        loadMapBtn.addEventListener('click', () => {
            if (!mapInitialized) {
                mapInitialized = true;
                loadGoogleMapsScript();
            }
        });
    }
    // HIER ENDET der DOMContentLoaded Event-Listener
});
