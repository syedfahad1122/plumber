/* Florida Water Damage — site script: menus, call popup, before/after slider, calculator. */
(function () {
  'use strict';
  var body = document.body;

  /* ---------- Desktop dropdowns (click/keyboard; hover handled in CSS) ---------- */
  document.querySelectorAll('.nav [data-drop]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement, isOpen = li.classList.contains('open');
      document.querySelectorAll('.nav li.open').forEach(function (o) { o.classList.remove('open'); o.querySelector('[data-drop]').setAttribute('aria-expanded', 'false'); });
      if (!isOpen) { li.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav')) document.querySelectorAll('.nav li.open').forEach(function (o) { o.classList.remove('open'); });
  });

  /* ---------- Mobile drawer ---------- */
  var drawer = document.getElementById('drawer');
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    body.style.overflow = open ? 'hidden' : '';
    document.querySelectorAll('[data-burger]').forEach(function (b) { b.setAttribute('aria-expanded', String(open)); });
  }
  document.querySelectorAll('[data-burger]').forEach(function (b) { b.addEventListener('click', function () { setDrawer(true); }); });
  document.querySelectorAll('[data-drawer-close]').forEach(function (b) { b.addEventListener('click', function () { setDrawer(false); }); });

  /* ---------- Call popup ----------
     Any click on the page opens the call popup, EXCEPT clicks on menus
     (header, mobile menu, footer links, breadcrumbs) and on controls
     (calculator, FAQ toggles, slider). Phone links always open it. */
  var pop = document.getElementById('callPop');
  var lastFocus = null, closedAt = 0;
  var MENUS = '.hdr, .drawer, .ftr, .crumbs, .ticker';
  var CONTROLS = 'form, input, select, textarea, label, summary, button, .ba, .presets, .no-pop';

  function openPop(link) {
    if (!pop || pop.classList.contains('open')) return;
    var cont = pop.querySelector('[data-continue]');
    if (cont) {
      if (link && link.href) {
        var label = (link.getAttribute('data-label') || link.textContent || '').replace(/\s+/g, ' ').trim();
        cont.href = link.href;
        cont.textContent = 'Continue to ' + (label.length > 42 ? label.slice(0, 40) + '…' : label || 'page');
        cont.hidden = false;
      } else { cont.hidden = true; }
    }
    lastFocus = document.activeElement;
    pop.classList.add('open');
    pop.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
    var call = pop.querySelector('.btn-call');
    if (call) call.focus({ preventScroll: true });
    if (window.gtag) window.gtag('event', 'call_popup_open', { page_path: location.pathname });
  }
  function closePop() {
    if (!pop || !pop.classList.contains('open')) return;
    pop.classList.remove('open');
    pop.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
    closedAt = Date.now();
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  if (pop) {
    pop.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', closePop); });
    document.addEventListener('keydown', function (e) {
      if (!pop.classList.contains('open')) return;
      if (e.key === 'Escape') closePop();
      if (e.key === 'Tab') { // keep focus inside the dialog
        var f = pop.querySelectorAll('a[href]:not([hidden]), button');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    pop.querySelector('.btn-call').addEventListener('click', function () {
      if (window.gtag) window.gtag('event', 'call_click', { page_path: location.pathname });
    });
  }

  document.addEventListener('click', function (e) {
    if (!pop || e.defaultPrevented || e.button !== 0) return;
    var t = e.target;
    if (t.closest('.pop')) return;
    if (Date.now() - closedAt < 400) return;
    var tel = t.closest('a[href^="tel:"], [data-call]');
    if (tel) { e.preventDefault(); openPop(null); return; }
    if (t.closest(MENUS) || t.closest(CONTROLS)) return;
    if (e.ctrlKey || e.metaKey || e.shiftKey) return;           // let new-tab clicks through
    var sel = window.getSelection && String(window.getSelection());
    if (sel && sel.length > 2) return;                          // user is selecting text
    var link = t.closest('a[href]');
    if (link) {
      var href = link.getAttribute('href');
      if (href.charAt(0) === '#' || link.target === '_blank' || href.indexOf('mailto:') === 0) return;
      e.preventDefault();
      openPop(link);
      return;
    }
    openPop(null);
  });

  /* ---------- Before / after slider ---------- */
  document.querySelectorAll('.ba').forEach(function (fig) {
    var r = fig.querySelector('input[type=range]');
    if (!r) return;
    var set = function () { fig.style.setProperty('--pos', r.value + '%'); };
    r.addEventListener('input', set); set();
  });

  /* ---------- Cost & drying calculator ---------- */
  var f = document.getElementById('calcForm');
  if (f) {
    // Rough planning ranges in USD per square foot. Edit to match local pricing.
    var CAT = { 1: [3, 5.5], 2: [4, 7], 3: [7, 13] };
    var CLS = { 1: 0.85, 2: 1, 3: 1.2, 4: 1.4 };
    var DAYS = { 1: [2, 3], 2: [3, 4], 3: [3, 5], 4: [5, 14] };
    var ADD = { standing: [0.5, 1], anti: [0.25, 0.5], floodcut: [2, 4], flooring: [3, 6] };
    var MIN = [600, 1400];
    var area = f.querySelector('#area'), areaN = f.querySelector('#areaN');
    var money = function (n) { return '$' + (Math.round(n / 50) * 50).toLocaleString('en-US'); };
    var val = function (name) { var c = f.querySelector('input[name=' + name + ']:checked'); return c ? c.value : '1'; };
    var calc = function () {
      var a = Math.max(0, Math.min(10000, parseFloat(areaN.value) || 0));
      var cat = val('cat'), cls = val('cls');
      var lo = a * CAT[cat][0] * CLS[cls], hi = a * CAT[cat][1] * CLS[cls];
      Object.keys(ADD).forEach(function (k) { var c = f.querySelector('[name=' + k + ']'); if (c && c.checked) { lo += a * ADD[k][0]; hi += a * ADD[k][1]; } });
      if (a > 0) { lo = Math.max(lo, MIN[0]); hi = Math.max(hi, MIN[1]); }
      var city = f.querySelector('#city');
      var where = city && city.value ? ' in ' + city.value : '';
      document.getElementById('est').textContent = a > 0 ? money(lo) + ' – ' + money(hi) : 'Enter an area';
      document.getElementById('estWhere').textContent = a > 0 ? 'Rough range for ' + a.toLocaleString('en-US') + ' sq ft' + where : '';
      document.getElementById('estDays').textContent = DAYS[cls][0] + '–' + DAYS[cls][1] + ' days';
      document.getElementById('estAir').textContent = a > 0 ? Math.max(1, Math.ceil(a / 60)) : '–';
      document.getElementById('estDehu').textContent = a > 0 ? Math.max(1, Math.ceil(a / 600)) : '–';
    };
    area.addEventListener('input', function () { areaN.value = area.value; calc(); });
    areaN.addEventListener('input', function () { area.value = Math.min(3000, areaN.value || 0); calc(); });
    f.querySelectorAll('[data-preset]').forEach(function (b) {
      b.addEventListener('click', function () { areaN.value = b.getAttribute('data-preset'); area.value = Math.min(3000, areaN.value); calc(); });
    });
    f.addEventListener('change', calc);
    f.addEventListener('submit', function (e) { e.preventDefault(); });
    calc();
  }
})();
