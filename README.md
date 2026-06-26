# Mathilde & Guillaume — Save the date

Site statique (HTML/CSS/JS, sans build) présentant le mariage du 22 août 2026.

## Structure

- `index.html` — contenu de la page
- `css/style.css` — styles (thème bohème champêtre)
- `js/script.js` — compte à rebours, animations au scroll, envoi du formulaire RSVP

## Configurer le RSVP

Le formulaire envoie ses réponses via [Formspree](https://formspree.io) (gratuit, sans backend), intégré avec la librairie [`@formspree/ajax`](https://github.com/formspree/formspree-js/tree/master/packages/formspree-ajax) chargée par CDN (pas de bundler nécessaire).

- Le formulaire est déjà connecté à l'endpoint `https://formspree.io/f/xykqwevr`
- L'initialisation se trouve en bas de `index.html` :
  ```html
  formspree('initForm', {
    formElement: '#rsvp-form',
    formId: 'xykqwevr',
    useDefaultStyles: false,
  });
  ```
- Les messages d'erreur/succès s'affichent via les attributs `data-fs-error` (par champ ou global) et `data-fs-success` directement dans le formulaire ; leur style est défini dans `css/style.css` (`.field-error`, `.form-error-banner`, `.form-success`)
- Tester en soumettant le formulaire une première fois (Formspree demande une confirmation d'email pour le premier envoi sur un nouveau formulaire)

Pour changer de formulaire Formspree, remplacer `xykqwevr` à la fois dans l'attribut `action` du `<form>` et dans l'appel `initForm`.

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
