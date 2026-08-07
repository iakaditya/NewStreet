/* ============================================================
   CIVICONE — REGISTRATION LOGIC
   ============================================================ */

'use strict';

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const mobileInput = $('#mobileInput');
  const mobileError = $('#mobileError');
  const sendOtpBtn = $('#sendOtpBtn');
  
  const otpBoxes = $$('.otp-box');
  const otpStatus = $('#otpStatus');
  const verifyOtpBtn = $('#verifyOtpBtn');
  const resendOtpBtn = $('#resendOtpBtn');
  const resendCountdown = $('#resendCountdown');
  const otpTimer = $('#otpTimer');
  
  const createAccountBtn = $('#createAccountBtn');
  
  const panel1 = $('#panel1');
  const panel2 = $('#panel2');
  const panel3 = $('#panel3');
  const panelSuccess = $('#panelSuccess');
  
  const stepDot1 = $('#stepDot1');
  const stepDot2 = $('#stepDot2');
  const stepDot3 = $('#stepDot3');
  const stepLine1 = $('#stepLine1');
  const stepLine2 = $('#stepLine2');
  
  let timerInterval;

  // ── STEP 1: MOBILE NUMBER ────────────────────────────────────
  
  // Basic validation
  mobileInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, ''); // Numbers only
    if (e.target.value.length === 10) {
      e.target.parentElement.parentElement.classList.remove('error');
    }
  });

  sendOtpBtn.addEventListener('click', () => {
    const mobile = mobileInput.value;
    if (mobile.length !== 10) {
      mobileInput.parentElement.parentElement.classList.add('error');
      return;
    }
    
    // Switch to Step 2
    $('#otpMobileDisplay').textContent = '+91 ' + mobile;
    goToStep(2);
    startOtpTimer();
    otpBoxes[0].focus();
  });

  // Language selection toggle
  $$('.reg-lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      $$('.reg-lang-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      e.target.classList.add('active');
      e.target.setAttribute('aria-pressed', 'true');
    });
  });

  // ── STEP 2: OTP VERIFICATION ─────────────────────────────────
  
  // OTP Input logic
  otpBoxes.forEach((box, index) => {
    box.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '');
      if (e.target.value) {
        e.target.classList.add('filled');
        e.target.classList.remove('error');
        otpStatus.textContent = ''; // Clear error message
        if (index < otpBoxes.length - 1) otpBoxes[index + 1].focus();
      } else {
        e.target.classList.remove('filled');
      }
    });

    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        otpBoxes[index - 1].focus();
        otpBoxes[index - 1].value = '';
        otpBoxes[index - 1].classList.remove('filled');
      }
    });
    
    // Paste support
    box.addEventListener('paste', (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
      if (pastedData.length > 0) {
        otpBoxes.forEach((b, i) => {
          if (pastedData[i]) {
            b.value = pastedData[i];
            b.classList.add('filled');
          }
        });
        const focusIndex = Math.min(pastedData.length, 5);
        otpBoxes[focusIndex].focus();
      }
    });
  });

  verifyOtpBtn.addEventListener('click', () => {
    const otp = otpBoxes.map(b => b.value).join('');
    if (otp.length === 6) {
      clearInterval(timerInterval);
      goToStep(3);
    } else {
      otpBoxes.forEach(b => b.classList.add('error'));
      otpStatus.textContent = 'Please enter a 6-digit OTP (e.g. 123456).';
      otpBoxes[0].focus();
      otpBoxes[0].select();
    }
  });

  $('#backToStep1Btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    goToStep(1);
  });

  resendOtpBtn.addEventListener('click', () => {
    if (!resendOtpBtn.disabled) {
      startOtpTimer();
      // Reset boxes
      otpBoxes.forEach(b => {
        b.value = '';
        b.classList.remove('filled', 'error');
      });
      otpStatus.textContent = 'OTP Resent successfully (123456)';
      otpStatus.style.color = 'var(--success)';
      setTimeout(() => {
        otpStatus.textContent = '';
        otpStatus.style.color = '';
      }, 3000);
      otpBoxes[0].focus();
    }
  });

  function startOtpTimer() {
    clearInterval(timerInterval);
    resendOtpBtn.disabled = true;
    let time = 30; // 30s for demo
    
    timerInterval = setInterval(() => {
      time--;
      let m = Math.floor(time / 60);
      let s = time % 60;
      otpTimer.textContent = `0${m}:${s < 10 ? '0' : ''}${s}`;
      resendCountdown.textContent = `(${time}s)`;
      
      if (time <= 0) {
        clearInterval(timerInterval);
        otpTimer.textContent = '00:00';
        resendCountdown.textContent = '';
        resendOtpBtn.disabled = false;
      }
    }, 1000);
  }

  // ── STEP 3: PROFILE SETUP ────────────────────────────────────

  // Avatar upload mock
  $('#uploadAvatarBtn').addEventListener('click', () => {
    $('#avatarInput').click();
  });
  
  $('#avatarInput').addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        $('#avatarPreview').innerHTML = `<img src="${e.target.result}" alt="Profile avatar" />`;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  });

  createAccountBtn.addEventListener('click', () => {
    // Basic validation mock
    const fname = $('#firstNameInput').value.trim() || 'Rahul';
    const lname = $('#lastNameInput').value.trim() || 'Sharma';
    const address = $('#addressInput').value.trim() || 'Indiranagar 100ft Road, Bengaluru';
    const mobile = $('#mobileInput').value || '9876543210';
    
    // Save to localStorage for dashboard personalization
    try {
      localStorage.setItem('civic_user', JSON.stringify({
        firstName: fname,
        lastName: lname,
        name: `${fname} ${lname}`,
        address: address,
        mobile: mobile,
        id: 'CVC-KA-2026-48291'
      }));
    } catch(err) {
      console.warn('LocalStorage save skipped:', err);
    }
    
    // Set success screen details
    $('#successName').textContent = `${fname} ${lname}`;
    $('#successLocation').textContent = address.split(',').slice(-2).join(', ').trim() || 'Bengaluru';
    
    const activeLangBtn = $('.reg-lang-btn.active');
    if(activeLangBtn) {
       $('#successLang').textContent = activeLangBtn.textContent;
    }
    
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    $('#successDate').textContent = today;

    // Show success panel
    goToStep(4);
  });

  // ── NAVIGATION HELPERS ───────────────────────────────────────

  function goToStep(stepNum) {
    // Hide all panels
    panel1.setAttribute('hidden', '');
    panel2.setAttribute('hidden', '');
    panel3.setAttribute('hidden', '');
    panelSuccess.setAttribute('hidden', '');
    panel1.classList.remove('active');
    panel2.classList.remove('active');
    panel3.classList.remove('active');

    if (stepNum === 1) {
      panel1.removeAttribute('hidden');
      panel1.classList.add('active');
      stepDot1.className = 'reg-step active';
      stepDot2.className = 'reg-step';
      stepDot3.className = 'reg-step';
      stepLine1.className = 'reg-step-line';
      stepLine2.className = 'reg-step-line';
    } else if (stepNum === 2) {
      panel2.removeAttribute('hidden');
      panel2.classList.add('active');
      stepDot1.className = 'reg-step completed';
      stepDot2.className = 'reg-step active';
      stepDot3.className = 'reg-step';
      stepLine1.className = 'reg-step-line completed';
      stepLine2.className = 'reg-step-line';
    } else if (stepNum === 3) {
      panel3.removeAttribute('hidden');
      panel3.classList.add('active');
      stepDot1.className = 'reg-step completed';
      stepDot2.className = 'reg-step completed';
      stepDot3.className = 'reg-step active';
      stepLine1.className = 'reg-step-line completed';
      stepLine2.className = 'reg-step-line completed';
    } else if (stepNum === 4) {
      panelSuccess.removeAttribute('hidden');
      panelSuccess.classList.add('active');
      stepDot1.className = 'reg-step completed';
      stepDot2.className = 'reg-step completed';
      stepDot3.className = 'reg-step completed';
      stepLine1.className = 'reg-step-line completed';
      stepLine2.className = 'reg-step-line completed';
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

});
