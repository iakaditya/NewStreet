document.addEventListener('DOMContentLoaded', () => {

  // 1. Navbar Scroll Effect
  const navbar = document.getElementById('globalNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Cinematic Hero Scroll
  const heroImage = document.getElementById('heroBgImage');
  const heroSection = document.getElementById('heroSection');
  
  if (heroImage && heroSection) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      const heroHeight = heroSection.offsetHeight;
      
      if (scrollPos < heroHeight) {
        // Calculate scale: starts at 1.1, zooms out to 1.0 as you scroll down
        const scale = 1.1 - (scrollPos / heroHeight) * 0.1;
        // Calculate translate: moves up slightly
        const translateY = scrollPos * 0.4;
        
        heroImage.style.transform = `translateY(${translateY}px) scale(${scale})`;
      }
    });
  }

  // 3. Location Modal Logic
  const locationBtn = document.getElementById('locationBtn');
  const heroLocationTrigger = document.getElementById('heroLocationTrigger');
  const locationModal = document.getElementById('locationModal');
  const closeLocationModal = document.getElementById('closeLocationModal');
  const currentLocationText = document.getElementById('currentLocation');
  const cityPills = document.querySelectorAll('.city-pill');

  function openLocationModal() {
    locationModal.classList.add('active');
  }

  function closeLocationModalFunc() {
    locationModal.classList.remove('active');
  }

  if (locationBtn) locationBtn.addEventListener('click', openLocationModal);
  if (heroLocationTrigger) heroLocationTrigger.addEventListener('click', openLocationModal);
  if (closeLocationModal) closeLocationModal.addEventListener('click', closeLocationModalFunc);

  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === locationModal) {
      closeLocationModalFunc();
    }
  });

  // City Selection
  cityPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      cityPills.forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      const selectedCity = e.target.textContent;
      currentLocationText.textContent = selectedCity;
      
      // Simulate changing data
      setTimeout(() => {
        closeLocationModalFunc();
      }, 300);
    });
  });

  // 4. Sahayak AI Chat Simulation
  const chatBody = document.getElementById('chatBody');
  const aiTyping = document.getElementById('aiTyping');
  
  // Intersection Observer to start chat when scrolled into view
  const aiSection = document.getElementById('sahayak-ai');
  let chatStarted = false;

  const chatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !chatStarted) {
        chatStarted = true;
        simulateAiChat();
      }
    });
  }, { threshold: 0.5 });

  if (aiSection) {
    chatObserver.observe(aiSection);
  }

  function simulateAiChat() {
    // Initial state: user message is there, typing indicator is shown
    setTimeout(() => {
      // Remove typing indicator
      if (aiTyping) aiTyping.style.display = 'none';
      
      // Add AI Response
      const responseHtml = `
        <div class="message ai-msg" style="opacity:0; transform:translateY(10px); transition:all 0.3s ease;">
          <p>I can help report this street light issue.</p>
          <div class="mt-2 text-sm" style="background:rgba(0,0,0,0.1); padding:8px; border-radius:4px;">
            <strong>Category:</strong> Street Lighting<br>
            <strong>Priority:</strong> Medium<br>
            <strong>Dept:</strong> Municipal Electrical Services
          </div>
          <button class="btn btn-primary w-full mt-2" style="padding:8px; font-size:0.875rem; background:white; color:var(--accent-purple);">Review & Submit</button>
        </div>
      `;
      chatBody.insertAdjacentHTML('beforeend', responseHtml);
      
      // Animate in
      setTimeout(() => {
        const newMessage = chatBody.lastElementChild;
        newMessage.style.opacity = '1';
        newMessage.style.transform = 'translateY(0)';
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 50);

    }, 2000);
  }

  // 5. Service Categories Toggle
  const catPills = document.querySelectorAll('.cat-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      catPills.forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      // In a real app, this would filter the services below
    });
  });

  // 6. Language Selector Toggle
  const langPills = document.querySelectorAll('.lang-pill');
  langPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      langPills.forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
    });
  });

});
