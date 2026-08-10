/* ============================================================
   CIVICONE — MODERN PREMIUM CIVIC OPERATING SYSTEM LOGIC (REAL-TIME)
   ============================================================ */

'use strict';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

document.addEventListener('DOMContentLoaded', () => {

  // ── MOCK DATA STORAGE (Local state for real-time actions) ──
  const state = {
    userXP: 420,
    servicesUsed: 4,
    activeComplaints: [
      {
        id: 'CVC-2026-11849',
        title: 'Open Manhole on Busy Sidewalk',
        category: 'safety',
        details: 'Deep open manhole right in the middle of the pedestrian pathway. High risk of someone falling in, especially at night.',
        address: '2nd Cross, Alkapuri',
        status: 'Critical',
        date: 'Aug 9, 2026',
        officer: 'Emergency Response Unit',
        eta: 'Immediate',
        lat: 50, lng: 60,
        geoLat: 22.3085,
        geoLng: 73.1789,
        severity: 'high',
        ward: 'Ward 6',
        image: '/Users/iakadityaraj/.gemini/antigravity/brain/76b01535-1e4e-4f0c-9b52-6b40e1f16062/safety_hazard_1786262361716.jpg',
        timeline: [
          { title: 'Submitted', desc: 'Aug 9, 08:00 AM · Reported by Rahul Sharma', completed: true },
          { title: 'Emergency Dispatch', desc: 'Aug 9, 08:05 AM · ERU Dispatched', completed: true, active: true },
          { title: 'Barricading', desc: 'Pending secure fencing.', completed: false }
        ],
        chatHistory: []
      },
      {
        id: 'CVC-2026-33921',
        title: 'Broken Traffic Signal Causing Chaos',
        category: 'traffic',
        details: 'All lights at the 4-way intersection are out. Complete gridlock and dangerous near-misses happening continuously.',
        address: 'Alkapuri Main Intersection',
        status: 'In Progress',
        date: 'Aug 9, 2026',
        officer: 'Traffic Police Dept',
        eta: 'Aug 9, 2026',
        lat: 45, lng: 55,
        geoLat: 22.3095,
        geoLng: 73.1794,
        severity: 'high',
        ward: 'Ward 6',
        image: '/Users/iakadityaraj/.gemini/antigravity/brain/76b01535-1e4e-4f0c-9b52-6b40e1f16062/traffic_signal_broken_1786262346616.jpg',
        timeline: [
          { title: 'Submitted', desc: 'Aug 9, 07:45 AM · Reported by Rahul Sharma', completed: true },
          { title: 'Police Deployed', desc: 'Aug 9, 08:15 AM · Manual traffic regulation active.', completed: true, active: true },
          { title: 'Signal Repair', desc: 'Technician dispatched for electrical repair.', completed: false }
        ],
        chatHistory: []
      },
      {
        id: 'CVC-2026-88402',
        title: 'Dangerous Sparking Wires',
        category: 'electricity',
        details: 'Low hanging live wires from street pole short-circuiting and sparking on the road. High electrocution risk.',
        address: '3rd Main Rd, Alkapuri',
        status: 'Critical',
        date: 'Aug 9, 2026',
        officer: 'MGVCL Emergency Team',
        eta: 'Immediate',
        lat: 40, lng: 30,
        geoLat: 22.3100,
        geoLng: 73.1774,
        severity: 'high',
        ward: 'Ward 6',
        image: '/Users/iakadityaraj/.gemini/antigravity/brain/76b01535-1e4e-4f0c-9b52-6b40e1f16062/electricity_hazard_1786262332779.jpg',
        timeline: [
          { title: 'Submitted', desc: 'Aug 9, 06:30 AM · Reported by Rahul Sharma', completed: true },
          { title: 'Power Cut', desc: 'Aug 9, 06:45 AM · Sector power isolated.', completed: true },
          { title: 'Line Repair', desc: 'Aug 9, 07:15 AM · Crew on-site fixing lines.', completed: true, active: true }
        ],
        chatHistory: []
      },
      {
        id: 'CVC-2026-64902',
        title: 'Massive Garbage Pile on Street Corner',
        category: 'garbage',
        details: 'A huge pile of uncollected garbage has accumulated at the corner of 1st Main Road. The smell is terrible and it is attracting stray animals.',
        address: 'Corner of 1st Main Road, Alkapuri',
        status: 'Pending',
        date: 'Aug 8, 2026',
        officer: 'Sanjay Kumar (Sanitation Dept)',
        eta: 'Aug 10, 2026',
        lat: 60, lng: 70,
        geoLat: 22.3080,
        geoLng: 73.1824,
        severity: 'high',
        ward: 'Ward 6',
        image: '/Users/iakadityaraj/.gemini/antigravity/brain/76b01535-1e4e-4f0c-9b52-6b40e1f16062/garbage_pile_complaint_1786261725860.jpg',
        timeline: [
          { title: 'Submitted', desc: 'Aug 8, 09:12 AM · Reported by Rahul Sharma', completed: true },
          { title: 'Assigned', desc: 'Aug 8, 10:05 AM · Assigned to Sanitation Dept', completed: true, active: true },
          { title: 'Work In Progress', desc: 'Pending pickup schedule.', completed: false },
          { title: 'Resolved', desc: 'Pending cleanup verification.', completed: false }
        ],
        chatHistory: [
          { sender: 'ai', text: 'Hello Rahul, the sanitation department has been notified. We will update you once a pickup truck is dispatched.' }
        ]
      },
      {
        id: 'CVC-2026-98124',
        title: 'Pothole Hazard & Road Damage',
        category: 'roads',
        details: 'Deep dangerous crater forming near the main entrance street of Ward 6.',
        address: '8th Cross Main Road, Alkapuri',
        status: 'In Progress',
        date: 'Aug 4, 2026',
        officer: 'Anil Sharma (PWD Division Engineer)',
        eta: 'Aug 8, 2026',
        lat: 30, lng: 45,
        geoLat: 22.3092,
        geoLng: 73.1809,
        severity: 'medium',
        ward: 'Ward 6',
        timeline: [
          { title: 'Submitted', desc: 'Aug 4, 10:15 AM · Reported by Rahul Sharma', completed: true },
          { title: 'Assigned & Scheduled', desc: 'Aug 4, 2:30 PM · Assigned to Engineer Anil Sharma (PWD)', completed: true },
          { title: 'Work In Progress', desc: 'Aug 5, 9:00 AM · Road excavation and asphalt loading started.', completed: true, active: true },
          { title: 'Resolution Proof & Verification', desc: 'Pending completion. Citizen verification required.', completed: false }
        ],
        chatHistory: [
          { sender: 'ai', text: 'Hello Rahul, the asphalt mixture loading is scheduled for tonight. Repair should conclude by tomorrow afternoon.' }
        ]
      },
      {
        id: 'CVC-2026-77341',
        title: 'Broken Water Pipe Spill',
        category: 'water',
        details: 'Water spilling continuously from municipal pipeline opposite Community Park.',
        address: 'Opposite Community Park, Ward 6',
        status: 'Resolved',
        date: 'Aug 3, 2026',
        officer: 'Sunil Gowda (Water Inspector)',
        eta: 'Completed',
        lat: 55, lng: 25,
        geoLat: 22.3064,
        geoLng: 73.1766,
        severity: 'low',
        ward: 'Ward 6',
        timeline: [
          { title: 'Submitted', desc: 'Aug 3, 08:30 AM · Reported by Rahul Sharma', completed: true },
          { title: 'Assigned', desc: 'Aug 3, 11:00 AM · Assigned to Sunil Gowda', completed: true },
          { title: 'Work In Progress', desc: 'Aug 3, 1:15 PM · Leakage sealed and welded.', completed: true },
          { title: 'Resolved', desc: 'Aug 3, 5:00 PM · Verified by Inspector. Citizen rated 5 stars.', completed: true, active: true }
        ],
        chatHistory: [
          { sender: 'ai', text: 'Rahul, repair squad has successfully welded the pipeline leak. Please let me know if it is fine.' },
          { sender: 'user', text: 'Checked, looks completely dry now. Thank you!' }
        ]
      }
    ],
    pollVotes: {
      1: 42,
      2: 78,
      3: 16
    },
    pollVoted: false,
    documents: [
      { name: 'Aadhaar Card', provider: 'UIDAI', idNum: 'XXXX-XXXX-8429', icon: '🪪' },
      { name: 'Driving License', provider: 'MORTH', idNum: 'GJ-06-2015-XXXX', icon: '🚗' }
    ]
  };

  const WARD_CENTER = { geoLat: 22.3072, geoLng: 73.1812 };
  const MAP_BOUNDS = {
    north: 22.3154,
    south: 22.2985,
    west: 73.1722,
    east: 73.1928
  };
  const KNOWN_LOCATIONS = [
    { terms: ['rc dutt', 'r. c. dutt', 'alkapuri', 'main road'], label: 'R. C. Dutt Road, Alkapuri', mapTop: 30, mapLeft: 45, geoLat: 22.3092, geoLng: 73.1809, zone: 'Alkapuri central grid' },
    { terms: ['mg road', 'mahatma gandhi'], label: 'MG Road Junction, Ward 6', mapTop: 48, mapLeft: 58, geoLat: 22.2979, geoLng: 73.1901, zone: 'MG Road transit corridor' },
    { terms: ['kamati baug', 'sayaji baug', 'park'], label: 'Kamati Baug, Ward 6', mapTop: 55, mapLeft: 25, geoLat: 22.3064, geoLng: 73.1766, zone: 'Kamati Baug block' },
    { terms: ['5th cross', 'fifth cross'], label: '5th Cross, Alkapuri', mapTop: 37, mapLeft: 37, geoLat: 22.3111, geoLng: 73.1788, zone: 'Residential cross street' },
    { terms: ['queen', 'queens road', 'queen road'], label: "Queen's Road, Ward 6", mapTop: 70, mapLeft: 64, geoLat: 22.3047, geoLng: 73.1852, zone: "Queen's Road arterial" },
    { terms: ['subhash', 'subhash nagar'], label: 'Subhash Nagar, Ward 6', mapTop: 63, mapLeft: 33, geoLat: 22.3038, geoLng: 73.1783, zone: 'Subhash Nagar service lane' },
    { terms: ['ward office', 'vmc'], label: 'Ward 6 Office, Alkapuri', mapTop: 76, mapLeft: 20, geoLat: 22.3024, geoLng: 73.1758, zone: 'Ward office block' }
  ];

  let complaintLocationOverride = null;
  let selectedMapComplaintId = null;

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));
  }

  function stableHash(value) {
    return String(value || '').split('').reduce((hash, char) => {
      return ((hash << 5) - hash + char.charCodeAt(0)) | 0;
    }, 0);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function geoToMapPosition(geoLat, geoLng) {
    const top = ((MAP_BOUNDS.north - geoLat) / (MAP_BOUNDS.north - MAP_BOUNDS.south)) * 100;
    const left = ((geoLng - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west)) * 100;
    return {
      mapTop: clamp(top, 10, 90),
      mapLeft: clamp(left, 10, 90)
    };
  }

  function deriveLocation(address) {
    const normalized = String(address || '').toLowerCase();
    const known = KNOWN_LOCATIONS.find(loc => loc.terms.some(term => normalized.includes(term)));
    if (known) {
      return {
        address: known.label,
        ward: 'Ward 6',
        zone: known.zone,
        mapTop: known.mapTop,
        mapLeft: known.mapLeft,
        geoLat: known.geoLat,
        geoLng: known.geoLng,
        confidence: 'Landmark match'
      };
    }

    const hash = Math.abs(stableHash(normalized || 'ward-14'));
    const mapTop = 18 + (hash % 58);
    const mapLeft = 18 + ((hash >> 3) % 58);
    return {
      address: address || 'Ward 6, Alkapuri',
      ward: 'Ward 6',
      zone: 'Ward 6 local grid',
      mapTop,
      mapLeft,
      geoLat: +(WARD_CENTER.geoLat + (mapTop - 50) * -0.00012).toFixed(5),
      geoLng: +(WARD_CENTER.geoLng + (mapLeft - 50) * 0.00014).toFixed(5),
      confidence: 'Estimated from address'
    };
  }

  function enrichComplaintLocation(complaint) {
    if (!complaint) return complaint;
    if (complaint.geoLat && complaint.geoLng && complaint.lat && complaint.lng) return complaint;
    const loc = deriveLocation(complaint.address);
    complaint.lat = complaint.lat ?? loc.mapTop;
    complaint.lng = complaint.lng ?? loc.mapLeft;
    complaint.geoLat = complaint.geoLat ?? loc.geoLat;
    complaint.geoLng = complaint.geoLng ?? loc.geoLng;
    complaint.ward = complaint.ward || loc.ward;
    complaint.severity = complaint.severity || (complaint.status === 'Resolved' ? 'low' : 'medium');
    complaint.locationConfidence = complaint.locationConfidence || loc.confidence;
    return complaint;
  }

  function updateComplaintLocationPreview(location) {
    const preview = $('#complaintLocationPreview');
    if (!preview || !location) return;
    preview.innerHTML = `
      <span class="location-preview-dot"></span>
      <div>
        <strong>${escapeHTML(location.ward || 'Ward 6')} · ${escapeHTML(location.confidence || 'Location ready')}</strong>
        <p>${escapeHTML(location.address)} · ${Number(location.geoLat).toFixed(5)}, ${Number(location.geoLng).toFixed(5)}</p>
      </div>
    `;
  }

  function updateMapClock() {
    const lastUpdated = $('#mapLastUpdated');
    if (lastUpdated) {
      lastUpdated.textContent = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    }
  }

  function requestBrowserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not available in this browser.'));
        return;
      }
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 9000,
        maximumAge: 60000
      });
    });
  }

  function getStoredProfile() {
    try {
      return JSON.parse(localStorage.getItem('civic_user')) || JSON.parse(localStorage.getItem('newStreetCitizenProfile')) || null;
    } catch {
      return null;
    }
  }

  state.activeComplaints.forEach(enrichComplaintLocation);

  // ── 1. SINGLE PAGE NAVIGATION (TAB SWITCHING) ────────────────
  const sidebarItems = $$('.sidebar-item');
  const mobileTabItems = $$('.mobile-tabbar-btn');
  const viewTabs = $$('.dash-view-tab');

  function syncNavTabs(tabId) {
    sidebarItems.forEach(item => {
      item.classList.toggle('active', item.dataset.tab === tabId);
    });
    mobileTabItems.forEach(item => {
      item.classList.toggle('active', item.dataset.mobileTab === tabId);
    });
  }

  function switchTab(tabId) {
    if (!tabId) return;
    syncNavTabs(tabId);

    viewTabs.forEach(tab => {
      if (tab.id === `view-${tabId}`) {
        tab.removeAttribute('hidden');
      } else {
        tab.setAttribute('hidden', '');
      }
    });

    // Show right utility panel only on Dashboard; hide for all others
    // so each section can use its own full-width layout with built-in sidebar
    const rightPanel = document.querySelector('.dash-right-utility');
    if (rightPanel) {
      if (tabId === 'dashboard') {
        rightPanel.style.display = '';
        document.body.classList.remove('hide-right-panel');
      } else {
        rightPanel.style.display = 'none';
        document.body.classList.add('hide-right-panel');
      }
    }

    const langDropdown = $('#langDropdownMenu');
    if (langDropdown) langDropdown.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tabId === 'map') {
      updateMapClock();
      setTimeout(() => {
        if (window.google && window.google.maps) {
          if (!googleMap) initGoogleMap();
          else {
            renderGoogleMapPins();
            renderWorkSitePins();
          }
        } else {
          // API not loaded yet — show placeholder
          const c = document.getElementById('liveMapCanvas');
          if (c && !c.innerHTML.trim()) {
            c.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg,#1e293b,#0f172a);color:#94a3b8;gap:12px;">
              <svg width="48" height="48" fill="none" stroke="#4F8EF7" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              <div style="font-size:1rem;font-weight:700;color:#e2e8f0;">Add your Google Maps API Key</div>
              <div style="font-size:0.8rem;text-align:center;max-width:280px;line-height:1.6;">Open <code style="background:#1e3a5f;padding:2px 6px;border-radius:4px;">dashboard.html</code> and replace <code style="background:#1e3a5f;padding:2px 6px;border-radius:4px;">YOUR_GOOGLE_MAPS_API_KEY</code></div>
            </div>`;
          }
        }
      }, 100);
    }
    showToast(`Navigated to ${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`, 'info');
  }

  sidebarItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const tabId = e.currentTarget.dataset.tab;
      if (tabId) switchTab(tabId);
    });
  });

  mobileTabItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const tabId = e.currentTarget.dataset.mobileTab;
      if (tabId) switchTab(tabId);
    });
  });

  // Handle clickable quick stats cards
  $$('.clickable-stat').forEach(card => {
    card.addEventListener('click', () => {
      const tabTarget = card.dataset.targetTab;
      if (tabTarget) switchTab(tabTarget);
    });
  });

  // Bind specific navigation helper triggers
  const triggerTabBtn = (btnId, tabId) => {
    const btn = $(btnId);
    if (btn) btn.addEventListener('click', () => switchTab(tabId));
  };

  triggerTabBtn('#viewAllFeedBtn', 'community');
  triggerTabBtn('#viewAllComplaintsBtn', 'complaints');
  triggerTabBtn('#dashBudgetDetailsBtn', 'transparency');
  triggerTabBtn('#tileMap', 'map');
  triggerTabBtn('#tileService', 'services');

  // ── 2. ALERT BANNER DISMISSAL ────────────────────────────────
  $$('.alert-banner-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const banner = e.target.closest('.alert-banner');
      if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(-10px)';
        setTimeout(() => banner.remove(), 250);
      }
    });
  });

  // ── 3. TOAST NOTIFICATIONS ──────────────────────────────────
  function showToast(message, type = 'success') {
    const container = $('#toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type === 'danger' ? 'error' : type}`;

    const iconEl = document.createElement('span');
    iconEl.className = 'toast-icon';
    const textEl = document.createElement('span');
    textEl.className = 'toast-text';
    textEl.textContent = message;

    toast.appendChild(iconEl);
    toast.appendChild(textEl);
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  window.showToast = showToast;

  function initializeCitizenProfile() {
    const profile = getStoredProfile();
    if (!profile) return;

    const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ').trim() || 'Rahul Sharma';
    const initials = fullName.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'RS';
    const city = profile.city || 'Vadodara';
    const stateCode = profile.state === 'Gujarat' ? 'GJ' : (profile.state || 'GJ');
    const address = profile.address || 'Alkapuri, Ward 6, Vadodara, Gujarat';
    const location = deriveLocation(address);

    const welcome = $('#view-dashboard .view-header h1');
    if (welcome) welcome.textContent = `Welcome back, ${profile.firstName || fullName.split(' ')[0]}`;

    $$('.dash-user-name').forEach(el => { el.textContent = fullName; });
    $$('.dash-user-avatar, .profile-large-avatar').forEach(el => { el.textContent = initials; });

    const profileName = $('#profileUserName');
    if (profileName) profileName.textContent = fullName;
    const profileAddress = $('#profileAddressValue');
    if (profileAddress) profileAddress.textContent = address;
    const navCity = $('#navCityLabel');
    if (navCity) navCity.textContent = `${city}, ${stateCode}`;
    const navWard = $('#navWardLabel');
    if (navWard) navWard.textContent = `${location.ward} (${location.zone})`;
  }

  initializeCitizenProfile();

  // ── 4. GLOBAL SEARCH FILTERING (REAL-TIME) ───────────────────
  const globalSearch = $('#globalSearch');
  if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      // Filter Services
      $$('.service-application-card').forEach(card => {
        const title = card.querySelector('.srv-title').textContent.toLowerCase();
        const desc = card.querySelector('.srv-desc').textContent.toLowerCase();
        if (title.includes(query) || desc.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      // Filter Complaints
      $$('.complaint-list-item').forEach(item => {
        const title = item.querySelector('.comp-list-title').textContent.toLowerCase();
        const desc = item.querySelector('.comp-list-desc').textContent.toLowerCase();
        if (title.includes(query) || desc.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });

      // Filter Community Posts
      $$('.post-card').forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const body = post.querySelector('.post-body').textContent.toLowerCase();
        if (title.includes(query) || body.includes(query)) {
          post.style.display = 'block';
        } else {
          post.style.display = 'none';
        }
      });
    });
  }

  // ── 5. LANGUAGE SELECTOR ────────────────────────────────────
  const langBtn = $('#langSelectorBtn');
  const langMenu = $('#langDropdownMenu');

  if (langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langMenu.classList.toggle('open');
    });

    document.addEventListener('click', () => langMenu.classList.remove('open'));

    $$('.lang-opt').forEach(opt => {
      opt.addEventListener('click', (e) => {
        $$('.lang-opt').forEach(o => o.classList.remove('active'));
        e.target.classList.add('active');
        langBtn.innerHTML = `<span>🌐</span> ${e.target.textContent.split(' ')[0]} <span class="arrow-down">▼</span>`;
        showToast(`Language updated to: ${e.target.textContent}`, 'success');
      });
    });
  }

  // ── 6. COMPLAINT FORM & REAL-TIME MAP PINS PLACEMENT ─────────
  const complaintModal = $('#complaintModal');
  const triggerComplaint = $('#triggerComplaintBtn');
  const triggerReportTile = $('#tileReport');
  const triggerComplaintFromList = $('#openComplaintFormModalBtn');
  const triggerComplaintFromMap = $('#mapOpenComplaintBtn');
  const closeComplaintModal = $('#closeComplaintModalBtn');
  const cancelComplaint = $('#cancelComplaintBtn');
  const complaintForm = $('#complaintForm');
  const complaintAddressInput = $('#compAddress');
  const useCurrentLocationBtn = $('#useCurrentLocationBtn');
  const previewComplaintLocationBtn = $('#previewComplaintLocationBtn');

  const updateComplaintPreviewFromAddress = () => {
    if (!complaintAddressInput) return;
    const location = complaintLocationOverride || deriveLocation(complaintAddressInput.value);
    updateComplaintLocationPreview(location);
  };

  const openComplaintModal = (prefill = {}) => {
    if (!complaintModal || !complaintForm) return;
    complaintModal.removeAttribute('hidden');
    if (prefill.category && $('#compCategory')) $('#compCategory').value = prefill.category;
    if (prefill.title && $('#compTitle')) $('#compTitle').value = prefill.title;
    if (prefill.details && $('#compDetails')) $('#compDetails').value = prefill.details;
    if (prefill.address && complaintAddressInput) $('#compAddress').value = prefill.address;
    updateComplaintPreviewFromAddress();
    setTimeout(() => ($('#compCategory') || $('#compTitle'))?.focus(), 0);
  };
  const hideComplaintModal = () => {
    if (!complaintModal || !complaintForm) return;
    complaintModal.setAttribute('hidden', '');
    complaintForm.reset();
    complaintLocationOverride = null;
    updateComplaintPreviewFromAddress();
  };

  if (triggerComplaint) triggerComplaint.addEventListener('click', openComplaintModal);
  if (triggerReportTile) triggerReportTile.addEventListener('click', openComplaintModal);
  if (triggerComplaintFromList) triggerComplaintFromList.addEventListener('click', openComplaintModal);
  if (triggerComplaintFromMap) triggerComplaintFromMap.addEventListener('click', () => {
    const address = $('#mapAddressSearch')?.value.trim() || 'MG Road, Ward 6';
    openComplaintModal({ address });
  });
  if (closeComplaintModal) closeComplaintModal.addEventListener('click', hideComplaintModal);
  if (cancelComplaint) cancelComplaint.addEventListener('click', hideComplaintModal);

  if (complaintAddressInput) {
    complaintAddressInput.addEventListener('input', () => {
      complaintLocationOverride = null;
      updateComplaintPreviewFromAddress();
    });
    updateComplaintPreviewFromAddress();
  }

  if (previewComplaintLocationBtn) {
    previewComplaintLocationBtn.addEventListener('click', () => {
      updateComplaintPreviewFromAddress();
      showToast('Location preview refreshed for Ward 6 routing.', 'info');
    });
  }

  if (useCurrentLocationBtn) {
    useCurrentLocationBtn.addEventListener('click', async () => {
      useCurrentLocationBtn.disabled = true;
      useCurrentLocationBtn.textContent = 'Locating...';
      try {
        const position = await requestBrowserLocation();
        const { latitude, longitude, accuracy } = position.coords;
        const mapPosition = geoToMapPosition(latitude, longitude);
        complaintLocationOverride = {
          address: `Current GPS position near Ward 6 (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`,
          ward: 'Ward 6',
          zone: 'Live GPS point',
          mapTop: mapPosition.mapTop,
          mapLeft: mapPosition.mapLeft,
          geoLat: latitude,
          geoLng: longitude,
          confidence: `GPS accuracy ${Math.round(accuracy)}m`
        };
        if (complaintAddressInput) complaintAddressInput.value = complaintLocationOverride.address;
        updateComplaintLocationPreview(complaintLocationOverride);
        updateUserLocationOnMap(complaintLocationOverride);
        showToast('Current location attached to this complaint.', 'success');
      } catch (err) {
        showToast(err.message || 'Location permission was blocked. Enter a landmark instead.', 'warning');
      } finally {
        useCurrentLocationBtn.disabled = false;
        useCurrentLocationBtn.textContent = 'Use Current Location';
      }
    });
  }

  if (complaintForm) {
    complaintForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = $('#compTitle').value.trim();
      const category = $('#compCategory').value;
      const details = $('#compDetails').value.trim();
      const address = $('#compAddress').value.trim();
      const location = complaintLocationOverride || deriveLocation(address);
      
      const newId = `CVC-2026-${Math.floor(10000 + Math.random() * 90000)}`;

      const newComplaint = {
        id: newId,
        title: title,
        category: category,
        details: details,
        address: location.address || address,
        status: 'Assigned',
        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
        officer: 'Municipal Dispatch Officer',
        eta: '3-4 Days',
        lat: location.mapTop,
        lng: location.mapLeft,
        geoLat: location.geoLat,
        geoLng: location.geoLng,
        ward: location.ward,
        severity: category === 'roads' || category === 'water' ? 'high' : 'medium',
        locationConfidence: location.confidence,
        timeline: [
          { title: 'Submitted', desc: `Reported by Rahul Sharma on ${new Date().toLocaleDateString()}`, completed: true },
          { title: 'Assigned & Scheduled', desc: 'Routed automatically to Division Engineer Office.', completed: true, active: true },
          { title: 'Work In Progress', desc: 'Inspection scheduled.', completed: false },
          { title: 'Resolved', desc: 'Awaiting completion verification.', completed: false }
        ],
        chatHistory: [
          { sender: 'ai', text: 'Hello, I am municipal automated desk. We have received your complaint and route assignment is complete.' }
        ]
      };

      // Save to state
      state.activeComplaints.unshift(newComplaint);

      // Render to DOM lists & maps
      renderComplaintsList();
      renderMapPins();
      renderMapEventList();
      updateComplaintStats();

      hideComplaintModal();
      showToast(`✅ Complaint ${newId} registered! Pinned to Live Map.`, 'success');

      if (googleMap) {
        switchTab('map');
        setTimeout(() => {
          flashNewComplaintOnMap(newComplaint);
          // Switch to complaints after showing the map flash
          setTimeout(() => {
            selectComplaint(newId);
            switchTab('complaints');
          }, 2500);
        }, 500);
      } else {
        switchTab('complaints');
        selectComplaint(newId);
      }
    });
  }

  // ── 7. COMPLAINTS LIST RENDER & DETAILED VIEWER ──────────────
  const complaintsFilterNav = $('#complaintsFilterNav');
  let activeStatusFilter = 'all';

  if (complaintsFilterNav) {
    $$('.filter-tab', complaintsFilterNav).forEach(tab => {
      tab.addEventListener('click', (e) => {
        $$('.filter-tab', complaintsFilterNav).forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        activeStatusFilter = e.target.dataset.status;
        renderComplaintsList();
      });
    });
  }


  function getCategoryIcon(cat) {
    const icons = {
      'roads': '🛣️',
      'water': '💧',
      'electricity': '💡',
      'garbage': '🗑️',
      'parks': '🌳',
      'safety': '🚨'
    };
    return icons[cat.toLowerCase()] || '📝';
  }

  function getStatusClass(status) {
    if (status === 'Resolved') return 'resolved';
    if (status === 'In Progress') return 'inprogress';
    return 'pending';
  }

  function getStatusBadge(status) {
    const cl = getStatusClass(status);
    return `<span class="cc-badge ${cl}">${status}</span>`;
  }

  function renderComplaintSidebar(c) {
    const sidebar = $('#complaintsRightSidebar');
    if (!sidebar || !c) return;

    let timelineHtml = '';
    c.timeline.forEach((step, idx) => {
      let stepClass = '';
      if (step.completed) stepClass = 'completed';
      if (step.active) stepClass = 'active';
      timelineHtml += `
        <div class="cs-step ${stepClass}">
          <div class="cs-step-dot">${stepClass === 'completed' ? '✓' : (stepClass === 'active' ? '⚙️' : (idx+1))}</div>
          <div class="cs-step-title" style="margin-top:6px;">${escapeHTML(step.title)}</div>
          <div class="cs-step-date">${escapeHTML(step.desc.split('·')[0] || '')}</div>
        </div>
      `;
    });

    let activeStepDesc = c.timeline.find(t => t.active)?.desc || 'Awaiting update.';

    sidebar.innerHTML = `
      <div class="cs-card">
        <div class="cs-header-title">Latest Complaint Status</div>
        
        <div class="cs-status-row">
          ${getStatusBadge(c.status)}
          <span class="cs-id">ID: ${escapeHTML(c.id)}</span>
        </div>

        <h2 class="cs-comp-title">${escapeHTML(c.title)}</h2>
        <div class="cs-comp-meta">
          <span>🏢 ${escapeHTML(c.category.toUpperCase())}</span> • <span>Raised on ${escapeHTML(c.date)}</span>
        </div>

        <img src="${c.image || '/Users/iakadityaraj/.gemini/antigravity/brain/fe32c3c1-5e2a-4d88-af52-8d4018d9ff7f/pothole_road_photo_1786037248976.jpg'}" class="cs-image" alt="Complaint Image" onerror="this.src='/Users/iakadityaraj/.gemini/antigravity/brain/fe32c3c1-5e2a-4d88-af52-8d4018d9ff7f/.user_uploaded/media_1786035969178.png'" />

        <div class="cs-timeline-hoz">
          ${timelineHtml}
        </div>

        <div class="cs-info-box">
          ${escapeHTML(activeStepDesc)}
        </div>

        <button class="cs-btn-full" id="csFullBtn-${c.id}">View Full Details</button>

        <div class="cs-help-box" id="csHelpBox-${c.id}">
          <div class="cs-help-text">
            <h4>Need Help?</h4>
            <p>Chat with officer or raise a follow-up.</p>
          </div>
          <button class="cs-btn-chat" id="csChatBtn-${c.id}">💬 Chat Now</button>
        </div>

        <div class="cs-insights">
          <h4>Complaint Insights</h4>
          <div class="cs-insights-grid">
            <div class="cs-insight-item">
              <span class="cs-ins-lbl">Top Category</span>
              <span class="cs-ins-val">🛣️ Roads</span>
              <span class="cs-ins-sub">7 Complaints</span>
            </div>
            <div class="cs-insight-item">
              <span class="cs-ins-lbl">Most Active Dept.</span>
              <span class="cs-ins-val">🏢 PWD</span>
              <span class="cs-ins-sub">8 Complaints</span>
            </div>
            <div class="cs-insight-item">
              <span class="cs-ins-lbl">Resolution Rate</span>
              <span class="cs-ins-val" style="color:#16A34A;">♾️ 85%</span>
              <span class="cs-ins-sub">This Month</span>
            </div>
            <div class="cs-insight-item">
              <span class="cs-ins-lbl">Your Rank</span>
              <span class="cs-ins-val" style="color:#D97706;">🏆 Top 12%</span>
              <span class="cs-ins-sub">Active Citizens</span>
            </div>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const chatBtn = $(`#csChatBtn-${c.id}`);
      if (chatBtn) {
        chatBtn.addEventListener('click', () => {
          const helpBox = $(`#csHelpBox-${c.id}`);
          
          let historyHtml = (c.chatHistory || []).map(msg => 
            `<div style="margin-bottom:8px; font-size:0.75rem; padding:8px; border-radius:8px; background:${msg.sender === 'user' ? 'var(--primary-light)' : '#f1f5f9'}; color:${msg.sender === 'user' ? 'var(--primary)' : 'var(--text-secondary)'}; text-align:${msg.sender === 'user' ? 'right' : 'left'};">
              <strong>${msg.sender === 'user' ? 'You' : 'Officer'}</strong>: ${msg.text}
             </div>`
          ).join('');

          if ((c.chatHistory || []).length === 0) {
             historyHtml = `<div style="text-align:center; color:var(--text-tertiary); font-size:0.7rem; margin-bottom:8px;">No messages yet.</div>`;
          }

          helpBox.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:8px; width:100%;">
              <div style="max-height:150px; overflow-y:auto; padding:4px;" id="csChatScroll-${c.id}">
                ${historyHtml}
              </div>
              <div style="display:flex; gap:8px;">
                <input type="text" id="csChatInput-${c.id}" placeholder="Type a comment..." style="flex:1; padding:6px 10px; border-radius:6px; border:1px solid var(--border); font-size:0.75rem;" />
                <button id="csChatSend-${c.id}" class="btn btn-primary btn-sm" style="padding:4px 12px;">Send</button>
              </div>
            </div>
          `;
          
          const scrollBox = $(`#csChatScroll-${c.id}`);
          if (scrollBox) scrollBox.scrollTop = scrollBox.scrollHeight;

          const sendBtn = $(`#csChatSend-${c.id}`);
          const input = $(`#csChatInput-${c.id}`);
          
          const sendMessage = () => {
            if (input.value.trim()) {
              if (!c.chatHistory) c.chatHistory = [];
              c.chatHistory.push({ sender: 'user', text: input.value.trim() });
              input.value = '';
              renderComplaintSidebar(c);
              showToast('Comment posted successfully.', 'success');
              // Auto-open chat box on re-render
              setTimeout(() => {
                 const reChatBtn = $(`#csChatBtn-${c.id}`);
                 if (reChatBtn) reChatBtn.click();
              }, 50);
            }
          };

          sendBtn.addEventListener('click', sendMessage);
          input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
          input.focus();
        });
      }

      const fullBtn = $(`#csFullBtn-${c.id}`);
      if (fullBtn) fullBtn.addEventListener('click', () => {
        if (window.googleNavToComplaint) {
          window.googleNavToComplaint(c.id);
        } else {
          switchTab('complaints');
          selectComplaint(c.id);
        }
      });
    }, 50);
  }

  function renderComplaintsList() {
    const listContainer = $('#complaintItemsContainer');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    const filtered = state.activeComplaints.filter(c => {
      const matchStatus = activeStatusFilter === 'all' || 
                          (activeStatusFilter === 'Pending' && c.status !== 'Resolved' && c.status !== 'In Progress') ||
                          c.status === activeStatusFilter;
      return matchStatus;
    });

    if (filtered.length === 0) {
      listContainer.innerHTML = `<div style="padding: 24px; text-align:center; color: var(--text-tertiary);">No complaints found.</div>`;
      $('#complaintsRightSidebar').innerHTML = '<div class="rp-card" style="padding: 24px; text-align: center; color: var(--text-tertiary);">Select a complaint to view detailed tracking status.</div>';
      return;
    }

    filtered.forEach((c, idx) => {
      enrichComplaintLocation(c);
      const item = document.createElement('div');
      const statusCls = getStatusClass(c.status);
      item.className = `cc-card status-${statusCls}`;
      item.dataset.id = c.id;
      
      item.innerHTML = `
        <div class="cc-icon-wrap">
          ${getCategoryIcon(c.category)}
        </div>
        <div class="cc-title-area">
          <div class="cc-title">${escapeHTML(c.title)}</div>
          <div class="cc-meta">
            🏢 ${escapeHTML(c.category.toUpperCase())}
          </div>
          <div class="cc-id-row">
            <span class="cs-id" style="font-size:0.65rem;">ID: ${escapeHTML(c.id)}</span>
            <span style="font-size:0.65rem; color:var(--text-tertiary);">• Raised on ${escapeHTML(c.date)}</span>
          </div>
          <div style="margin-top:6px;">
            ${getStatusBadge(c.status)}
          </div>
        </div>
        <div class="cc-officer-area">
          <div class="cc-officer-lbl">Officer</div>
          <div class="cc-officer-prof">
            <div class="cc-off-avatar">${escapeHTML(c.officer.charAt(0))}</div>
            <div class="cc-off-details">
              <span class="cc-off-name">${escapeHTML(c.officer.split(' ')[0] + ' ' + (c.officer.split(' ')[1] || ''))}</span>
              <span class="cc-off-dept">${escapeHTML(c.category.toUpperCase())}</span>
            </div>
          </div>
          <div class="cc-eta-row">
            <span class="cc-eta-lbl">${c.status === 'Resolved' ? 'Resolved On' : 'ETA'}</span>
            <span class="cc-eta-val">${escapeHTML(c.eta || 'Pending')}</span>
          </div>
        </div>
        <div class="cc-actions-area">
          <button class="cc-btn-details">View Details</button>
          <button class="cc-btn-map" title="View on Live Map">📍 Map</button>
          <button class="cc-btn-chat" title="Chat">💬</button>
        </div>
      `;

      const mapBtn = item.querySelector('.cc-btn-map');
      if (mapBtn) {
        mapBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (window.viewComplaintOnMap) window.viewComplaintOnMap(c.id);
        });
      }

      const chatBtn = item.querySelector('.cc-btn-chat');
      if (chatBtn) {
        chatBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectComplaint(c.id);
          setTimeout(() => {
            const b = $(`#csChatBtn-${c.id}`);
            if (b) b.click();
          }, 100);
        });
      }

      item.addEventListener('click', () => {
        renderComplaintSidebar(c);
        $$('.cc-card').forEach(el => el.style.background = '#FFFFFF');
        item.style.background = '#F8FAFC';
      });

      listContainer.appendChild(item);

      // Auto-select first item
      if (idx === 0) {
        renderComplaintSidebar(c);
        item.style.background = '#F8FAFC';
      }
    });
  }

  // Update tabs event listeners
  const complaintsFilterNav2 = $('#complaintsFilterNav');
  if (complaintsFilterNav2) {
    $$('.comp-ftab', complaintsFilterNav2).forEach(tab => {
      tab.addEventListener('click', (e) => {
        $$('.comp-ftab', complaintsFilterNav2).forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        activeStatusFilter = e.target.dataset.status;
        renderComplaintsList();
      });
    });
  }

  function updateComplaintStats() {
    const total = state.activeComplaints.length;
    const resolved = state.activeComplaints.filter(c => c.status === 'Resolved').length;
    const inProgress = state.activeComplaints.filter(c => c.status === 'In Progress').length;
    const pending = total - resolved - inProgress;
    
    if ($('#complaintsTotalVal')) $('#complaintsTotalVal').textContent = total;
    if ($('#complaintsResolvedVal')) $('#complaintsResolvedVal').textContent = resolved;
    if ($('#complaintsInProgressVal')) $('#complaintsInProgressVal').textContent = inProgress;
    if ($('#complaintsPendingVal')) $('#complaintsPendingVal').textContent = pending;
    
    // Update tabs count
    $$('.comp-ftab').forEach(tab => {
      const status = tab.dataset.status;
      if (status === 'all') tab.textContent = `All Complaints (${total})`;
      if (status === 'In Progress') tab.textContent = `In Progress (${inProgress})`;
      if (status === 'Assigned' || status === 'Pending') tab.textContent = `Pending (${pending})`;
      if (status === 'Resolved') tab.textContent = `Resolved (${resolved})`;
    });
  }

  function selectComplaint(id) {
    const c = state.activeComplaints.find(comp => comp.id === id);
    if (c) {
      renderComplaintSidebar(c);
      switchTab('complaints');
      window.scrollTo(0, 0);
    }
  }

  // View a specific complaint on the live map
  window.viewComplaintOnMap = function(id) {
    const c = state.activeComplaints.find(comp => comp.id === id);
    if (!c) return;
    enrichComplaintLocation(c);
    switchTab('map');
    setTimeout(() => {
      if (!leafletMap) initLeafletMap();
      if (leafletMap && c.geoLat && c.geoLng) {
        leafletMap.flyTo([c.geoLat, c.geoLng], 17, { duration: 1.2 });
        // Find and open the popup for this complaint marker
        const found = complaintMarkers.find(m => {
          const ll = m.getLatLng();
          return Math.abs(ll.lat - c.geoLat) < 0.0001 && Math.abs(ll.lng - c.geoLng) < 0.0001;
        });
        if (found) setTimeout(() => found.openPopup(), 1300);
      }
    }, 200);
  };

  // Fly to a work site on the live map by index
  window.flyToWorkSite = function(idx) {
    switchTab('map');
    setTimeout(() => {
      if (!googleMap) initGoogleMap();
      const site = WORK_SITES[idx];
      if (!site || !googleMap) return;
      googleMap.panTo({ lat: site.geoLat, lng: site.geoLng });
      googleMap.setZoom(17);
      const found = projectMarkers[idx];
      if (found) setTimeout(() => found.infoWindow && found.infoWindow.open(googleMap, found), 400);
    }, 200);
  };

  // ── 8. GOOGLE MAPS + REAL-TIME GPS ────────────────────
  let googleMap = null;
  let miniGoogleMap = null;
  let userMarker = null;
  let userAccuracyCircle = null;
  let miniUserMarker = null;
  let complaintMarkers = [];
  let projectMarkers = [];
  let watchId = null;
  let currentGeoPos = null;
  let openInfoWindow = null;
  let heatmapLayer = null;

  window.googleMap = googleMap;
  window.complaintMarkers = complaintMarkers;
  window.projectMarkers = projectMarkers;
  window.heatmapLayer = heatmapLayer;

  const WARD_LATLNG = { lat: 22.3072, lng: 73.1812 };

  // Work-site / project data with geo coordinates
  const WORK_SITES = [
    { id: 'ws-1', name: 'Drainage Improvement (3rd Block)',   dept: 'VMC',        pct: 80, status: 'inprog',   geoLat: 22.3092, geoLng: 73.1789, color: '#3B82F6', emoji: '🏗️' },
    { id: 'ws-2', name: 'Park Renovation (Cunningham Park)',  dept: 'Horticulture', pct: 57, status: 'inprog',   geoLat: 22.3060, geoLng: 73.1766, color: '#10B981', emoji: '🌳' },
    { id: 'ws-3', name: 'Street Light LED Upgrade',           dept: 'MGVCL',       pct: 70, status: 'inprog',   geoLat: 22.3084, geoLng: 73.1829, color: '#F59E0B', emoji: '💡' },
    { id: 'ws-4', name: 'Water Pipeline Replacement',         dept: 'VMC Water Works',        pct: 65, status: 'inprog',   geoLat: 22.3045, geoLng: 73.1806, color: '#06B6D4', emoji: '🚰' },
    { id: 'ws-5', name: 'Road Resurfacing (5th Main Road)',   dept: 'VMC',         pct: 25, status: 'pending',  geoLat: 22.3111, geoLng: 73.1842, color: '#8B5CF6', emoji: '🛣️' },
    { id: 'ws-6', name: 'Govt. School Building – Phase 2',   dept: 'Education',    pct: 0,  status: 'upcoming', geoLat: 22.3024, geoLng: 73.1758, color: '#F97316', emoji: '🏫' }
  ];

  // -- PRESENTATION MOCK DATA GENERATOR --
  function generateMockPresentationData() {
    const targets = { roads: 33, garbage: 20, water: 17, electricity: 15, traffic: 11, safety: 7 };
    let idCounter = 2000;
    const centerLat = 22.3072;
    const centerLng = 73.1812;
    const radius = 0.015;

    for (const [category, count] of Object.entries(targets)) {
      for (let i = 0; i < count; i++) {
        state.activeComplaints.push({
          id: `CVC-2026-F${idCounter++}`,
          title: `Reported ${category} issue in sector ${Math.floor(Math.random()*20)}`,
          category: category,
          details: 'Autogenerated mock data for presentation.',
          address: 'Alkapuri Local Area',
          status: Math.random() > 0.3 ? 'Pending' : (Math.random() > 0.5 ? 'In Progress' : 'Resolved'),
          date: 'Aug ' + Math.floor(Math.random()*9 + 1) + ', 2026',
          officer: 'System Assigned',
          eta: 'Pending',
          geoLat: centerLat + (Math.random() - 0.5) * radius * 2,
          geoLng: centerLng + (Math.random() - 0.5) * radius * 2,
          severity: Math.random() > 0.5 ? 'medium' : 'high',
          ward: 'Ward 6',
          timeline: [],
          chatHistory: []
        });
      }
    }

    for (let i = 0; i < 10; i++) {
      WORK_SITES.push({
        id: `ws-mock-${i}`,
        name: `Infrastructure Upgrade Phase ${i+1}`,
        dept: 'VMC',
        pct: Math.floor(Math.random()*100),
        status: Math.random() > 0.5 ? 'inprog' : 'pending',
        geoLat: centerLat + (Math.random() - 0.5) * radius * 2.5,
        geoLng: centerLng + (Math.random() - 0.5) * radius * 2.5,
        color: '#6366F1',
        emoji: '🏗️'
      });
    }
  }
  generateMockPresentationData();

  function statusToMarker(complaint) {
    if (complaint.status === 'Resolved') return { severity: 'low' };
    if (complaint.status === 'Assigned') return { severity: 'high' };
    return { severity: complaint.severity || 'medium' };
  }

  function getVisibleMapComplaints() {
    const activeChip = document.querySelector('.lm-chip.active');
    const cat = activeChip ? activeChip.dataset.lmCat : 'all';
    
    // Fallback to older checkboxes if chip not found/active
    const activeCategories = new Set($$('[data-map-filter]:checked').map(input => input.dataset.mapFilter));
    const activeSeverities = new Set($$('[data-severity-filter]:checked').map(input => input.dataset.severityFilter));
    
    return state.activeComplaints.filter(c => {
      enrichComplaintLocation(c);
      
      if (cat !== 'all') {
        return c.category === cat;
      }
      
      // Legacy sidebar filter logic
      const { severity } = statusToMarker(c);
      const categoryVisible = activeCategories.size === 0 || activeCategories.has(c.category);
      const severityVisible = activeSeverities.size === 0 || activeSeverities.has(c.severity || severity);
      return categoryVisible && severityVisible;
    });
  }

  function renderMapEventList() {
    const list = $('#mapEventList');
    if (!list) return;
    const visible = getVisibleMapComplaints();
    list.innerHTML = '';
    if ($('#mapVisibleCount')) $('#mapVisibleCount').textContent = `${visible.length} shown`;
    if (!visible.length) {
      list.innerHTML = `<div style="padding:12px;color:var(--text-tertiary);font-size:0.75rem;">No events match the selected filters.</div>`;
      return;
    }
    visible.forEach(c => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'map-event-item';
      btn.dataset.id = c.id;
      const badgeClass = c.status === 'Resolved' ? 'badge-success' : c.status === 'Assigned' ? 'badge-danger' : 'badge-warning';
      btn.innerHTML = `
        <div class="map-event-dot" style="background:${c.status === 'Resolved' ? 'var(--emerald)' : c.status === 'Assigned' ? 'var(--rose)' : 'var(--amber)'};"></div>
        <div class="map-event-text">
          <div class="map-event-title">${escapeHTML(c.title)}</div>
          <div class="map-event-sub">📍 ${escapeHTML(c.address)}</div>
        </div>
        <span class="badge ${badgeClass}" style="font-size:0.55rem;">${escapeHTML(c.status)}</span>
      `;
      btn.addEventListener('click', () => {
        if (googleMap && c.geoLat && c.geoLng) {
          googleMap.panTo({ lat: c.geoLat, lng: c.geoLng });
          googleMap.setZoom(16);
        }
      });
      list.appendChild(btn);
    });
  }

  // ── Google Maps marker SVG pin builder ──────────────────────
  function makeComplaintPin(status) {
    let fill = '#F59E0B';
    if (status === 'Resolved') fill = '#10B981';
    if (status === 'Assigned') fill = '#F43F5E';
    return {
      path: 'M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20S24 21 24 12c0-6.6-5.4-12-12-12z',
      fillColor: fill,
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 2,
      scale: 1.4,
      anchor: new google.maps.Point(12, 32)
    };
  }

  function makeWorkSitePin(site) {
    const color = site.status === 'inprog' ? site.color : site.status === 'pending' ? '#F59E0B' : '#9CA3AF';
    return {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      fillColor: color,
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 2,
      scale: 10,
      anchor: new google.maps.Point(0, 2.5)
    };
  }

  function makeUserPin() {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#4F8EF7',
      fillOpacity: 1,
      strokeColor: '#ffffff',
      strokeWeight: 3,
      scale: 9
    };
  }

  function buildComplaintInfoWindow(c) {
    const tagColor = c.status === 'Resolved' ? '#10B981' : c.status === 'Assigned' ? '#F43F5E' : '#F59E0B';
    return `<div class="map-popup-inner">
      <span class="map-popup-tag" style="background:${tagColor};color:#fff;">${escapeHTML(c.status)}</span>
      <div class="map-popup-title">${escapeHTML(c.title)}</div>
      <div class="map-popup-desc">${escapeHTML(c.details)}</div>
      <div class="map-popup-coords">${Number(c.geoLat).toFixed(5)} N, ${Number(c.geoLng).toFixed(5)} E</div>
      <div class="map-popup-footer">
        <button onclick="window.googleNavToComplaint('${escapeHTML(c.id)}')" class="btn btn-primary btn-sm" style="width:100%;margin-top:8px;">View Details</button>
      </div>
    </div>`;
  }

  function buildWorkSiteInfoWindow(site) {
    const statusLabel = site.status === 'inprog' ? '🔨 In Progress' : site.status === 'pending' ? '⏳ Pending' : '📋 Upcoming';
    const pctBar = `<div style="background:#E5E7EB;border-radius:4px;height:5px;margin-top:6px;"><div style="background:${site.color};width:${site.pct}%;height:100%;border-radius:4px;"></div></div>`;
    return `<div class="map-popup-inner">
      <span class="map-popup-tag" style="background:${site.color};color:#fff;">${statusLabel}</span>
      <div class="map-popup-title">${site.emoji} ${escapeHTML(site.name)}</div>
      <div class="map-popup-desc">Dept: ${escapeHTML(site.dept)} · ${site.pct}% complete${pctBar}</div>
      <div class="map-popup-coords" style="color:#9CA3AF;">📍 ${site.geoLat.toFixed(5)} N, ${site.geoLng.toFixed(5)} E</div>
    </div>`;
  }

  window.googleNavToComplaint = function(id) {
    if (openInfoWindow) openInfoWindow.close();
    switchTab('complaints');
    renderComplaintsList();
    selectComplaint(id);
  };

  function initGoogleMap() {
    const mapEl = document.getElementById('liveMapCanvas');
    if (!mapEl || !window.google || !window.google.maps) {
      // Show a placeholder if API key not set
      mapEl.innerHTML = `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;background:linear-gradient(135deg,#1e293b,#0f172a);color:#94a3b8;gap:12px;">
        <svg width="48" height="48" fill="none" stroke="#4F8EF7" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
        <div style="font-size:1rem;font-weight:700;color:#e2e8f0;">Google Maps API Key Required</div>
        <div style="font-size:0.8rem;text-align:center;max-width:280px;line-height:1.6;">Open <strong>dashboard.html</strong> and replace <code style="background:#1e3a5f;padding:2px 6px;border-radius:4px;">YOUR_GOOGLE_MAPS_API_KEY</code> with your key from <a href="https://console.cloud.google.com" target="_blank" style="color:#4F8EF7;">Google Cloud Console</a></div>
      </div>`;
      return;
    }
    if (googleMap) return;

    googleMap = new google.maps.Map(mapEl, {
      center: WARD_LATLNG,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_RIGHT,
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain']
      },
      fullscreenControl: true,
      streetViewControl: true,
      zoomControl: true,
      gestureHandling: 'greedy',
      styles: [
        { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] }
      ]
    });

    renderGoogleMapPins();
    renderWorkSitePins();
    startRealtimeGPS();
  }

  function initMiniMap() {
    const miniEl = document.getElementById('miniMapContainer');
    if (!miniEl || !window.google || !window.google.maps) return;
    if (miniGoogleMap) return;

    miniGoogleMap = new google.maps.Map(miniEl, {
      center: WARD_LATLNG,
      zoom: 14,
      disableDefaultUI: true,
      draggable: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      gestureHandling: 'none',
      styles: [
        { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }
      ]
    });

    state.activeComplaints.forEach(c => {
      enrichComplaintLocation(c);
      if (c.geoLat && c.geoLng) {
        new google.maps.Marker({
          position: { lat: c.geoLat, lng: c.geoLng },
          map: miniGoogleMap,
          icon: makeComplaintPin(c.status)
        });
      }
    });

    const miniStatus = $('#miniMapStatusText');
    if (miniStatus) miniStatus.textContent = 'Ward 6 · Vadodara, GJ';
  }

  // Flash a newly filed complaint with animated pulse overlay
  function flashNewComplaintOnMap(complaint) {
    if (!googleMap || !complaint.geoLat || !complaint.geoLng) return;

    const pos = { lat: complaint.geoLat, lng: complaint.geoLng };

    // Fly to new complaint
    googleMap.panTo(pos);
    googleMap.setZoom(16);

    // Create pulse overlay using a DOM element
    class PulseOverlay extends google.maps.OverlayView {
      constructor(pos) { super(); this.pos = pos; this.div = null; }
      onAdd() {
        const div = document.createElement('div');
        div.innerHTML = `<div class="map-new-complaint-pulse"><div class="map-pulse-ring"></div><div class="map-pulse-dot"></div><div class="map-new-label">NEW</div></div>`;
        div.style.position = 'absolute';
        this.div = div;
        this.getPanes().overlayMouseTarget.appendChild(div);
      }
      draw() {
        if (!this.div) return;
        const proj = this.getProjection();
        const pt = proj.fromLatLngToDivPixel(new google.maps.LatLng(this.pos.lat, this.pos.lng));
        this.div.style.left = (pt.x - 20) + 'px';
        this.div.style.top  = (pt.y - 20) + 'px';
      }
      onRemove() { if (this.div && this.div.parentNode) this.div.parentNode.removeChild(this.div); this.div = null; }
    }

    const overlay = new PulseOverlay(pos);
    overlay.setMap(googleMap);
    setTimeout(() => overlay.setMap(null), 6000);
  }
  window.flashNewComplaintOnMap = flashNewComplaintOnMap;

  function renderGoogleMapPins() {
    if (!googleMap) return;
    // Clear old
    complaintMarkers.forEach(m => { m.setMap(null); if (m.infoWindow) m.infoWindow.close(); });
    complaintMarkers = [];

    getVisibleMapComplaints().forEach(c => {
      enrichComplaintLocation(c);
      if (!c.geoLat || !c.geoLng) return;

      const marker = new google.maps.Marker({
        position: { lat: c.geoLat, lng: c.geoLng },
        map: googleMap,
        title: c.title,
        icon: makeComplaintPin(c.status)
      });

      const iw = new google.maps.InfoWindow({
        content: buildComplaintInfoWindow(c),
        maxWidth: 260
      });
      marker.infoWindow = iw;

      marker.addListener('click', () => {
        if (openInfoWindow) openInfoWindow.close();
        iw.open(googleMap, marker);
        openInfoWindow = iw;
      });

      complaintMarkers.push(marker);
    });

    renderMapEventList();
    updateComplaintStats();
    updateMapPillCounts();
    window.complaintMarkers = complaintMarkers;
    if (heatmapLayer && heatmapLayer.getMap()) {
      updateHeatmapData();
    }
  }

  function updateHeatmapData() {
    if (!googleMap || !window.google || !google.maps.visualization) return;
    const points = getVisibleMapComplaints().filter(c => c.geoLat && c.geoLng).map(c => new google.maps.LatLng(c.geoLat, c.geoLng));
    if (!heatmapLayer) {
      heatmapLayer = new google.maps.visualization.HeatmapLayer({
        data: points,
        map: googleMap,
        radius: 35
      });
      window.heatmapLayer = heatmapLayer;
    } else {
      heatmapLayer.setData(points);
      if (!heatmapLayer.getMap()) heatmapLayer.setMap(googleMap);
    }
  }
  window.updateHeatmapData = updateHeatmapData;
  window.renderGoogleMapPins = renderGoogleMapPins;

  function updateMapPillCounts() {
    const chips = document.querySelectorAll('.lm-chip[data-lm-cat]');
    chips.forEach(chip => {
      const cat = chip.dataset.lmCat;
      const countEl = chip.querySelector('.lm-chip-count');
      if (countEl) {
        if (cat === 'all') {
          countEl.textContent = state.activeComplaints.length;
        } else {
          countEl.textContent = state.activeComplaints.filter(c => c.category === cat).length;
        }
      }
    });
  }

  function renderWorkSitePins() {
    if (!googleMap) return;
    projectMarkers.forEach(m => { m.setMap(null); if (m.infoWindow) m.infoWindow.close(); });
    projectMarkers = [];

    WORK_SITES.forEach((site, idx) => {
      const marker = new google.maps.Marker({
        position: { lat: site.geoLat, lng: site.geoLng },
        map: googleMap,
        title: site.name,
        icon: makeWorkSitePin(site)
      });

      const iw = new google.maps.InfoWindow({
        content: buildWorkSiteInfoWindow(site),
        maxWidth: 280
      });
      marker.infoWindow = iw;

      marker.addListener('click', () => {
        if (openInfoWindow) openInfoWindow.close();
        iw.open(googleMap, marker);
        openInfoWindow = iw;
      });

      projectMarkers.push(marker);
    });
  }

  function renderMapPins() {
    if (googleMap) renderGoogleMapPins();
    renderMapEventList();
    updateComplaintStats();
  }

  function updateUserLocationOnMap(location) {
    if (!location) return;
    state.currentLocation = location;
    const pos = { lat: location.geoLat, lng: location.geoLng };

    // Main map user marker
    if (googleMap) {
      if (userMarker) {
        userMarker.setPosition(pos);
      } else {
        userMarker = new google.maps.Marker({
          position: pos,
          map: googleMap,
          icon: makeUserPin(),
          title: 'Your Location',
          zIndex: 1000
        });
        const youIw = new google.maps.InfoWindow({
          content: `<div class="map-popup-inner"><div class="map-popup-tag" style="background:#4F8EF7;color:#fff;">YOU</div><div class="map-popup-title">Your Live Location</div><div class="map-popup-coords">${location.geoLat.toFixed(5)} N, ${location.geoLng.toFixed(5)} E</div></div>`,
          maxWidth: 220
        });
        userMarker.addListener('click', () => {
          if (openInfoWindow) openInfoWindow.close();
          youIw.open(googleMap, userMarker);
          openInfoWindow = youIw;
        });
      }

      // Accuracy circle
      if (location.accuracy) {
        if (userAccuracyCircle) {
          userAccuracyCircle.setCenter(pos);
          userAccuracyCircle.setRadius(location.accuracy);
        } else {
          userAccuracyCircle = new google.maps.Circle({
            map: googleMap,
            center: pos,
            radius: location.accuracy,
            fillColor: '#4F8EF7',
            fillOpacity: 0.1,
            strokeColor: '#4F8EF7',
            strokeOpacity: 0.4,
            strokeWeight: 1
          });
        }
      }

      googleMap.panTo(pos);
    }

    // Mini map marker
    if (miniGoogleMap) {
      if (miniUserMarker) {
        miniUserMarker.setPosition(pos);
      } else {
        miniUserMarker = new google.maps.Marker({
          position: pos,
          map: miniGoogleMap,
          icon: makeUserPin()
        });
      }
      miniGoogleMap.panTo(pos);
    }

    // Nav bar GPS indicator
    const gpsIndicator = $('#gpsLiveIndicator');
    const gpsDisplay = $('#gpsCoordDisplay');
    const gpsAddrDisplay = $('#gpsAddressDisplay');
    const navTooltip = $('#navAddressTooltip');
    
    if (gpsIndicator && gpsDisplay) {
      gpsIndicator.className = 'dash-gps-live';
      gpsDisplay.textContent = `${Number(location.geoLat).toFixed(4)}, ${Number(location.geoLng).toFixed(4)}`;
    }
    
    // Reverse Geocode for real-time address
    if (window.google && window.google.maps && google.maps.Geocoder) {
      if (!window._dashGeocoder) window._dashGeocoder = new google.maps.Geocoder();
      window._dashGeocoder.geocode({ location: pos }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const addr = results[0].formatted_address;
          // Extract a shorter version for the small pill
          const shortAddr = addr.split(',').slice(0, 2).join(',').trim();
          if (gpsAddrDisplay) gpsAddrDisplay.textContent = shortAddr;
          if (navTooltip) navTooltip.textContent = `Live Location: ${addr}`;
        } else {
          if (gpsAddrDisplay) gpsAddrDisplay.textContent = 'Address unavailable';
          if (navTooltip) navTooltip.textContent = 'Live location active (Address unavailable)';
        }
      });
    } else {
      if (gpsAddrDisplay) gpsAddrDisplay.textContent = 'Acquiring address...';
    }
    const miniStatus = $('#miniMapStatusText');
    if (miniStatus) miniStatus.textContent = `${location.ward || 'Ward 6'} · GPS active`;
    const gpsLabel = $('#mapGpsStatusLabel');
    if (gpsLabel) gpsLabel.textContent = location.confidence || 'Located';
    const liveLabel = $('#mapLiveLabel');
    if (liveLabel) liveLabel.textContent = `${location.ward || 'Ward 6'} · ${location.zone || 'GPS'}`;
  }

  function startRealtimeGPS() {
    // Show the most recently consented location immediately while a fresh GPS fix is acquired.
    try {
      const savedLocation = JSON.parse(localStorage.getItem('ns_live_location') || 'null');
      if (savedLocation && Number.isFinite(savedLocation.latitude) && Number.isFinite(savedLocation.longitude)) {
        const mapPos = geoToMapPosition(savedLocation.latitude, savedLocation.longitude);
        updateUserLocationOnMap({
          address: 'Recent consented location', ward: 'Your ward', zone: 'Saved location',
          mapTop: mapPos.mapTop, mapLeft: mapPos.mapLeft,
          geoLat: savedLocation.latitude, geoLng: savedLocation.longitude,
          accuracy: savedLocation.accuracy,
          confidence: 'Refreshing GPS…'
        });
      }
    } catch (_) { /* Storage is optional. */ }
    if (!navigator.geolocation) {
      updateGPSIndicator('error', 'No GPS');
      return;
    }
    updateGPSIndicator('searching', 'Locating...');
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        currentGeoPos = { latitude, longitude, accuracy };
        const mapPos = geoToMapPosition(latitude, longitude);
        updateUserLocationOnMap({
          address: `GPS (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`,
          ward: 'Ward 6', zone: 'Live GPS',
          mapTop: mapPos.mapTop, mapLeft: mapPos.mapLeft,
          geoLat: latitude, geoLng: longitude,
          accuracy: accuracy,
          confidence: `±${Math.round(accuracy)}m`
        });
      },
      (err) => {
        updateGPSIndicator('error', 'Denied');
        updateUserLocationOnMap({
          address: 'Alkapuri, Ward 6', ward: 'Ward 6', zone: 'Ward Center',
          mapTop: 50, mapLeft: 50,
          geoLat: WARD_LATLNG.lat, geoLng: WARD_LATLNG.lng,
          confidence: 'Approx'
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  }

  function updateGPSIndicator(stateStr, text) {
    const el = $('#gpsLiveIndicator');
    const display = $('#gpsCoordDisplay');
    const addr = $('#gpsAddressDisplay');
    if (el) el.className = `dash-gps-live ${stateStr}`;
    if (display) display.textContent = text;
    if (addr) addr.textContent = stateStr === 'error' ? 'Location access denied' : 'Acquiring signal...';
  }

  async function locateUserForMap() {
    const gpsLabel = $('#mapGpsStatusLabel');
    if (gpsLabel) gpsLabel.textContent = 'Locating...';
    updateGPSIndicator('searching', 'Locating...');
    try {
      const position = await requestBrowserLocation();
      const { latitude, longitude, accuracy } = position.coords;
      const mapPosition = geoToMapPosition(latitude, longitude);
      const location = {
        address: `Current GPS position (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`,
        ward: 'Ward 6', zone: 'Live location',
        mapTop: mapPosition.mapTop, mapLeft: mapPosition.mapLeft,
        geoLat: latitude, geoLng: longitude,
        accuracy: accuracy,
        confidence: `GPS ±${Math.round(accuracy)}m`
      };
      updateUserLocationOnMap(location);
      if ($('#mapAddressSearch')) $('#mapAddressSearch').value = location.address;
      showToast('Live map centered on your current location.', 'success');
    } catch (err) {
      if (gpsLabel) gpsLabel.textContent = 'Manual';
      updateGPSIndicator('error', 'Denied');
      showToast(err.message || 'Location permission was blocked. Search by address instead.', 'warning');
    }
  }

  function searchMapAddress() {
    const input = $('#mapAddressSearch');
    if (!input) return;
    const value = input.value.trim();
    if (!value) { showToast('Enter an address or landmark to locate it on the map.', 'warning'); return; }

    // Try Google Geocoder first if available
    if (window.google && window.google.maps && googleMap) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: value + ', Vadodara, India' }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const loc = results[0].geometry.location;
          googleMap.panTo(loc);
          googleMap.setZoom(16);
          updateUserLocationOnMap({
            address: results[0].formatted_address,
            ward: 'Ward 6', zone: 'Search result',
            mapTop: 50, mapLeft: 50,
            geoLat: loc.lat(), geoLng: loc.lng(),
            confidence: 'Geocoded'
          });
          if ($('#mapSearchHint')) $('#mapSearchHint').textContent = `Found: ${results[0].formatted_address}`;
          showToast(`Located: ${results[0].formatted_address}`, 'success');
        } else {
          // Fallback to local lookup
          const location = deriveLocation(value);
          updateUserLocationOnMap(location);
          if (googleMap) googleMap.panTo({ lat: location.geoLat, lng: location.geoLng });
          if ($('#mapSearchHint')) $('#mapSearchHint').textContent = `${location.confidence}: ${location.address}`;
          showToast(`Located: ${location.address}`, 'success');
        }
      });
    } else {
      const location = deriveLocation(value);
      updateUserLocationOnMap(location);
      if ($('#mapSearchHint')) $('#mapSearchHint').textContent = `${location.confidence}: ${location.address}`;
      showToast(`Located: ${location.address}`, 'success');
    }
  }

  $$('.map-sidebar-filters input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', renderMapPins);
  });

  const mapLocateMeBtn = $('#mapLocateMeBtn');
  if (mapLocateMeBtn) mapLocateMeBtn.addEventListener('click', locateUserForMap);

  const mapSearchBtn = $('#mapSearchBtn');
  if (mapSearchBtn) mapSearchBtn.addEventListener('click', searchMapAddress);

  const mapAddressSearch = $('#mapAddressSearch');
  if (mapAddressSearch) {
    mapAddressSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') searchMapAddress();
    });
  }

  // Initialize mini map + GPS — works whether Maps API loads first or after dashboard.js
  function onMapsApiReady() {
    initMiniMap();
    if (!watchId) startRealtimeGPS();
  }

  // If Maps API already loaded (rare), run now; otherwise hook _dashReady callback
  if (window.google && window.google.maps) {
    setTimeout(onMapsApiReady, 300);
  } else {
    window._dashReady = onMapsApiReady;
  }

  // Mini map expand button
  const miniMapExpandBtn = $('#miniMapExpandBtn');
  if (miniMapExpandBtn) miniMapExpandBtn.addEventListener('click', () => switchTab('map'));

  // Animated stat counters
  function animateCounter(el, target, suffix = '') {
    if (!el) return;
    const start = 0;
    const duration = 1200;
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // Run counters on load
  setTimeout(() => {
    const xpEl = $('#statXPCount');
    if (xpEl) {
      xpEl.innerHTML = '';
      animateCounter(xpEl, state.userXP);
      setTimeout(() => {
        if (xpEl) xpEl.innerHTML = `${state.userXP} <span class="lbl-pts">XP</span>`;
      }, 1250);
    }
    animateCounter($('#statActiveComplaintsCount'), state.activeComplaints.filter(c => c.status !== 'Resolved').length);
    animateCounter($('#statServicesUsedCount'), state.servicesUsed);
  }, 300);

  // ── 9. DYNAMIC CIVIC POLL VOTING ────────────────────────────
  const civicPollCard = $('#civicPollCard');
  if (civicPollCard) {
    $$('.btn-poll-vote', civicPollCard).forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (state.pollVoted) return;
        
        const optionId = e.currentTarget.closest('.poll-option-row').id.replace('pollOpt', '');
        state.pollVotes[optionId]++;
        state.pollVoted = true;

        // Recalculate percentages
        const totalVotes = Object.values(state.pollVotes).reduce((a, b) => a + b, 0);
        
        for (let key in state.pollVotes) {
          const optRow = $('#pollOpt' + key);
          const percent = Math.round((state.pollVotes[key] / totalVotes) * 100);
          
          const pctLabel = optRow.querySelector('.option-pct');
          const bgBar = optRow.querySelector('.poll-option-bg');
          
          pctLabel.textContent = percent + '%';
          bgBar.style.width = percent + '%';
        }

        $('#pollTotalVotesLabel').textContent = `Total Votes: ${totalVotes} Verified Citizens (You voted Option ${optionId})`;
        showToast('Vote secured using Aadhaar Identity validation token.', 'success');
        
        // Save state updates
        state.userXP += 30; // XP Reward
        $('#statXPCount').innerHTML = `${state.userXP} <span class="lbl-pts">XP</span>`;
        $('#leaderboardUserXP').textContent = `${state.userXP} XP`;
      });
    });
  }

  // ── 10. REAL-TIME SOS EMERGENCY & SIMULATED GPS STREAM ──────
  const sosBtn = $('#fullSOSBtn');
  const sosStatus = $('#sosStatusOutput');
  const sosPulseRing = $('#sosPulseRing');
  let sosInterval = null;
  let countdownTimer = null;

  if (sosBtn && sosStatus) {
    sosBtn.addEventListener('click', () => {
      if (sosBtn.classList.contains('active')) {
        // Cancel SOS
        sosBtn.classList.remove('active');
        sosPulseRing.style.animation = '';
        clearInterval(sosInterval);
        clearTimeout(countdownTimer);
        sosStatus.textContent = 'System Idle · Location Ready';
        sosStatus.classList.remove('activating');
        showToast('Emergency SOS signal terminated.', 'info');
      } else {
        // Trigger SOS
        sosBtn.classList.add('active');
        sosPulseRing.style.animation = 'sosPulse 0.8s infinite ease-out';
        
        let seconds = 3;
        sosStatus.textContent = `TRANSMITTING BEACON IN ${seconds}s...`;
        sosStatus.classList.add('activating');

        countdownTimer = setInterval(() => {
          seconds--;
          if (seconds > 0) {
            sosStatus.textContent = `TRANSMITTING BEACON IN ${seconds}s...`;
          } else {
            clearInterval(countdownTimer);
            const baseLat = state.currentLocation?.geoLat || 22.2936;
            const baseLng = state.currentLocation?.geoLng || 73.1810;
            sosStatus.textContent = `BEACON LIVE - L: ${baseLat.toFixed(4)}° N, L: ${baseLng.toFixed(4)}° E`;
            showToast('SOS broadcast sent to disaster management and police grids.', 'danger');
            
            // Start simulated real-time GPS stream
            sosInterval = setInterval(() => {
              const latRandom = (baseLat + (Math.random() - 0.5) * 0.002).toFixed(4);
              const lngRandom = (baseLng + (Math.random() - 0.5) * 0.002).toFixed(4);
              sosStatus.textContent = `BEACON LIVE - L: ${latRandom}° N, L: ${lngRandom}° E`;
            }, 1500);
          }
        }, 1000);
      }
    });
  }

  // ── 11. GOV SERVICES checkout & PAY INVOICES (REAL-TIME) ──────
  const paymentModal = $('#paymentModal');
  const confirmPaymentBtn = $('#confirmPaymentBtn');
  const closePaymentModalBtn = $('#closePaymentModalBtn');
  const cancelPaymentBtn = $('#cancelPaymentBtn');

  if (closePaymentModalBtn) closePaymentModalBtn.addEventListener('click', () => paymentModal.setAttribute('hidden', ''));
  if (cancelPaymentBtn) cancelPaymentBtn.addEventListener('click', () => paymentModal.setAttribute('hidden', ''));

  const triggerPaymentTax = $('#payTaxBtn');
  if (triggerPaymentTax) {
    triggerPaymentTax.addEventListener('click', () => {
      paymentModal.removeAttribute('hidden');
    });
  }

  if (confirmPaymentBtn) {
    confirmPaymentBtn.addEventListener('click', () => {
      confirmPaymentBtn.textContent = 'Verifying with UPI...';
      confirmPaymentBtn.disabled = true;
      
      setTimeout(() => {
        paymentModal.setAttribute('hidden', '');
        confirmPaymentBtn.textContent = 'Proceed with Payment';
        confirmPaymentBtn.disabled = false;
        
        // Update Property Tax Service Badge state
        const srvCardTax = $('#srvCardTax');
        if (srvCardTax) {
          const badge = $('#srvBadgeTax');
          badge.className = 'badge badge-success';
          badge.textContent = 'Settled';
          triggerPaymentTax.style.display = 'none';
          
          const paidBtn = document.createElement('button');
          paidBtn.className = 'btn btn-secondary btn-sm';
          paidBtn.disabled = true;
          paidBtn.textContent = 'Paid (Aug)';
          triggerPaymentTax.parentNode.insertBefore(paidBtn, triggerPaymentTax);
        }

        // Increment stats counters
        state.servicesUsed++;
        $('#statServicesUsedCount').textContent = state.servicesUsed;

        showToast('Assessment Tax Payment Successful! Invoice sent to registered mobile.', 'success');
      }, 1500);
    });
  }

  // e-District Single Sign-on Application simulator
  $$('.srv-apply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const srvName = btn.dataset.service;
      btn.textContent = 'Applying...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.textContent = 'Open Application';
        btn.disabled = false;
        
        // Update Badge
        const badge = btn.closest('.service-application-card').querySelector('.badge');
        badge.className = 'badge badge-warning';
        badge.textContent = 'In Progress';
        
        state.servicesUsed++;
        $('#statServicesUsedCount').textContent = state.servicesUsed;

        showToast(`${srvName} verification initiated under Application Reference number.`, 'success');
      }, 1800);
    });
  });

  // ── 12. PROJECT PHOTO RESOLUTION / SITE IMAGES ────────────────
  const photosModal = $('#photosModal');
  const closePhotosModalBtn = $('#closePhotosModalBtn');

  if (closePhotosModalBtn) {
    closePhotosModalBtn.addEventListener('click', () => photosModal.setAttribute('hidden', ''));
  }

  $$('.btn-view-photos').forEach(btn => {
    btn.addEventListener('click', () => {
      const project = btn.dataset.project;
      const progress = btn.dataset.progress;

      $('#photosProjectTitle').textContent = project;
      $('#photosProjectProgress').textContent = `Current Progress: ${progress}`;

      const afterContainer = $('#photosAfterContainer');
      const afterLabel = $('#photosAfterLabel');

      if (progress === '100%') {
        afterContainer.textContent = '🌳';
        afterContainer.style.background = '#dcfce7';
        afterLabel.textContent = 'Work Resolution Proof (Completed)';
      } else {
        afterContainer.textContent = '🚜';
        afterContainer.style.background = '#cbd5e1';
        afterLabel.textContent = 'Current Status (In-Progress)';
      }

      photosModal.removeAttribute('hidden');
    });
  });

  // ── 13. DIGILOCKER LINK NEW VERIFICATION CARD ────────────────
  const linkDocModal = $('#linkDocModal');
  const triggerLinkDoc = $('#linkNewDocBtn');
  const closeLinkDoc = $('#closeLinkDocModalBtn');
  const cancelLinkDoc = $('#cancelLinkDocBtn');
  const linkDocForm = $('#linkDocForm');

  if (triggerLinkDoc) triggerLinkDoc.addEventListener('click', () => linkDocModal.removeAttribute('hidden'));
  if (closeLinkDoc) closeLinkDoc.addEventListener('click', () => linkDocModal.setAttribute('hidden', ''));
  if (cancelLinkDoc) cancelLinkDoc.addEventListener('click', () => linkDocModal.setAttribute('hidden', ''));

  if (linkDocForm) {
    linkDocForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const docTypeSelect = $('#linkDocType');
      const docType = docTypeSelect.options[docTypeSelect.selectedIndex].text;
      const docNum = $('#linkDocNum').value;

      let icon = '📄';
      if (docType.includes('PAN')) icon = '💳';
      if (docType.includes('Voter')) icon = '🗳️';
      const safeDocType = escapeHTML(docType);
      const safeDocNum = escapeHTML(docNum);

      const container = $('#digilockerDocsContainer');
      if (container) {
        const item = document.createElement('div');
        item.className = 'vault-doc-item';
        item.innerHTML = `
          <div class="doc-meta">
            <span class="doc-icon">${icon}</span>
            <div>
              <h4 class="doc-name">${safeDocType}</h4>
              <p class="doc-id-num">${escapeHTML(docNum.substring(0, 4))}XXXXXX</p>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm btn-view-doc" data-doc="${safeDocType}">View</button>
        `;
        
        container.appendChild(item);
        
        // Bind click viewer to new doc
        item.querySelector('.btn-view-doc').addEventListener('click', () => {
          $('#docModalTitle').textContent = docType;
          $('#docDisplayArea').innerHTML = `
            <div class="mock-aadhaar-card" style="border-color:#10b981;">
              <div class="aadhaar-header" style="color:#10b981; border-bottom-color:#10b981;">VERIFIED CREDENTIAL · DIGILOCKER</div>
              <div class="aadhaar-photo">👤</div>
              <div class="aadhaar-info">
                <strong>Document:</strong> ${safeDocType}<br/>
                <strong>Status:</strong> Linked Verified<br/>
                <strong>Holder Name:</strong> Rahul Sharma<br/>
                <strong>Document ID:</strong> ${safeDocNum}
              </div>
              <div class="aadhaar-num" style="color:#10b981;">DIGI-${Math.floor(1000 + Math.random() * 9000)}</div>
            </div>
          `;
          $('#documentModal').removeAttribute('hidden');
        });
      }

      linkDocModal.setAttribute('hidden', '');
      linkDocForm.reset();
      showToast(`${docType} linked successfully via Aadhaar authorization.`, 'success');
    });
  }

  // ── 14. PROFILE VOLUNTEER TOGGLE ────────────────────────────
  const volunteerToggle = $('#volunteerStatusToggle');
  const profBadge = $('#profileVolunteerBadge');
  
  if (volunteerToggle && profBadge) {
    volunteerToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        profBadge.textContent = `⭐️ Verified Volunteer · ${state.userXP} XP`;
        $('#userMenuBtn .dash-user-avatar').style.background = 'var(--success)';
        showToast('Volunteer profile activated. You are eligible for emergency alerts nearby.', 'success');
      } else {
        profBadge.textContent = `⭐️ Verified Citizen · ${state.userXP} XP`;
        $('#userMenuBtn .dash-user-avatar').style.background = 'var(--primary-dark)';
        showToast('Volunteer profile deactivated.', 'info');
      }
    });
  }

  // ── 15. COMMUNITY CATEGORY FILTERING ────────────────────────
  const commCatFilters = $('#commCategoryFilters');
  if (commCatFilters) {
    $$('.comm-tab', commCatFilters).forEach(tab => {
      tab.addEventListener('click', (e) => {
        $$('.comm-tab', commCatFilters).forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        const cat = e.target.dataset.category;
        $$('.post-card').forEach(post => {
          if (cat === 'all' || post.dataset.category === cat) {
            post.style.display = 'block';
          } else {
            post.style.display = 'none';
          }
        });
      });
    });
  }

  // ── 16. POST UPVOTE & COMMENT (REAL-TIME) ────────────────────
  $$('.btn-upvote').forEach(btn => {
    btn.addEventListener('click', () => {
      const countEl = btn.querySelector('.upvote-count');
      const currentCount = parseInt(countEl.textContent);
      if (btn.dataset.voted) {
        // Undo upvote
        countEl.textContent = currentCount - 1;
        delete btn.dataset.voted;
        btn.style.background = '';
        btn.style.color = '';
      } else {
        // Upvote
        countEl.textContent = currentCount + 1;
        btn.dataset.voted = 'true';
        btn.style.background = 'var(--primary-light)';
        btn.style.color = 'var(--primary)';
        // Award XP for civic participation
        state.userXP += 5;
        updateXPDisplay();
        showToast('Upvote recorded. +5 XP awarded for civic participation.', 'success');
      }
    });
  });

  $$('.btn-comment').forEach(btn => {
    btn.addEventListener('click', () => {
      const countEl = btn.querySelector('.comment-count');
      const post = btn.closest('.post-card');
      
      // Create comment input inline
      let commentBox = post.querySelector('.inline-comment-box');
      if (commentBox) {
        commentBox.remove();
        return;
      }

      commentBox = document.createElement('div');
      commentBox.className = 'inline-comment-box';
      commentBox.style.cssText = 'margin-top:10px; display:flex; gap:8px;';
      commentBox.innerHTML = `
        <input type="text" class="reg-input" style="flex:1; padding:6px 10px; font-size:0.8rem; border-radius:6px;" placeholder="Write a comment..." />
        <button class="btn btn-primary btn-sm post-comment-submit">Post</button>
      `;
      post.appendChild(commentBox);
      commentBox.querySelector('input').focus();

      commentBox.querySelector('.post-comment-submit').addEventListener('click', () => {
        const text = commentBox.querySelector('input').value.trim();
        if (!text) return;

        // Add comment bubble
        const commentBubble = document.createElement('div');
        commentBubble.className = 'post-comment-bubble';
        commentBubble.style.cssText = 'background:var(--surface-2); border:1px solid var(--border); border-radius:6px; padding:6px 10px; font-size:0.8rem; margin-top:6px;';
        commentBubble.innerHTML = `<strong>Rahul Sharma:</strong> ${escapeHTML(text)}`;
        post.insertBefore(commentBubble, commentBox);

        // Update comment count
        const currentCommentCount = parseInt(countEl.textContent);
        countEl.textContent = currentCommentCount + 1;

        commentBox.querySelector('input').value = '';
        showToast('Comment posted to Ward Discussion.', 'success');
      });
    });
  });

  // ── 17. WRITE COMMUNITY POST MODAL ───────────────────────────
  const createPostBtn = $('#createPostBtn');
  if (createPostBtn) {
    createPostBtn.addEventListener('click', () => {
      // Build inline post creation form
      const feed = $('#communityPostsFeed');
      const existingForm = $('#inlinePostForm');
      if (existingForm) { existingForm.remove(); return; }

      const form = document.createElement('div');
      form.id = 'inlinePostForm';
      form.style.cssText = 'background:white; border:2px solid var(--primary); border-radius:16px; padding:20px; margin-bottom:16px;';
      form.innerHTML = `
        <h4 style="font-size:0.9rem; font-weight:800; margin-bottom:12px;">📝 New Community Post</h4>
        <select class="reg-select" id="newPostCategory" style="margin-bottom:8px; font-size:0.8rem;">
          <option value="water">Water</option>
          <option value="roads">Roads</option>
          <option value="garbage">Garbage</option>
          <option value="safety">Public Safety</option>
        </select>
        <input type="text" class="reg-input" id="newPostTitle" placeholder="Post title (e.g. Stray cables near park entrance)" style="margin-bottom:8px; font-size:0.85rem;" />
        <textarea class="reg-input" id="newPostBody" rows="3" placeholder="Describe the civic issue in detail..." style="font-size:0.85rem; margin-bottom:10px;"></textarea>
        <div style="display:flex; gap:8px; justify-content:flex-end;">
          <button class="btn btn-secondary btn-sm" id="cancelPostBtn">Cancel</button>
          <button class="btn btn-primary btn-sm" id="submitPostBtn">Post to Ward Feed</button>
        </div>
      `;
      feed.insertBefore(form, feed.firstChild);

      $('#cancelPostBtn').addEventListener('click', () => form.remove());
      $('#submitPostBtn').addEventListener('click', () => {
        const title = $('#newPostTitle').value.trim();
        const body = $('#newPostBody').value.trim();
        const category = $('#newPostCategory').value;
        if (!title || !body) { showToast('Please fill in all fields.', 'warning'); return; }

        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.dataset.category = category;
        postCard.innerHTML = `
          <div class="post-user-header">
            <div class="post-user-avatar">RS</div>
            <div>
              <div class="post-user-name">Rahul Sharma <span class="badge-volunteer">Volunteer</span></div>
              <div class="post-user-meta">Ward 6 · Just now · Contribution Score: ${state.userXP} XP</div>
            </div>
          </div>
          <h4 class="post-title">${escapeHTML(title)}</h4>
          <p class="post-body">${escapeHTML(body)}</p>
          <div class="post-actions">
            <button class="post-action-btn btn-upvote"><span>▲ Upvote</span> <span class="upvote-count">0</span></button>
            <button class="post-action-btn btn-comment"><span>💬 Comments</span> <span class="comment-count">0</span></button>
            <span class="post-category-tag">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </div>
        `;
        feed.insertBefore(postCard, form.nextSibling);

        // Bind upvote and comment to new post
        postCard.querySelector('.btn-upvote').addEventListener('click', function() {
          const cnt = parseInt(this.querySelector('.upvote-count').textContent);
          this.querySelector('.upvote-count').textContent = cnt + 1;
          state.userXP += 5;
          updateXPDisplay();
          showToast('+5 XP for civic engagement!', 'success');
        });

        form.remove();
        state.userXP += 20; // bonus XP for posting
        updateXPDisplay();
        showToast(`Post published to Ward 6 Community Feed. +20 XP!`, 'success');
      });
    });
  }

  // ── 18. GOVERNMENT SERVICES CATEGORY FILTERING ────────────────
  const servicesCategoryFilters = $('#servicesCategoryFilters');
  if (servicesCategoryFilters) {
    $$('.srv-cat-tab', servicesCategoryFilters).forEach(tab => {
      tab.addEventListener('click', (e) => {
        $$('.srv-cat-tab', servicesCategoryFilters).forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        const cat = e.target.dataset.cat;
        $$('.service-application-card').forEach(card => {
          if (cat === 'all' || card.dataset.cat === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ── 19. DEVELOPMENT PROJECTS TAB FILTERING ─────────────────
  const projectCategoryFilters = $('#projectCategoryFilters');
  if (projectCategoryFilters) {
    $$('.proj-tab', projectCategoryFilters).forEach(tab => {
      tab.addEventListener('click', (e) => {
        $$('.proj-tab', projectCategoryFilters).forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        const status = e.target.dataset.status;
        $$('.project-status-card').forEach(card => {
          if (status === 'all' || card.dataset.status === status) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ── 20. DIGILOCKER DOCUMENT VIEWER (EXISTING DOCS) ──────────
  $$('.btn-view-doc').forEach(btn => {
    btn.addEventListener('click', () => {
      const docType = btn.dataset.doc;
      const docModal = $('#documentModal');
      $('#docModalTitle').textContent = docType;
      
      let html = '';
      if (docType === 'Aadhaar Card') {
        html = `
          <div class="mock-aadhaar-card">
            <div class="aadhaar-header">GOVERNMENT OF INDIA · UNIQUE IDENTIFICATION AUTHORITY OF INDIA</div>
            <div style="display:flex; gap:12px; margin-bottom:10px;">
              <div class="aadhaar-photo">👤</div>
              <div class="aadhaar-info">
                <strong>Name:</strong> Rahul Sharma<br/>
                <strong>DOB:</strong> 15/04/1990<br/>
                <strong>Gender:</strong> Male<br/>
                <strong>Address:</strong> Alkapuri, Ward 6, Vadodara, GJ
              </div>
            </div>
            <div class="aadhaar-num">1284 9471 8429</div>
          </div>
        `;
      } else if (docType === 'Driving License') {
        html = `
          <div class="mock-aadhaar-card" style="border-color:#1e3a8a;">
            <div class="aadhaar-header" style="color:#1e3a8a; border-bottom-color:#1e3a8a;">TRANSPORT DEPT, GOVERNMENT OF GUJARAT</div>
            <div style="display:flex; gap:12px; margin-bottom:10px;">
              <div class="aadhaar-photo">👤</div>
              <div class="aadhaar-info">
                <strong>License No:</strong> GJ-06-2015-0048291<br/>
                <strong>Name:</strong> Rahul Sharma<br/>
                <strong>COV (Class of Vehicle):</strong> MCWG, LMV<br/>
                <strong>Validity:</strong> 14/04/2035
              </div>
            </div>
            <div class="aadhaar-num" style="font-size:0.95rem; color:#1e3a8a;">GJ-06-2015-0048291</div>
          </div>
        `;
      }
      
      $('#docDisplayArea').innerHTML = html || `<p style="text-align:center; color:var(--text-secondary);">Document preview not available.</p>`;
      docModal.removeAttribute('hidden');
    });
  });

  const closeDocModalBtn = $('#closeDocModalBtn');
  if (closeDocModalBtn) {
    closeDocModalBtn.addEventListener('click', () => $('#documentModal').setAttribute('hidden', ''));
  }

  // ── 21. NOTIFICATION PANEL (BELL CLICK) ──────────────────────
  const notifBtn = $('#topNotifBtn');
  let notifPanel = null;
  const notifications = [
    { icon: '🔧', text: 'PWD Engineer updated Complaint CVC-2026-98124: "Work commenced tonight."', time: '2 min ago', unread: true },
    { icon: '🌧️', text: 'Emergency Alert: Heavy rain warning for Ward 6. Stay indoors.', time: '1 hr ago', unread: true },
    { icon: '🗳️', text: 'Community poll closing in 2 days. Cast your vote now.', time: '3 hrs ago', unread: true },
    { icon: '✅', text: 'Water Pipe complaint CVC-2026-77341 resolved and closed.', time: 'Yesterday', unread: false },
    { icon: '💸', text: 'Property tax assessment FY25-26 is due in 15 days.', time: 'Yesterday', unread: false },
  ];

  if (notifBtn) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      if (notifPanel) {
        notifPanel.remove();
        notifPanel = null;
        return;
      }

      notifPanel = document.createElement('div');
      notifPanel.id = 'notificationPanel';
      notifPanel.style.cssText = `
        position: fixed; top: 72px; right: 180px; z-index: 200;
        width: 340px; background: white; border: 1px solid var(--border);
        border-radius: 16px; box-shadow: 0 20px 60px rgba(15,23,42,0.15);
        overflow: hidden; animation: scaleUp 0.2s ease;
      `;

      const unreadCount = notifications.filter(n => n.unread).length;
      let itemsHtml = notifications.map((n, i) => `
        <div style="display:flex; gap:10px; padding:12px 16px; border-bottom:1px solid var(--border-light); background:${n.unread ? 'var(--primary-light)' : 'white'}; cursor:pointer;" class="notif-item" data-index="${i}">
          <span style="font-size:1.2rem; flex-shrink:0;">${n.icon}</span>
          <div>
            <p style="font-size:0.8rem; font-weight:${n.unread ? '700' : '500'}; color:var(--text-primary); margin-bottom:2px;">${n.text}</p>
            <span style="font-size:0.7rem; color:var(--text-tertiary);">${n.time}</span>
          </div>
        </div>
      `).join('');

      notifPanel.innerHTML = `
        <div style="padding:12px 16px; border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-size:0.9rem; font-weight:800;">Notifications <span style="background:var(--danger); color:white; font-size:0.65rem; padding:2px 6px; border-radius:10px; margin-left:6px;">${unreadCount}</span></h3>
          <button id="markAllReadBtn" style="font-size:0.75rem; font-weight:700; color:var(--primary); background:none; border:none; cursor:pointer;">Mark all read</button>
        </div>
        <div style="max-height:360px; overflow-y:auto;">${itemsHtml}</div>
        <div style="padding:10px; border-top:1px solid var(--border); text-align:center;">
          <button style="font-size:0.8rem; font-weight:700; color:var(--primary); background:none; border:none; cursor:pointer;">View All Notifications →</button>
        </div>
      `;

      document.body.appendChild(notifPanel);

      // Mark all as read
      notifPanel.querySelector('#markAllReadBtn').addEventListener('click', () => {
        notifications.forEach(n => n.unread = false);
        $$('.notif-item', notifPanel).forEach(item => item.style.background = 'white');
        $$('.notif-item strong', notifPanel).forEach(el => el.style.fontWeight = '500');
        $('#notifBadgeCount').style.display = 'none';
        showToast('All notifications marked as read.', 'success');
      });

      // Dismiss individual notification on click
      $$('.notif-item', notifPanel).forEach(item => {
        item.addEventListener('click', () => {
          const idx = parseInt(item.dataset.index);
          notifications[idx].unread = false;
          item.style.background = 'white';
          const remaining = notifications.filter(n => n.unread).length;
          const badge = $('#notifBadgeCount');
          if (remaining > 0) {
            badge.textContent = remaining;
            badge.style.display = '';
          } else {
            badge.style.display = 'none';
          }
        });
      });

      document.addEventListener('click', function closePanel(evt) {
        if (!notifPanel.contains(evt.target) && evt.target !== notifBtn) {
          if (notifPanel) { notifPanel.remove(); notifPanel = null; }
          document.removeEventListener('click', closePanel);
        }
      });
    });
  }

  // ── 22. MAP ZOOM CONTROLS ────────────────────────────────────
  let mapScale = 1;
  const mapCanvas = $('#liveMapCanvas');
  const mapPinsContainer = $('#mapPinsContainer');

  const mapZoomInBtn = $('#mapZoomInBtn');
  const mapZoomOutBtn = $('#mapZoomOutBtn');

  if (mapZoomInBtn && mapCanvas) {
    mapZoomInBtn.addEventListener('click', () => {
      mapScale = Math.min(mapScale + 0.2, 2.0);
      if (mapPinsContainer) mapPinsContainer.style.transform = `scale(${mapScale})`;
      mapPinsContainer.style.transformOrigin = 'center center';
      showToast(`Map zoom: ${Math.round(mapScale * 100)}%`, 'info');
    });
  }

  if (mapZoomOutBtn && mapCanvas) {
    mapZoomOutBtn.addEventListener('click', () => {
      mapScale = Math.max(mapScale - 0.2, 0.6);
      if (mapPinsContainer) mapPinsContainer.style.transform = `scale(${mapScale})`;
      showToast(`Map zoom: ${Math.round(mapScale * 100)}%`, 'info');
    });
  }

  // ── 23. AI CHAT FULL PANEL (REAL-TIME WITH SMART RESPONSES) ──
  const aiChatField = $('#aiChatField');
  const aiChatSendBtn = $('#aiChatSendBtn');
  const aiHistory = $('#aiFullChatHistory');

  const aiResponses = {
    'kisan': 'Based on your registered Aadhaar (XXXX-8429), you are listed as an eligible farmer under PM-Kisan Samman Nidhi. The 17th installment of ₹2,000 was credited on June 18, 2026. Your next installment is due in October 2026.',
    'income certificate': 'To apply for an income certificate in Gujarat: open the Digital Gujarat citizen services portal, sign in with Aadhaar, and choose Revenue Department → Income Certificate. Keep Aadhaar, ration-card, and bank-statement details ready.',
    'pothole': 'I found your active complaint CVC-2026-98124 (Pothole at 8th Cross). Current status: Work In Progress. PWD Engineer Anil Sharma estimates completion by Aug 8. Shall I send a reminder to the assigned officer?',
    'water': 'Active water outage alert: Municipal water supply is suspended in Alkapuri until 8:00 PM tonight due to pipeline valve repair. For emergencies, VMC Water Works helpline: 1916.',
    'complaint': 'I can help you register a complaint. Please describe the issue and I will auto-fill the form. Common categories: Road Damage, Water Leakage, Garbage, Streetlight, Sewage.',
    'translate': 'I can translate your document. Please upload the file or paste the text. I support: Hindi, Kannada, Tamil, Telugu, Marathi, Bengali.',
    'scheme': 'Based on your citizen profile, you may be eligible for: (1) Ayushman Bharat - PM-JAY health insurance, (2) PMAY-Urban housing scheme, (3) PM Mudra Yojana for small businesses. Shall I check detailed eligibility for any of these?',
    'emergency': 'Emergency contacts for Ward 6: Police (100), Fire (101), Ambulance (108), Women Helpline (1091), VMC Emergency (1533). Nearest hospital: Victoria Hospital, 1.2 km away. Shall I trigger your SOS beacon?',
    'hello': 'Namaste Rahul! How can I assist you today? I can help with government schemes, complaints, certificates, emergency services, or translate documents.',
    'tax': 'Your property tax for Assessment Code Ward14-8291 is due in 15 days. Outstanding amount: ₹4,250. You can pay via UPI, Net Banking, or card. Shall I take you to the payment screen?',
  };

  function getAIResponse(input) {
    const lower = input.toLowerCase();
    for (const key in aiResponses) {
      if (lower.includes(key)) return aiResponses[key];
    }
    return `I am checking our government databases for "${input}"... This topic may involve multiple departments. Please visit the relevant service page or call the Ward 6 helpline at 080-22221188 for further assistance.`;
  }

  function appendChatMessage(text, sender, historyEl) {
    const msg = document.createElement('div');
    msg.className = `chat-item ${sender === 'user' ? 'user-msg' : 'system-msg'}`;
    const safeText = escapeHTML(text);
    msg.innerHTML = sender === 'ai'
      ? `<span class="chat-emoji">🤖</span><div class="chat-text">${safeText}</div>`
      : `<div class="chat-text" style="background:var(--primary); color:white; padding:8px 12px; border-radius:8px 8px 2px 8px;">${safeText}</div>`;
    historyEl.appendChild(msg);
    historyEl.scrollTop = historyEl.scrollHeight;
  }

  function handleAiMessage(inputEl, historyEl) {
    const text = inputEl.value.trim();
    if (!text) return;

    appendChatMessage(text, 'user', historyEl);
    inputEl.value = '';

    // Typing indicator
    const typingEl = document.createElement('div');
    typingEl.className = 'chat-item system-msg';
    typingEl.id = 'aiTypingIndicator';
    typingEl.innerHTML = `<span class="chat-emoji">🤖</span><div class="chat-text" style="color:var(--text-tertiary); font-style:italic;">Sahayak is typing...</div>`;
    historyEl.appendChild(typingEl);
    historyEl.scrollTop = historyEl.scrollHeight;

    setTimeout(() => {
      const indicator = $('#aiTypingIndicator');
      if (indicator) indicator.remove();
      const response = getAIResponse(text);
      appendChatMessage(response, 'ai', historyEl);
    }, 900 + Math.random() * 800);
  }

  if (aiChatSendBtn && aiChatField) {
    aiChatSendBtn.addEventListener('click', () => handleAiMessage(aiChatField, aiHistory));
    aiChatField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAiMessage(aiChatField, aiHistory);
    });
  }

  // Suggestion buttons
  $$('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!aiChatField) return;
      aiChatField.value = btn.textContent;
      handleAiMessage(aiChatField, aiHistory);
    });
  });

  // Right sidebar quick AI
  const quickAiField = $('#quickAiField');
  const quickAiSubmit = $('#quickAiSubmitBtn');
  if (quickAiSubmit && quickAiField) {
    const handleQuickAI = () => {
      const text = quickAiField.value.trim();
      if (!text) return;
      switchTab('ai');
      setTimeout(() => {
        const aiInput = $('#aiChatField');
        if (aiInput) {
          aiInput.value = text;
          handleAiMessage(aiInput, $('#aiFullChatHistory'));
        }
      }, 200);
      quickAiField.value = '';
    };
    quickAiSubmit.addEventListener('click', handleQuickAI);
    quickAiField.addEventListener('keydown', e => { if (e.key === 'Enter') handleQuickAI(); });
  }

  // ── 24. VOICE INPUT (WEB SPEECH API) ─────────────────────────
  const voiceTriggerBtn = $('#voiceTriggerBtn');
  if (voiceTriggerBtn && 'webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-IN';

    voiceTriggerBtn.addEventListener('click', () => {
      voiceTriggerBtn.style.background = 'var(--danger-light)';
      voiceTriggerBtn.textContent = '🔴';
      recognition.start();
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const aiInput = $('#aiChatField');
      if (aiInput) {
        aiInput.value = transcript;
        handleAiMessage(aiInput, $('#aiFullChatHistory'));
      }
      voiceTriggerBtn.style.background = '';
      voiceTriggerBtn.textContent = '🎙️';
    };

    recognition.onerror = () => {
      voiceTriggerBtn.style.background = '';
      voiceTriggerBtn.textContent = '🎙️';
      showToast('Voice input failed. Please try again or type your query.', 'warning');
    };
  }

  // ── 25. REAL-TIME CLOCK IN TOP NAV ──────────────────────────
  function updateClock() {
    const weatherEl = $('.dash-weather-widget .weather-desc');
    if (weatherEl) {
      const now = new Date();
      const hours = now.getHours();
      const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      const greeting = hours < 12 ? 'Morning' : hours < 17 ? 'Afternoon' : 'Evening';
      weatherEl.textContent = `${greeting} · ${timeStr}`;
    }
  }

  updateClock();
  setInterval(updateClock, 60000);

  // ── 26. USER PROFILE MENU (Click avatar) ─────────────────────
  const userMenuBtn = $('#userMenuBtn');
  let profileMenu = null;

  if (userMenuBtn) {
    userMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (profileMenu) { profileMenu.remove(); profileMenu = null; return; }

      profileMenu = document.createElement('div');
      profileMenu.style.cssText = `
        position: fixed; top: 72px; right: 16px; z-index: 200;
        width: 220px; background: white; border: 1px solid var(--border);
        border-radius: 12px; box-shadow: var(--shadow-lg);
        animation: scaleUp 0.2s ease; overflow: hidden;
      `;
      profileMenu.innerHTML = `
        <div style="padding:14px; background:var(--primary-light); border-bottom:1px solid var(--border);">
          <div style="font-weight:800; font-size:0.9rem;">Rahul Sharma</div>
          <div style="font-size:0.7rem; color:var(--text-secondary);">CVC-GJ-48291 · ${state.userXP} XP</div>
        </div>
        <div style="padding:6px;">
          <button class="profile-menu-item" data-tab="profile">👤 View Profile</button>
          <button class="profile-menu-item" data-tab="ai">🤖 Ask Sahayak AI</button>
          <button class="profile-menu-item" data-tab="emergency">🚨 Emergency Center</button>
          <hr style="border:none; border-top:1px solid var(--border); margin:4px 0;" />
          <button class="profile-menu-item" id="profileLogoutBtn" style="color:var(--danger);">🚪 Logout</button>
        </div>
      `;

      document.body.appendChild(profileMenu);

      const menuItemStyle = 'display:block; width:100%; text-align:left; padding:8px 12px; font-size:0.82rem; font-weight:600; border-radius:6px; background:none; border:none; cursor:pointer; color:inherit; transition: background 0.15s;';
      $$('.profile-menu-item', profileMenu).forEach(item => {
        item.style.cssText = menuItemStyle;
        item.addEventListener('mouseenter', () => item.style.background = 'var(--surface-2)');
        item.addEventListener('mouseleave', () => item.style.background = 'none');
        if (item.dataset.tab) {
          item.addEventListener('click', () => {
            switchTab(item.dataset.tab);
            profileMenu.remove(); profileMenu = null;
          });
        }
      });

      const logoutBtn = $('#profileLogoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          if (confirm('End your New Street session?')) window.location.href = 'index.html';
        });
      }

      document.addEventListener('click', function closeMenu(evt) {
        if (profileMenu && !profileMenu.contains(evt.target) && evt.target !== userMenuBtn) {
          profileMenu.remove(); profileMenu = null;
          document.removeEventListener('click', closeMenu);
        }
      });
    });
  }

  // ── 27. LOGOUT BUTTON (SIDEBAR) ──────────────────────────────
  const logoutBtn = $('#sidebarLogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('End your New Street session?')) window.location.href = 'index.html';
    });
  }

  // ── 28. REAL-TIME XP DISPLAY SYNC ───────────────────────────
  function updateXPDisplay() {
    const statXPEl = $('#statXPCount');
    if (statXPEl) statXPEl.innerHTML = `${state.userXP} <span class="lbl-pts">XP</span>`;
    const leaderEl = $('#leaderboardUserXP');
    if (leaderEl) leaderEl.textContent = `${state.userXP} XP`;
    const headerEl = $('#headerRepXP');
    if (headerEl) headerEl.textContent = `XP: ${state.userXP}`;
    const profBadge = $('#profileVolunteerBadge');
    if (profBadge) profBadge.textContent = `⭐️ Verified Volunteer · ${state.userXP} XP`;
  }

  // ── 29. SOS TILE FROM DASHBOARD QUICK ACTIONS ─────────────────
  const tileSOS = $('#tileSOS');
  if (tileSOS) {
    tileSOS.addEventListener('click', () => {
      switchTab('emergency');
    });
  }

  // ── 30. REAL-TIME TRANSPARENT FUND TALLY (RANDOM LIVE UPDATES) ──
  function simulateFundUpdate() {
    const spentEl = $('#transBudgetSpent');
    const remainEl = $('#transBudgetRemaining');
    if (spentEl && remainEl) {
      const spent = (10.22 + Math.random() * 0.02).toFixed(2);
      const remaining = (14.20 - parseFloat(spent)).toFixed(2);
      spentEl.textContent = `₹${spent} Crore`;
      remainEl.textContent = `₹${remaining} Crore`;
    }
  }
  setInterval(simulateFundUpdate, 30000); // Update every 30 seconds

  // ── INITIALIZATION RENDERS ───────────────────────────────────
  renderComplaintsList();
  renderMapPins();
  updateXPDisplay();

});

