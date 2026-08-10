/* ═════════════════════════════════════════════════════════════════════════
   NEW STREET — INTERACTIVE CLIENT ENGINE (landing.js)
   Smart Location Engine · AI Sandbox · Live Feed · Counters · Polls · GIS
   ═════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initParticles();
  initSmartLocation();
  initAnimatedCounters();
  initWorkflowSimulator();
  initAiChatSandbox();
  initLiveFeedTicker();
  initServicesFilter();
  initCommunityPoll();
  initFaqAccordion();
  initScrollReveal();
  initMapPins();
});

/* ── 1. NAVBAR SCROLL & MOBILE DRAWER ── */
function initNavbar() {
  const nav = document.getElementById('mainNav');
  const ham = document.getElementById('hamburgerBtn');
  const drawer = document.getElementById('mobileDrawer');

  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  if (ham && drawer) {
    ham.addEventListener('click', () => drawer.classList.toggle('open'));
    document.querySelectorAll('.mobile-drawer a').forEach(a => {
      a.addEventListener('click', () => drawer.classList.remove('open'));
    });
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !drawer.contains(e.target)) drawer.classList.remove('open');
    });
  }
}

/* ── 2. PARTICLES GENERATOR ── */
function initParticles() {
  const canvas = document.getElementById('heroParticles');
  if (!canvas) return;

  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * 30}%;
      width: ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
      background: hsl(${210 + Math.random() * 30}, 90%, 75%);
      border-radius: 50%;
      opacity: ${0.2 + Math.random() * 0.7};
      animation: particleUp ${7 + Math.random() * 10}s linear infinite;
      animation-delay: ${Math.random() * 8}s;
    `;
    canvas.appendChild(p);
  }
}

/* ── 3. SMART LOCATION EXPERIENCE & DYNAMIC PERSONALIZATION ── */
const CITY_DATABASE = {
  'Vadodara': {
    state: 'Gujarat',
    corporation: 'VMC (Vadodara Municipal Corporation)',
    activeIssues: 214,
    resolvedToday: 162,
    budget: '₹840 Cr',
    aqi: '42 AQI (Good)',
    projects: 412,
    emergency: '112 / 1800-233-0265',
    topScheme: 'Gruha Jyothi & Namma Clinic'
  },
  'Mumbai': {
    state: 'Maharashtra',
    corporation: 'BMC (Brihanmumbai Municipal Corporation)',
    activeIssues: 480,
    resolvedToday: 395,
    budget: '₹2,100 Cr',
    aqi: '88 AQI (Moderate)',
    projects: 680,
    emergency: '112 / 1916 (BMC Helpline)',
    topScheme: 'Coastal Road Project & Majhi Ladki Bahin'
  },
  'Delhi': {
    state: 'National Capital Territory',
    corporation: 'MCD (Municipal Corporation of Delhi)',
    activeIssues: 540,
    resolvedToday: 410,
    budget: '₹1,850 Cr',
    aqi: '124 AQI (Poor)',
    projects: 590,
    emergency: '112 / 155304',
    topScheme: 'Mohalla Clinics & Zero Power Subsidy'
  },
  'Hyderabad': {
    state: 'Telangana',
    corporation: 'GHMC (Greater Hyderabad Municipal Corporation)',
    activeIssues: 198,
    resolvedToday: 175,
    budget: '₹720 Cr',
    aqi: '55 AQI (Satisfactory)',
    projects: 340,
    emergency: '112 / 040-21111111',
    topScheme: 'SRDP Flyovers & Basthi Dawakhana'
  },
  'Ahmedabad': {
    state: 'Gujarat',
    corporation: 'AMC (Ahmedabad Municipal Corporation)',
    activeIssues: 164,
    resolvedToday: 148,
    budget: '₹680 Cr',
    aqi: '62 AQI (Moderate)',
    projects: 290,
    emergency: '112 / 155303',
    topScheme: 'Sabarmati Riverfront 2.0 & BRTS Smart Card'
  },
  'Pune': {
    state: 'Maharashtra',
    corporation: 'PMC (Pune Municipal Corporation)',
    activeIssues: 182,
    resolvedToday: 154,
    budget: '₹590 Cr',
    aqi: '48 AQI (Good)',
    projects: 260,
    emergency: '112 / 1800-1030-222',
    topScheme: 'Smart River Rejuvenation & Metro Phase 2'
  },
  'Jaipur': {
    state: 'Rajasthan',
    corporation: 'JMC (Jaipur Municipal Corporation Heritage & Greater)',
    activeIssues: 142,
    resolvedToday: 120,
    budget: '₹480 Cr',
    aqi: '78 AQI (Moderate)',
    projects: 210,
    emergency: '112 / 0141-2742900',
    topScheme: 'Chiranjeevi Health & Heritage Restoration'
  },
  'Chennai': {
    state: 'Tamil Nadu',
    corporation: 'GCC (Greater Chennai Corporation)',
    activeIssues: 230,
    resolvedToday: 190,
    budget: '₹790 Cr',
    aqi: '50 AQI (Good)',
    projects: 380,
    emergency: '112 / 1913',
    topScheme: 'Singara Chennai 2.0 & Stormwater Network'
  },
  'Kolkata': {
    state: 'West Bengal',
    corporation: 'KMC (Kolkata Municipal Corporation)',
    activeIssues: 260,
    resolvedToday: 210,
    budget: '₹810 Cr',
    aqi: '82 AQI (Moderate)',
    projects: 350,
    emergency: '112 / 033-2286-1000',
    topScheme: 'KMC Talk to Mayor & Swasthya Sathi'
  },
  'Lucknow': {
    state: 'Uttar Pradesh',
    corporation: 'LMC (Lucknow Municipal Corporation)',
    activeIssues: 175,
    resolvedToday: 140,
    budget: '₹460 Cr',
    aqi: '94 AQI (Moderate)',
    projects: 240,
    emergency: '112 / 1533',
    topScheme: 'Gomti Clean Drive & Smart Solar Streetlights'
  }
};

let currentSelectedCity = 'Vadodara';

function initSmartLocation() {
  const gpsBtn = document.getElementById('btnGpsDetect');
  const cityInput = document.getElementById('citySearchInput');
  const pills = document.querySelectorAll('.city-pill');
  const navLocBtn = document.getElementById('navLocationBtn');

  // Pill Clicks
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      applyCityPersonalization(pill.dataset.city);
    });
  });

  // GPS Click
  if (gpsBtn) {
    gpsBtn.addEventListener('click', () => {
      gpsBtn.innerHTML = `
        <svg class="spin-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        Detecting GPS location...
      `;
      setTimeout(() => {
        applyCityPersonalization('Vadodara');
        gpsBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Location Detected: Vadodara (Ward 6)
        `;
      }, 900);
    });
  }

  if (navLocBtn) {
    navLocBtn.addEventListener('click', () => {
      const loc = prompt('Enter your City or Pincode in India:', currentSelectedCity);
      if (loc && loc.trim()) {
        const found = Object.keys(CITY_DATABASE).find(c => c.toLowerCase() === loc.trim().toLowerCase());
        applyCityPersonalization(found || loc.trim());
      }
    });
  }

  // Search input filter
  if (cityInput) {
    cityInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && cityInput.value.trim()) {
        const query = cityInput.value.trim();
        const matched = Object.keys(CITY_DATABASE).find(c => c.toLowerCase().includes(query.toLowerCase()));
        applyCityPersonalization(matched || query);
      }
    });
  }
}

