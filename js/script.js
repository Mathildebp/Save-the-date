// Animation d'ouverture (enveloppe & cachet)
const envelopeIntro = document.getElementById('envelope-intro');

if (envelopeIntro) {
  document.body.classList.add('no-scroll');
  let opened = false;

  const openEnvelope = () => {
    if (opened) return;
    opened = true;
    envelopeIntro.classList.add('is-opening');

    setTimeout(() => {
      envelopeIntro.classList.add('is-hidden');
      document.body.classList.remove('no-scroll');
    }, 750);

    setTimeout(() => {
      envelopeIntro.remove();
    }, 1400);
  };

  envelopeIntro.addEventListener('click', openEnvelope);
  envelopeIntro.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openEnvelope();
    }
  });
}

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

  document.getElementById('cd-days').textContent = pad(days);
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-minutes').textContent = pad(minutes);
  document.getElementById('cd-seconds').textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Apparition au scroll
const revealTargets = document.querySelectorAll(
  '.time-block, .timeline-item, .info-card, .venue-photo, .map-wrap, .rsvp-form'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

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

// La soumission du formulaire RSVP est gérée par @formspree/ajax (voir index.html)