/* ============================================================
   OPEN COMPLAINT BOX — REDDIT-STYLE MODULE (standalone IIFE)
   ============================================================ */
(function ComplaintBoxModule() {

  // ── SEED DATA ────────────────────────────────────────────────
  const boxPosts = [
    {
      id: 'cb-001',
      title: 'Massive crater-sized pothole at 8th Cross / Main Road junction — 3 vehicles damaged this week',
      body: 'The pothole has been there for over 3 months. It is now over 2 feet wide and 6 inches deep. Autorickshaw lost a wheel yesterday. Multiple complaints filed but no action taken by PWD.',
      category: 'roads',
      author: 'Ravi Kumar',
      avatar: 'RK',
      ward: 'Ward 6',
      time: '2 hours ago',
      votes: 214,
      urgent: true,
      resolved: false,
      govResponse: {
        officer: 'Anil Sharma — PWD Division Engineer',
        text: 'Complaint acknowledged. Repair crew will visit by Aug 7 evening. Asphalt patch work scheduled for the same night.',
        time: '45 min ago'
      },
      comments: [
        { id: 'c1', author: 'Priya Nair', avatar: 'PN', text: 'I witnessed two bikes swerving to avoid it this morning. It is extremely dangerous at night with no street light either.', time: '1 hr ago', votes: 47, isGov: false },
        { id: 'c2', author: 'VMC Ward Office', avatar: 'BW', text: 'Noted. We have escalated to PWD. Work order CWO-2026-8491 has been raised. Expected resolution by Aug 8.', time: '1 hr ago', votes: 89, isGov: true },
        { id: 'c3', author: 'Suresh Anand', avatar: 'SA', text: 'They said the same thing 2 months ago. Still waiting. Please hold them accountable this time.', time: '30 min ago', votes: 33, isGov: false },
      ]
    },
    {
      id: 'cb-002',
      title: 'Streetlight on Domlur Flyover out for 2 weeks — serious safety concern for night walkers',
      body: 'The stretch from Domlur junction to the service road is pitch dark after 8 PM. Two purse-snatchings reported near this zone in the last week. MGVCL has not responded to calls.',
      category: 'electricity',
      author: 'Meena Venugopal',
      avatar: 'MV',
      ward: 'Ward 6',
      time: '5 hours ago',
      votes: 178,
      urgent: true,
      resolved: false,
      govResponse: null,
      comments: [
        { id: 'c4', author: 'Karthik S', avatar: 'KS', text: 'Yes, I walk this stretch daily. Even the traffic police have stopped patrolling here because they can\'t see clearly. Dangerous situation.', time: '4 hrs ago', votes: 52, isGov: false },
        { id: 'c5', author: 'Ananya Reddy', avatar: 'AR', text: 'Already reported on MGVCL app but it says "in queue" since July 27. Zero accountability.', time: '3 hrs ago', votes: 41, isGov: false },
      ]
    },
    {
      id: 'cb-003',
      title: 'Garbage dump burning near St. Mary\'s School — children inhaling smoke every morning',
      body: 'Unattended garbage pile near the school gate has been set on fire (accidentally or deliberately) every other day. The toxic smoke during school hours is unacceptable. Parents are furious.',
      category: 'garbage',
      author: 'Deepa Krishnamurthy',
      avatar: 'DK',
      ward: 'Ward 6',
      time: '1 day ago',
      votes: 312,
      urgent: true,
      resolved: false,
      govResponse: {
        officer: 'Sanitation Inspector — VMC Zone 4',
        text: 'We are deploying a special daily pickup unit to this location effective immediately. Burning of garbage is a cognizable offence — FIR will be filed if found again.',
        time: '6 hrs ago'
      },
      comments: [
        { id: 'c6', author: 'Rakesh Nair', avatar: 'RN', text: 'My daughter has been coughing for a week. We thought it was seasonal but the doctor confirmed irritant-induced cough. This is criminal negligence.', time: '22 hrs ago', votes: 104, isGov: false },
        { id: 'c7', author: 'VMC Ward Office', avatar: 'BW', text: 'This issue has been escalated to the health department as well. Immediate action being taken. Thank you for bringing it to light.', time: '14 hrs ago', votes: 62, isGov: true },
        { id: 'c8', author: 'Vijay Menon', avatar: 'VM', text: 'The garbage dump has been there for 6 months. Only now action because it made the news?', time: '10 hrs ago', votes: 88, isGov: false },
      ]
    },
    {
      id: 'cb-004',
      title: 'Park benches in Ward 6 community garden vandalized — third time this month',
      body: 'The newly installed benches have been damaged again. Elderly residents and mothers with children have no place to sit. Security camera also seems to have been disabled.',
      category: 'parks',
      author: 'Lalitha Venkat',
      avatar: 'LV',
      ward: 'Ward 6',
      time: '2 days ago',
      votes: 91,
      urgent: false,
      resolved: false,
      govResponse: null,
      comments: [
        { id: 'c9', author: 'Gopal Sharma', avatar: 'GS', text: 'I volunteer here on weekends. We have been requesting CCTV reinstallation for 2 months with no response.', time: '1 day ago', votes: 29, isGov: false },
      ]
    },
    {
      id: 'cb-005',
      title: 'Water pipeline leak fixed at Community Park junction — thanks to Ward 6 officials',
      body: 'The broken water pipe that was wasting thousands of litres daily has finally been repaired. Took 3 days and several community posts but it got done. Thanks to VMC Water Works team.',
      category: 'water',
      author: 'Anjali Prabhu',
      avatar: 'AP',
      ward: 'Ward 6',
      time: '3 days ago',
      votes: 156,
      urgent: false,
      resolved: true,
      govResponse: {
        officer: 'Sunil Gowda — VMC Water Works Water Inspector',
        text: 'Pipeline repair completed on Aug 3. Pressure tested and confirmed leak-free. Thank you citizens for the vigilance.',
        time: '3 days ago'
      },
      comments: [
        { id: 'c10', author: 'Mahesh P', avatar: 'MP', text: 'This is how the system is supposed to work. Post, escalate, resolve. Glad it worked this time.', time: '2 days ago', votes: 37, isGov: false },
        { id: 'c11', author: 'VMC Water Works Office', avatar: 'BW', text: 'We are glad to serve. All complaint references are tracked internally. Keep posting — we are watching.', time: '2 days ago', votes: 44, isGov: true },
      ]
    },
    {
      id: 'cb-006',
      title: 'Stray dogs attacking school children near Alkapuri Bus Stop 4B',
      body: 'Pack of 6-8 dogs has been spotted multiple times attacking schoolchildren near Bus Stop 4B. Two minor injuries reported. VMC animal control has not responded in 2 weeks.',
      category: 'safety',
      author: 'Venkat Rao',
      avatar: 'VR',
      ward: 'Ward 6',
      time: '6 hours ago',
      votes: 203,
      urgent: true,
      resolved: false,
      govResponse: null,
      comments: [
        { id: 'c12', author: 'Sunita Bose', avatar: 'SB', text: 'My son was chased by them yesterday. I had to file a report with the local police too. This is absolutely dangerous.', time: '5 hrs ago', votes: 78, isGov: false },
        { id: 'c13', author: 'Ravi A', avatar: 'RA', text: 'VMC animal control app just says "under review" — same since last week. Someone needs to be held accountable.', time: '4 hrs ago', votes: 55, isGov: false },
      ]
    },
  ];

  let currentSort = 'hot';
  let currentCategory = 'all';
  const feed = document.getElementById('boxFeed');
  const userVotes = {}; // tracks per-post vote state

  // ── UTILS ─────────────────────────────────────────────────────
  function timeRelative(str) { return str; } // already relative strings in seed data

  function escapeBoxHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[char]));
  }

  function flairClass(cat) {
    return { roads: 'flair-roads', water: 'flair-water', electricity: 'flair-electricity', garbage: 'flair-garbage', safety: 'flair-safety', parks: 'flair-parks' }[cat] || 'flair-roads';
  }

  function flairLabel(cat) {
    return { roads: '🛣️ Roads', water: '💧 Water', electricity: '⚡ Electricity', garbage: '♻️ Garbage', safety: '🚨 Safety', parks: '🌳 Parks' }[cat] || cat;
  }

  function updateStats() {
    const totalEl = document.getElementById('boxTotalPosts');
    const resolvedEl = document.getElementById('boxResolvedCount');
    if (totalEl) totalEl.textContent = boxPosts.length;
    if (resolvedEl) resolvedEl.textContent = boxPosts.filter(p => p.resolved).length;
  }

  // ── RENDER A SINGLE COMMENT ───────────────────────────────────
  function renderComment(c) {
    const div = document.createElement('div');
    div.className = 'comment-item';
    div.dataset.commentId = c.id;
    div.innerHTML = `
      <div>
        <div class="comment-avatar ${c.isGov ? 'gov-avatar' : ''}">${c.avatar}</div>
        <div class="comment-thread-line"></div>
      </div>
      <div class="comment-body-wrap">
        <div class="comment-meta">
          <span class="comment-author">${escapeBoxHTML(c.author)}</span>
          ${c.isGov ? '<span class="comment-gov-badge">🏛️ Official</span>' : ''}
          <span class="comment-time">${escapeBoxHTML(c.time)}</span>
        </div>
        <p class="comment-text">${escapeBoxHTML(c.text)}</p>
        <div class="comment-actions">
          <button class="comment-vote-btn cvote-up" data-votes="${c.votes}">▲ <span class="cvote-count">${c.votes}</span></button>
          <button class="comment-vote-btn">▼</button>
          <button class="comment-vote-btn">💬 Reply</button>
        </div>
      </div>
    `;

    // Comment upvote
    const upBtn = div.querySelector('.cvote-up');
    upBtn.addEventListener('click', () => {
      if (upBtn.dataset.voted) {
        const v = parseInt(upBtn.querySelector('.cvote-count').textContent) - 1;
        upBtn.querySelector('.cvote-count').textContent = v;
        upBtn.classList.remove('voted');
        delete upBtn.dataset.voted;
      } else {
        const v = parseInt(upBtn.querySelector('.cvote-count').textContent) + 1;
        upBtn.querySelector('.cvote-count').textContent = v;
        upBtn.classList.add('voted');
        upBtn.dataset.voted = '1';
      }
    });

    // Reply button (inline reply)
    div.querySelector('.comment-vote-btn:last-child').addEventListener('click', () => {
      const section = div.closest('.box-comment-section');
      const input = section.querySelector('.comment-text-input');
      input.value = `@${c.author} `;
      input.focus();
    });

    return div;
  }

  // ── RENDER A SINGLE POST CARD ─────────────────────────────────
  function renderPost(post) {
    const card = document.createElement('div');
    card.className = `box-post-card${post.urgent ? ' urgent-post' : ''}${post.resolved ? ' resolved-post' : ''}`;
    card.dataset.postId = post.id;
    card.dataset.category = post.category;

    const govHtml = post.govResponse ? `
      <div class="gov-response-banner">
        <div class="gov-response-header">🏛️ Official Response · ${escapeBoxHTML(post.govResponse.officer)}</div>
        <div class="gov-response-body">${escapeBoxHTML(post.govResponse.text)}</div>
      </div>
    ` : '';

    card.innerHTML = `
      <div class="box-post-inner">
        <div class="box-vote-rail">
          <button class="vote-up-btn" title="Upvote">▲</button>
          <span class="vote-count ${post.votes > 0 ? 'positive' : ''}">${post.votes}</span>
          <button class="vote-down-btn" title="Downvote">▼</button>
        </div>
        <div class="box-post-content">
          <div class="box-post-meta-top">
            <span class="box-category-flair ${flairClass(post.category)}">${flairLabel(post.category)}</span>
            ${post.urgent ? '<span class="box-urgent-tag">🚨 Urgent</span>' : ''}
            ${post.resolved ? '<span class="box-resolved-tag">✅ Resolved</span>' : ''}
            <span class="box-post-author">Posted by <strong>${escapeBoxHTML(post.author)}</strong></span>
            <span class="box-post-time">${escapeBoxHTML(post.time)}</span>
          </div>
          <h3 class="box-post-title">${escapeBoxHTML(post.title)}</h3>
          <p class="box-post-body">${escapeBoxHTML(post.body)}</p>
          <div class="box-post-location">📍 ${escapeBoxHTML(post.ward)}</div>
          ${govHtml}
          <div class="box-post-actions">
            <button class="box-action-btn btn-toggle-comments">💬 <span class="comment-btn-label">${post.comments.length} Comments</span></button>
            <button class="box-action-btn btn-share-post">🔗 Share</button>
            <button class="box-action-btn btn-file-from-post">📋 File Complaint</button>
            <button class="box-action-btn btn-report-post" style="margin-left:auto;">⚑ Report</button>
          </div>
        </div>
      </div>
      <div class="box-comment-section">
        <div class="comment-composer">
          <div class="comment-composer-avatar">RS</div>
          <div class="comment-input-wrap">
            <textarea class="comment-text-input" placeholder="Add a comment — ask a question, share your experience, or hold officials accountable..."></textarea>
            <div class="comment-submit-row">
              <button class="btn btn-secondary btn-xs cancel-comment-btn" style="font-size:0.75rem; padding:5px 10px;">Cancel</button>
              <button class="btn btn-primary btn-xs submit-comment-btn" style="font-size:0.75rem; padding:5px 10px;">Comment</button>
            </div>
          </div>
        </div>
        <div class="comment-list"></div>
      </div>
    `;

    // Render existing comments
    const commentList = card.querySelector('.comment-list');
    post.comments.forEach(c => commentList.appendChild(renderComment(c)));

    // ── VOTE RAIL LOGIC ─────────────────────────────────────────
    const upBtn = card.querySelector('.vote-up-btn');
    const downBtn = card.querySelector('.vote-down-btn');
    const voteCount = card.querySelector('.vote-count');

    userVotes[post.id] = userVotes[post.id] || { state: null, base: post.votes };

    function refreshVote() {
      const v = userVotes[post.id];
      const display = v.base + (v.state === 'up' ? 1 : v.state === 'down' ? -1 : 0);
      voteCount.textContent = display;
      voteCount.className = `vote-count ${display > 0 ? 'positive' : display < 0 ? 'negative' : ''}`;
      upBtn.classList.toggle('voted-up', v.state === 'up');
      downBtn.classList.toggle('voted-down', v.state === 'down');
    }

    upBtn.addEventListener('click', () => {
      const v = userVotes[post.id];
      v.state = v.state === 'up' ? null : 'up';
      refreshVote();
      if (v.state === 'up') {
        post.votes = userVotes[post.id].base + 1;
        showBoxToast(`Upvoted: "${post.title.substring(0,40)}..."`, 'success');
      }
    });

    downBtn.addEventListener('click', () => {
      const v = userVotes[post.id];
      v.state = v.state === 'down' ? null : 'down';
      refreshVote();
    });

    // ── TOGGLE COMMENTS ─────────────────────────────────────────
    const commentSection = card.querySelector('.box-comment-section');
    const toggleBtn = card.querySelector('.btn-toggle-comments');

    toggleBtn.addEventListener('click', () => {
      const isOpen = commentSection.classList.toggle('open');
      toggleBtn.classList.toggle('active', isOpen);
      const label = card.querySelector('.comment-btn-label');
      label.textContent = isOpen
        ? 'Hide Comments'
        : `${commentList.querySelectorAll('.comment-item').length} Comments`;
      if (isOpen) card.querySelector('.comment-text-input').focus();
    });

    // ── SUBMIT COMMENT ──────────────────────────────────────────
    const submitBtn = card.querySelector('.submit-comment-btn');
    const cancelBtn = card.querySelector('.cancel-comment-btn');
    const textInput = card.querySelector('.comment-text-input');

    submitBtn.addEventListener('click', () => {
      const text = textInput.value.trim();
      if (!text) return;

      const newComment = {
        id: `c-${Date.now()}`,
        author: 'Rahul Sharma',
        avatar: 'RS',
        text,
        time: 'Just now',
        votes: 0,
        isGov: false
      };
      post.comments.push(newComment);
      commentList.appendChild(renderComment(newComment));
      commentList.lastChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      textInput.value = '';
      const label = card.querySelector('.comment-btn-label');
      label.textContent = `${post.comments.length} Comments`;
      showBoxToast('Comment posted to ward discussion.', 'success');
    });

    cancelBtn.addEventListener('click', () => {
      textInput.value = '';
      commentSection.classList.remove('open');
      toggleBtn.classList.remove('active');
    });

    textInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.ctrlKey) submitBtn.click();
    });

    // ── SHARE ────────────────────────────────────────────────────
    card.querySelector('.btn-share-post').addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`Ward 6 Complaint: "${post.title}" — New Street Platform`);
        showBoxToast('Link copied to clipboard!', 'success');
      }
    });

    // ── FILE COMPLAINT FROM POST ─────────────────────────────────
    card.querySelector('.btn-file-from-post').addEventListener('click', () => {
      // Pre-fill complaint form and navigate
      const titleInput = document.getElementById('compTitle');
      const detailsInput = document.getElementById('compDetails');
      const catSelect = document.getElementById('compCategory');
      const addressInput = document.getElementById('compAddress');
      if (titleInput) titleInput.value = post.title.substring(0, 80);
      if (detailsInput) detailsInput.value = post.body;
      if (catSelect) catSelect.value = post.category;
      if (addressInput) {
        addressInput.value = `${post.ward}, Alkapuri`;
        addressInput.dispatchEvent(new Event('input'));
      }
      // Navigate to complaints tab and open modal
      const compTab = document.querySelector('[data-tab="complaints"]');
      if (compTab) compTab.click();
      setTimeout(() => {
        const modal = document.getElementById('complaintModal');
        if (modal) modal.removeAttribute('hidden');
      }, 150);
    });

    // ── REPORT ───────────────────────────────────────────────────
    card.querySelector('.btn-report-post').addEventListener('click', () => {
      showBoxToast('Post flagged for moderation review.', 'warning');
    });

    return card;
  }

  // ── SORT & FILTER THEN RENDER FEED ───────────────────────────
  function renderFeed() {
    if (!feed) return;
    feed.innerHTML = '';

    let filtered = boxPosts.filter(p => currentCategory === 'all' || p.category === currentCategory);

    if (currentSort === 'new') {
      // already in insertion order (newest first by post id convention)
    } else if (currentSort === 'top') {
      filtered = [...filtered].sort((a, b) => b.votes - a.votes);
    } else if (currentSort === 'hot') {
      // hot = mix of votes + comments count
      filtered = [...filtered].sort((a, b) => (b.votes + b.comments.length * 8) - (a.votes + a.comments.length * 8));
    } else if (currentSort === 'resolved') {
      filtered = filtered.filter(p => p.resolved);
    }

    if (filtered.length === 0) {
      feed.innerHTML = `
        <div class="box-empty-state">
          <div class="box-empty-icon">📭</div>
          <div class="box-empty-title">No posts found</div>
          <div class="box-empty-sub">Be the first to report a civic issue in this category.<br/>Your complaint helps the entire ward.</div>
        </div>
      `;
      return;
    }

    filtered.forEach(p => feed.appendChild(renderPost(p)));
    updateStats();
  }

  // ── SORT BUTTONS ──────────────────────────────────────────────
  document.querySelectorAll('.box-sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.box-sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSort = btn.dataset.sort;
      renderFeed();
    });
  });

  // ── CATEGORY FILTER ───────────────────────────────────────────
  const catFilter = document.getElementById('boxCategoryFilter');
  if (catFilter) {
    catFilter.addEventListener('change', () => {
      currentCategory = catFilter.value;
      renderFeed();
    });
  }

  // ── COMPOSER TOGGLE ───────────────────────────────────────────
  const openBoxBtn = document.getElementById('openBoxNewPostBtn');
  const composer = document.getElementById('boxComposer');
  const cancelPostBtn = document.getElementById('boxCancelPost');
  const submitPostBtn = document.getElementById('boxSubmitPost');

  if (openBoxBtn && composer) {
    openBoxBtn.addEventListener('click', () => {
      const isOpen = composer.style.display !== 'none';
      composer.style.display = isOpen ? 'none' : 'block';
      if (!isOpen) document.getElementById('boxPostTitle').focus();
    });
  }

  if (cancelPostBtn) {
    cancelPostBtn.addEventListener('click', () => {
      composer.style.display = 'none';
      document.getElementById('boxPostTitle').value = '';
      document.getElementById('boxPostBody').value = '';
    });
  }

  if (submitPostBtn) {
    submitPostBtn.addEventListener('click', () => {
      const title = document.getElementById('boxPostTitle').value.trim();
      const body = document.getElementById('boxPostBody').value.trim();
      const category = document.getElementById('boxPostCategory').value;
      const urgent = document.getElementById('boxHighSeverity').checked;

      if (!title) { showBoxToast('Please add a complaint title.', 'warning'); return; }
      if (!body) { showBoxToast('Please describe the civic issue in detail.', 'warning'); return; }

      const newPost = {
        id: `cb-${Date.now()}`,
        title,
        body,
        category,
        author: 'Rahul Sharma',
        avatar: 'RS',
        ward: 'Ward 6',
        time: 'Just now',
        votes: 1,
        urgent,
        resolved: false,
        govResponse: null,
        comments: []
      };

      boxPosts.unshift(newPost);
      composer.style.display = 'none';
      document.getElementById('boxPostTitle').value = '';
      document.getElementById('boxPostBody').value = '';
      document.getElementById('boxHighSeverity').checked = false;

      // Switch to "new" sort so it shows up first
      currentSort = 'new';
      document.querySelectorAll('.box-sort-btn').forEach(b => b.classList.remove('active'));
      const newBtn = document.querySelector('.box-sort-btn[data-sort="new"]');
      if (newBtn) newBtn.classList.add('active');

      renderFeed();
      showBoxToast('Complaint posted to Ward 6 Open Feed. Citizens will see this immediately.', 'success');

      // Simulate a civic bot response after 3 seconds
      setTimeout(() => {
        newPost.comments.push({
          id: `c-bot-${Date.now()}`,
          author: 'Sahayak AI',
          avatar: '🤖',
          text: `This complaint has been registered on New Street Ward Feed. Relevant departments have been notified automatically. Complaint reference: NST-${Math.floor(10000 + Math.random() * 90000)}. Citizens can upvote to escalate priority.`,
          time: 'Just now',
          votes: 0,
          isGov: true
        });
        renderFeed();
        showBoxToast('Sahayak AI has acknowledged your complaint and notified the department.', 'success');
      }, 3000);
    });
  }

  // ── TOAST (local to this module) ─────────────────────────────
  function showBoxToast(msg, type = 'info') {
    // Reuse global showToast if available
    if (typeof window.showToast === 'function') { window.showToast(msg, type); return; }
    const t = document.createElement('div');
    t.style.cssText = `position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 18px;border-radius:10px;font-size:0.83rem;font-weight:700;color:white;background:${type === 'success' ? '#16a34a' : type === 'warning' ? '#f59e0b' : '#0b5fff'};box-shadow:0 8px 24px rgba(0,0,0,0.15);animation:fadeIn 0.25s ease;`;
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 3500);
  }

  // ── INITIAL RENDER (deferred until tab shown) ─────────────────
  // Watch for the complaintbox tab to become visible
  const observer = new MutationObserver(() => {
    const view = document.getElementById('view-complaintbox');
    if (view && !view.hidden && feed && feed.children.length === 0) {
      renderFeed();
      observer.disconnect();
    }
  });

  const viewEl = document.getElementById('view-complaintbox');
  if (viewEl) {
    observer.observe(viewEl, { attributes: true, attributeFilter: ['hidden'] });
    // Also render immediately if already visible
    if (!viewEl.hidden) renderFeed();
  }

  // Also hook into the sidebar tab click for the complaintbox tab
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('[data-tab="complaintbox"]');
    if (btn) {
      btn.addEventListener('click', () => {
        if (feed && feed.children.length === 0) renderFeed();
      });
    }
  });

})();

