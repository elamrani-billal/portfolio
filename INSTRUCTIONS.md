# Instructions de Personnalisation 📝

## 🖼️ Remplacer les images placeholder

### 1. Photos de profil

**Hero Section (petite photo ronde)** - Ligne 52 de `index.html` :
```html
<img src="https://via.placeholder.com/100" alt="Billal El Amrani">
```
Remplacez par :
```html
<img src="images/profile-small.jpg" alt="Billal El Amrani">
```

**Hero Section (grande photo)** - Ligne 68 de `index.html` :
```html
<img src="https://via.placeholder.com/500x600" alt="Billal El Amrani">
```
Remplacez par :
```html
<img src="images/profile-hero.jpg" alt="Billal El Amrani">
```

**About Section (illustration)** - Ligne 82 de `index.html` :
```html
<img src="https://via.placeholder.com/400x500" alt="Illustration Billal">
```
Remplacez par :
```html
<img src="images/about-illustration.jpg" alt="Illustration Billal">
```

### 2. Images de projets

Remplacez les 4 placeholders de projets (lignes 107, 127, 147, 167) :
```html
<img src="images/projet-1.jpg" alt="Digital Communication Campaign">
<img src="images/projet-2.jpg" alt="E-commerce Website">
<img src="images/projet-3.jpg" alt="Creative Video Content">
<img src="images/projet-4.jpg" alt="Digital Event">
```

### 3. Créer le dossier images

Créez un dossier `images/` à la racine et ajoutez-y vos photos :
```
portfolio-billal/
├── images/
│   ├── profile-small.jpg (100x100px, carré)
│   ├── profile-hero.jpg (500x600px, portrait)
│   ├── about-illustration.jpg (400x500px)
│   ├── projet-1.jpg (600x400px, paysage)
│   ├── projet-2.jpg
│   ├── projet-3.jpg
│   └── projet-4.jpg
```

## 🎨 Optimiser vos images

Pour de meilleures performances :
- Format JPG pour les photos
- Format PNG pour les logos/transparence
- Utilisez [TinyPNG](https://tinypng.com/) ou [Squoosh](https://squoosh.app/) pour compresser
- Dimensions recommandées indiquées ci-dessus

## 🔗 Ajouter vos liens sociaux

Dans `index.html`, recherchez et modifiez les liens sociaux (lignes 284-292 et 316-324) :

```html
<!-- Remplacez les # par vos vrais liens -->
<a href="https://twitter.com/votre-username" class="social-link">
<a href="https://linkedin.com/in/votre-username" class="social-link">
<a href="https://github.com/votre-username" class="social-link">
```

## 📝 Personnaliser le contenu

### Textes principaux à modifier dans `index.html` :

1. **Hero Title** (ligne 55-56)
2. **Hero Subtitle** (ligne 58-60)
3. **About Description** (ligne 89-90)
4. **Projects** (lignes 114-122, 134-142, etc.)
5. **Skills** (si vous voulez ajouter/retirer des compétences)

## 🎨 Changer les couleurs

Dans `styles.css`, modifiez la ligne 7 :
```css
--primary-color: #22d3ee; /* Changez cette couleur */
```

Suggestions de couleurs :
- Bleu : `#3b82f6`
- Violet : `#8b5cf6`
- Rose : `#ec4899`
- Vert : `#10b981`
- Orange : `#f59e0b`

## 📱 Tester la responsivité

1. Ouvrez le portfolio dans Chrome/Firefox
2. Appuyez sur F12 pour ouvrir les outils de développement
3. Cliquez sur l'icône de mobile en haut à gauche
4. Testez différentes tailles d'écran

## 🚀 Mettre en ligne

### Option 1 : GitHub Pages (Gratuit)
1. Créez un compte GitHub si vous n'en avez pas
2. Créez un nouveau repository
3. Uploadez tous vos fichiers
4. Allez dans Settings > Pages
5. Activez GitHub Pages
6. Votre site sera à : `votre-username.github.io/nom-du-repo`

### Option 2 : Netlify (Gratuit)
1. Créez un compte sur [Netlify](https://netlify.com)
2. Glissez-déposez votre dossier
3. Votre site est en ligne !

### Option 3 : Vercel (Gratuit)
1. Créez un compte sur [Vercel](https://vercel.com)
2. Importez votre projet
3. Déployez en un clic !

## ❓ Besoin d'aide ?

Si vous avez des questions ou rencontrez des problèmes :
1. Vérifiez que tous les fichiers sont au bon endroit
2. Ouvrez la console du navigateur (F12) pour voir les erreurs
3. Assurez-vous que les noms de fichiers correspondent exactement

Bon courage ! 🚀
