/* ==========================================================================
   FLORIDA WATER DAMAGE & PLUMBING RESTORATION - DYNAMIC JAVASCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
  initBeforeAfterSlider();
  initCoverageFinder();
  initFaqAccordion();
  initModalAndToast();
  initClickToCallModal();
  initMobileNav();
});

/* ==========================================================================
   1. CLICK TO CALL EMERGENCY POPUP MODAL
   ========================================================================== */
function initClickToCallModal() {
  const phoneModal = document.getElementById('phoneCallModal');
  const closeBtn = document.getElementById('phoneModalCloseBtn');
  const modalPhoneDisplay = document.getElementById('phoneModalDisplay');
  const modalDirectCallLink = document.getElementById('phoneModalDirectCall');
  const modalSwitchDispatchBtn = document.getElementById('phoneModalSwitchDispatch');

  if (!phoneModal) return;

  function openPhoneModal(phoneNumber = '(800) 948-4321', telHref = 'tel:18009484321') {
    if (modalPhoneDisplay) modalPhoneDisplay.textContent = phoneNumber;
    if (modalDirectCallLink) modalDirectCallLink.href = telHref;
    phoneModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePhoneModal() {
    phoneModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Intercept all telephone links globally
  document.addEventListener('click', (e) => {
    const telLink = e.target.closest('a[href^="tel:"]');
    if (telLink) {
      e.preventDefault();
      const href = telLink.getAttribute('href');
      const text = telLink.textContent.trim() || '(800) 948-4321';
      openPhoneModal(text, href);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closePhoneModal);
  }

  phoneModal.addEventListener('click', (e) => {
    if (e.target === phoneModal) closePhoneModal();
  });

  if (modalSwitchDispatchBtn) {
    modalSwitchDispatchBtn.addEventListener('click', () => {
      closePhoneModal();
      const dispatchModal = document.getElementById('dispatchModal');
      if (dispatchModal) {
        dispatchModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }
}

/* ==========================================================================
   2. IICRC S500 + PLUMBING COST & DRYING CALCULATOR ENGINE
   ========================================================================== */
function initCalculator() {
  const sqftSlider = document.getElementById('sqftRange');
  const sqftDisplay = document.getElementById('sqftDisplay');
  const sqftInput = document.getElementById('sqftInput');
  const catButtons = document.querySelectorAll('[data-cat]');
  const classButtons = document.querySelectorAll('[data-class]');
  const perilButtons = document.querySelectorAll('[data-peril]');
  const citySelect = document.getElementById('calcCitySelect');

  const priceOutput = document.getElementById('calcPriceOutput');
  const timelineOutput = document.getElementById('calcTimelineOutput');
  const ahamOutput = document.getElementById('calcAhamOutput');
  const dehuOutput = document.getElementById('calcDehuOutput');
  const airMoverOutput = document.getElementById('calcAirMoverOutput');
  const protocolOutput = document.getElementById('calcProtocolText');

  if (!sqftSlider) return;

  let state = {
    sqft: 450,
    category: 1,
    evapClass: 2,
    peril: 'burst',
    cityMultiplier: 1.0
  };

  function updateCalculator() {
    sqftDisplay.textContent = state.sqft.toLocaleString();
    if (sqftInput) sqftInput.value = state.sqft;

    const baseRatePerSqFt = 2.75;
    const catMultipliers = { 1: 1.0, 2: 1.45, 3: 2.2 };
    const catMult = catMultipliers[state.category] || 1.0;
    const classMultipliers = { 1: 1.0, 2: 1.2, 3: 1.5, 4: 1.85 };
    const classMult = classMultipliers[state.evapClass] || 1.2;

    const perilAllowances = {
      burst: 350,
      slab: 550,
      hurricane: 450,
      ac: 250
    };
    const perilAllowance = perilAllowances[state.peril] || 350;

    const calculatedBase = (state.sqft * baseRatePerSqFt * catMult * classMult) + perilAllowance;
    const minPrice = Math.round(calculatedBase * 0.9 / 25) * 25;
    const maxPrice = Math.round(calculatedBase * 1.25 / 25) * 25;

    let days = 2;
    if (state.category === 3 || state.evapClass >= 3) days = 3;
    if (state.category === 3 && state.evapClass === 4) days = 5;

    const airMoversCount = Math.max(3, Math.ceil(state.sqft / 55));
    const dehuCount = Math.max(1, Math.ceil(state.sqft / 450));
    const ahamTargetPints = Math.round((state.sqft * 0.2) + (state.evapClass * 15));

    priceOutput.textContent = `$${minPrice.toLocaleString()} – $${maxPrice.toLocaleString()}`;
    timelineOutput.textContent = `${days} to ${days + 1} Days`;
    ahamOutput.textContent = `${ahamTargetPints} PPD`;
    dehuOutput.textContent = `${dehuCount} Unit${dehuCount > 1 ? 's' : ''}`;
    airMoverOutput.textContent = `${airMoversCount} Units`;

    let catName = state.category === 1 ? 'Category 1 (Clean Water)' : state.category === 2 ? 'Category 2 (Greywater)' : 'Category 3 (Blackwater / Biohazard)';
    protocolOutput.innerHTML = `<strong>IICRC S500 Standard Protocol:</strong> Deploy ${dehuCount} commercial LGR dehumidifier (${ahamTargetPints} AHAM pints/day capacity) and ${airMoversCount} high-velocity air movers across affected perimeter. Target dry standard estimated in ${days} to ${days + 1} days. Direct insurance billing available.`;
  }

  sqftSlider.addEventListener('input', (e) => {
    state.sqft = parseInt(e.target.value, 10);
    updateCalculator();
  });

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.category = parseInt(btn.getAttribute('data-cat'), 10);
      updateCalculator();
    });
  });

  classButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      classButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.evapClass = parseInt(btn.getAttribute('data-class'), 10);
      updateCalculator();
    });
  });

  perilButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      perilButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.peril = btn.getAttribute('data-peril');
      updateCalculator();
    });
  });

  if (citySelect) {
    citySelect.addEventListener('change', () => {
      updateCalculator();
    });
  }

  updateCalculator();
}