/* ============================================================
   NEW STREET — DASHBOARD REDESIGN INTERACTIONS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Feed Tabs Filtering
  const feedTabs = document.querySelectorAll('#feedTabsNav .feed-tab');
  const feedCards = document.querySelectorAll('#dashboardFeedList .feed-v2-card');
  
  if (feedTabs.length > 0 && feedCards.length > 0) {
    feedTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all
        feedTabs.forEach(t => t.classList.remove('active'));
        // Add active to clicked
        tab.classList.add('active');
        
        const filterCat = tab.dataset.feedCat;
        
        // Filter cards
        feedCards.forEach(card => {
          if (filterCat === 'all' || card.dataset.cat === filterCat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Right Panel Quick Actions responsiveness
  const qaTiles = document.querySelectorAll('.qa-tile');
  qaTiles.forEach(tile => {
    tile.addEventListener('click', () => {
      // Add a quick visual "press" effect
      const originalTransform = tile.style.transform;
      tile.style.transform = 'scale(0.95)';
      setTimeout(() => {
        tile.style.transform = originalTransform;
      }, 150);
      
      // Show toast if not handled by existing logic
      const id = tile.id;
      const implementedIds = ['tileReport', 'tileMap', 'tileService', 'tileSOS'];
      if (id && !implementedIds.includes(id)) {
        if (window.showToast) {
          window.showToast(tile.querySelector('.qa-tile-lbl').textContent + ' feature coming soon', 'info');
        }
      }
    });
  });

  // Right Panel Alert Pills
  const alertPills = document.querySelectorAll('.alert-pill');
  alertPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const originalTransform = pill.style.transform;
      pill.style.transform = 'scale(0.98)';
      setTimeout(() => {
        pill.style.transform = originalTransform;
      }, 150);
      if (window.showToast) {
        window.showToast('Alert details requested', 'info');
      }
    });
  });
});

/* ============================================================
   NEW STREET — COMMUNITY HUB INTERACTIONS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Community Hub Subnav Tab Filtering
  const chTabs = document.querySelectorAll('.ch-subnav-tabs .ch-tab');
  const chCards = document.querySelectorAll('.ch-discussions-list .ch-disc-card');

  chTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      chTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const catName = tab.textContent.trim().toLowerCase();

      chCards.forEach(card => {
        if (catName === 'all discussions' || catName === 'my ward') {
          card.style.display = 'flex';
        } else {
          const chips = card.querySelectorAll('.ch-chip');
          let match = false;
          chips.forEach(chip => {
            if (chip.textContent.trim().toLowerCase().includes(catName)) {
              match = true;
            }
          });
          card.style.display = match ? 'flex' : 'none';
        }
      });
    });
  });

  // Category Cards Filtering at Bottom
  const chCatCards = document.querySelectorAll('.ch-cat-card');
  chCatCards.forEach(catCard => {
    catCard.addEventListener('click', () => {
      const catName = catCard.querySelector('.ch-cat-name').textContent.trim().toLowerCase();
      chTabs.forEach(t => {
        if (t.textContent.trim().toLowerCase() === catName) {
          t.click();
        }
      });
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
  });

  // Follow buttons
  const followBtns = document.querySelectorAll('.ch-btn-follow');
  followBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (btn.classList.contains('following')) {
        btn.classList.remove('following');
        btn.style.background = '#2563EB';
        btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> Follow`;
        if (window.showToast) window.showToast('Unfollowed discussion', 'info');
      } else {
        btn.classList.add('following');
        btn.style.background = '#10B981';
        btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Following`;
        if (window.showToast) window.showToast('Following discussion for updates!', 'success');
      }
    });
  });

  // Message buttons
  const msgBtns = document.querySelectorAll('.ch-btn-msg');
  msgBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const citizenName = btn.closest('.ch-citizen-item').querySelector('.ch-cit-name').childNodes[0].textContent.trim();
      if (window.showToast) window.showToast(`Opening chat with ${citizenName}...`, 'success');
    });
  });

  // Start Discussion Button
  const startDiscBtn = document.getElementById('startDiscussionBtn');
  if (startDiscBtn) {
    startDiscBtn.addEventListener('click', () => {
      if (window.showToast) window.showToast('Discussion creator opened for Ward 6.', 'info');
    });
  }
});


/* ============================================================
   NEW STREET — COMPLETE APPLICATION LOGIC & INTERACTIVE ENHANCEMENTS
   ============================================================ */

