# 🥖 Aux 3 Saveurs - Site Vitrine & Click & Collect

Site web moderne et artisanal pour la boulangerie-pâtisserie "Aux 3 Saveurs" à Avranches.
Développé avec **Next.js 14**, **TypeScript** et **Tailwind CSS**.

## 🌟 Fonctionnalités

- **Vitrine Artisanale** : Mise en valeur des produits (pains, viennoiseries, pâtisseries).
- **Click & Collect** : Système de panier et de commande en ligne sans paiement (paiement au retrait).
- **Devis Traiteur** : Formulaire dédié pour les événements (mariages, entreprises).
- **Administration** : Dashboard gérant pour suivre les commandes et le CA (simulé en local pour la démo).
- **Sécurité** : Accès protégé par mot de passe pour la version de démonstration.

## 🚀 Installation & Démarrage

1.  **Cloner le projet** :
    ```bash
    git clone https://github.com/BenDelvloppeur/boulangerie-aux-3-saveurs.git
    cd boulangerie-aux-3-saveurs
    ```

2.  **Installer les dépendances** :
    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement** :
    ```bash
    npm run dev
    ```

4.  **Accéder au site** :
    Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.
    
    🔑 **Mot de passe démo** : `Boulangerie50`

## 🛠️ Accès Administration

Pour accéder au tableau de bord gérant :
1.  Connectez-vous au site.
2.  Cliquez sur le lien discret "Accès Gérant 🔒" dans le pied de page (ou allez sur `/admin`).

## 📁 Structure du projet

- `app/` : Pages et routes (App Router).
- `components/` : Composants réutilisables (UI, Layout, Produits...).
- `context/` : Gestion d'état global (Panier).
- `data/` : Données statiques (Infos boutique, Liste produits).
- `public/` : Images et assets.

## 🎨 Design System

- **Couleurs** : Crème (Fond), Cacao (Texte/Accents), Vert Feuille (Détails).
- **Typographie** : *Playfair Display* (Titres élégants) & *Inter* (Texte lisible).

---
*Projet réalisé pour Aux 3 Saveurs.*