function applyCityPersonalization(cityName) {
  currentSelectedCity = cityName;
  const data = CITY_DATABASE[cityName] || {
    state: 'India',
    corporation: `${cityName} Municipal Administration`,
    activeIssues: 180,
    resolvedToday: 145,
    budget: '₹550 Cr',
    aqi: '52 AQI (Good)',
    projects: 280,
    emergency: '112 / 1800-CIVIC',
    topScheme: 'Smart City Mission Services'
  };

  // 1. Update City Personalized Banner
  const banner = document.getElementById('cityPersonalizedBanner');
  if (banner) {
    banner.classList.add('active');
    banner.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10B981;"></span>
        <span>Connected to <strong>${cityName}</strong> · ${data.corporation}</span>
      </div>
      <a href="dashboard.html" style="color:var(--royal-blue);text-decoration:none;font-weight:800;">View Ward Details →</a>
    `;
  }

  // 2. Update Nav Location Label
  const navLocLbl = document.getElementById('navLocationText');
  if (navLocLbl) navLocLbl.textContent = `${cityName} · Local`;

  // 3. Update Hero HUD
  const heroHudCity = document.getElementById('heroHudCity');
  if (heroHudCity) heroHudCity.textContent = `${cityName.toUpperCase()} · LIVE TELEMETRY`;

  const heroIssues = document.getElementById('heroHudActive');
  if (heroIssues) heroIssues.textContent = data.activeIssues;

  const heroResolved = document.getElementById('heroHudResolved');
  if (heroResolved) heroResolved.textContent = data.resolvedToday;

  // 4. Update Services Header
  const svcHeader = document.getElementById('servicesDynamicCity');
  if (svcHeader) svcHeader.textContent = `Services available in ${cityName}`;

  // 5. Update Treasury Card City
  const trCity = document.getElementById('treasuryDynamicCity');
  if (trCity) trCity.textContent = `${cityName} Municipal Corporation`;

  // Highlight active pill
  document.querySelectorAll('.city-pill').forEach(pill => {
    pill.classList.toggle('active', pill.dataset.city === cityName);
  });
}

/* ── 4. ANIMATED NATIONAL COUNTERS ── */
function initAnimatedCounters() {
  const counterEls = document.querySelectorAll('[data-counter-target]');
  let hasTriggered = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasTriggered) {
        hasTriggered = true;
        counterEls.forEach(el => animateValue(el));
      }
    });
  }, { threshold: 0.2 });

  const section = document.getElementById('trustMetricsSection');
  if (section) observer.observe(section);
}

function animateValue(el) {
  const target = parseFloat(el.getAttribute('data-counter-target'));
  const suffix = el.getAttribute('data-counter-suffix') || '';
  const isDecimal = target % 1 !== 0;
  const duration = 1800;
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = start + (target - start) * easeProgress;

    el.textContent = isDecimal ? currentVal.toFixed(1) + suffix : Math.floor(currentVal).toLocaleString('en-IN') + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = (isDecimal ? target.toFixed(1) : target.toLocaleString('en-IN')) + suffix;
    }
  }

  requestAnimationFrame(update);
}

/* ── 5. INTERACTIVE WORKFLOW SIMULATOR ── */
function initWorkflowSimulator() {
  const stepCards = document.querySelectorAll('.wf-step-card');
  stepCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      stepCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

/* ── 6. SAHAYAK AI ASSISTANT CHAT SANDBOX ── */
const AI_KNOWLEDGE_BASE = {
  'water': '💧 <strong>VMC Water Works Water Supply Status:</strong> Your ward (Ward 6) has normal Kaveri water pressure (4.2 Bar). Your latest bill is <strong>₹480</strong> due on Aug 18, 2026. <a href="dashboard.html" style="color:#60A5FA;font-weight:700;">Pay Now via UPI →</a>',
  'hospital': '🏥 <strong>Nearest Emergency Healthcare:</strong> <strong>St. John’s Hospital</strong> (1.4 km away) has 14 ICU beds & 24x7 trauma ready. Helpline: <code>080-2206-5000</code>. <a href="dashboard.html" style="color:#60A5FA;font-weight:700;">Open Map Directions →</a>',
  'track': '🔍 <strong>Complaint #CMP-4821 Status:</strong> Pothole on 8th Cross Road. Priority: P1. Assigned to Junior Engineer <strong>R. Anand</strong>. Field truck on site. Estimated fix in 1.5 hours.',
  'scheme': '🎓 <strong>Eligible Government Schemes:</strong> You qualify for <strong>PM Awas Yojana (Urban)</strong> subsidy & <strong>Gruha Jyothi (200 units free power)</strong>. Would you like me to auto-fill the application with your DigiLocker data?',
  'default': '🤖 <strong>Sahayak AI:</strong> I can help you pay utility bills, check scheme subsidies, track ward complaints, or locate 24x7 emergency medical centers. What would you like to do?'
};

function initAiChatSandbox() {
  const msgArea = document.getElementById('chatMsgArea');
  const input = document.getElementById('chatInputField');
  const sendBtn = document.getElementById('chatSendBtn');
  const promptBtns = document.querySelectorAll('.cqp-btn');

  function sendQuery(text) {
    if (!text || !text.trim() || !msgArea) return;

    // Append User Bubble
    const uBubble = document.createElement('div');
    uBubble.className = 'chat-bubble user';
    uBubble.textContent = text;
    msgArea.appendChild(uBubble);
    msgArea.scrollTop = msgArea.scrollHeight;

    // Simulate AI Thinking
    const botBubble = document.createElement('div');
    botBubble.className = 'chat-bubble bot';
    botBubble.innerHTML = `<em>Sahayak AI is querying municipal database...</em>`;
    msgArea.appendChild(botBubble);
    msgArea.scrollTop = msgArea.scrollHeight;

    setTimeout(() => {
      const q = text.toLowerCase();
      let response = AI_KNOWLEDGE_BASE['default'];
      if (q.includes('water') || q.includes('bill')) response = AI_KNOWLEDGE_BASE['water'];
      else if (q.includes('hospital') || q.includes('doctor') || q.includes('icu')) response = AI_KNOWLEDGE_BASE['hospital'];
      else if (q.includes('track') || q.includes('cmp') || q.includes('pothole')) response = AI_KNOWLEDGE_BASE['track'];
      else if (q.includes('scheme') || q.includes('subsidy') || q.includes('yojana') || q.includes('pension')) response = AI_KNOWLEDGE_BASE['scheme'];

      botBubble.innerHTML = response;
      msgArea.scrollTop = msgArea.scrollHeight;
    }, 600);

    if (input) input.value = '';
  }

  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => sendQuery(input.value));
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendQuery(input.value); });
  }

  promptBtns.forEach(btn => {
    btn.addEventListener('click', () => sendQuery(btn.dataset.query));
  });
}

/* ── 7. LIVE FEED AUTO TICKER ── */
const LIVE_FEED_ITEMS = [
  { icon: '🔧', color: 'rgba(37,99,235,0.15)', text: 'Pothole patch completed on 5th Main', city: 'Vadodara · Ward 6', time: 'Just now' },
  { icon: '💧', color: 'rgba(6,182,212,0.15)', text: 'Water pipeline leak repaired near Metro Station', city: 'Mumbai · Ward G/North', time: '2m ago' },
  { icon: '⚡', color: 'rgba(245,158,11,0.15)', text: 'High-voltage transformer upgraded', city: 'Delhi · Karol Bagh', time: '5m ago' },
  { icon: '🌳', color: 'rgba(16,185,129,0.15)', text: 'New Miyawaki urban forest planted (400 saplings)', city: 'Hyderabad · Gachibowli', time: '8m ago' },
  { icon: '🚨', color: 'rgba(239,68,68,0.15)', text: 'Waterlogging cleared near underpass', city: 'Ahmedabad · SG Highway', time: '11m ago' }
];

let feedIdx = 0;
function initLiveFeedTicker() {
  const container = document.getElementById('liveActivityFeedList');
  if (!container) return;

  setInterval(() => {
    feedIdx = (feedIdx + 1) % LIVE_FEED_ITEMS.length;
    const item = LIVE_FEED_ITEMS[feedIdx];
    const el = document.createElement('div');
    el.className = 'lfs-item';
    el.style.animation = 'fadeUp 0.35s ease';
    el.innerHTML = `
      <div style="width:36px;height:36px;border-radius:10px;background:${item.color};display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0;">${item.icon}</div>
      <div style="flex:1;">
        <div style="font-size:0.86rem;font-weight:700;color:var(--text-primary);">${item.text}</div>
        <div style="font-size:0.72rem;color:var(--text-tertiary);">${item.city}</div>
      </div>
      <span style="font-size:0.7rem;color:var(--text-tertiary);font-weight:600;">${item.time}</span>
    `;
    container.insertBefore(el, container.firstChild);
    if (container.children.length > 4) container.removeChild(container.lastChild);
  }, 4000);
}

/* ── 8. SERVICES FILTER TABS ── */
function initServicesFilter() {
  const tabs = document.querySelectorAll('.s-tab-btn');
  const cards = document.querySelectorAll('.svc-catalog-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.category;

      cards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ── 9. COMMUNITY POLL SIMULATION ── */
function initCommunityPoll() {
  const optBtns = document.querySelectorAll('.poll-opt-btn');
  let hasVoted = false;

  optBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (hasVoted) return;
      hasVoted = true;
      btn.classList.add('voted');
      const countEl = btn.querySelector('.poll-vote-count');
      if (countEl) {
        let count = parseInt(countEl.textContent);
        countEl.textContent = `${count + 1} votes (84%)`;
      }
      alert('✓ Thank you for voting! Your voice has been registered in the Ward 6 Democratic Ledger.');
    });
  });
}

/* ── 10. FAQ ACCORDION ── */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });
}

/* ── 11. SCROLL REVEAL OBSERVER ── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08 });

  reveals.forEach(el => obs.observe(el));
}

/* ── 12. MAP PINS INTERACTIVITY ── */
function initMapPins() {
  const pins = document.querySelectorAll('.lmc-pin');
  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      const city = pin.dataset.city;
      if (city) applyCityPersonalization(city);
    });
  });
}
