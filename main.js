/* ============================================================
   NEW STREET — MAIN JS
   Interactivity for the new New Street Super-App Landing Page
   ============================================================ */

'use strict';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

// ── NAV SCROLL & MOBILE MENU ─────────────────────────────────
(function initNav() {
  const nav = $('#mainNav');
  if (!nav) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.background = 'rgba(255,255,255,0.95)';
      nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
    } else {
      nav.style.background = 'rgba(255,255,255,0.8)';
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });

  const btn = $('#hamburgerBtn');
  const menu = $('#mobileMenu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
    $$('.mob-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
      });
    });
  }
})();

// ── FADE UP ANIMATIONS ───────────────────────────────────────
(function initFadeObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  $$('.fade-up').forEach(el => observer.observe(el));
})();

// ── COUNT UP ANIMATION ───────────────────────────────────────
(function initCountUp() {
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const start = performance.now();
        const duration = 2000;
        
        const tick = (now) => {
          const prog = Math.min((now - start) / duration, 1);
          el.textContent = Math.floor(target * easeOut(prog)).toLocaleString();
          if (prog < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  $$('.count-up').forEach(el => observer.observe(el));
})();

// ── INTERACTIVE PRODUCT DEMO ─────────────────────────────────
(function initInteractiveDemo() {
  const steps = $$('.demo-step');
  const screens = $$('.demo-screen');
  if (!steps.length || !screens.length) return;

  let activeStep = 1;
  let timer;

  function setStep(num) {
    activeStep = num;
    steps.forEach(s => s.classList.toggle('active', parseInt(s.dataset.step) === num));
    screens.forEach((s, idx) => s.classList.toggle('active', idx + 1 === num));
  }

  function nextStep() {
    let next = activeStep + 1;
    if (next > 4) next = 1;
    setStep(next);
  }

  // Click to override
  steps.forEach(step => {
    step.addEventListener('click', () => {
      clearInterval(timer);
      setStep(parseInt(step.dataset.step));
    });
  });

  // Auto play
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      timer = setInterval(nextStep, 3000);
      observer.disconnect();
    }
  });
  observer.observe($('#demo'));
})();

// ── MAP FILTER INTERACTIONS ──────────────────────────────────
(function initMapFilters() {
  const filters = $$('.map-filter');
  if (!filters.length) return;

  filters.forEach(f => {
    f.addEventListener('click', () => {
      filters.forEach(fi => fi.classList.remove('active'));
      f.classList.add('active');
      
      // Simulate map pins changing by randomly shuffling their opacity
      $$('.map-pin').forEach(pin => {
        pin.style.opacity = '0';
        setTimeout(() => {
          if (Math.random() > 0.3) pin.style.opacity = '1';
        }, 300);
      });
    });
  });
})();

// ── SIMPLE MOCK LOCATION ─────────────────────────────────────
(function initMockLocation() {
  const lbl = $('#navCityLabel');
  if (lbl) {
    setTimeout(() => {
      lbl.textContent = 'Mumbai';
      lbl.previousElementSibling.classList.remove('pulse');
    }, 2000);
  }
})();

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  console.log('New Street loaded.');
});
