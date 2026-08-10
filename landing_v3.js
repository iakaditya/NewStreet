/* ═══════════════════════════════════════════════════════════
   NEW STREET — LANDING PAGE v3 — JavaScript
   Citizens · Government · Progress
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ── City Data ──────────────────────────────────────────────
const CITIES = [
  { city: 'Delhi',       state: 'Delhi' },
  { city: 'Mumbai',      state: 'Maharashtra' },
  { city: 'Vadodara',   state: 'Gujarat' },
  { city: 'Hyderabad',   state: 'Telangana' },
  { city: 'Chennai',     state: 'Tamil Nadu' },
  { city: 'Kolkata',     state: 'West Bengal' },
  { city: 'Pune',        state: 'Maharashtra' },
  { city: 'Ahmedabad',   state: 'Gujarat' },
  { city: 'Jaipur',      state: 'Rajasthan' },
  { city: 'Lucknow',     state: 'Uttar Pradesh' },
  { city: 'Surat',       state: 'Gujarat' },
  { city: 'Chandigarh',  state: 'Punjab' },
  { city: 'Bhopal',      state: 'Madhya Pradesh' },
  { city: 'Kochi',       state: 'Kerala' },
  { city: 'Nagpur',      state: 'Maharashtra' },
  { city: 'Indore',      state: 'Madhya Pradesh' },
  { city: 'Bhubaneswar', state: 'Odisha' },
  { city: 'Patna',       state: 'Bihar' },
  { city: 'Guwahati',    state: 'Assam' },
  { city: 'Visakhapatnam', state: 'Andhra Pradesh' },
];

const CITY_COORDINATES = {
  Delhi: [28.6139, 77.2090], Mumbai: [19.0760, 72.8777], Vadodara: [22.3072, 73.1812],
  Hyderabad: [17.3850, 78.4867], Chennai: [13.0827, 80.2707], Kolkata: [22.5726, 88.3639],
  Pune: [18.5204, 73.8567], Ahmedabad: [23.0225, 72.5714], Jaipur: [26.9124, 75.7873],
  Lucknow: [26.8467, 80.9462], Surat: [21.1702, 72.8311], Chandigarh: [30.7333, 76.7794],
  Bhopal: [23.2599, 77.4126], Kochi: [9.9312, 76.2673], Nagpur: [21.1458, 79.0882],
  Indore: [22.7196, 75.8577], Bhubaneswar: [20.2961, 85.8245], Patna: [25.5941, 85.1376],
  Guwahati: [26.1445, 91.7362], Visakhapatnam: [17.6868, 83.2185]
};

function cityFromCoordinates(latitude, longitude) {
  return Object.entries(CITY_COORDINATES).reduce((nearest, [city, coords]) => {
    const distance = Math.hypot(latitude - coords[0], longitude - coords[1]);
    return distance < nearest.distance ? { city, distance } : nearest;
  }, { city: 'Vadodara', distance: Infinity }).city;
}

// ── State ──────────────────────────────────────────────────
let selectedCity = null;
let selectedState = null;

// ── DOM References ─────────────────────────────────────────
const mainNav         = document.getElementById('mainNav');
const navHamburger    = document.getElementById('navHamburger');
const mobileMenu      = document.getElementById('mobileMenu');
const mmOverlay       = document.getElementById('mmOverlay');
const mmClose         = document.getElementById('mmClose');
const navLocationBtn  = document.getElementById('navLocationBtn');
const navCityLabel    = document.getElementById('navCityLabel');
const mmLocationBtn   = document.getElementById('mmLocationBtn');
const mmCityLabel     = document.getElementById('mmCityLabel');

const locationModal   = document.getElementById('locationModal');
const lmBackdrop      = document.getElementById('lmBackdrop');
const lmClose         = document.getElementById('lmClose');
const lmDetectBtn     = document.getElementById('lmDetectBtn');
const lmSearch        = document.getElementById('lmSearch');
const lmCitiesGrid    = document.getElementById('lmCitiesGrid');

const heroLocationText = document.getElementById('heroLocationText');
const heroCityReady    = document.getElementById('heroCityReady');
const heroDetectBtn    = document.getElementById('heroDetectBtn');
const heroSelectCityBtn= document.getElementById('heroSelectCityBtn');
const heroSection      = document.getElementById('hero');

const chatMessages     = document.getElementById('chatMessages');
const chatInput        = document.getElementById('chatInput');
const chatSendBtn      = document.getElementById('chatSendBtn');

// ══════════════════════════════════════════════════════════
// NAVBAR — scroll behavior
// ══════════════════════════════════════════════════════════
function initNavbar() {
  const handler = () => {
    if (window.scrollY > 20) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handler, { passive: true });
  handler();
}

// ══════════════════════════════════════════════════════════
// MOBILE MENU
// ══════════════════════════════════════════════════════════
function openMobileMenu() {
  mobileMenu.classList.add('is-open');
  mmOverlay.classList.add('is-visible');
  navHamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('is-open');
  mmOverlay.classList.remove('is-visible');
  navHamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initMobileMenu() {
  navHamburger.addEventListener('click', openMobileMenu);
  mmClose.addEventListener('click', closeMobileMenu);
  mmOverlay.addEventListener('click', closeMobileMenu);

  // Close on mobile link click
  document.querySelectorAll('.mm-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Mobile location btn
  if (mmLocationBtn) {
    mmLocationBtn.addEventListener('click', () => {
      closeMobileMenu();
      openLocationModal();
    });
  }
}

// ══════════════════════════════════════════════════════════
// LOCATION MODAL
// ══════════════════════════════════════════════════════════
function openLocationModal() {
  locationModal.classList.add('is-open');
  locationModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => lmSearch && lmSearch.focus(), 200);
}

function closeLocationModal() {
  locationModal.classList.remove('is-open');
  locationModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function applyCity(city, state) {
  selectedCity = city;
  selectedState = state;

  // Update all city labels
  const displayText = state ? `${city}, ${state}` : city;
  const shortText = city;

  if (navCityLabel)    navCityLabel.textContent = shortText;
  if (mmCityLabel)     mmCityLabel.textContent = shortText;

  // Hero prompt update
  if (heroLocationText) {
    heroLocationText.textContent = `You are in ${displayText}`;
  }
  if (heroCityReady) {
    heroCityReady.textContent = `✓ New Street is ready for ${city}`;
  }

  // Mark selected in modal
  document.querySelectorAll('.lm-city-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.city === city);
  });

  // Update nav location btn color
  if (navLocationBtn) {
    navLocationBtn.style.borderColor = 'var(--green)';
    navLocationBtn.style.color = 'var(--green)';
  }

  // Store preference
  try {
    localStorage.setItem('ns_city', city);
    localStorage.setItem('ns_state', state || '');
  } catch (e) { /* ignore */ }

  closeLocationModal();

  // Show toast
  showToast(`Location set to ${displayText}`, 'success');
}