(function InitFullAppLogic() {
  document.addEventListener('DOMContentLoaded', () => {

    // ── 1. GLOBAL KEYBOARD SHORTCUTS (⌘K / Ctrl+K for Search) ───
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('globalSearch');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
          if (window.showToast) window.showToast('Global Search focused (⌘K)', 'info');
        }
      }
    });

    // ── 2. TOP NAV BELL ICON -> NOTIFICATION DRAWER / TAB ─────────
    const navBellBtn = document.querySelector('.dash-nav-right button[aria-label*="Notification"], .dash-nav-right button:has(svg)');
    const topBell = document.querySelector('.dash-top-nav .nav-icon-btn');
    const handleNotificationOpen = () => {
      const switchTabFn = window.switchTab || ((id) => {
        const item = document.querySelector(`[data-tab="${id}"]`);
        if (item) item.click();
      });
      switchTabFn('notifications');
    };

    if (topBell) topBell.addEventListener('click', handleNotificationOpen);

    // ── 3. UPVOTE LOGIC FOR ALL FEED & COMMUNITY CARDS ──────────
    document.addEventListener('click', (e) => {
      const voteBtn = e.target.closest('.feed-v2-vote-btn, .vote-up-btn');
      if (voteBtn) {
        e.stopPropagation();
        const card = voteBtn.closest('.feed-v2-card, .ch-disc-card');
        const countEl = card ? card.querySelector('.feed-v2-vote-count, .vote-count') : null;
        
        if (countEl) {
          let currentVotes = parseInt(countEl.textContent.replace(/,/g, '')) || 0;
          if (voteBtn.classList.contains('voted')) {
            voteBtn.classList.remove('voted');
            voteBtn.style.background = '';
            voteBtn.style.color = '';
            countEl.textContent = currentVotes - 1;
            if (window.showToast) window.showToast('Upvote removed', 'info');
          } else {
            voteBtn.classList.add('voted');
            voteBtn.style.background = '#EFF6FF';
            voteBtn.style.color = '#2563EB';
            countEl.textContent = currentVotes + 1;
            if (window.showToast) window.showToast('Complaint Upvoted! Priority escalated.', 'success');
          }
        }
      }
    });

    // ── 4. COMMENT DRAWER & INLINE COMPOSER FOR FEED CARDS ──────
    document.addEventListener('click', (e) => {
      const commentBtn = e.target.closest('.feed-act-btn');
      if (commentBtn && commentBtn.textContent.includes('Comment')) {
        e.stopPropagation();
        const card = commentBtn.closest('.feed-v2-card');
        if (!card) return;

        let drawer = card.querySelector('.inline-comment-drawer');
        if (drawer) {
          drawer.style.display = drawer.style.display === 'none' ? 'block' : 'none';
        } else {
          drawer = document.createElement('div');
          drawer.className = 'inline-comment-drawer';
          drawer.style.cssText = 'margin-top: 12px; padding-top: 12px; border-top: 1px solid #E2E8F0; animation: fadeIn 0.2s ease;';
          drawer.innerHTML = `
            <div class="comments-list" style="display:flex; flex-direction:column; gap:8px; margin-bottom:10px;">
              <div style="background:#F8FAFC; padding:8px 12px; border-radius:8px; font-size:0.75rem;">
                <strong>Priya Nair:</strong> Water issue at 8th Cross also affecting adjacent 9th main street.
                <div style="font-size:0.62rem; color:#94A3B8; margin-top:2px;">1 hour ago</div>
              </div>
              <div style="background:#F8FAFC; padding:8px 12px; border-radius:8px; font-size:0.75rem;">
                <strong>Anil Sharma (PWD Engineer):</strong> Repair truck dispatched. ETA 6:00 PM.
                <div style="font-size:0.62rem; color:#94A3B8; margin-top:2px;">30 mins ago</div>
              </div>
            </div>
            <div style="display:flex; gap:8px;">
              <input type="text" class="comment-input-field" placeholder="Write a comment..." style="flex:1; padding:7px 12px; border-radius:8px; border:1px solid #CBD5E1; font-size:0.78rem;" />
              <button class="btn-submit-comment" style="background:#2563EB; color:white; border:none; border-radius:8px; padding:7px 14px; font-size:0.75rem; font-weight:700; cursor:pointer;">Post</button>
            </div>
          `;
          card.querySelector('.feed-v2-body-main').appendChild(drawer);

          const submitBtn = drawer.querySelector('.btn-submit-comment');
          const inputField = drawer.querySelector('.comment-input-field');

          const postComment = () => {
            const val = inputField.value.trim();
            if (!val) return;

            const list = drawer.querySelector('.comments-list');
            const newComment = document.createElement('div');
            newComment.style.cssText = 'background:#EFF6FF; padding:8px 12px; border-radius:8px; font-size:0.75rem; border-left:3px solid #2563EB;';
            newComment.innerHTML = `<strong>Rahul Sharma:</strong> ${val} <div style="font-size:0.62rem; color:#94A3B8; margin-top:2px;">Just now</div>`;
            list.appendChild(newComment);

            inputField.value = '';
            if (window.showToast) window.showToast('Comment posted to thread!', 'success');

            // Simulated AI/Officer reply
            setTimeout(() => {
              const aiReply = document.createElement('div');
              aiReply.style.cssText = 'background:#F8FAFC; padding:8px 12px; border-radius:8px; font-size:0.75rem; border-left:3px solid #10B981;';
              aiReply.innerHTML = `<strong>Municipal Desk 🤖:</strong> Thank you Rahul! Your update has been attached to Work Order CWO-2026. <div style="font-size:0.62rem; color:#94A3B8; margin-top:2px;">Just now</div>`;
              list.appendChild(aiReply);
            }, 1200);
          };

          submitBtn.addEventListener('click', postComment);
          inputField.addEventListener('keydown', (evt) => { if (evt.key === 'Enter') postComment(); });
        }
      }
    });

    // ── 5. COMMUNITY VOICE POLL VOTING LOGIC ────────────────────
    document.addEventListener('click', (e) => {
      const pollOpt = e.target.closest('.rp-poll-opt');
      if (pollOpt) {
        const pollContainer = pollOpt.closest('.rp-poll-options');
        if (pollContainer.dataset.voted) {
          if (window.showToast) window.showToast('You have already submitted your vote for this ward poll.', 'warning');
          return;
        }
        
        pollContainer.dataset.voted = 'true';
        pollContainer.querySelectorAll('.rp-poll-opt').forEach(opt => {
          opt.style.opacity = '0.7';
          opt.querySelector('.rp-poll-bar-fill').style.background = '#CBD5E1';
        });

        pollOpt.style.opacity = '1';
        pollOpt.querySelector('.rp-poll-bar-fill').style.background = '#2563EB';

        const pctEl = pollOpt.querySelector('.rp-poll-opt-pct');
        if (pctEl) {
          pctEl.textContent = 'Selected ✓';
          pctEl.style.color = '#2563EB';
          pctEl.style.fontWeight = '800';
        }

        if (window.showToast) window.showToast('Vote recorded! Thank you for participating in Ward 6 governance.', 'success');
      }
    });

    // ── 6. LOCATION PICKER DROPDOWN & WARD SWITCHER ────────────
    const locationBtn = document.querySelector('.location-picker-btn');
    if (locationBtn) {
      locationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let wardMenu = document.getElementById('wardSwitcherMenu');
        if (wardMenu) { wardMenu.remove(); return; }

        wardMenu = document.createElement('div');
        wardMenu.id = 'wardSwitcherMenu';
        wardMenu.style.cssText = `
          position: fixed; top: 64px; left: 180px; z-index: 999;
          background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1); padding: 8px; width: 220px;
          animation: fadeIn 0.15s ease;
        `;
        wardMenu.innerHTML = `
          <div style="font-size:0.68rem; font-weight:800; color:#94A3B8; text-transform:uppercase; padding:6px 8px;">Select Ward Jurisdiction</div>
          <button class="ward-opt-btn" data-ward="Ward 6, Alkapuri" style="display:block; width:100%; text-align:left; padding:8px; border-radius:6px; background:#EFF6FF; color:#2563EB; font-size:0.78rem; font-weight:700; border:none; cursor:pointer; margin-bottom:2px;">📍 Ward 6, Alkapuri ✓</button>
          <button class="ward-opt-btn" data-ward="Ward 12, Alkapuri" style="display:block; width:100%; text-align:left; padding:8px; border-radius:6px; background:none; color:#0F172A; font-size:0.78rem; font-weight:600; border:none; cursor:pointer; margin-bottom:2px;">📍 Ward 12, Alkapuri</button>
          <button class="ward-opt-btn" data-ward="Ward 18, Koramangala" style="display:block; width:100%; text-align:left; padding:8px; border-radius:6px; background:none; color:#0F172A; font-size:0.78rem; font-weight:600; border:none; cursor:pointer;">📍 Ward 18, Koramangala</button>
        `;

        document.body.appendChild(wardMenu);

        wardMenu.querySelectorAll('.ward-opt-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const wardName = btn.dataset.ward;
            const label = document.getElementById('navWardLabel');
            if (label) label.textContent = wardName;
            wardMenu.remove();
            if (window.showToast) window.showToast(`Switched active view to ${wardName}`, 'success');
          });
        });

        document.addEventListener('click', function closeWard(evt) {
          if (!wardMenu.contains(evt.target)) {
            wardMenu.remove();
            document.removeEventListener('click', closeWard);
          }
        });
      });
    }

    // ── 7. CIVIC CHAMPION PROGRESS BUTTON ────────────────────────
    document.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'viewProgressBtn') {
        const switchTabFn = window.switchTab || ((id) => {
          const item = document.querySelector(`[data-tab="${id}"]`);
          if (item) item.click();
        });
        switchTabFn('profile');
        if (window.showToast) window.showToast('Opened Citizen Champion Progress Wallet', 'info');
      }
    });

  });
})();


