# 🌐 LUXORIA - Hébergement Serveur Permanent Cloud 24/7

Ce guide vous permet d'héberger votre application **LUXORIA** sur un serveur permanent dans le cloud, **accessible 24h/24 et 7j/7 depuis n'importe où**, **sans avoir besoin de laisser votre ordinateur allumé**.

---

## 🚀 Option 1 : Déploiement Gratuit sur Render.com (100% Gratuit, SANS Carte Bancaire)

Votre code est déjà synchronisé sur GitHub : [https://github.com/Aymaneyhyy/luxoria](https://github.com/Aymaneyhyy/luxoria).

Il vous suffit de faire ces **3 étapes simples** :

### 1. Se connecter à Render
- Rendez-vous sur **[dashboard.render.com](https://dashboard.render.com/)**
- Cliquez sur **"Sign in with GitHub"** (votre compte GitHub).

### 2. Créer le Service Web
- En haut à droite, cliquez sur le bouton bleu **"New +"** puis choisissez **"Web Service"**.
- Dans la liste de vos dépôts GitHub, cliquez sur **"Connect"** à côté de **`luxoria`** (ou `Aymaneyhyy/luxoria`).

### 3. Valider la Configuration (Automatique)
Render lit automatiquement le fichier `Dockerfile` préparé dans votre projet :
- **Name** : `luxoria` (ou le nom de votre choix)
- **Region** : Frankfurt (EU Central) ou Oregon
- **Branch** : `main`
- **Runtime** : `Docker`
- **Instance Type** : `Free` ($0/mois - aucune carte bancaire demandée)
- Cliquez sur **"Deploy Web Service"** tout en bas.

⏱️ **Temps d'attente :** 3 à 4 minutes pour la première compilation (Node.js + Laravel + Base SQLite).

🎉 **Résultat :** Render vous donnera une adresse permanente en HTTPS (ex : `https://luxoria-app.onrender.com`).
- Votre site sera en ligne en continu 24h/24.
- Votre ordinateur peut être éteint !

> **Note sur le plan gratuit Render :**  
> Si personne ne visite le site pendant plus de 15 minutes, le serveur se met en veille économique. Dès qu'un visiteur arrive sur l'URL, il se réveille automatiquement en ~30 secondes.

---

## ⚡ Option 2 : Serveur Dédié 24/7 Sans Veille (VPS Cloud - 3€ à 4€/mois)

Si vous souhaitez que votre site ne se mette **jamais en veille**, qu'il réponde instantanément en 50ms et que vous puissiez lui associer votre propre nom de domaine (ex: `www.luxoria.ma` ou `www.luxoria.fr`) :

1. Prenez un VPS chez **Hostinger**, **OVHcloud** ou **Hetzner** (~3,50€/mois).
2. Lancez simplement Docker :
   ```bash
   git clone https://github.com/Aymaneyhyy/luxoria.git
   cd luxoria
   docker build -t luxoria .
   docker run -d -p 80:8000 --restart always luxoria
   ```
3. Votre site est actif en permanence avec une IP fixe et sans aucune interruption.

---

## 🔑 Identifiants d'accès pré-configurés (Back-office)

Une fois déployé, vous pouvez vous connecter à l'espace d'administration :
- **URL Administration** : `https://votre-url.onrender.com/admin/login`
- **Email** : `admin@luxoria.com`
- **Mot de passe** : `Luxoria2026#SecurePass!`