function detectLocation() {
  if (!navigator.geolocation) {
    showToast('Geolocation not supported. Please select manually.', 'info');
    return;
  }

  const btn = lmDetectBtn;
  const orig = btn.innerHTML;
  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Detecting…`;
  btn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const city = cityFromCoordinates(pos.coords.latitude, pos.coords.longitude);
      const details = CITIES.find(item => item.city === city);
      applyCity(city, details?.state || '');
      try {
        localStorage.setItem('ns_live_location', JSON.stringify({
          latitude: pos.coords.latitude, longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy, updatedAt: new Date().toISOString()
        }));
      } catch (_) { /* Storage is optional. */ }
      btn.innerHTML = orig;
      btn.disabled = false;
    },
    (err) => {
      btn.innerHTML = orig;
      btn.disabled = false;
      showToast('Location access denied. Please select your city manually.', 'info');
    },
    { timeout: 8000 }
  );
}

function initLocationModal() {
  // Open triggers
  navLocationBtn.addEventListener('click', openLocationModal);
  if (heroSelectCityBtn) heroSelectCityBtn.addEventListener('click', openLocationModal);

  // Close triggers
  lmClose.addEventListener('click', closeLocationModal);
  lmBackdrop.addEventListener('click', closeLocationModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && locationModal.classList.contains('is-open')) {
      closeLocationModal();
    }
  });

  // Detect btn
  lmDetectBtn.addEventListener('click', detectLocation);
  if (heroDetectBtn) heroDetectBtn.addEventListener('click', detectLocation);

  // City buttons
  document.querySelectorAll('.lm-city-btn').forEach(btn => {
    btn.addEventListener('click', () => applyCity(btn.dataset.city, btn.dataset.state || ''));
  });

  // Search filter
  if (lmSearch) {
    lmSearch.addEventListener('input', () => {
      const query = lmSearch.value.toLowerCase();
      document.querySelectorAll('.lm-city-btn').forEach(btn => {
        const match = btn.dataset.city.toLowerCase().includes(query);
        btn.style.display = match ? '' : 'none';
      });
    });
  }

  // Restore saved city
  try {
    const savedCity  = localStorage.getItem('ns_city');
    const savedState = localStorage.getItem('ns_state');
    if (savedCity) {
      applyCity(savedCity, savedState || '');
    }
  } catch (e) { /* ignore */ }
}

// ══════════════════════════════════════════════════════════
// HERO — Monument parallax / zoom on load
// ══════════════════════════════════════════════════════════
function initHero() {
  // Trigger zoom-out after a frame
  const heroSec = document.querySelector('.hero-section');
  requestAnimationFrame(() => {
    setTimeout(() => {
      if (heroSec) heroSec.classList.add('loaded');
    }, 100);
  });

  // Subtle parallax on scroll
  const wrap = document.getElementById('heroMonumentWrap');
  const img  = document.getElementById('heroMonumentImg');

  if (!wrap || !img) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = heroSec ? heroSec.offsetHeight : 700;
    if (scrollY < heroHeight) {
      const pct = scrollY / heroHeight;
      img.style.transform = `scale(${1.0 + pct * 0.05}) translateY(${scrollY * 0.25}px)`;
    }
  }, { passive: true });
}

// ══════════════════════════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════════════════════════
function initReveal() {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
  } else {
    // Fallback — show all
    document.querySelectorAll('.reveal-up').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }
}

// ══════════════════════════════════════════════════════════
// ACTIVE NAV LINK (based on scroll position)
// ══════════════════════════════════════════════════════════
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(s => observer.observe(s));
}

// ══════════════════════════════════════════════════════════
// AI CHAT SIMULATOR
// ══════════════════════════════════════════════════════════
const chatResponses = [
  {
    keywords: ['pothole', 'road', 'crater', 'hole', 'damaged'],
    response: {
      text: "I can help you report this road issue.",
      classification: {
        category: 'Road Maintenance',
        department: 'Municipal Roads / PWD',
      }
    }
  },
  {
    keywords: ['water', 'pipe', 'leak', 'supply', 'drain', 'sewage'],
    response: {
      text: "Water/sewage issues are managed by the local water authority.",
      classification: {
        category: 'Water & Sewage',
        department: 'Water Board / VMC Water Works',
      }
    }
  },
  {
    keywords: ['garbage', 'waste', 'trash', 'litter', 'rubbish', 'dump'],
    response: {
      text: "Solid waste issues are handled by VMC / Municipal Corporation.",
      classification: {
        category: 'Solid Waste Management',
        department: 'VMC / GHMC / BMC',
      }
    }
  },
  {
    keywords: ['light', 'streetlight', 'dark', 'electricity', 'power', 'outage'],
    response: {
      text: "Streetlight and electricity issues are routed to the electricity board.",
      classification: {
        category: 'Electricity / Street Lighting',
        department: 'MGVCL / MSEDCL / TNEB',
      }
    }
  },
  {
    keywords: ['noise', 'loud', 'sound', 'disturb'],
    response: {
      text: "Noise complaints can be reported to the local municipal authority.",
      classification: {
        category: 'Noise Complaint',
        department: 'Local Municipal Authority',
      }
    }
  },
  {
    keywords: ['track', 'status', 'complaint', 'cmp', '#'],
    response: {
      text: "To track your complaint, please log in to your New Street account. You'll see real-time status updates, officer details, and resolution timeline.",
      plain: true,
    }
  },
  {
    keywords: ['certificate', 'birth', 'death', 'document'],
    response: {
      text: "Birth and death certificates can be applied through New Street. Processing takes 24 hours and you'll receive a digitally signed PDF.",
      plain: true,
    }
  },
];

function getChatResponse(userMsg) {
  const lower = userMsg.toLowerCase();
  for (const item of chatResponses) {
    if (item.keywords.some(k => lower.includes(k))) {
      return item.response;
    }
  }
  return {
    text: `I can help you with civic issues like road conditions, water supply, garbage, electricity, or government services. Could you describe the problem more clearly?`,
    plain: true,
  };
}

function addChatMessage(html, role) {
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${role === 'bot' ? 'bot-bubble' : 'user-bubble'}`;
  bubble.innerHTML = html;
  div.appendChild(bubble);
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function buildBotHtml(response) {
  if (response.plain) {
    return `<p>${response.text}</p>`;
  }
  const cityInfo = selectedCity ? selectedCity : 'Detecting…';
  return `
    <p>${response.text}</p>
    <div class="chat-classification">
      <div class="cc-row"><span class="cc-label">Category:</span><span class="cc-value">${response.classification.category}</span></div>
      <div class="cc-row"><span class="cc-label">Location:</span><span class="cc-value cc-detect">${cityInfo}</span></div>
      <div class="cc-row"><span class="cc-label">Department:</span><span class="cc-value">${response.classification.department}</span></div>
    </div>
    <p>Would you like to submit this grievance?</p>
    <div class="chat-actions">
      <a href="register.html" class="chat-btn-review">Review Complaint</a>
      <a href="register.html" class="chat-btn-submit">Submit</a>
    </div>
  `;
}

function sendChatMessage() {
  const msg = chatInput.value.trim();
  if (!msg) return;

  // Show user message
  addChatMessage(msg, 'user');
  chatInput.value = '';

  // Show typing indicator
  const typingId = 'typing-' + Date.now();
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-msg bot';
  typingDiv.id = typingId;
  typingDiv.innerHTML = `<div class="chat-bubble bot-bubble" style="color:var(--text-tertiary);font-style:italic;">Thinking…</div>`;
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Simulate AI delay
  setTimeout(() => {
    const typingEl = document.getElementById(typingId);
    if (typingEl) typingEl.remove();

    const response = getChatResponse(msg);
    addChatMessage(buildBotHtml(response), 'bot');
  }, 900 + Math.random() * 500);
}

function initChat() {
  if (!chatSendBtn || !chatInput) return;
  chatSendBtn.addEventListener('click', sendChatMessage);
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  });
}

