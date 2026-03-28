# ⚰️ Mort & Célèbre

**Mémorial quotidien des célébrités disparues**

Un site web élégant qui affiche chaque jour les personnalités célèbres décédées ce jour-là, dans l'histoire et aujourd'hui.

## ✨ Fonctionnalités

- 📅 **Décès du jour** — Toutes les célébrités décédées à la date affichée
- 📜 **Chronologie historique** — Toutes les personnalités mortes le même jour dans l'histoire, filtrables par siècle
- 🔍 **Recherche par date** — Naviguez vers n'importe quelle date passée
- ⚰️ **Compteur 2026** — Nombre de célébrités disparues depuis le 1ᵉʳ janvier 2026
- ★ **Classement** — Les personnalités les plus connues décédées en 2026
- 🖼️ **Fiches détaillées** — Cliquez sur n'importe quelle personnalité pour voir sa fiche complète
- ⬅️➡️ **Navigation jour par jour** — Boutons précédent/suivant

## 🔌 Sources de données

- [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/) — Données biographiques et photos
- [Wikipedia Category API](https://www.mediawiki.org/wiki/API:Categorymembers) — Décès de 2026
- Aucune clé API requise — entièrement gratuit

## 🚀 Mise en ligne sur GitHub Pages

### 1. Créer un dépôt GitHub

```bash
git init
git add .
git commit -m "🎉 Initial commit — Mort & Célèbre"
git branch -M main
git remote add origin https://github.com/VOTRE_USERNAME/mort-et-celebre.git
git push -u origin main
```

### 2. Activer GitHub Pages

1. Allez dans **Settings** de votre dépôt
2. Section **Pages** dans le menu gauche
3. Source : **Deploy from a branch**
4. Branch : **main** / **(root)**
5. Cliquez **Save**

Votre site sera accessible sur :
`https://VOTRE_USERNAME.github.io/mort-et-celebre/`

### 3. Accès direct depuis un fichier local

Vous pouvez aussi ouvrir `index.html` directement dans votre navigateur (Chrome, Firefox, Edge).

> ⚠️ **Note CORS** : Les requêtes Wikipedia fonctionnent depuis GitHub Pages (HTTPS). En local, certains navigateurs peuvent bloquer les requêtes — utilisez Firefox ou activez CORS dans Chrome via une extension.

## 📁 Structure des fichiers

```
mort-et-celebre/
├── index.html      # Page principale
├── style.css       # Styles (esthétique Belle Époque / nécrologie)
├── app.js          # Logique JavaScript + appels API
└── README.md       # Ce fichier
```

## 🎨 Design

Esthétique **nécrologie de luxe** — Belle Époque rencontre le gothique éditorial :
- Typographies serif élégantes (Playfair Display, EB Garamond)
- Palette sombre : encre, parchemin, or
- Animations subtiles et grille éditoriale
- 100% responsive

## 📝 Licence

Données : Wikipedia (CC BY-SA 4.0)  
Code : Libre d'utilisation
