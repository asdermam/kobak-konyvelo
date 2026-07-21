const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Menü megnyitása' : 'Menü bezárása');
  nav.classList.toggle('open', !isOpen);
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const form = document.querySelector('#contact-form');
const toast = document.querySelector('.toast');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Konzultációs érdeklődés – ${data.get('name')}`);
  const body = encodeURIComponent(
    `Név: ${data.get('name')}\n` +
    `Telefon: ${data.get('phone') || 'nincs megadva'}\n` +
    `E-mail: ${data.get('email')}\n` +
    `Szolgáltatás: ${data.get('service')}\n\n` +
    `Üzenet:\n${data.get('message') || 'nincs megadva'}`
  );

  toast.textContent = 'Megnyitjuk a levelezőprogramot…';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
  window.location.href = `mailto:kobakbt77@gmail.com?subject=${subject}&body=${body}`;
});
