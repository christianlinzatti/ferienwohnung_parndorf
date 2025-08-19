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
        // META
        document_title: "Ferienwohnung Parndorf - Gemütliches Apartment in Top-Lage",
        meta_description: "Ferienwohnung Parndorf - gemütliches Apartment in Top-Lage. Nur 2 km vom Designer Outlet entfernt. Ideal für Shopping, Erholung am Neusiedler See und Dienstreisen.",

        // HEADER
        title_main: "Ferienwohnung Parndorf",
        subtitle: "Ein Zuhause fernab der Heimat",

        // SLIDESHOW & BILDER
        aria_carousel: "Bilderkarussell der Ferienwohnung",
        alt_living_room: "Ansicht des gemütlichen Wohnzimmers",
        caption_living_room: "Gemütliches Wohnzimmer mit bequemer Couch",
        alt_bedroom: "Ansicht des Schlafzimmers",
        caption_bedroom: "Schlafzimmer",
        alt_bed: "Bequemes Bett",
        alt_kitchen: "Ansicht der voll ausgestatteten Küche",
        caption_kitchen: "Küche",
        alt_bathroom: "Ansicht des modernen Badezimmers",
        caption_bathroom: "Badezimmer",
        alt_enter: "Ansicht des Eingangsbereichs",
        alt_eating: "Ansicht des Essbereichs",
        alt_wc: "Ansicht des separaten WCs",
        alt_terrace: "Ansicht der privaten Terrasse",
        alt_garden: "Ansicht des Gartens",
        aria_prev_slide: "Vorheriges Bild",
        aria_next_slide: "Nächstes Bild",

        // HAUPTINHALT
        apartment_title: "Ihr gemütliches Apartment in Parndorf",
        apartment_p1: "Willkommen in unserer Ferienwohnung, Ihrem idealen Rückzugsort in Parndorf! Unser Apartment bietet Ihnen höchsten Komfort in einer ruhigen Umgebung und ist perfekt für Urlauber, Shopping-Begeisterte und Geschäftsreisende geeignet.",
        highlights_title: "Highlights der Unterkunft",
        highlight_1: "<strong>Top-Lage:</strong> Nur <strong>2 km</strong> zum bekannten Designer Outlet Parndorf.",
        highlight_2: "<strong>Verkehrsgünstig:</strong> Direkte Anbindung an die Autobahnen A4 und A6.",
        highlight_3: "<strong>Natur pur:</strong> Nur <strong>8 km</strong> zum schönen Neusiedler See.",
        highlight_4: "<strong>Einfache Anreise:</strong> <strong>32 km</strong> zum Flughafen Wien (VIE).",
        highlight_5: "<strong>Komfort:</strong> Bäcker in der Nähe, kostenloses WLAN und ein <strong>privater Parkplatz</strong> direkt vor der Haustüre.",
        apartment_p2: "Unser Apartment verfügt über eine voll ausgestattete Küche und ein stilvolles Interieur, das zum Entspannen einlädt.",
        booking_button: "Booking.com",
        airbnb_button: "Airbnb",
        host_title: "Ihre Gastgeberin",
        host_quote: "\"Ich freue mich darauf, Sie persönlich willkommen zu heißen und Ihnen einen unvergesslichen Aufenthalt zu ermöglichen.\"",

        // AUSSTATTUNG
        amenities_title: "Unsere Ausstattung",
        amenity_wifi: "WLAN",
        amenity_bedrooms: "2 Schlafzimmer",
        amenity_smart_tv: "Fernseher",
        amenity_kitchen: "Küche",
        amenity_pets: "Hundefreundlich",
        amenity_garden: "Garten & Terrasse",
        amenity_parking: "Parkplatz",
        amenity_accessible: "Barrierefrei",
        amenity_kids: "Gitterbett & Hochstuhl",
        amenity_quiet: "Ruhige Lage",

        // KARTE
        location_title: "Lage & Umgebung",
        aria_map: "Karte mit dem Standort der Ferienwohnung",
        map_consent_text: "Um die Karte anzuzeigen, ist Ihre Zustimmung zum Laden von Inhalten von Google Maps erforderlich. Dabei werden möglicherweise personenbezogene Daten an Google übermittelt.",
        map_consent_button: "Karte laden",

        // FOOTER
        footer_imprint_title: "Impressum",
        country: "Österreich",
        footer_contact_title: "Kontakt"
    },
    en: {
        // META
        document_title: "Holiday Apartment Parndorf - Cozy Flat in a Prime Location",
        meta_description: "Holiday Apartment Parndorf - cozy flat in a prime location. Only 2 km from the Designer Outlet. Ideal for shopping, relaxing at Lake Neusiedl, and business trips.",

        // HEADER
        title_main: "Holiday Apartment Parndorf",
        subtitle: "A home away from home",

        // SLIDESHOW & IMAGES
        aria_carousel: "Image carousel of the holiday apartment",
        alt_living_room: "View of the cozy living room",
        caption_living_room: "Cozy living room with a comfortable couch",
        alt_bedroom: "View of the bedroom",
        caption_bedroom: "Bedroom",
        alt_bed: "Comfortable bed",
        alt_kitchen: "View of the fully equipped kitchen",
        caption_kitchen: "Kitchen",
        alt_bathroom: "View of the modern bathroom",
        caption_bathroom: "Bathroom",
        alt_enter: "View of the entrance area",
        alt_eating: "View of the dining area",
        alt_wc: "View of the separate WC",
        alt_terrace: "View of the private terrace",
        alt_garden: "View of the garden",
        aria_prev_slide: "Previous slide",
        aria_next_slide: "Next slide",

        // MAIN CONTENT
        apartment_title: "Your Cozy Apartment in Parndorf",
        apartment_p1: "Welcome to our holiday apartment, your ideal retreat in Parndorf! Our apartment offers you the highest comfort in a quiet environment and is perfect for vacationers, shopping enthusiasts, and business travelers.",
        highlights_title: "Accommodation Highlights",
        highlight_1: "<strong>Prime Location:</strong> Only <strong>2 km</strong> to the famous Designer Outlet Parndorf.",
        highlight_2: "<strong>Conveniently Located:</strong> Direct access to the A4 and A6 motorways.",
        highlight_3: "<strong>Pure Nature:</strong> Only <strong>8 km</strong> to the beautiful Lake Neusiedl.",
        highlight_4: "<strong>Easy Arrival:</strong> <strong>32 km</strong> to Vienna International Airport (VIE).",
        highlight_5: "<strong>Comfort:</strong> Bakery nearby, free Wi-Fi, and a <strong>private parking space</strong> right at your doorstep.",
        apartment_p2: "Our apartment features a fully equipped kitchen and a stylish interior that invites you to relax.",
        booking_button: "Booking.com",
        airbnb_button: "Airbnb",
        host_title: "Your Host",
        host_quote: "\"I look forward to welcoming you personally and making your stay an unforgettable one.\"",

        // AMENITIES
        amenities_title: "Our Amenities",
        amenity_wifi: "Wi-Fi",
        amenity_bedrooms: "2 Bedrooms",
        amenity_smart_tv: "Television",
        amenity_kitchen: "Kitchen",
        amenity_pets: "Dog-friendly",
        amenity_garden: "Garden & Terrace",
        amenity_parking: "Parking",
        amenity_accessible: "Accessible",
        amenity_kids: "Crib & High Chair",
        amenity_quiet: "Quiet Location",

        // MAP
        location_title: "Location & Surroundings",
        aria_map: "Map showing the location of the apartment",
        map_consent_text: "To display the map, your consent is required to load content from Google Maps. Personal data may be transmitted to Google in the process.",
        map_consent_button: "Load Map",

        // FOOTER
        footer_imprint_title: "Imprint",
        country: "Austria",
        footer_contact_title: "Contact"
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
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAj3BUffMoTz7XsXEjJvnO-CBQq9oDQ4AA&callback=initMap&v=beta&libraries=marker`;
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
