document.addEventListener('DOMContentLoaded', () => {
  // Alert Banner logic
  const alertBanner = document.getElementById('emAlertBanner');
  const alertCloseBtn = document.getElementById('emAlertCloseBtn');

  if (alertCloseBtn && alertBanner) {
    alertCloseBtn.addEventListener('click', () => {
      alertBanner.style.display = 'none';
    });
  }

  // SOS Modal logic
  const sosTriggerBtn = document.getElementById('sosTriggerBtn');
  const sosModalOverlay = document.getElementById('sosModalOverlay');
  const sosCancelBtn = document.getElementById('sosCancelBtn');
  const sosContinueBtn = document.getElementById('sosContinueBtn');

  if (sosTriggerBtn && sosModalOverlay) {
    sosTriggerBtn.addEventListener('click', () => {
      sosModalOverlay.classList.add('active');
    });

    sosCancelBtn.addEventListener('click', () => {
      sosModalOverlay.classList.remove('active');
    });

    // Close on overlay click
    sosModalOverlay.addEventListener('click', (e) => {
      if (e.target === sosModalOverlay) {
        sosModalOverlay.classList.remove('active');
      }
    });

    // Continue action (Demo)
    sosContinueBtn.addEventListener('click', () => {
      alert('Location shared with emergency response. Help is on the way.');
      sosModalOverlay.classList.remove('active');
    });
  }

  // AI Assist button (Demo)
  const aiAssistBtn = document.getElementById('aiAssistBtn');
  if (aiAssistBtn) {
    aiAssistBtn.addEventListener('click', () => {
      alert('Sahayak AI Chat would open here.');
    });
  }
});
