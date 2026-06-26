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
  '.time-block, .timeline-item, .info-card, .map-wrap, .rsvp-form'
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

// Envoi du formulaire RSVP (Formspree)
const rsvpForm = document.getElementById('rsvp-form');
const formSuccess = document.getElementById('form-success');

if (rsvpForm) {
  rsvpForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitBtn = rsvpForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';

    try {
      const response = await fetch(rsvpForm.action, {
        method: 'POST',
        body: new FormData(rsvpForm),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        rsvpForm.hidden = true;
        formSuccess.hidden = false;
      } else {
        throw new Error('Réponse non valide du serveur');
      }
    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer ma réponse';
      alert(
        "Oups, l'envoi a échoué. Vérifiez votre connexion ou réessayez dans quelques instants."
      );
    }
  });
}
