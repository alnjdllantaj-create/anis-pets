// أنيس — سكريبت خفيف
document.getElementById('burger')?.addEventListener('click', () => {
  document.getElementById('nav').classList.toggle('open');
});
document.querySelectorAll('#nav a').forEach(a =>
  a.addEventListener('click', () => document.getElementById('nav').classList.remove('open'))
);
const y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

/* حفظ اختيار اللغة (v4) */
document.querySelectorAll('.langswitch a').forEach(a =>
  a.addEventListener('click', () => localStorage.setItem('anis-lang', a.getAttribute('hreflang'))));
document.querySelectorAll('[data-langsave]').forEach(a =>
  a.addEventListener('click', () => {
    const c = document.getElementById('remember-lang');
    if (!c || c.checked) localStorage.setItem('anis-lang', a.getAttribute('data-langsave'));
  }));
const lbClose = document.querySelector('.langbanner .lb-close');
if (lbClose) lbClose.addEventListener('click', () => {
  const c = document.getElementById('remember-lang');
  if (!c || c.checked) localStorage.setItem('anis-lang', document.documentElement.lang);
  document.querySelector('.langbanner').remove();
});