/* ============================================================
   LIVE MAP — NEW INTERACTIONS MODULE
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Category chip filter bar
  const lmChips = document.querySelectorAll('.lm-chip[data-lm-cat]');
  lmChips.forEach(chip => {
    chip.addEventListener('click', () => {
      lmChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.lmCat;
      // Re-render Google Map pins with new filter
      if (window.renderGoogleMapPins) window.renderGoogleMapPins();
    });
  });

  // View Toggle buttons
  const lmViewBtns = document.querySelectorAll('.lm-view-btn');
  lmViewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      lmViewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const label = btn.textContent.trim();
      
      if (label.includes('Map View')) {
        if (window.heatmapLayer) window.heatmapLayer.setMap(null);
        if (window.complaintMarkers) window.complaintMarkers.forEach(m => m.setMap(window.googleMap));
      } else if (label.includes('Heat Map')) {
        if (window.complaintMarkers) window.complaintMarkers.forEach(m => m.setMap(null));
        if (window.updateHeatmapData) window.updateHeatmapData();
      } else if (label.includes('List View')) {
         if (window.switchTab) window.switchTab('complaints');
      }
    });
  });

  // Clear All Filters
  const clearAllBtn = document.getElementById('lmClearAllFilters');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      document.querySelectorAll('.lm-filter-chip input[type="checkbox"], .lm-status-chk input[type="checkbox"]').forEach(cb => { cb.checked = false; });
      lmChips.forEach(c => c.classList.remove('active'));
      const allChip = document.querySelector('.lm-chip[data-lm-cat="all"]');
      if (allChip) allChip.classList.add('active');
      if (window.showToast) window.showToast('All map filters cleared', 'info');
    });
  }

  // Distance Slider
  const lmSlider = document.getElementById('lmDistanceSlider');
  const lmDistVal = document.querySelector('.lm-dist-val');
  if (lmSlider && lmDistVal) {
    lmSlider.addEventListener('input', () => {
      lmDistVal.textContent = lmSlider.value + ' KM';
    });
  }

  // Alert Close Buttons
  document.querySelectorAll('.lm-alert-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.lm-alert-item');
      if (item) {
        item.style.transition = 'opacity 0.2s, transform 0.2s';
        item.style.opacity = '0';
        item.style.transform = 'translateX(10px)';
        setTimeout(() => item.remove(), 220);
      }
    });
  });

  // More Filters Button
  const moreFiltersBtn = document.getElementById('lmMoreFiltersBtn');
  if (moreFiltersBtn) {
    moreFiltersBtn.addEventListener('click', () => {
      if (window.showToast) window.showToast('Advanced filter panel coming soon', 'info');
    });
  }

  // Layers Button
  const layersBtn = document.getElementById('lmLayersBtn');
  if (layersBtn) {
    layersBtn.addEventListener('click', () => {
      if (window.showToast) window.showToast('Layer selector: Street / Satellite / Transit', 'info');
    });
  }

  // Boundaries Toggle
  const boundToggle = document.getElementById('lmBoundariesToggle');
  if (boundToggle) {
    boundToggle.addEventListener('change', () => {
      const msg = boundToggle.checked ? 'Ward boundaries shown' : 'Ward boundaries hidden';
      if (window.showToast) window.showToast(msg, 'info');
    });
  }

  // Time Range Selector
  const timeRange = document.getElementById('lmTimeRange');
  if (timeRange) {
    timeRange.addEventListener('change', () => {
      if (window.showToast) window.showToast('Map filtered to: ' + timeRange.options[timeRange.selectedIndex].text, 'info');
    });
  }

  // Category checkbox filters
  document.querySelectorAll('.lm-filter-chip input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const count = document.querySelectorAll('.lm-filter-chip input:checked').length;
      if (window.showToast) window.showToast(count + ' category filter' + (count !== 1 ? 's' : '') + ' active', 'info');
    });
  });

});

/* ============================================================
   GOVERNMENT SERVICES — INTERACTIONS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Category tabs filter
  const gsCatTabs = document.querySelectorAll('.gs-cat-tab[data-gs-cat]');
  const gsCards = document.querySelectorAll('.gs-service-grid .gs-service-card');
  gsCatTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      gsCatTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.gsCat;
      gsCards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.gsCat?.includes(cat)) ? '' : 'none';
      });
    });
  });

  // Apply / Pay Now buttons
  document.querySelectorAll('.gs-btn-primary[data-service]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.showToast) window.showToast('Application for "' + btn.dataset.service + '" initiated!', 'success');
    });
  });
  document.querySelectorAll('.gs-btn-ghost[data-track]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.showToast) window.showToast('Tracking "' + btn.dataset.track + '" application...', 'info');
    });
  });

  // Department cards
  document.querySelectorAll('.gs-dept-card').forEach(card => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.gs-dept-name')?.textContent;
      if (name && window.showToast) window.showToast('Loading services for ' + name, 'info');
    });
  });

  // Go to Applications
  const gsGoBtn = document.getElementById('gsGoToAppsBtn');
  if (gsGoBtn) gsGoBtn.addEventListener('click', () => { if (window.switchTab) window.switchTab('profile'); });

  // Track new application
  const gsTrackBtn = document.getElementById('gsTrackNewBtn');
  if (gsTrackBtn) gsTrackBtn.addEventListener('click', () => {
    if (window.showToast) window.showToast('Enter Application ID to track status', 'info');
  });

  // Help items
  const gsHelpAI = document.getElementById('gsHelpAI');
  if (gsHelpAI) gsHelpAI.addEventListener('click', () => { if (window.switchTab) window.switchTab('ai'); });

  // Search
  const gsSearch = document.getElementById('gsSearchInput');
  if (gsSearch) {
    gsSearch.addEventListener('input', () => {
      const q = gsSearch.value.toLowerCase().trim();
      gsCards.forEach(card => {
        const t = (card.querySelector('.gs-card-title')?.textContent || '').toLowerCase();
        const d = (card.querySelector('.gs-card-desc')?.textContent || '').toLowerCase();
        card.style.display = (!q || t.includes(q) || d.includes(q)) ? '' : 'none';
      });
    });
  }
});

/* ============================================================
   PUBLIC FUNDS (TRANSPARENCY) — INTERACTIONS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const pfTabs = document.querySelectorAll('.pf-tab');
  pfTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      pfTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (window.showToast) window.showToast('Switched to ' + tab.textContent.trim() + ' view', 'info');
    });
  });
});

/* ============================================================
   DEVELOPMENT PROJECTS — INTERACTIONS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const dpFtabs = document.querySelectorAll('.dp-ftab[data-dp-status]');
  const dpCards = document.querySelectorAll('.dp-project-card[data-dp-status]');
  dpFtabs.forEach(tab => {
    tab.addEventListener('click', () => {
      dpFtabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const status = tab.dataset.dpStatus;
      dpCards.forEach(card => {
        card.style.display = (status === 'all' || card.dataset.dpStatus === status) ? '' : 'none';
      });
    });
  });

  document.querySelectorAll('.dp-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.closest('.dp-project-card').querySelector('.dp-proj-title')?.textContent;
      if (window.showToast) window.showToast('Opening details for: ' + title, 'info');
    });
  });
});

/* ============================================================
   AI ASSISTANT — INTERACTIONS
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const aiInput = document.getElementById('aiInput');
  const aiSendBtn = document.getElementById('aiSendBtn');
  const aiMessages = document.getElementById('aiMessagesArea');
  const aiCharCount = document.getElementById('aiCharCount');

  function getTime() {
    return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  }

  function appendUserMsg(text) {
    const wrap = document.createElement('div');
    wrap.className = 'ai-msg-wrap user';
    wrap.innerHTML = '<div class="ai-msg user">' + text + '<div class="ai-msg-time">' + getTime() + ' ✓✓</div></div>';
    aiMessages.appendChild(wrap);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }

  function appendAIMsg(text) {
    const wrap = document.createElement('div');
    wrap.className = 'ai-msg-wrap ai';
    wrap.innerHTML = '<div class="ai-bot-avatar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><line x1="12" y1="7" x2="12" y2="11"/></svg></div><div class="ai-msg ai">' + text + '<div class="ai-msg-time">' + getTime() + '</div></div>';
    aiMessages.appendChild(wrap);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }

  const responses = [
    "I'm looking into that for you. Based on recent Ward 6 data, this issue has been reported by 3 other citizens recently.",
    "I can help you file a complaint or track an existing one. Which would you prefer?",
    "Great question! You can apply for this service online through Government Services. Would you like me to navigate you there?",
    "This falls under VMC jurisdiction. Your complaint will be assigned to a Division Engineer within 2 hours.",
    "Based on your complaint history in Ward 6, the average resolution time for this category is 4.6 days."
  ];
  let resIdx = 0;

  function sendMessage() {
    const text = (aiInput ? aiInput.value.trim() : '');
    if (!text) return;
    appendUserMsg(text);
    if (aiInput) { aiInput.value = ''; if (aiCharCount) aiCharCount.textContent = '0/1000'; }
    setTimeout(() => {
      appendAIMsg(responses[resIdx % responses.length]);
      resIdx++;
    }, 900);
  }

  if (aiSendBtn) aiSendBtn.addEventListener('click', sendMessage);
  if (aiInput) {
    aiInput.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
    aiInput.addEventListener('input', () => { if (aiCharCount) aiCharCount.textContent = aiInput.value.length + '/1000'; });
  }

  // Quick chips
  document.querySelectorAll('.ai-chip[data-prompt]').forEach(chip => {
    chip.addEventListener('click', () => {
      if (aiInput) { aiInput.value = chip.dataset.prompt; if (aiCharCount) aiCharCount.textContent = aiInput.value.length + '/1000'; aiInput.focus(); }
    });
  });

  // Suggestion pills
  document.querySelectorAll('.ai-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      if (aiInput) { aiInput.value = pill.textContent.replace(/^[^\w]+/, '').trim(); aiInput.focus(); }
    });
  });

  // Suggested questions
  document.querySelectorAll('.ai-sug-item').forEach(item => {
    item.addEventListener('click', () => {
      if (aiInput) { aiInput.value = item.textContent.replace('→', '').trim(); sendMessage(); }
    });
  });

  // Quick action buttons
  document.querySelectorAll('.ai-qa-btn[data-prompt]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (aiInput) { aiInput.value = btn.dataset.prompt; sendMessage(); }
    });
  });

  // New Chat
  const aiNewChat = document.getElementById('aiNewChatBtn');
  if (aiNewChat) {
    aiNewChat.addEventListener('click', () => {
      if (aiMessages) aiMessages.innerHTML = '';
      if (window.showToast) window.showToast('New chat started. How can I help you?', 'success');
      appendAIMsg('Hello! I am Sahayak, your AI civic assistant. How can I help you today?');
    });
  }

  // Copy complaint ID
  document.querySelectorAll('.ai-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (navigator.clipboard) navigator.clipboard.writeText('CMP-2026-0814-00126');
      if (window.showToast) window.showToast('Complaint ID copied!', 'success');
    });
  });
});

/* ============================================================
   RIGHT UTILITY PANEL — VISIBILITY CONTROLLER
   Only show on the Dashboard tab. Hide for all other tabs so 
   each section uses its own full-width layout with built-in sidebar.
   ============================================================ */
