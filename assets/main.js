// Anis — navigation and saved language choice.
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
if (burger && nav) {
  burger.setAttribute('aria-controls', 'nav');
  burger.setAttribute('aria-expanded', 'false');
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));
}
const year = document.getElementById('y');
if (year) year.textContent = new Date().getFullYear();
function rememberLanguage(lang) {
  try { if (lang) localStorage.setItem('anis-lang', lang); } catch (_) {}
}
document.querySelectorAll('.langswitch a').forEach(a =>
  a.addEventListener('click', () => rememberLanguage(a.getAttribute('hreflang'))));
document.querySelectorAll('[data-langsave]').forEach(a =>
  a.addEventListener('click', () => {
    const checkbox = document.getElementById('remember-lang');
    if (!checkbox || checkbox.checked) rememberLanguage(a.getAttribute('data-langsave'));
  }));
const bannerClose = document.querySelector('.langbanner .lb-close');
if (bannerClose) bannerClose.addEventListener('click', () => {
  const checkbox = document.getElementById('remember-lang');
  if (!checkbox || checkbox.checked) rememberLanguage(document.documentElement.lang);
  const banner = document.querySelector('.langbanner');
  if (banner) banner.remove();
});

// Contact forms compose an email locally; the website does not send or store it.
// The visitor must review and send it using an installed email application.
document.querySelectorAll('form.cform[action^="mailto:"]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = new FormData(form);
    const recipient = form.getAttribute('action').slice('mailto:'.length);
    const name = String(fields.get('name') || '');
    const replyEmail = String(fields.get('email') || '');
    const topic = String(fields.get('subject') || 'Anis');
    const message = String(fields.get('message') || '');
    const params = new URLSearchParams({subject: 'Anis: ' + topic, body: 'Name: ' + name + '\nEmail: ' + replyEmail + '\n\n' + message});
    window.location.href = 'mailto:' + recipient + '?' + params.toString();
  });
});
