const fs = require('fs');
const path = require('path');

const topbarAndHeader = `  <!-- Top Emergency Ticker Bar -->
  <div class="top-ticker-bar bg-slate-900 text-white px-5 sm:px-6 lg:px-8 py-1.5 sm:py-2 text-xs sm:text-sm border-b border-slate-800" style="background-color: #0f172a; color: white; border-bottom: 1px solid #1e293b; padding: 0.5rem 1rem;">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-3 container" style="display: flex; justify-content: space-between; align-items: center; max-width: 80rem; margin: 0 auto;">
      <div class="flex items-center gap-3 sm:gap-4 text-slate-300 truncate" style="display: flex; align-items: center; gap: 1rem; color: #cbd5e1;">
        <span class="flex items-center gap-2 text-emerald-400 font-semibold shrink-0" style="color: #34d399; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
          <span class="relative flex h-2.5 w-2.5">
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 pulse-dot" style="width: 10px; height: 10px; background-color: #10b981; border-radius: 50%; display: inline-block;"></span>
          </span>Statewide Mobile Dispatch Active
        </span>
        <span class="hidden sm:inline text-slate-600" style="color: #475569;">•</span>
        <span class="hidden sm:flex items-center gap-1.5 text-slate-300" style="display: flex; align-items: center; gap: 0.375rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-400" style="color: #38bdf8;"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
          Avg 35-Min Arrival to All 67 FL Counties
        </span>
        <span class="hidden md:inline text-slate-600" style="color: #475569;">•</span>
        <span class="hidden md:flex items-center gap-1.5 text-slate-300" style="display: flex; align-items: center; gap: 0.375rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400" style="color: #fbbf24;"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
          IICRC S500 Standards &amp; Direct Billing
        </span>
      </div>
      <div class="hidden sm:flex items-center gap-3 shrink-0" style="display: flex; align-items: center;">
        <a href="tel:18009484321" class="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1.5 transition-colors" style="color: #fbbf24; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 0.375rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500" style="color: #ef4444;"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path></svg>
          <span>(800) 948-4321</span>
        </a>
      </div>
    </div>
  </div>

  <!-- Header Navigation -->
  <header class="main-header sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-xs" style="position: sticky; top: 0; z-index: 1000; background: white; border-bottom: 1px solid #e2e8f0; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
    <div class="container header-inner max-w-7xl mx-auto px-5 sm:px-6 lg:px-8" style="max-width: 80rem; margin: 0 auto;">
      <div class="flex items-center justify-between h-16 sm:h-20 w-full" style="display: flex; justify-content: space-between; align-items: center; height: 5rem;">
        <a href="index.html" class="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0 brand-logo" style="text-decoration:none; display: flex; align-items: center; gap: 0.75rem;">
          <div class="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-sky-700 flex items-center justify-center shadow-xs shrink-0 logo-icon" style="width: 2.75rem; height: 2.75rem; background-color: #0369a1; border-radius: 0.5rem; display: flex; justify-content: center; align-items: center;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white w-5 h-5 sm:w-6 sm:h-6" style="color: white; width: 1.5rem; height: 1.5rem;"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>
          </div>
          <div class="min-w-0 brand-text" style="display: flex; flex-direction: column;">
            <span class="text-base sm:text-2xl font-black tracking-tight text-slate-900 block leading-tight truncate brand-title" style="font-size: 1.5rem; font-weight: 900; color: #0f172a; margin-bottom: -2px;">FLORIDA <span class="text-sky-700" style="color: #0369a1;">WATER DAMAGE</span></span>
            <span class="text-xs sm:text-sm font-medium text-slate-500 tracking-normal block leading-tight truncate brand-subtitle" style="font-size: 0.875rem; font-weight: 500; color: #64748b;">24/7 Rapid Mobile Response Network</span>
          </div>
        </a>

        <nav class="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-700 main-nav" style="display: flex; align-items: center;">
          <ul class="nav-links flex gap-6 list-none m-0 p-0 items-center" style="display: flex; gap: 1.5rem; list-style: none; margin: 0; padding: 0;">
            <li class="nav-item"><a href="index.html" class="hover:text-sky-700 transition-colors py-2 nav-link" style="color: #334155; font-weight: 600; text-decoration: none;">Home</a></li>
            <li class="nav-item has-dropdown" style="position: relative;">
              <a href="services.html" class="flex items-center gap-1 hover:text-sky-700 transition-colors py-2 nav-link cursor-pointer" style="color: #334155; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 0.25rem;">Services <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400" style="width: 14px; height: 14px;"><path d="m6 9 6 6 6-6"></path></svg></a>
              <ul class="dropdown-menu">
                <li><a href="water-damage-restoration.html">Water Damage Restoration</a></li>
                <li><a href="burst-pipe-repair.html">Burst & Frozen Pipe Repair</a></li>
              </ul>
            </li>
            <li class="nav-item has-dropdown" style="position: relative;">
              <a href="insurance.html" class="flex items-center gap-1 hover:text-sky-700 transition-colors py-2 nav-link cursor-pointer" style="color: #334155; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 0.25rem;">Resources <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400" style="width: 14px; height: 14px;"><path d="m6 9 6 6 6-6"></path></svg></a>
              <ul class="dropdown-menu">
                <li><a href="calculator.html">Cost & Drying Calculator</a></li>
                <li><a href="insurance.html">Insurance Direct Billing</a></li>
              </ul>
            </li>
            <li class="nav-item"><a href="service-areas.html" class="flex items-center gap-1.5 hover:text-sky-700 transition-colors py-2 nav-link" style="color: #334155; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 0.375rem;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-600" style="color: #0284c7;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>Service Areas</a></li>
          </ul>
        </nav>

        <div class="hidden lg:flex items-center gap-4 header-actions" style="display: flex; align-items: center;">
          <button data-open-modal class="btn-dispatch inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm text-white bg-red-700 hover:bg-red-800 transition-colors shadow-sm cursor-pointer border-none" style="background-color: #b91c1c; color: white; font-weight: 700; border-radius: 0.5rem; padding: 0.625rem 1.25rem; display: flex; align-items: center; gap: 0.5rem; border: none; cursor: pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="fill: transparent;"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path></svg>
            <span>DISPATCH: (800) 948-4321</span>
          </button>
        </div>

        <div class="flex xl:hidden items-center mobile-toggle-wrapper">
          <button class="mobile-toggle p-2 sm:p-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors bg-transparent" id="mobileNavToggle" aria-label="Toggle Navigation Menu" style="background: transparent; border: 1px solid #cbd5e1; border-radius: 0.5rem; padding: 0.5rem; cursor: pointer;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: #0f172a;"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg>
          </button>
        </div>
      </div>
    </div>
  </header>`;