// ══════════════════════════════════════════════════════════
// TOAST NOTIFICATION
// ══════════════════════════════════════════════════════════
function showToast(message, type = 'info') {
  const existing = document.querySelector('.ns-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'ns-toast';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');

  const icons = {
    success: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    info:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
    error:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  };

  const colors = {
    success: 'var(--green)',
    info:    'var(--navy)',
    error:   'var(--danger)',
  };

  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    background: white;
    border: 1px solid #E2E8F0;
    border-left: 3px solid ${colors[type] || colors.info};
    border-radius: 10px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
    font-size: 0.875rem;
    font-weight: 600;
    color: #111827;
    font-family: Inter, sans-serif;
    max-width: 360px;
    width: max-content;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
  `;

  toast.innerHTML = `
    <span style="color:${colors[type] || colors.info};flex-shrink:0;">${icons[type] || icons.info}</span>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ══════════════════════════════════════════════════════════
// MAP CITY DOTS — click to select
// ══════════════════════════════════════════════════════════
function initMapInteraction() {
  document.querySelectorAll('.map-city-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const city = dot.dataset.city;
      if (city) {
        const found = CITIES.find(c => c.city === city);
        applyCity(city, found ? found.state : '');
      }
    });
    dot.style.cursor = 'pointer';
  });

  document.querySelectorAll('.icp-city-item').forEach(item => {
    item.addEventListener('click', () => {
      const city = item.dataset.city;
      if (city) {
        const found = CITIES.find(c => c.city === city);
        applyCity(city, found ? found.state : '');
      }
    });
  });
}

// ══════════════════════════════════════════════════════════
// SMOOTH SCROLL for anchor links
// ══════════════════════════════════════════════════════════
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const offset = 70; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ══════════════════════════════════════════════════════════
// SPINNER KEYFRAME (for detect location btn)
// ══════════════════════════════════════════════════════════
function injectSpinKeyframe() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

// ══════════════════════════════════════════════════════════
// INIT — DOMContentLoaded
// ══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  injectSpinKeyframe();
  initNavbar();
  initMobileMenu();
  initLocationModal();
  initHero();
  initReveal();
  initActiveNav();
  initChat();
  initMapInteraction();
  initSmoothScroll();
});