(function() {
  // Tabs that should SHOW the right utility panel
  const TABS_WITH_RIGHT_PANEL = ['dashboard'];

  function updateRightPanel(tabId) {
    const body = document.body;
    if (TABS_WITH_RIGHT_PANEL.includes(tabId)) {
      body.classList.remove('hide-right-panel');
    } else {
      body.classList.add('hide-right-panel');
    }
  }

  // Hook into sidebar navigation clicks
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      updateRightPanel(btn.dataset.tab);
    });
  });

  // Hook into mobile tab bar clicks  
  document.querySelectorAll('[data-mobile-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      updateRightPanel(btn.dataset.mobileTab);
    });
  });

  // Also intercept the global switchTab function if it exists
  const _origSwitchTab = window.switchTab;
  window.switchTab = function(tabId) {
    updateRightPanel(tabId);
    if (_origSwitchTab) _origSwitchTab(tabId);
  };

  // Apply on initial load (dashboard is default)
  updateRightPanel('dashboard');
})();

/* ============================================================
   FULLSTACK DASHBOARD — CHART.JS + INTERACTIVITY ENGINE
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // ── LIVE CLOCK ─────────────────────────────────────────────
  function startClock() {
    const el = document.getElementById('dashboardClock');
    if (!el) return;
    function tick() {
      const now = new Date();
      el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    tick(); setInterval(tick, 1000);
  }
  startClock();

  // ── ANIMATED STAT COUNTERS ──────────────────────────────────
  function animateCount(el, target, duration = 1200, prefix = '', suffix = '') {
    if (!el) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = prefix + Math.floor(start).toLocaleString('en-IN') + suffix;
    }, 16);
  }

  // Animate dashboard stats on load
  animateCount(document.getElementById('statActiveComplaintsCount'), 214);
  animateCount(document.getElementById('statServicesUsedCount'), 23);

  // ── CHART DEFAULTS ──────────────────────────────────────────
  const defaultFont = { family: "'Outfit', sans-serif", size: 11 };
  if (window.Chart) {
    Chart.defaults.font = defaultFont;
    Chart.defaults.color = '#64748B';
  }

  // ── 1. COMPLAINT TREND LINE CHART ──────────────────────────
  const trendCtx = document.getElementById('complaintTrendChart');
  let trendChart = null;

  const trendData = {
    '6m': {
      labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      filed:    [38, 45, 52, 43, 61, 56],
      resolved: [28, 38, 44, 52, 48, 55]
    },
    '3m': {
      labels: ['Jun', 'Jul', 'Aug'],
      filed:    [43, 61, 56],
      resolved: [52, 48, 55]
    },
    '1m': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      filed:    [14, 18, 12, 12],
      resolved: [12, 15, 14, 14]
    }
  };

  function buildTrendChart(range) {
    const d = trendData[range];
    if (trendChart) trendChart.destroy();
    if (!trendCtx) return;
    trendChart = new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: d.labels,
        datasets: [
          {
            label: 'Filed',
            data: d.filed,
            borderColor: '#2563EB',
            backgroundColor: 'rgba(37,99,235,0.08)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#2563EB',
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Resolved',
            data: d.resolved,
            borderColor: '#10B981',
            backgroundColor: 'rgba(16,185,129,0.08)',
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#10B981',
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', labels: { font: defaultFont, usePointStyle: true, pointStyleWidth: 8 } },
          tooltip: {
            backgroundColor: '#0F172A',
            titleColor: '#F8FAFC',
            bodyColor: '#CBD5E1',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: ctx => ' ' + ctx.dataset.label + ': ' + ctx.parsed.y + ' complaints'
            }
          }
        },
        scales: {
          x: { grid: { display: false }, border: { display: false } },
          y: { grid: { color: '#F1F5F9' }, border: { display: false }, beginAtZero: true }
        }
      }
    });
  }
  buildTrendChart('6m');

  // Trend range buttons
  document.querySelectorAll('.dash-chart-btn[data-trend-range]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dash-chart-btn[data-trend-range]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildTrendChart(btn.dataset.trendRange);
    });
  });

  // ── 2. CATEGORY DOUGHNUT CHART ──────────────────────────────
  const catCtx = document.getElementById('categoryDonutChart');
  const catData = {
    labels: ['Roads', 'Water', 'Electricity', 'Garbage', 'Traffic', 'Safety'],
    data:   [56, 34, 28, 42, 18, 12],
    colors: ['#2563EB', '#06B6D4', '#F59E0B', '#10B981', '#8B5CF6', '#F97316']
  };
  let catChart = null;

  function buildCatDonut() {
    if (catChart) catChart.destroy();
    if (!catCtx) return;
    catChart = new Chart(catCtx, {
      type: 'doughnut',
      data: {
        labels: catData.labels,
        datasets: [{
          data: catData.data,
          backgroundColor: catData.colors,
          borderWidth: 3,
          borderColor: '#FFFFFF',
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        cutout: '68%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0F172A',
            titleColor: '#F8FAFC',
            bodyColor: '#CBD5E1',
            cornerRadius: 8,
            callbacks: {
              label: ctx => ' ' + ctx.label + ': ' + ctx.parsed + ' issues'
            }
          }
        }
      }
    });
    // Build custom legend
    const legend = document.getElementById('catChartLegend');
    if (legend) {
      legend.innerHTML = catData.labels.map((label, i) =>
        '<div class="cat-leg-row">' +
        '<span class="cat-leg-dot" style="background:' + catData.colors[i] + ';"></span>' +
        '<span>' + label + '</span>' +
        '<span class="cat-leg-count">' + catData.data[i] + '</span>' +
        '</div>'
      ).join('');
    }
  }
  buildCatDonut();

  // ── 3. RESOLUTION TIME BAR CHART ───────────────────────────
  const resCtx = document.getElementById('resolutionBarChart');
  if (resCtx && window.Chart) {
    new Chart(resCtx, {
      type: 'bar',
      data: {
        labels: ['Roads', 'Water', 'Electricity', 'Garbage', 'Traffic', 'Safety'],
        datasets: [{
          label: 'Avg. Days',
          data: [7.2, 4.1, 3.8, 5.5, 2.9, 6.1],
          backgroundColor: ['#2563EB', '#06B6D4', '#F59E0B', '#10B981', '#8B5CF6', '#F97316'],
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0F172A',
            titleColor: '#F8FAFC',
            bodyColor: '#CBD5E1',
            cornerRadius: 8,
            callbacks: {
              label: ctx => ' ' + ctx.parsed.y + ' days average'
            }
          }
        },
        scales: {
          x: { grid: { display: false }, border: { display: false } },
          y: {
            grid: { color: '#F1F5F9' },
            border: { display: false },
            beginAtZero: true,
            ticks: { callback: v => v + 'd' }
          }
        }
      }
    });
  }

  // ── 4. WEEKLY ACTIVITY CHART ────────────────────────────────
  const weekCtx = document.getElementById('weeklyActivityChart');
  if (weekCtx && window.Chart) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date().getDay(); // 0=Sun,1=Mon,...
    new Chart(weekCtx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [{
          label: 'Complaints',
          data: [12, 18, 9, 15, 22, 8, 6],
          backgroundColor: days.map((_, i) => {
            const dayIdx = (i + 1) % 7; // Mon=1 in JS
            return dayIdx === today ? '#2563EB' : 'rgba(37,99,235,0.18)';
          }),
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0F172A',
            cornerRadius: 8,
            callbacks: {
              label: ctx => ' ' + ctx.parsed.y + ' complaints'
            }
          }
        },
        scales: {
          x: { grid: { display: false }, border: { display: false } },
          y: { grid: { color: '#F1F5F9' }, border: { display: false }, beginAtZero: true, ticks: { stepSize: 5 } }
        }
      }
    });
  }

  // ── VOTE / UPVOTE SYSTEM ────────────────────────────────────
  const votedItems = new Set();
  document.querySelectorAll('.feed-v2-vote-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.feed-v2-card');
      const countEl = card.querySelector('.feed-v2-vote-count');
      const id = card.id || Math.random();
      if (votedItems.has(id)) {
        votedItems.delete(id);
        btn.classList.remove('voted');
        countEl.textContent = parseInt(countEl.textContent) - 1;
      } else {
        votedItems.add(id);
        btn.classList.add('voted');
        countEl.textContent = parseInt(countEl.textContent) + 1;
        btn.animate([{transform:'scale(1)'},{transform:'scale(1.3)'},{transform:'scale(1)'}], { duration: 300 });
      }
    });
  });

  // ── FOLLOW UPDATES ──────────────────────────────────────────
  document.querySelectorAll('.feed-act-follow').forEach(btn => {
    btn.addEventListener('click', () => {
      const isFollowing = btn.classList.toggle('following');
      const svg = btn.querySelector('svg');
      if (isFollowing) {
        btn.innerHTML = (svg ? svg.outerHTML : '') + ' Following';
        if (window.showToast) window.showToast('You will receive updates on this issue', 'success');
      } else {
        btn.innerHTML = (svg ? svg.outerHTML : '') + ' Follow Update';
      }
    });
  });

  // ── COMMENT BOXES ───────────────────────────────────────────
  document.querySelectorAll('.feed-act-btn').forEach(btn => {
    if (!btn.textContent.includes('Comments')) return;
    const card = btn.closest('.feed-v2-card');
    // Inject comment box if not present
    if (!card.querySelector('.feed-comment-box')) {
      const box = document.createElement('div');
      box.className = 'feed-comment-box';
      box.innerHTML = `
        <textarea class="feed-comment-input" placeholder="Add your comment..." rows="2"></textarea>
        <div class="feed-comment-actions">
          <button class="gs-btn-ghost" style="font-size:0.75rem;padding:5px 12px;" onclick="this.closest('.feed-comment-box').classList.remove('open')">Cancel</button>
          <button class="gs-btn-primary" style="font-size:0.75rem;padding:5px 12px;" onclick="
            const t=this.closest('.feed-comment-box').querySelector('textarea');
            if(t.value.trim()){
              window.showToast&&window.showToast('Comment posted!','success');
              t.value='';
              this.closest('.feed-comment-box').classList.remove('open');
            }
          ">Post</button>
        </div>`;
      card.querySelector('.feed-v2-body-main').appendChild(box);
    }
    btn.addEventListener('click', () => {
      card.querySelector('.feed-comment-box').classList.toggle('open');
    });
  });

  // ── FILE COMPLAINT MODAL ────────────────────────────────────
  function openComplaintModal(prefillTitle = '') {
    const existing = document.getElementById('complaintModal');
    if (existing) existing.remove();
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'complaintModal';
    modal.innerHTML = `
      <div class="modal-box">
        <div class="modal-header">
          <span class="modal-title">File a New Complaint</span>
          <button class="modal-close" onclick="document.getElementById('complaintModal').remove()">✕</button>
        </div>
        <div class="modal-form" id="complaintModalForm">
          <div class="modal-field">
            <label>Category</label>
            <select id="mcCategory">
              <option>Roads &amp; Potholes</option>
              <option>Water Supply</option>
              <option>Electricity / Street Lights</option>
              <option>Garbage &amp; Sanitation</option>
              <option>Traffic &amp; Signals</option>
              <option>Public Safety</option>
              <option>Other</option>
            </select>
          </div>
          <div class="modal-field">
            <label>Title</label>
            <input type="text" id="mcTitle" placeholder="Brief title of the issue" value="${prefillTitle}" />
          </div>
          <div class="modal-field">
            <label>Location</label>
            <input type="text" id="mcLocation" placeholder="Street / Landmark / Ward" />
          </div>
          <div class="modal-field">
            <label>Description</label>
            <textarea id="mcDesc" placeholder="Describe the issue in detail..."></textarea>
          </div>
          <div class="modal-field">
            <label>Priority</label>
            <select id="mcPriority">
              <option>High — Urgent action needed</option>
              <option selected>Medium — Needs attention soon</option>
              <option>Low — Can be addressed later</option>
            </select>
          </div>
          <button class="modal-submit" id="mcSubmitBtn">Submit Complaint</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.getElementById('mcSubmitBtn').addEventListener('click', () => {
      const title = document.getElementById('mcTitle').value.trim();
      if (!title) { alert('Please enter a title.'); return; }
      const id = 'CMP-2026-' + String(Math.floor(Math.random()*9000+1000));
      modal.querySelector('.modal-box').innerHTML = `
        <div style="text-align:center;padding:20px 0;">
          <div style="font-size:3rem;margin-bottom:12px;">✅</div>
          <h3 style="font-size:1.1rem;font-weight:800;margin-bottom:8px;">Complaint Registered!</h3>
          <p style="color:#64748B;font-size:0.82rem;margin-bottom:16px;">Your complaint has been submitted to the concerned department.</p>
          <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:14px;text-align:left;margin-bottom:16px;">
            <div style="font-size:0.75rem;color:#64748B;margin-bottom:4px;">Complaint ID</div>
            <div style="font-size:1rem;font-weight:800;color:#2563EB;">${id}</div>
          </div>
          <button class="gs-btn-primary" onclick="document.getElementById('complaintModal').remove()">Done</button>
        </div>`;
      if (window.showToast) window.showToast('Complaint ' + id + ' submitted!', 'success');
      // Update stat counter
      const statEl = document.getElementById('statActiveComplaintsCount');
      if (statEl) statEl.textContent = parseInt(statEl.textContent) + 1;
    });
  }

  document.querySelectorAll('[id^="feedFileComplaint"], .feed-act-btn').forEach(btn => {
    if (!btn.textContent.includes('File Complaint')) return;
    btn.addEventListener('click', () => {
      const card = btn.closest('.feed-v2-card');
      const title = card.querySelector('.feed-v2-title')?.textContent?.trim().substring(0, 60) || '';
      openComplaintModal(title);
    });
  });

  // Register Complaint from Quick Actions
  const tileReport = document.getElementById('tileReport');
  if (tileReport) tileReport.addEventListener('click', () => openComplaintModal());

  // ── SHARE BUTTON ────────────────────────────────────────────
  document.querySelectorAll('.feed-act-btn').forEach(btn => {
    if (!btn.textContent.includes('Share')) return;
    btn.addEventListener('click', () => {
      const card = btn.closest('.feed-v2-card');
      const title = card.querySelector('.feed-v2-title')?.textContent || 'Civic Issue';
      const url = window.location.href;
      if (navigator.share) {
        navigator.share({ title, url });
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        if (window.showToast) window.showToast('Link copied to clipboard!', 'success');
      }
    });
  });

  // ── REPORT BUTTON ───────────────────────────────────────────
  document.querySelectorAll('.feed-act-report').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.showToast) window.showToast('This post has been reported for review', 'warning');
    });
  });

  // ── FEED CATEGORY FILTER ────────────────────────────────────
  const feedTabs = document.querySelectorAll('.feed-tab[data-feed-cat]');
  const feedCards = document.querySelectorAll('.feed-v2-card[data-cat]');
  feedTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      feedTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.feedCat;
      feedCards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
      });
      // Also hide charts when filtered
      document.querySelectorAll('.dash-chart-card').forEach(c => {
        c.style.display = (cat === 'all') ? '' : 'none';
      });
    });
  });

  // ── QUICK ACTIONS NAVIGATION ────────────────────────────────
  const qaMap = {
    'tileMap': 'map',
    'tileService': 'ai',
    'qaGovServices': 'services',
    'tileSOS': 'emergency',
    'nearbyUpdatesBtn': 'map',
    'trackComplaintBtn': 'complaints'
  };
  Object.entries(qaMap).forEach(([id, tab]) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => {
      const sideItem = document.querySelector(`[data-tab="${tab}"]`);
      if (sideItem) sideItem.click();
    });
  });

  // Voice Complaint
  const voiceBtn = document.getElementById('voiceComplaintBtn');
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => {
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        const rec = new SR();
        rec.lang = 'en-IN';
        rec.start();
        if (window.showToast) window.showToast('Listening... Speak your complaint', 'info');
        rec.onresult = e => {
          const text = e.results[0][0].transcript;
          openComplaintModal(text);
        };
        rec.onerror = () => {
          openComplaintModal();
        };
      } else {
        openComplaintModal();
      }
    });
  }

  // Budget details
  const budgetBtn = document.getElementById('dashBudgetDetailsBtn');
  if (budgetBtn) {
    budgetBtn.addEventListener('click', () => {
      const sideItem = document.querySelector('[data-tab="transparency"]');
      if (sideItem) sideItem.click();
    });
  }

  // Community Voice poll
  const pollOpts = document.querySelectorAll('.rp-poll-opt');
  pollOpts.forEach(opt => {
    opt.style.cursor = 'pointer';
    opt.addEventListener('click', () => {
      pollOpts.forEach(o => o.style.opacity = '0.6');
      opt.style.opacity = '1';
      const fill = opt.querySelector('.rp-poll-bar-fill');
      const pct = opt.querySelector('.rp-poll-opt-pct');
      if (fill && pct) {
        const cur = parseInt(fill.style.width) || 0;
        const newPct = Math.min(cur + 3, 90);
        fill.style.transition = 'width 0.5s ease';
        fill.style.width = newPct + '%';
        pct.textContent = newPct + '% (' + (Math.floor(Math.random() * 10 + 80)) + ' votes)';
      }
      if (window.showToast) window.showToast('Vote recorded! Thank you for your input.', 'success');
    });
  });

  // Alert pill chevrons expand
  document.querySelectorAll('.alert-pill-chevron').forEach(btn => {
    btn.addEventListener('click', () => {
      const pill = btn.closest('.alert-pill');
      const expanded = pill.dataset.expanded === 'true';
      pill.dataset.expanded = !expanded;
      if (!expanded) {
        const detail = document.createElement('div');
        detail.className = 'alert-pill-detail';
        detail.style.cssText = 'font-size:0.72rem;color:#475569;padding:8px 0 4px 0;border-top:1px solid #E2E8F0;margin-top:8px;';
        detail.textContent = 'Tap for more information. This alert was issued by the Municipal Corporation of Vadodara.';
        pill.appendChild(detail);
        btn.style.transform = 'rotate(180deg)';
      } else {
        const detail = pill.querySelector('.alert-pill-detail');
        if (detail) detail.remove();
        btn.style.transform = 'rotate(0deg)';
      }
    });
  });

  // ── TOAST SYSTEM ────────────────────────────────────────────
  // Ensure toast container exists (fallback)
  if (!document.querySelector('.toast-container')) {
    const tc = document.createElement('div');
    tc.className = 'toast-container';
    document.body.appendChild(tc);
  }

  // Override showToast to use new styled system
  const _orig = window.showToast;
  window.showToast = function(msg, type = 'info') {
    const tc = document.querySelector('.toast-container');
    if (!tc) { if (_orig) _orig(msg, type); return; }
    const t = document.createElement('div');
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    t.className = 'toast ' + (type || 'info');
    t.innerHTML = '<span>' + (icons[type] || 'ℹ️') + '</span><span>' + msg + '</span>';
    tc.appendChild(t);
    setTimeout(() => {
      t.style.animation = 'toastOut 0.25s ease forwards';
      setTimeout(() => t.remove(), 250);
    }, 3200);
  };

  // ── REAL-TIME STAT TICKER (simulate live updates) ────────────
  setInterval(() => {
    const vals = [214, 37, 162, 23];
    const ids = ['statActiveComplaintsCount'];
    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && Math.random() < 0.3) {
        const current = parseInt(el.textContent.replace(/,/g, '')) || vals[i];
        const delta = Math.random() < 0.6 ? 1 : 0;
        if (delta) {
          el.textContent = (current + delta).toLocaleString('en-IN');
          el.style.color = '#10B981';
          setTimeout(() => { el.style.color = ''; }, 1500);
        }
      }
    });
  }, 15000);

  console.log('Fullstack Dashboard Engine loaded successfully.');
});


/* ============================================================
   PUBLIC FUNDS TRANSPARENCY — FIXED ENGINE (v2)
   - Works with local Chart.js (no CDN needed)
   - Proper tab click binding (works inside switchTab flow)
   - All charts lazy-loaded on first tab visit
   - Responsive + mobile-friendly
   ============================================================ */