const footer = `  <!-- Main Footer -->
  <footer class="main-footer bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-28 lg:pb-16 text-sm" style="background:#0f172a; color:#cbd5e1; border-top:1px solid #1e293b; padding-top: 4rem; padding-bottom: 4rem;">
    <div class="container max-w-7xl mx-auto px-5 sm:px-6 lg:px-8" style="max-width: 80rem; margin: 0 auto;">
      <div class="bg-slate-800 border border-slate-700 rounded-xl p-8 mb-16 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm footer-banner" style="background:#1e293b; border:1px solid #334155; border-radius:0.75rem; padding:2.5rem; margin-bottom:4rem; display:flex; justify-content:space-between; align-items:center; flex-wrap: wrap;">
        <div class="space-y-2 text-center md:text-left" style="flex: 1 1 auto;">
          <span class="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20" style="color:#fbbf24; background:rgba(251,191,36,0.1); border:1px solid rgba(251,191,36,0.2); border-radius:0.375rem; padding:0.25rem 0.75rem; display: inline-flex; align-items: center; gap: 0.375rem; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; margin-bottom: 1rem;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
            Rapid Mobile Fleet On Call 24/7/365
          </span>
          <h3 class="text-2xl sm:text-3xl font-black text-white" style="color:white; margin:0 0 0.5rem 0; font-size:1.875rem; font-weight: 900;">Facing Standing Water or a Burst Pipe in Florida?</h3>
          <p class="text-slate-300 max-w-xl text-base leading-relaxed" style="color:#94a3b8; margin:0; font-size:1rem; max-width:36rem; line-height: 1.6;">Average 35-minute mobile crew arrival across all 67 Florida counties. Fully equipped with industrial extractors, desiccant dryers, and thermal imaging.</p>
        </div>
        <button data-open-modal class="btn-dispatch px-8 py-4 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold text-base shadow-sm text-center flex items-center gap-3 shrink-0 transition-colors border-none cursor-pointer" style="background:#b91c1c; color:white; padding:1.25rem 2.5rem; border-radius:0.5rem; font-weight:700; font-size: 1.125rem; display: flex; align-items: center; gap: 0.75rem; border: none; cursor: pointer; white-space: nowrap;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fill-white" style="fill: transparent;"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path></svg>
          <span>CALL (800) 948-4321</span>
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16 footer-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:2.5rem; margin-bottom:4rem;">
        <div class="space-y-4">
          <a href="index.html" class="text-xl font-black tracking-tight text-white block" style="text-decoration:none; color:white; font-size:1.25rem; font-weight: 900;">FLORIDA <span class="text-sky-400" style="color:#38bdf8;">WATER DAMAGE</span></a>
          <p class="text-slate-300 text-sm leading-relaxed mt-4" style="color:#94a3b8; margin-top:1rem; font-size: 0.875rem; line-height: 1.6;">Florida's premier emergency water damage mitigation and structural drying network. Mobilized across staging zones, providing 24/7 emergency response to all 67 counties.</p>
          <div class="pt-2 space-y-2.5 text-sm mt-4">
            <div class="flex items-center gap-2 text-emerald-400 font-medium" style="color:#34d399; display:flex; align-items:center; gap:0.5rem; margin-bottom:0.75rem; font-size: 0.875rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg><span>ANSI/IICRC S500 Standards</span>
            </div>
            <div class="flex items-center gap-2 text-emerald-400 font-medium" style="color:#34d399; display:flex; align-items:center; gap:0.5rem; margin-bottom:0.75rem; font-size: 0.875rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg><span>Direct Insurance Billing</span>
            </div>
            <div class="flex items-center gap-2 text-emerald-400 font-medium" style="color:#34d399; display:flex; align-items:center; gap:0.5rem; margin-bottom:0.75rem; font-size: 0.875rem;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg><span>Licensed &amp; Insured Field Crews</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 class="text-white font-bold text-base mb-4 border-b border-slate-700 pb-2 flex items-center gap-2" style="color:white; border-bottom:1px solid #334155; padding-bottom:0.5rem; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem; font-weight: 700;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-400" style="color:#38bdf8;"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>Restoration Services
          </h4>
          <ul class="space-y-2.5 text-sm list-none p-0 m-0 footer-list">
            <li style="margin-bottom: 0.75rem;"><a href="water-damage-restoration.html" style="color:#cbd5e1; text-decoration:none; transition: color 0.2s;">Water Damage Restoration</a></li>
            <li style="margin-bottom: 0.75rem;"><a href="burst-pipe-repair.html" style="color:#cbd5e1; text-decoration:none; transition: color 0.2s;">Burst & Frozen Pipe Repair</a></li>
            <li style="margin-bottom: 0.75rem;"><a href="services.html" style="color:#cbd5e1; text-decoration:none; transition: color 0.2s;">Water Extraction & Pumping</a></li>
            <li style="margin-bottom: 0.75rem;"><a href="services.html" style="color:#cbd5e1; text-decoration:none; transition: color 0.2s;">Flood Damage Restoration</a></li>
            <li style="margin-bottom: 0.75rem;"><a href="services.html" style="color:#cbd5e1; text-decoration:none; transition: color 0.2s;">Sewage Backup Cleanup</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-white font-bold text-base mb-4 border-b border-slate-700 pb-2 flex items-center gap-2" style="color:white; border-bottom:1px solid #334155; padding-bottom:0.5rem; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem; font-weight: 700;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-400" style="color:#38bdf8;"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>Florida Regions
          </h4>
          <ul class="space-y-2.5 text-sm list-none p-0 m-0 footer-list">
            <li style="margin-bottom: 0.75rem;"><a href="service-areas.html" style="color:#cbd5e1; text-decoration:none; transition: color 0.2s;">Miami-Dade Region</a></li>
            <li style="margin-bottom: 0.75rem;"><a href="service-areas.html" style="color:#cbd5e1; text-decoration:none; transition: color 0.2s;">Orlando & Central Florida</a></li>
            <li style="margin-bottom: 0.75rem;"><a href="service-areas.html" style="color:#cbd5e1; text-decoration:none; transition: color 0.2s;">Tampa Bay Area</a></li>
            <li style="margin-bottom: 0.75rem;"><a href="service-areas.html" style="color:#cbd5e1; text-decoration:none; transition: color 0.2s;">Jacksonville & North FL</a></li>
            <li style="margin-bottom: 0.75rem;"><a href="service-areas.html" style="color:#cbd5e1; text-decoration:none; transition: color 0.2s;">Broward County</a></li>
            <li class="pt-2" style="padding-top:0.5rem; margin-bottom: 0.75rem;"><a href="service-areas.html" class="text-sky-400 font-bold" style="color:#38bdf8; text-decoration:none; font-weight:700;">→ All 67 FL Counties</a></li>
          </ul>
        </div>

        <div>
          <h4 class="text-white font-bold text-base mb-4 border-b border-slate-700 pb-2 flex items-center gap-2" style="color:white; border-bottom:1px solid #334155; padding-bottom:0.5rem; margin-bottom:1rem; display:flex; align-items:center; gap:0.5rem; font-weight: 700;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400" style="color:#fbbf24;"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>Company & Trust
          </h4>
          <ul class="space-y-2.5 text-sm list-none p-0 m-0 footer-list">
            <li style="margin-bottom: 0.75rem;"><a href="insurance.html" style="color:#34d399; text-decoration:none; font-weight:600; transition: color 0.2s;">Insurance Direct Billing</a></li>
            <li style="margin-bottom: 0.75rem;"><a href="calculator.html" style="color:#cbd5e1; text-decoration:none; transition: color 0.2s;">Cost & Drying Calculator</a></li>
            <li style="margin-bottom: 0.75rem;"><a href="services.html" style="color:#cbd5e1; text-decoration:none; transition: color 0.2s;">Our Certified Team</a></li>
          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-slate-800 text-sm text-slate-400 space-y-4" style="border-top:1px solid #1e293b; padding-top:2rem; color:#94a3b8; font-size: 0.875rem;">
        <div class="bg-slate-800/80 p-5 rounded-lg border border-slate-700 flex items-start gap-3 mb-4" style="background:rgba(30,41,59,0.8); border:1px solid #334155; border-radius:0.5rem; padding:1.25rem; display:flex; gap:1rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-amber-400 shrink-0 mt-0.5" style="color:#fbbf24; flex-shrink: 0; margin-top: 0.25rem;"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path><circle cx="12" cy="8" r="6"></circle></svg>
          <div>
            <p class="font-semibold text-slate-200 mb-1" style="color:#e2e8f0; font-weight:600; margin:0 0 0.25rem 0;">Service-Area Business (SAB) Model & Operations Notice:</p>
            <p class="text-sm leading-relaxed text-slate-300" style="color:#94a3b8; margin:0; line-height: 1.5;">Florida Water Damage operates exclusively as a mobile rapid-response service contractor. To maintain fastest 35-minute dispatch times, crews are stationed throughout field dispatch centers and highway transit hubs across the State of Florida. No retail customer walk-in office is maintained. All services are performed directly on-site at residential and commercial customer premises.</p>
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-sm text-slate-400" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; padding-top: 1rem;">
          <p style="margin:0;">© 2026 Florida Water Damage Restoration Services. All rights reserved. Serving all 67 Florida Counties.</p>
        </div>
      </div>
    </div>
  </footer>`;

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') && f !== 'insurance.html'); // will create insurance.html later

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Header
  // The header starts with <!-- Top Emergency Ticker Bar --> and ends with </header>
  const headerRegex = /<!-- Top Emergency Ticker Bar -->[\s\S]*?<\/header>/;
  if(headerRegex.test(content)) {
    content = content.replace(headerRegex, topbarAndHeader);
  } else {
    // If it doesn't have the ticker bar, try replacing <header> to </header>
    const fallbackHeaderRegex = /<header class="main-header">[\s\S]*?<\/header>/;
    if (fallbackHeaderRegex.test(content)) {
        content = content.replace(fallbackHeaderRegex, topbarAndHeader);
    }
  }

  // Replace Footer
  // The footer starts with <footer class="main-footer"> and ends with </footer>
  const footerRegex = /<footer class="main-footer">[\s\S]*?<\/footer>/;
  if(footerRegex.test(content)) {
    content = content.replace(footerRegex, footer);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated ' + file);
});
