document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect
  const navbar = document.getElementById('mainNav'); // Note: id in HTML is mainNav
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 1b. Mobile Drawer Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (hamburgerBtn && mobileDrawer) {
      hamburgerBtn.addEventListener('click', () => {
          mobileDrawer.classList.toggle('open');
      });
      // Close drawer when clicking a link
      mobileDrawer.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
              mobileDrawer.classList.remove('open');
          });
      });
  }

  // 2. Subtle Hero Parallax & Zoom effect
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
      setTimeout(() => {
          heroSection.classList.add('loaded');
      }, 100);
  }

  const heroMonumentWrap = document.getElementById('heroMonumentWrap');
  if (heroMonumentWrap) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      heroMonumentWrap.style.transform = `scale(${1 + scrollPos * 0.0002}) translateY(${scrollPos * 0.15}px)`;
    });
  }

  // 3. Service Category Chips Toggle
  const serviceChips = document.querySelectorAll('.s-tab-btn');
  const serviceCards = document.querySelectorAll('.svc-catalog-card');
  
  serviceChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      // Remove active from all
      serviceChips.forEach(c => c.classList.remove('active'));
      // Add active to clicked
      e.target.classList.add('active');
      
      const category = e.target.dataset.category;
      
      serviceCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3b. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question-btn');
  faqQuestions.forEach(btn => {
      btn.addEventListener('click', () => {
          const faqItem = btn.parentElement;
          // Toggle current
          faqItem.classList.toggle('open');

          // Optionally close others
          // faqQuestions.forEach(otherBtn => {
          //     if (otherBtn !== btn) {
          //         otherBtn.parentElement.classList.remove('open');
          //     }
          // });
      });
  });

  // 4. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // 5. GPS Location Detection & City Pills
  const btnGpsDetect = document.getElementById('btnGpsDetect');
  const citySearchInput = document.getElementById('citySearchInput');
  const cityPills = document.querySelectorAll('.city-pill');
  const navLocationText = document.getElementById('navLocationText');
  const cityPersonalizedBanner = document.getElementById('cityPersonalizedBanner');
  const servicesDynamicCity = document.getElementById('servicesDynamicCity');
  const treasuryDynamicCity = document.getElementById('treasuryDynamicCity');

  // ── LIVE LOCATION ENGINE ──────────────────────────────────────
  // Persists last known city in sessionStorage so it survives soft-navs
  let _liveWatchId = null;

  /** Update every city-dependent UI element on the landing page */
  function applyLandingCity(city, { lat, lng, accuracy } = {}) {
    if (!city) return;
    // Nav label
    if (navLocationText) navLocationText.textContent = city;
    // City search input in the modal
    if (citySearchInput) citySearchInput.value = city;
    // Activate matching city pill (if it exists) — or clear all
    cityPills.forEach(pill => {
      pill.classList.toggle(
        'active',
        pill.dataset.city && pill.dataset.city.toLowerCase() === city.toLowerCase()
      );
    });
    // Personalised banner
    if (cityPersonalizedBanner) {
      cityPersonalizedBanner.innerHTML = `<span>Switched to ${city} Database</span> <span>✓ Active</span>`;
      cityPersonalizedBanner.classList.add('active');
    }
    if (servicesDynamicCity) servicesDynamicCity.textContent = `Services available in ${city}`;
    if (treasuryDynamicCity) treasuryDynamicCity.textContent = `${city.toUpperCase()} · LIVE TREASURY`;
    // Persist for this session
    try { sessionStorage.setItem('ns_last_city', city); } catch (_) {}
    // Persist coords for dashboard
    if (lat != null && lng != null) {
      try {
        localStorage.setItem('ns_live_location', JSON.stringify({
          latitude: lat, longitude: lng,
          accuracy: accuracy || null,
          updatedAt: new Date().toISOString()
        }));
      } catch (_) {}
    }
  }

  /** Reverse-geocode coords → city name via Nominatim (free, no key needed) */
  async function reverseGeocode(lat, lng) {
    try {
      const res  = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data = await res.json();
      return (
        data.address?.city   ||
        data.address?.town   ||
        data.address?.village ||
        data.address?.county ||
        data.address?.state_district ||
        data.address?.state  ||
        null
      );
    } catch (_) {
      return null;
    }
  }

  /** Start watching position — updates city on every GPS fix */
  function startLiveCityTracking() {
    if (!navigator.geolocation) {
      if (btnGpsDetect) btnGpsDetect.innerHTML = '<span style="opacity:0.6">GPS not supported</span>';
      return;
    }
    if (_liveWatchId !== null) return; // already running

    // Show last known city instantly while we wait for fresh GPS
    const saved = sessionStorage.getItem('ns_last_city');
    if (saved && navLocationText) navLocationText.textContent = saved;

    _liveWatchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng, accuracy } = pos.coords;

        // Update GPS button while resolving city name
        if (btnGpsDetect) {
          btnGpsDetect.innerHTML =
            `<span style="color:var(--emerald)">📍 ${lat.toFixed(4)}, ${lng.toFixed(4)} · Resolving…</span>`;
        }

        const city = await reverseGeocode(lat, lng);
        if (city) {
          applyLandingCity(city, { lat, lng, accuracy });
          if (btnGpsDetect) {
            btnGpsDetect.innerHTML =
              `<span style="color:var(--emerald)">📍 ${city} · ±${Math.round(accuracy)}m</span>`;
          }
        } else {
          // Fallback: show raw coordinates if city name not resolved
          if (navLocationText)
            navLocationText.textContent = `${lat.toFixed(3)}, ${lng.toFixed(3)}`;
          if (btnGpsDetect) {
            btnGpsDetect.innerHTML =
              `<span style="color:var(--emerald)">📍 ${lat.toFixed(4)}, ${lng.toFixed(4)}</span>`;
          }
        }
      },
      (err) => {
        // Permission denied or error
        const msgs = {
          1: 'Location permission denied',
          2: 'Position unavailable',
          3: 'Location request timed out'
        };
        if (btnGpsDetect)
          btnGpsDetect.innerHTML = `<span style="opacity:0.6">⚠ ${msgs[err.code] || 'Location error'}</span>`;
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 }
    );
  }

  // ── DETECT BUTTON: triggers permission prompt + starts tracking ─
  if (btnGpsDetect) {
    btnGpsDetect.addEventListener('click', () => {
      btnGpsDetect.innerHTML = '<span style="opacity:0.7">Requesting GPS…</span>';
      // Calling navigator.geolocation.getCurrentPosition first forces the
      // browser permission prompt immediately, then watchPosition takes over.
      if (!navigator.geolocation) {
        btnGpsDetect.innerHTML = '<span style="opacity:0.6">GPS not supported</span>';
        return;
      }
      navigator.geolocation.getCurrentPosition(
        () => { /* watchPosition will handle the update */ },
        () => { /* watchPosition error handler will fire too */ },
        { enableHighAccuracy: true, timeout: 10000 }
      );
      startLiveCityTracking();
    });
  }

  // Auto-start tracking silently on page load (no prompt until user clicks)
  // If they already granted permission in a prior visit, this will work right away.
  startLiveCityTracking();

  if (cityPills) {
      cityPills.forEach(pill => {
          pill.addEventListener('click', (e) => {
              cityPills.forEach(p => p.classList.remove('active'));
              e.target.classList.add('active');
              const city = e.target.dataset.city;
              if (citySearchInput) citySearchInput.value = city;
              if (navLocationText) navLocationText.textContent = city;
              if (cityPersonalizedBanner) {
                  cityPersonalizedBanner.innerHTML = `<span>Switched to ${city} Database</span> <span>✓ Active</span>`;
                  cityPersonalizedBanner.classList.add('active');
              }
              if (servicesDynamicCity) servicesDynamicCity.textContent = `Services available in ${city}`;
              if (treasuryDynamicCity) treasuryDynamicCity.textContent = `${city.toUpperCase()} · LIVE TREASURY`;
          });
      });
  }

  // 6. AI Chat Sandbox
  const chatInputField = document.getElementById('chatInputField');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const chatMsgArea = document.getElementById('chatMsgArea');
  const quickPrompts = document.querySelectorAll('.cqp-btn');

  if (chatInputField && chatSendBtn && chatMsgArea) {
    const sendMessage = () => {
      const msg = chatInputField.value.trim();
      if (!msg) return;

      // Add user message
      const userBubble = document.createElement('div');
      userBubble.className = 'chat-bubble user';
      userBubble.textContent = msg;
      chatMsgArea.appendChild(userBubble);

      chatInputField.value = '';
      chatMsgArea.scrollTop = chatMsgArea.scrollHeight;

      // Simulate typing...
      const typingBubble = document.createElement('div');
      typingBubble.className = 'chat-bubble bot';
      typingBubble.innerHTML = '<span style="opacity:0.6">Typing...</span>';
      chatMsgArea.appendChild(typingBubble);
      chatMsgArea.scrollTop = chatMsgArea.scrollHeight;

      setTimeout(() => {
        chatMsgArea.removeChild(typingBubble);
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-bubble bot';
        
        // Simple mock responses
        if (msg.toLowerCase().includes('water')) {
          botBubble.innerHTML = 'Water supply is scheduled between 6:00 AM - 8:00 AM for your zone.';
        } else if (msg.toLowerCase().includes('hospital')) {
          botBubble.innerHTML = 'The nearest trauma hospital is SSG Hospital, about 2.4km away.';
        } else if (msg.toLowerCase().includes('track') || msg.toLowerCase().includes('cmp')) {
          botBubble.innerHTML = 'Complaint #CMP-4821 is currently marked as <strong>In Progress</strong>. Expected resolution by tomorrow 5 PM.';
        } else if (msg.toLowerCase().includes('scheme') || msg.toLowerCase().includes('awas')) {
          botBubble.innerHTML = 'Yes, based on the standard income criteria, you may be eligible for PM Awas Yojana. <a href="#" style="color:var(--primary)">Click here to check full eligibility.</a>';
        } else {
          botBubble.innerHTML = 'I am your Sahayak AI. I can assist you with tracking complaints, utility bills, and finding nearby services. Could you please specify your ward or location?';
        }

        chatMsgArea.appendChild(botBubble);
        chatMsgArea.scrollTop = chatMsgArea.scrollHeight;
      }, 1200);
    };

    chatSendBtn.addEventListener('click', sendMessage);

    chatInputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    quickPrompts.forEach(btn => {
      btn.addEventListener('click', () => {
        chatInputField.value = btn.getAttribute('data-query');
        sendMessage();
      });
    });
  }
});
