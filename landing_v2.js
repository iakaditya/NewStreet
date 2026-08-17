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

  if (btnGpsDetect) {
    btnGpsDetect.addEventListener('click', () => {
      const originalText = btnGpsDetect.innerHTML;
      btnGpsDetect.innerHTML = '<span style="opacity:0.7">Detecting...</span>';

      setTimeout(() => {
        const city = "Vadodara";
        if (citySearchInput) {
          citySearchInput.value = city;
        }
        
        // Try to activate the corresponding pill
        cityPills.forEach(pill => pill.classList.remove('active'));
        let foundPill = false;
        cityPills.forEach(pill => {
          if (pill.dataset.city && pill.dataset.city.toLowerCase() === city.toLowerCase()) {
            pill.classList.add('active');
            foundPill = true;
          }
        });
        
        btnGpsDetect.innerHTML = `<span style="color:var(--emerald)">📍 ${city} Detected</span>`;
        if (navLocationText) navLocationText.textContent = city;
        if (cityPersonalizedBanner) {
            cityPersonalizedBanner.innerHTML = `<span>Switched to ${city} Database</span> <span>✓ Active</span>`;
            cityPersonalizedBanner.classList.add('active');
        }
        if (servicesDynamicCity) servicesDynamicCity.textContent = `Services available in ${city}`;
        if (treasuryDynamicCity) treasuryDynamicCity.textContent = `VMC ${city.toUpperCase()} · LIVE TREASURY`;
      }, 800);
    });
  }

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
