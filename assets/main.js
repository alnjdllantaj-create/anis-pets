// Anis — accessible navigation, explicit language preference, and local email draft.
(() => {
  'use strict';
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.setAttribute('aria-controls', 'nav');
    burger.setAttribute('aria-expanded', 'false');
    const closeMenu = () => { nav.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); burger.focus(); }
    });
  }
  const year = document.getElementById('y');
  if (year) year.textContent = new Date().getFullYear();

  const supported = new Set(['ar', 'fr', 'en']);
  const readLanguage = () => {
    try {
      const lang = localStorage.getItem('anis-lang');
      return supported.has(lang) ? lang : null;
    } catch (_) { return null; }
  };
  const saveLanguage = (lang, remember = true) => {
    try {
      if (remember && supported.has(lang)) localStorage.setItem('anis-lang', lang);
      else localStorage.removeItem('anis-lang');
    } catch (_) { /* Browsing still works if storage is unavailable. */ }
  };

  const saved = readLanguage();
  // The explicitly saved choice applies only to the bare home URL. Direct links
  // to a translated page are never redirected. A first visit remains English.
  if (location.pathname === '/' && (saved === 'ar' || saved === 'fr')) {
    location.replace(saved === 'ar' ? '/ar/' : '/fr/');
  }
  const banner = document.querySelector('.langbanner');
  if (banner && saved) banner.hidden = true;
  document.querySelectorAll('.langswitch a').forEach(a =>
    a.addEventListener('click', () => saveLanguage(a.getAttribute('hreflang'))));
  const checkbox = document.getElementById('remember-lang');
  document.querySelectorAll('[data-langsave]').forEach(a =>
    a.addEventListener('click', () => saveLanguage(a.getAttribute('data-langsave'), !checkbox || checkbox.checked)));
  const bannerClose = document.querySelector('.langbanner .lb-close');
  if (bannerClose) bannerClose.addEventListener('click', () => {
    saveLanguage(document.documentElement.lang, !checkbox || checkbox.checked);
    if (banner) banner.hidden = true;
  });

  // Compose a draft in the visitor's email app; never transmit a form here.
  document.querySelectorAll('form.cform[action^="mailto:"]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const fields = new FormData(form);
      const recipient = form.getAttribute('action').slice('mailto:'.length);
      const name = String(fields.get('name') || '');
      const replyEmail = String(fields.get('email') || '');
      const topic = String(fields.get('subject') || 'Anis');
      const message = String(fields.get('message') || '');
      const subject = encodeURIComponent('Anis: ' + topic);
      const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + replyEmail + '\n\n' + message);
      window.location.href = 'mailto:' + recipient + '?subject=' + subject + '&body=' + body;
    });
  });
})();
