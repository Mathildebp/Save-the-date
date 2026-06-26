# Mathilde & Guillaume — Save the date

Site statique (HTML/CSS/JS, sans build) présentant le mariage du 22 août 2026.

## Structure

- `index.html` — contenu de la page
- `css/style.css` — styles (thème bohème champêtre)
- `js/script.js` — compte à rebours, animations au scroll, envoi du formulaire RSVP

## Configurer le RSVP

Le formulaire envoie ses réponses via [Formspree](https://formspree.io) (gratuit, sans backend).

1. Créer un compte sur https://formspree.io
2. Créer un nouveau formulaire et copier son ID (ressemble à `https://formspree.io/f/xxxxxxxx`)
3. Dans `index.html`, remplacer `YOUR_FORM_ID` dans l'attribut `action` du `<form id="rsvp-form">` par votre ID
4. Tester en soumettant le formulaire une première fois (Formspree demande une confirmation d'email pour le premier envoi)

Si vous préférez un autre service (EmailJS, Web3Forms...), seule la valeur de l'attribut `action` du formulaire est à changer ; le JS dans `js/script.js` poste les données en `FormData` standard.

## Personnaliser

- Date du mariage : variable `WEDDING_DATE` dans `js/script.js`
- Adresse / carte : champ `src` de l'`<iframe>` dans la section `#infos` (généré via `maps.google.com/maps?q=...&output=embed`, pas de clé API requise)
- Horaires du programme : section `#programme` dans `index.html`
- Couleurs : variables CSS en haut de `css/style.css`

## Déployer

Aucune étape de build nécessaire. Héberger gratuitement via :

- **GitHub Pages** : Settings → Pages → Source = branche du repo
- **Netlify** ou **Vercel** : glisser-déposer le dossier, ou connecter le repo Git

## Aperçu local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```