/* ==========================================================================
   3. BEFORE / AFTER COMPARISON SLIDER DRAGGING ENGINE
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('beforeAfterBox');
  const beforeLayer = document.getElementById('beforeLayer');
  const handle = document.getElementById('sliderHandle');
  const beforeImg = beforeLayer ? beforeLayer.querySelector('img') : null;

  if (!container || !beforeLayer || !handle) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percentage = (x / rect.width) * 100;

    beforeLayer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;

    if (beforeImg) {
      beforeImg.style.width = `${rect.width}px`;
    }
  }

  handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
  });

  window.addEventListener('mouseup', () => { isDragging = false; });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  handle.addEventListener('touchstart', (e) => { isDragging = true; });
  window.addEventListener('touchend', () => { isDragging = false; });
  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    updateSliderPosition(e.touches[0].clientX);
  });

  const rect = container.getBoundingClientRect();
  if (beforeImg) beforeImg.style.width = `${rect.width}px`;
}

/* ==========================================================================
   4. FLORIDA COVERAGE DIRECTORY & REGION FINDER
   ========================================================================== */
const floridaRegionData = {
  south: [
    { name: 'Miami', county: 'Miami-Dade' },
    { name: 'Fort Lauderdale', county: 'Broward' },
    { name: 'West Palm Beach', county: 'Palm Beach' },
    { name: 'Boca Raton', county: 'Palm Beach' },
    { name: 'Hollywood', county: 'Broward' },
    { name: 'Coral Gables', county: 'Miami-Dade' }
  ],
  central: [
    { name: 'Orlando', county: 'Orange' },
    { name: 'Kissimmee', county: 'Osceola' },
    { name: 'Sanford', county: 'Seminole' },
    { name: 'Winter Park', county: 'Orange' }
  ],
  tampa: [
    { name: 'Tampa', county: 'Hillsborough' },
    { name: 'St. Petersburg', county: 'Pinellas' },
    { name: 'Clearwater', county: 'Pinellas' },
    { name: 'Sarasota', county: 'Sarasota' }
  ],
  swcoast: [
    { name: 'Naples', county: 'Collier' },
    { name: 'Fort Myers', county: 'Lee' },
    { name: 'Cape Coral', county: 'Lee' }
  ],
  north: [
    { name: 'Jacksonville', county: 'Duval' },
    { name: 'Tallahassee', county: 'Leon' },
    { name: 'Gainesville', county: 'Alachua' },
    { name: 'Pensacola', county: 'Escambia' }
  ]
};

function initCoverageFinder() {
  const tabs = document.querySelectorAll('[data-region]');
  const citiesGrid = document.getElementById('citiesGrid');
  const searchInput = document.getElementById('citySearchInput');

  if (!citiesGrid) return;

  let activeRegion = 'south';

  function renderCities(filterQuery = '') {
    citiesGrid.innerHTML = '';
    let citiesToRender = [];
    if (filterQuery.trim()) {
      Object.values(floridaRegionData).forEach(list => {
        list.forEach(c => {
          if (c.name.toLowerCase().includes(filterQuery.toLowerCase()) || 
              c.county.toLowerCase().includes(filterQuery.toLowerCase())) {
            citiesToRender.push(c);
          }
        });
      });
    } else {
      citiesToRender = floridaRegionData[activeRegion] || [];
    }

    if (citiesToRender.length === 0) {
      citiesGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 2rem;">No matching Florida cities found. We cover all 67 FL counties 24/7! Call (800) 948-4321 for immediate dispatch.</div>`;
      return;
    }

    citiesToRender.forEach(city => {
      const pill = document.createElement('div');
      pill.className = 'city-pill';
      pill.innerHTML = `
        <span>${city.name}, FL</span>
        <span class="city-county">${city.county} Co.</span>
      `;
      citiesGrid.appendChild(pill);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeRegion = tab.getAttribute('data-region');
      if (searchInput) searchInput.value = '';
      renderCities();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderCities(e.target.value);
    });
  }

  renderCities();
}

/* ==========================================================================
   5. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      items.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

/* ==========================================================================
   6. EMERGENCY DISPATCH MODAL & TOAST NOTIFICATION
   ========================================================================== */
function initModalAndToast() {
  const modal = document.getElementById('dispatchModal');
  const openBtns = document.querySelectorAll('[data-open-modal]');
  const closeBtn = document.getElementById('modalCloseBtn');
  const dispatchForm = document.getElementById('dispatchForm');
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');

  if (!modal) return;

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (dispatchForm) {
    dispatchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const city = document.getElementById('modalCityInput')?.value || 'your Florida property';
      closeModal();
      showToast(`🚨 Dispatch Confirmed! Emergency response vehicle routed to ${city}. Arrival in ~35 mins.`);
      dispatchForm.reset();
    });
  }

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 5000);
  }
}

/* ==========================================================================
   7. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isVisible = navLinks.style.display === 'flex';
    navLinks.style.display = isVisible ? 'none' : 'flex';
    if (!isVisible) {
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '80px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'white';
      navLinks.style.padding = '1.5rem';
      navLinks.style.borderBottom = '1px solid #e2e8f0';
      navLinks.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    }
  });
}