window.PF_ENGINE = (function() {

  /* ── Data ── */
  const DATA = {
    fy: {
      '2026': { budget: 8.40, utilized: 5.20, remaining: 3.20, projects: 128, active: 56 },
      '2025': { budget: 7.20, utilized: 6.10, remaining: 1.10, projects: 105, active: 38 },
      '2024': { budget: 6.50, utilized: 5.80, remaining: 0.70, projects:  92, active: 24 }
    },
    depts: [
      { name: 'Roads & Infrastructure',     alloc: 3.62, util: 2.25, color: '#2563EB' },
      { name: 'Water Supply & Sanitation',  alloc: 2.01, util: 1.25, color: '#06B6D4' },
      { name: 'Electricity & Lights',       alloc: 1.34, util: 0.78, color: '#F59E0B' },
      { name: 'Parks & Environment',        alloc: 0.95, util: 0.52, color: '#10B981' },
      { name: 'Education & Health',         alloc: 0.58, util: 0.28, color: '#8B5CF6' },
      { name: 'Others',                     alloc: 0.18, util: 0.12, color: '#F97316' }
    ],
    projects: [
      { name: 'Drainage Improvement (3rd Block)',   dept:'VMC',         budget:80,   util:64,   pct:80, status:'inprog'  },
      { name: 'Park Renovation (Cunningham Park)', dept:'Horticulture', budget:50,   util:28.5, pct:57, status:'inprog'  },
      { name: 'Street Light LED Upgrade',          dept:'MGVCL',       budget:70,   util:49.1, pct:70, status:'inprog'  },
      { name: 'Water Pipeline Replacement',        dept:'VMC Water Works',        budget:120,  util:78.3, pct:65, status:'inprog'  },
      { name: 'Road Resurfacing (5th Main Road)',  dept:'VMC',         budget:90,   util:22.6, pct:25, status:'pending' },
      { name: 'Govt. School Building – Phase 2',  dept:'Education',    budget:280,  util:0,    pct:0,  status:'upcoming'}
    ],
    monthly: {
      labels: ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'],
      alloc:  [0.58, 0.62, 0.70, 0.68, 0.75, 0.72, 0.80, 0.78, 0.85, 0.88, 0.90, 0.94],
      util:   [0.42, 0.50, 0.55, 0.60, 0.68, 0.65, 0.72, 0.70, 0.78, 0.80, 0.82, 0.88]
    },
    quarterly: {
      labels: ['Q1 (Apr–Jun)', 'Q2 (Jul–Sep)', 'Q3 (Oct–Dec)', 'Q4 (Jan–Mar)'],
      alloc:  [1.90, 2.15, 2.43, 2.72],
      util:   [1.47, 1.93, 2.20, 2.50]
    },
    yearly: {
      labels: ['FY 23-24', 'FY 24-25', 'FY 25-26 (YTD)'],
      alloc:  [6.50, 7.20, 8.40],
      util:   [5.80, 6.10, 5.20]
    },
    wards: [
      { name: 'Ward 6 – Alkapuri',      alloc: '₹ 1.20 Cr', pct: 78, color: '#2563EB' },
      { name: 'Ward 15 – Shivajinagar',        alloc: '₹ 0.95 Cr', pct: 62, color: '#06B6D4' },
      { name: 'Ward 16 – Rajajinagar',         alloc: '₹ 1.45 Cr', pct: 85, color: '#10B981' },
      { name: 'Ward 17 – Malleshwaram',        alloc: '₹ 1.10 Cr', pct: 55, color: '#F59E0B' },
      { name: 'Ward 18 – Sayajigunj',              alloc: '₹ 0.80 Cr', pct: 42, color: '#8B5CF6' },
      { name: 'Ward 19 – Yelahanka',           alloc: '₹ 0.90 Cr', pct: 68, color: '#F97316' },
      { name: 'Ward 20 – Dasarahalli',         alloc: '₹ 0.75 Cr', pct: 50, color: '#EF4444' },
      { name: 'Ward 21 – Byatarayanapura',     alloc: '₹ 1.25 Cr', pct: 72, color: '#0891B2' }
    ],
    schemes: [
      { name: 'AMRUT 2.0',                  total: 2.20, util: 1.54, pct: 70, color: '#2563EB' },
      { name: 'Smart Cities Mission',         total: 1.80, util: 1.22, pct: 68, color: '#7C3AED' },
      { name: 'PMGSY Roads',                 total: 1.50, util: 1.05, pct: 70, color: '#10B981' },
      { name: 'Jal Jeevan Mission',          total: 1.20, util: 0.72, pct: 60, color: '#06B6D4' },
      { name: 'Swachh Bharat',               total: 0.80, util: 0.44, pct: 55, color: '#F59E0B' },
      { name: 'National Urban Livelihood',   total: 0.60, util: 0.23, pct: 38, color: '#F97316' }
    ],
    sources: [
      { name: 'Central Grants',   amt: 4.80, color: '#2563EB' },
      { name: 'State Grants',     amt: 2.10, color: '#10B981' },
      { name: 'Local Body Funds', amt: 1.20, color: '#F59E0B' },
      { name: 'Other Sources',    amt: 0.30, color: '#8B5CF6' }
    ],
    activities: [
      { type:'release', amt:'₹ 45.60 L', desc:'Drainage Improvement Project',  time:'2 hours ago', color:'#10B981' },
      { type:'spend',   amt:'₹ 22.1220 L', desc:'Street Light Maintenance',       time:'5 hours ago', color:'#EF4444' },
      { type:'alloc',   amt:'₹ 30.00 L', desc:'Park Renovation Project',         time:'Yesterday',   color:'#2563EB' },
      { type:'spend',   amt:'₹ 18.75 L', desc:'Water Pipeline Repair',           time:'2 days ago',  color:'#EF4444' },
      { type:'alloc',   amt:'₹ 25.00 L', desc:'Road Resurfacing Project',        time:'2 days ago',  color:'#2563EB' }
    ],
    spendPeriod: 'monthly'
  };

  const C_FONT = { family: "'Outfit', sans-serif", size: 11 };
  const TT = { backgroundColor: '#0F172A', titleColor: '#F8FAFC', bodyColor: '#CBD5E1', cornerRadius: 8, padding: 10 };

  /* ── Chart registry ── */
  const charts = {};
  function kill(key) { if (charts[key]) { try { charts[key].destroy(); } catch(e){} charts[key] = null; } }

  /* ── Lazy-build flags ── */
  const built = {};

  /* ── Current FY ── */
  let currentFY = '2026';

  /* ── Helper: safe getElementById ── */
  function el(id) { return document.getElementById(id); }

  /* ── Helper: efficiency badge ── */
  function effBadge(util, alloc) {
    const p = Math.round((util / alloc) * 100);
    const c = p >= 70 ? 'high' : p >= 50 ? 'mid' : 'low';
    return '<span class="pft-dept-eff ' + c + '">' + p + '%</span>';
  }

  /* ── CHART: Budget Doughnut ── */
  function buildDonut(fy) {
    const ctx = el('pfBudgetDonut');
    if (!ctx || !window.Chart) return;
    kill('donut');
    const fyD = DATA.fy[fy] || DATA.fy['2026'];
    const pct = ((fyD.utilized / fyD.budget) * 100).toFixed(1);
    const pcEl = el('pfDonutPct');
    if (pcEl) pcEl.textContent = pct + '%';
    charts.donut = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: DATA.depts.map(d => d.name),
        datasets: [{ data: DATA.depts.map(d => d.util), backgroundColor: DATA.depts.map(d => d.color), borderWidth: 3, borderColor: '#fff', hoverOffset: 10 }]
      },
      options: {
        cutout: '70%',
        plugins: {
          legend: { display: false },
          tooltip: { ...TT, callbacks: { label: c => ' ' + c.label + ': ₹' + c.parsed.toFixed(2) + ' Cr (' + ((c.parsed / fyD.utilized) * 100).toFixed(1) + '%)' } }
        },
        onClick(evt, els) {
          if (!els.length) return;
          const d = DATA.depts[els[0].index];
          toast(d.name + ': ₹' + d.util.toFixed(2) + ' Cr utilized of ₹' + d.alloc.toFixed(2) + ' Cr', 'info');
          clickPfTab('dept');
        }
      }
    });
    /* Legend */
    const leg = el('pfDonutLegend');
    if (leg) leg.innerHTML = DATA.depts.map(d =>
      '<div class="pf-leg-row"><span class="pf-leg-dot" style="background:' + d.color + ';"></span>' +
      '<span style="flex:1;font-size:0.7rem;">' + d.name + '</span>' +
      '<span class="pf-leg-val" style="font-size:0.68rem;">₹' + d.util.toFixed(2) + ' Cr</span></div>'
    ).join('');
  }

  /* ── CHART: Spending Line ── */
  function buildSpending(period) {
    const ctx = el('pfSpendingChart');
    if (!ctx || !window.Chart) return;
    kill('spending');
    const d = DATA[period] || DATA.monthly;
    charts.spending = new Chart(ctx, {
      type: 'line',
      data: {
        labels: d.labels,
        datasets: [
          { label: 'Allocated (Cr)', data: d.alloc, borderColor: '#2563EB', backgroundColor: 'rgba(37,99,235,0.07)', borderWidth: 2.5, fill: true, tension: 0.4, pointRadius: 4, pointHoverRadius: 7, pointBackgroundColor: '#2563EB' },
          { label: 'Utilized (Cr)',  data: d.util,  borderColor: '#10B981', backgroundColor: 'rgba(16,185,129,0.07)', borderWidth: 2.5, fill: true, tension: 0.4, pointRadius: 4, pointHoverRadius: 7, pointBackgroundColor: '#10B981' }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', labels: { font: C_FONT, usePointStyle: true } },
          tooltip: { ...TT, callbacks: { label: c => ' ' + c.dataset.label + ': ₹' + c.parsed.y.toFixed(2) + ' Cr' } }
        },
        scales: {
          x: { grid: { display: false }, border: { display: false } },
          y: { grid: { color: '#F1F5F9' }, border: { display: false }, ticks: { callback: v => '₹' + v.toFixed(1) } }
        }
      }
    });
  }

  /* ── CHART: Dept Horizontal Utilization Bar ── */
  function buildDeptBar() {
    const ctx = el('pfDeptBarChart');
    if (!ctx || !window.Chart) return;
    kill('deptBar');
    charts.deptBar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: DATA.depts.map(d => d.name.split(' &')[0].split(' Supply')[0]),
        datasets: [{ label: 'Utilization %', data: DATA.depts.map(d => Math.round((d.util / d.alloc) * 100)), backgroundColor: DATA.depts.map(d => d.color + 'CC'), borderColor: DATA.depts.map(d => d.color), borderWidth: 2, borderRadius: 7, borderSkipped: false }]
      },
      options: {
        indexAxis: 'y', responsive: true, maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: { ...TT, callbacks: { label: c => ' Utilization: ' + c.parsed.x + '%' } }
        },
        scales: {
          x: { grid: { color: '#F1F5F9' }, border: { display: false }, min: 0, max: 100, ticks: { callback: v => v + '%' } },
          y: { grid: { display: false }, border: { display: false } }
        },
        onClick(evt, els) {
          if (!els.length) return;
          const d = DATA.depts[els[0].index];
          const p = Math.round((d.util / d.alloc) * 100);
          toast(d.name + ': ' + p + '% utilized (₹' + d.util.toFixed(2) + ' of ₹' + d.alloc.toFixed(2) + ' Cr)', 'info');
          clickPfTab('dept');
        }
      }
    });
  }

  /* ── CHART: Dept Tab – Grouped Bar ── */
  function buildDeptGrouped() {
    const ctx = el('pfDeptGroupedBar');
    if (!ctx || !window.Chart) return;
    kill('deptGrouped');
    charts.deptGrouped = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: DATA.depts.map(d => d.name.split(' &')[0]),
        datasets: [
          { label: 'Allocated (Cr)', data: DATA.depts.map(d => d.alloc), backgroundColor: 'rgba(37,99,235,0.2)', borderColor: '#2563EB', borderWidth: 2, borderRadius: 5 },
          { label: 'Utilized (Cr)',  data: DATA.depts.map(d => d.util),  backgroundColor: DATA.depts.map(d => d.color + 'BB'), borderColor: DATA.depts.map(d => d.color), borderWidth: 2, borderRadius: 5 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', labels: { font: C_FONT, usePointStyle: true } },
          tooltip: { ...TT, callbacks: { label: c => ' ' + c.dataset.label + ': ₹' + c.parsed.y.toFixed(2) + ' Cr' } }
        },
        scales: {
          x: { grid: { display: false }, border: { display: false } },
          y: { grid: { color: '#F1F5F9' }, border: { display: false }, ticks: { callback: v => '₹' + v.toFixed(1) } }
        }
      }
    });
    /* Dept table */
    const tbody = el('pfDeptTableBody');
    if (tbody) tbody.innerHTML = DATA.depts.map(d =>
      '<tr>' +
      '<td><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + d.color + ';margin-right:6px;"></span>' + d.name + '</td>' +
      '<td>₹ ' + d.alloc.toFixed(2) + ' Cr</td>' +
      '<td>₹ ' + d.util.toFixed(2) + ' Cr</td>' +
      '<td>₹ ' + (d.alloc - d.util).toFixed(2) + ' Cr</td>' +
      '<td>' + effBadge(d.util, d.alloc) + '</td>' +
      '</tr>'
    ).join('');
  }

  /* ── CHART: Project Tab – Horizontal ── */
  function buildProjectHBar() {
    const ctx = el('pfProjectHBar');
    if (!ctx || !window.Chart) return;
    kill('projHBar');
    charts.projHBar = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: DATA.projects.map(p => p.name.substring(0, 26) + (p.name.length > 26 ? '…' : '')),
        datasets: [
          { label: 'Budget (L)',   data: DATA.projects.map(p => p.budget), backgroundColor: 'rgba(37,99,235,0.2)', borderColor: '#2563EB', borderWidth: 1.5, borderRadius: 4 },
          { label: 'Utilized (L)', data: DATA.projects.map(p => p.util),   backgroundColor: DATA.projects.map(p => p.status === 'inprog' ? 'rgba(16,185,129,0.75)' : p.status === 'pending' ? 'rgba(245,158,11,0.7)' : 'rgba(148,163,184,0.5)'), borderRadius: 4 }
        ]
      },
      options: {
        indexAxis: 'y', responsive: true, maintainAspectRatio: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', labels: { font: C_FONT, usePointStyle: true } },
          tooltip: { ...TT, callbacks: { label: c => ' ' + c.dataset.label + ': ₹ ' + c.parsed.x.toFixed(2) + ' L' } }
        },
        scales: {
          x: { grid: { color: '#F1F5F9' }, border: { display: false }, ticks: { callback: v => '₹' + v + 'L' } },
          y: { grid: { display: false }, border: { display: false } }
        },
        onClick(evt, els) {
          if (!els.length) return;
          const p = DATA.projects[els[0].index];
          toast(p.name + ' — ' + p.pct + '% complete · ₹' + p.util + 'L of ₹' + p.budget + 'L utilized', 'info');
        }
      }
    });
  }

  /* ── CHART: Project Timeline ── */
  function buildProjectTimeline() {
    const ctx = el('pfProjectTimeline');
    if (!ctx || !window.Chart) return;
    kill('projTimeline');
    charts.projTimeline = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Apr','May','Jun','Jul','Aug','Sep','Oct'],
        datasets: [
          { label: 'Drainage',   data: [0, 10, 20, 35, 48, 60, 65],   borderColor: '#2563EB', tension: 0.4, pointRadius: 3, fill: false },
          { label: 'Park Reno',  data: [0, 8,  18, 30, 45, 57, null], borderColor: '#10B981', tension: 0.4, pointRadius: 3, fill: false },
          { label: 'LED Upgrade',data: [0, 15, 30, 50, 65, 70, null], borderColor: '#F59E0B', tension: 0.4, pointRadius: 3, fill: false },
          { label: 'Pipeline',   data: [0, 5,  15, 30, 50, 65, null], borderColor: '#06B6D4', tension: 0.4, pointRadius: 3, fill: false }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', labels: { font: C_FONT, usePointStyle: true, boxWidth: 12 } },
          tooltip: { ...TT, callbacks: { label: c => ' ' + c.dataset.label + ': ' + (c.parsed.y !== null ? c.parsed.y + '%' : '—') } }
        },
        scales: {
          x: { grid: { display: false }, border: { display: false } },
          y: { grid: { color: '#F1F5F9' }, border: { display: false }, min: 0, max: 100, ticks: { callback: v => v + '%' } }
        }
      }
    });
  }

  /* ── CHART: Ward Radar ── */
  function buildWardRadar() {
    const ctx = el('pfWardRadar');
    if (!ctx || !window.Chart) return;
    kill('wardRadar');
    charts.wardRadar = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: DATA.wards.map(w => w.name.split(' – ')[1] || w.name),
        datasets: [{ label: 'Utilization %', data: DATA.wards.map(w => w.pct), borderColor: '#2563EB', backgroundColor: 'rgba(37,99,235,0.1)', pointBackgroundColor: '#2563EB', borderWidth: 2, pointRadius: 4 }]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        plugins: {
          legend: { position: 'top', labels: { font: C_FONT } },
          tooltip: { ...TT, callbacks: { label: c => ' Utilization: ' + c.parsed.r + '%' } }
        },
        scales: { r: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%', font: C_FONT }, grid: { color: '#E2E8F0' }, pointLabels: { font: C_FONT } } },
        onClick(evt, els) {
          if (!els.length) return;
          const w = DATA.wards[els[0].index];
          toast(w.name + ': ' + w.pct + '% utilized (' + w.alloc + ')', 'info');
        }
      }
    });
  }

  /* ── CHART: Scheme Pie ── */
  function buildSchemePie() {
    const ctx = el('pfSchemePie');
    if (!ctx || !window.Chart) return;
    kill('schemePie');
    const total = DATA.schemes.reduce((a, s) => a + s.total, 0);
    charts.schemePie = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: DATA.schemes.map(s => s.name),
        datasets: [{ data: DATA.schemes.map(s => s.total), backgroundColor: DATA.schemes.map(s => s.color), borderWidth: 3, borderColor: '#fff', hoverOffset: 8 }]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        plugins: {
          legend: { position: 'right', labels: { font: C_FONT, usePointStyle: true } },
          tooltip: { ...TT, callbacks: { label: c => ' ₹ ' + c.parsed.toFixed(2) + ' Cr (' + ((c.parsed / total) * 100).toFixed(1) + '%)' } }
        },
        onClick(evt, els) {
          if (!els.length) return;
          const s = DATA.schemes[els[0].index];
          toast(s.name + ': ₹' + s.util.toFixed(2) + ' Cr of ₹' + s.total.toFixed(2) + ' Cr utilized (' + s.pct + '%)', 'info');
        }
      }
    });
    /* Scheme tracker bars */
    const tracker = el('pfSchemeTracker');
    if (tracker) {
      tracker.innerHTML = DATA.schemes.map(s =>
        '<div class="pft-scheme-item">' +
        '<div class="pft-scheme-bar-wrap">' +
        '<div style="display:flex;justify-content:space-between;"><span class="pft-scheme-name">' + s.name + '</span><span class="pft-scheme-pct" style="color:' + s.color + '">' + s.pct + '%</span></div>' +
        '<div class="pft-scheme-sub">Allocated: ₹' + s.total.toFixed(2) + ' Cr · Utilized: ₹' + s.util.toFixed(2) + ' Cr</div>' +
        '<div class="pft-scheme-bar-track"><div class="pft-scheme-bar-fill" style="width:0%;background:' + s.color + ';" data-target="' + s.pct + '"></div></div>' +
        '</div></div>'
      ).join('');
      setTimeout(() => {
        tracker.querySelectorAll('.pft-scheme-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.target + '%';
        });
      }, 350);
    }
  }

  /* ── CHART: Source Doughnut ── */
  function buildSourceDonut() {
    const ctx = el('pfSourceDonut');
    if (!ctx || !window.Chart) return;
    kill('srcDonut');
    const total = DATA.sources.reduce((a, s) => a + s.amt, 0);
    charts.srcDonut = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: DATA.sources.map(s => s.name),
        datasets: [{ data: DATA.sources.map(s => s.amt), backgroundColor: DATA.sources.map(s => s.color), borderWidth: 3, borderColor: '#fff', hoverOffset: 8 }]
      },
      options: {
        cutout: '65%', responsive: true, maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: { ...TT, callbacks: { label: c => ' ₹' + c.parsed.toFixed(2) + ' Cr (' + ((c.parsed / total) * 100).toFixed(1) + '%)' } }
        }
      }
    });
    const leg = el('pfSourceLegend');
    if (leg) leg.innerHTML = DATA.sources.map(s => {
      const pct = ((s.amt / total) * 100).toFixed(1);
      return '<div class="pft-source-leg-row">' +
        '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:' + s.color + ';flex-shrink:0;"></span>' +
        '<span style="flex:1;font-size:0.78rem;">' + s.name + '</span>' +
        '<span class="pft-source-leg-amt">₹' + s.amt.toFixed(2) + ' Cr</span>' +
        '<span class="pft-source-leg-pct">' + pct + '%</span>' +
        '</div>';
    }).join('');
  }

  /* ── CHART: Source Inflow ── */
  function buildSourceInflow() {
    const ctx = el('pfSourceInflow');
    if (!ctx || !window.Chart) return;
    kill('srcInflow');
    charts.srcInflow = new Chart(ctx, {
      type: 'line',
      data: {
        labels: DATA.monthly.labels,
        datasets: [
          { label: 'Central Grants',   data: [0.35,0.38,0.40,0.42,0.45,0.43,0.48,0.46,0.50,0.52,0.53,0.55], borderColor: '#2563EB', backgroundColor: 'rgba(37,99,235,0.07)', fill: true, tension: 0.4, pointRadius: 3 },
          { label: 'State Grants',     data: [0.15,0.17,0.18,0.19,0.20,0.19,0.21,0.20,0.22,0.23,0.24,0.25], borderColor: '#10B981', backgroundColor: 'rgba(16,185,129,0.07)', fill: true, tension: 0.4, pointRadius: 3 },
          { label: 'Local Body Funds', data: [0.08,0.09,0.09,0.10,0.10,0.10,0.11,0.11,0.12,0.12,0.13,0.13], borderColor: '#F59E0B', backgroundColor: 'rgba(245,158,11,0.07)', fill: true, tension: 0.4, pointRadius: 3 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', labels: { font: C_FONT, usePointStyle: true } },
          tooltip: { ...TT, callbacks: { label: c => ' ' + c.dataset.label + ': ₹' + c.parsed.y.toFixed(2) + ' Cr' } }
        },
        scales: {
          x: { grid: { display: false }, border: { display: false } },
          y: { grid: { color: '#F1F5F9' }, border: { display: false }, ticks: { callback: v => '₹' + v.toFixed(2) } }
        }
      }
    });
  }

  /* ── CHART: Gauge ── */
  function buildGauge(pct) {
    const ctx = el('pfGaugeChart');
    if (!ctx || !window.Chart) return;
    kill('gauge');
    const color = pct >= 70 ? '#10B981' : pct >= 50 ? '#2563EB' : '#EF4444';
    charts.gauge = new Chart(ctx, {
      type: 'doughnut',
      data: { datasets: [{ data: [pct, 100 - pct], backgroundColor: [color, '#F1F5F9'], borderWidth: 0 }] },
      options: {
        circumference: 180, rotation: -90, cutout: '72%',
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        animation: { animateRotate: true, duration: 900 }
      }
    });
    const gpEl = el('pfGaugePct');
    if (gpEl) gpEl.textContent = pct.toFixed(1) + '%';
  }

  /* ── STATIC: Projects Table ── */
  function buildProjectsTable(filter) {
    filter = (filter || '').toLowerCase();
    const tbody = el('pfProjectsBody');
    if (!tbody) return;
    const statusLabel = { inprog: 'In Progress', pending: 'Not Started', upcoming: 'Upcoming' };
    const filtered = DATA.projects.filter(p =>
      !filter || p.name.toLowerCase().includes(filter) || p.dept.toLowerCase().includes(filter)
    );
    tbody.innerHTML = filtered.map(p => {
      const barColor = p.pct >= 70 ? '#10B981' : p.pct >= 40 ? '#2563EB' : '#94A3B8';
      return '<tr style="cursor:pointer;" onclick="window.showToast&&window.showToast(\'' + p.name.replace(/'/g, '') + ' – ₹' + p.util + 'L utilized of ₹' + p.budget + 'L (' + p.pct + '% done)\',\'info\')">' +
        '<td style="font-weight:700;">' + p.name + '</td>' +
        '<td>' + p.dept + '</td>' +
        '<td>₹ ' + p.budget + ' L</td>' +
        '<td>₹ ' + p.util + ' L</td>' +
        '<td><div class="pf-progress-bar" style="width:90px;"><div style="width:' + p.pct + '%;background:' + barColor + ';"></div></div><span style="font-size:0.66rem;color:#64748B;margin-left:5px;">' + p.pct + '%</span></td>' +
        '<td><span class="pf-table-badge ' + (p.status || 'pending') + '">' + (statusLabel[p.status] || p.status) + '</span></td>' +
        '<td><button class="gs-link-btn" onclick="event.stopPropagation();window.showToast&&window.showToast(\'Opening ' + p.name.split('(')[0].trim().replace(/'/g,'') + ' project details\',\'info\')">Details →</button></td>' +
        '</tr>';
    }).join('') || '<tr><td colspan="7" style="text-align:center;padding:20px;color:#94A3B8;">No matching projects</td></tr>';
  }

  /* ── STATIC: Ward Grid ── */
  function buildWardGrid() {
    const grid = el('pfWardGrid');
    if (!grid) return;
    grid.innerHTML = DATA.wards.map(w =>
      '<div class="pft-ward-card" onclick="window.showToast&&window.showToast(\'' + w.name + ': ' + w.pct + '% utilized (' + w.alloc + ')\',\'info\')">' +
      '<div class="pft-ward-name">' + (w.name.split(' – ')[1] || w.name) + '</div>' +
      '<div class="pft-ward-amt">' + w.alloc + '</div>' +
      '<div class="pft-ward-bar"><div style="width:' + w.pct + '%;background:' + w.color + ';"></div></div>' +
      '<div class="pft-ward-pct">' + w.pct + '% utilized</div>' +
      '</div>'
    ).join('');
  }

  /* ── STATIC: Dept Perf Sidebar ── */
  function buildDeptPerf() {
    const list = el('pfDeptPerfList');
    if (!list) return;
    list.innerHTML = DATA.depts.map(d => {
      const pct = Math.round((d.util / d.alloc) * 100);
      return '<div class="pf-dept-perf-item">' +
        '<div class="pf-dept-perf-row"><span>' + d.name.split(' &')[0] + '</span><strong>' + pct + '%</strong></div>' +
        '<div class="pf-progress-bar"><div style="width:' + pct + '%;background:' + d.color + ';transition:width 0.8s;"></div></div>' +
        '</div>';
    }).join('');
  }

  /* ── STATIC: Activities ── */
  function buildActivities() {
    const list = el('pfActivitiesList');
    if (!list) return;
    const labels = { release: 'released', spend: 'spent', alloc: 'allocated' };
    list.innerHTML = DATA.activities.map(a =>
      '<div class="pf-act-item">' +
      '<div class="pf-act-dot" style="background:' + a.color + ';"></div>' +
      '<div class="pf-act-body">' +
      '<div class="pf-act-amt" style="color:' + a.color + ';">' + a.amt + ' ' + (labels[a.type] || '') + '</div>' +
      '<div class="pf-act-sub">' + a.desc + '</div>' +
      '<div class="pf-act-time">' + a.time + '</div>' +
      '</div></div>'
    ).join('');
  }

  /* ── FY Update ── */
  function updateFY(fy) {
    currentFY = fy;
    const fyD = DATA.fy[fy] || DATA.fy['2026'];
    const utilPct = ((fyD.utilized / fyD.budget) * 100).toFixed(1);
    const remPct  = ((fyD.remaining / fyD.budget) * 100).toFixed(1);
    [
      ['pfStatBudget',    '₹ ' + fyD.budget.toFixed(2) + ' Cr'],
      ['pfStatUtilized',  '₹ ' + fyD.utilized.toFixed(2) + ' Cr'],
      ['pfStatRemaining', '₹ ' + fyD.remaining.toFixed(2) + ' Cr'],
      ['pfStatProjects',  fyD.projects + ''],
      ['pfStatActive',    fyD.active + ''],
      ['pfUtilPct',       utilPct + '% of Budget'],
      ['pfRemPct',        remPct + '% Remaining'],
      ['pfGaugePct',      utilPct + '%']
    ].forEach(([id, val]) => {
      const e = el(id);
      if (!e) return;
      e.style.transition = 'opacity 0.3s';
      e.style.opacity = '0';
      setTimeout(() => { e.textContent = val; e.style.opacity = '1'; }, 300);
    });
    buildDonut(fy);
    buildGauge(parseFloat(utilPct));
    if (window.showToast) window.showToast('Showing data for FY ' + fy + ' – ' + (parseInt(fy) + 1), 'info');
  }

  /* ── Days left in FY ── */
  function calcDaysLeft() {
    const now = new Date();
    const fyEnd = new Date(now.getFullYear() + (now.getMonth() >= 3 ? 1 : 0), 2, 31);
    const diff = Math.ceil((fyEnd - now) / 86400000);
    const dEl = el('pfDaysLeft');
    if (dEl) dEl.textContent = diff + ' days';
  }

  /* ── Toast helper ── */
  function toast(msg, type) { if (window.showToast) window.showToast(msg, type || 'info'); }

  /* ── Switch PF sub-tab programmatically ── */
  function clickPfTab(tabId) {
    const t = document.querySelector('.pf-tab[data-pf-tab="' + tabId + '"]');
    if (t) t.click();
  }

  /* ── Init Overview ── */
  function initOverview() {
    if (built.overview) return;
    built.overview = true;
    buildDonut(currentFY);
    buildSpending(DATA.spendPeriod);
    buildDeptBar();
    buildProjectsTable();
    buildWardGrid();
    buildDeptPerf();
    buildActivities();
    buildGauge(61.9);
    calcDaysLeft();
  }

  /* ── Tab panel switcher ── */
  function switchPanel(tabId) {
    /* hide all panels */
    document.querySelectorAll('.pf-tab-panel').forEach(p => {
      p.style.display = 'none';
    });
    const panel = el('pfPanel-' + tabId);
    if (panel) panel.style.display = '';

    /* lazy build */
    if (!built[tabId]) {
      built[tabId] = true;
      if (tabId === 'overview') initOverview();
      if (tabId === 'dept')    { buildDeptGrouped(); }
      if (tabId === 'project') { buildProjectHBar(); buildProjectTimeline(); }
      if (tabId === 'ward')    { buildWardRadar(); }
      if (tabId === 'scheme')  { buildSchemePie(); }
      if (tabId === 'sources') { buildSourceDonut(); buildSourceInflow(); }
    }

    /* invalidate charts so they resize correctly */
    setTimeout(() => {
      Object.values(charts).forEach(c => { if (c) try { c.resize(); } catch(e){} });
    }, 50);
  }

  /* ── BIND ALL EVENTS ── */
  function bind() {
    /* PF sub-tabs */
    document.querySelectorAll('.pf-tab[data-pf-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.pf-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        switchPanel(tab.dataset.pfTab);
      });
    });

    /* Period toggle (Monthly/Quarterly/Yearly) */
    document.querySelectorAll('[data-pf-period]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-pf-period]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        DATA.spendPeriod = btn.dataset.pfPeriod;
        buildSpending(btn.dataset.pfPeriod);
      });
    });

    /* FY selector */
    const fyEl = el('pfFYSelect');
    if (fyEl) fyEl.addEventListener('change', () => updateFY(fyEl.value));

    /* Project search */
    const ps = el('pfProjectSearch');
    if (ps) {
      ps.addEventListener('input', () => buildProjectsTable(ps.value));
      ps.addEventListener('keydown', e => { if (e.key === 'Escape') { ps.value = ''; buildProjectsTable(); } });
    }

    /* Download */
    const dlBtn = el('pfDownloadBtn');
    if (dlBtn) dlBtn.addEventListener('click', () => toast('Generating PDF report... (Feature coming soon)', 'info'));

    /* KPI cards → tab navigation */
    [['pfKpi1','dept'],['pfKpi2','dept'],['pfKpi3','dept'],['pfKpi4','project'],['pfKpi5','project']].forEach(([id, tab]) => {
      const e = el(id);
      if (e) e.addEventListener('click', () => clickPfTab(tab));
    });

    /* Dept Performance View All */
    const dpa = el('pfViewDeptBtn');
    if (dpa) dpa.addEventListener('click', () => clickPfTab('dept'));

    /* Know Your Rights */
    const rts = el('pfKnowRightsBtn');
    if (rts) rts.addEventListener('click', () => toast('RTI Act 2005 gives every citizen the right to request fund utilization reports from any government body within 30 days.', 'info'));

    /* Main sidebar → transparency tab: init charts when tab opens */
    document.querySelectorAll('[data-tab="transparency"]').forEach(btn => {
      btn.addEventListener('click', () => {
        /* small delay so the hidden attr clears and canvases have dimensions */
        setTimeout(initOverview, 150);
      });
    });

    /* Live activity ticker */
    setInterval(() => {
      const list = el('pfActivitiesList');
      const view = el('view-transparency');
      if (!list || !view || view.hasAttribute('hidden')) return;
      const pool = [
        { type:'spend', amt:'₹ 8.40 L', desc:'Footpath Repair – Ward 6', color:'#EF4444' },
        { type:'alloc', amt:'₹ 14.50 L', desc:'Park Bench Installation', color:'#2563EB' },
        { type:'spend', amt:'₹ 5.20 L', desc:'CCTV Maintenance', color:'#EF4444' },
        { type:'alloc', amt:'₹ 22.00 L', desc:'Stormwater Drain Clearing', color:'#2563EB' }
      ];
      const a = pool[Math.floor(Math.random() * pool.length)];
      const labels = { spend:'spent', alloc:'allocated', release:'released' };
      const item = document.createElement('div');
      item.className = 'pf-act-item';
      item.style.animation = 'toastIn 0.3s ease';
      item.innerHTML =
        '<div class="pf-act-dot" style="background:' + a.color + ';"></div>' +
        '<div class="pf-act-body">' +
        '<div class="pf-act-amt" style="color:' + a.color + ';">' + a.amt + ' ' + (labels[a.type] || '') + '</div>' +
        '<div class="pf-act-sub">' + a.desc + '</div>' +
        '<div class="pf-act-time">Just now</div>' +
        '</div>';
      list.insertBefore(item, list.firstChild);
      if (list.children.length > 7) list.removeChild(list.lastChild);
    }, 30000);
  }

  /* ── PUBLIC: init (called once DOM is ready) ── */
  function init() {
    /* Use display:none instead of hidden attr for pf panels
       so charts can get proper dimensions */
    document.querySelectorAll('.pf-tab-panel').forEach((p, i) => {
      p.removeAttribute('hidden');
      p.style.display = i === 0 ? '' : 'none';
    });
    bind();
    /* If transparency is already active on load (shouldn't happen but safe) */
    const view = el('view-transparency');
    if (view && !view.hasAttribute('hidden')) {
      setTimeout(initOverview, 200);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { refresh: initOverview, switchPanel, clickPfTab, updateFY };
})();
