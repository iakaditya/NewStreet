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

  // 2. Subtle Hero Parallax (if applicable)
  const heroMonumentWrap = document.getElementById('heroMonumentWrap');
  if (heroMonumentWrap) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      heroMonumentWrap.style.transform = `scale(${1 + scrollPos * 0.0002}) translateY(${scrollPos * 0.15}px)`;
    });
  }

  // 3. Service Category Chips Toggle
  const serviceChips = document.querySelectorAll('.s-tab-btn');
  serviceChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      // Remove active from all
      serviceChips.forEach(c => c.classList.remove('active'));
      // Add active to clicked
      e.target.classList.add('active');
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

  // 5. GPS Location Detection
  const btnGpsDetect = document.getElementById('btnGpsDetect');
  const citySearchInput = document.getElementById('citySearchInput');
  const cityPills = document.querySelectorAll('.city-pill');

  if (btnGpsDetect) {
    btnGpsDetect.addEventListener('click', () => {
      const originalText = btnGpsDetect.innerHTML;
      btnGpsDetect.innerHTML = '<span style="opacity:0.7">Detecting...</span>';

      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        btnGpsDetect.innerHTML = originalText;
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            
            const city = data.address.city || data.address.town || data.address.village || data.address.county || data.address.state || "";
            if (city) {
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
              
              btnGpsDetect.innerHTML = `<span style="color:var(--auth-emerald)">📍 ${city}</span>`;
            } else {
              alert("Could not resolve city from location.");
              btnGpsDetect.innerHTML = originalText;
            }
          } catch (error) {
            alert("Error fetching location details.");
            btnGpsDetect.innerHTML = originalText;
          }
        },
        (error) => {
          alert("Unable to retrieve your location. Please check permissions.");
          btnGpsDetect.innerHTML = originalText;
        }
      );
    });
  }
});
