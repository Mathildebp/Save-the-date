// Compte à rebours jusqu'au mariage
const WEDDING_DATE = new Date('2026-08-22T16:00:00+02:00');

function updateCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  const timerEl = document.getElementById('countdown-timer');
  const doneEl = document.getElementById('countdown-done');

  if (diff <= 0) {
    if (timerEl) timerEl.hidden = true;
    if (doneEl) doneEl.hidden = false;
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const pad = (n) => String(n).padStart(2, '0');

  setTimeValue('cd-days', pad(days));
  setTimeValue('cd-hours', pad(hours));
  setTimeValue('cd-minutes', pad(minutes));
  setTimeValue('cd-seconds', pad(seconds));
}

// Met à jour un chiffre du compte à rebours avec une petite chute en fondu
function setTimeValue(id, value) {
  const el = document.getElementById(id);
  if (!el || el.textContent === value) return;
  el.textContent = value;
  el.classList.remove('tick');
  void el.offsetWidth;
  el.classList.add('tick');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Nav : verre dépoli une fois qu'on a quitté le haut de page (ou menu ouvert)
const nav = document.querySelector('.nav');
function updateNav() {
  if (!nav) return;
  const open = nav.classList.contains('nav-open');
  nav.classList.toggle('nav--scrolled', window.scrollY > 40 || open);
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// Menu burger mobile
const navToggle = document.querySelector('.nav-toggle');
if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    updateNav();
  });
  nav.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Ouvrir le menu');
      updateNav();
    });
  });
}

// Apparition au scroll, en cascade au sein de chaque groupe
const revealTargets = document.querySelectorAll(
  '.section-eyebrow, .script-heading, .time-block, .btn-outline, .photo-strip, .timeline, .timeline-item, .info-card, .venue-photo, .map-wrap, .map-links, .rsvp-form'
);
const revealGroups = new Map();
revealTargets.forEach((el) => {
  el.classList.add('reveal');
  const group = el.parentElement;
  const index = revealGroups.get(group) || 0;
  el.style.transitionDelay = `${Math.min(index * 90, 450)}ms`;
  revealGroups.set(group, index + 1);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealTargets.forEach((el) => observer.observe(el));

// Parallaxe douce sur la bande photo
const strip = document.querySelector('.photo-strip');
const stripImg = strip ? strip.querySelector('img') : null;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (stripImg && !reducedMotion.matches) {
  let ticking = false;
  function applyParallax() {
    const rect = strip.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const progress =
        (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      stripImg.style.transform = `translateY(${(-progress * 40).toFixed(1)}px)`;
    }
    ticking = false;
  }
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyParallax);
      }
    },
    { passive: true }
  );
  applyParallax();
}

// Champ « accompagnants » affiché dès qu'on vient à plusieurs
const guestsInput = document.getElementById('guests');
const companionsRow = document.getElementById('companions-row');
function updateCompanionsRow() {
  if (guestsInput && companionsRow) {
    companionsRow.hidden = !(parseInt(guestsInput.value, 10) > 1);
  }
}
if (guestsInput) {
  guestsInput.addEventListener('input', updateCompanionsRow);
  updateCompanionsRow();
}

// La soumission du formulaire RSVP est gérée par @formspree/ajax (voir index.html)
