# 🚀 Guide de Déploiement Cloud 24/7 - LUXORIA

Ce guide vous explique comment rendre votre site **LUXORIA** accessible en ligne 24h/24 et 7j/7 sur Internet, sans garder votre ordinateur allumé et sans lancer de serveur manuel.

---

## 🌟 Méthode 1 : Déploiement Gratuit 24/7 sur Render.com (Recommandé)

### Étape 1 : Publier votre code sur GitHub
1. Si ce n'est pas déjà fait, créez un dépôt sur [GitHub](https://github.com/new) nommé `luxoria`.
2. Poussez votre code vers GitHub avec les commandes suivantes :
   ```bash
   git add .
   git commit -m "Preparation du deploiement cloud"
   git push origin main
   ```

### Étape 2 : Lancer le service sur Render
1. Connectez-vous sur [Render.com](https://dashboard.render.com/).
2. Cliquez sur **New +** > **Web Service**.
3. Connectez votre compte GitHub et sélectionnez le dépôt **`luxoria`**.
4. Dans l'option **Runtime**, choisissez **`Docker`**. (Render détectera automatiquement le fichier `Dockerfile` créé à la racine).
5. Cliquez sur **Create Web Service**.

🎉 **C'est terminé !** Render va automatiquement construire l'application et vous fournir une URL publique permanente en `https://luxoria-xxxx.onrender.com`.

---

## 🚄 Méthode 2 : Déploiement sur Railway.app

1. Rendez-vous sur [Railway.app](https://railway.app/).
2. Cliquez sur **New Project** > **Deploy from GitHub repo**.
3. Sélectionnez le dépôt `luxoria`.
4. Railway détectera le `Dockerfile` et déploiera le site automatiquement en 2 minutes.

---

## 📁 Méthode 3 : Hébergement Web Classique (Hostinger / cPanel / OVH)

Si vous disposez d'un hébergement Web traditionnel :
1. Les fichiers frontend de production sont générés dans `backend/public/build/`.
2. Envoyez l'intégralité du contenu du dossier **`backend/`** sur votre serveur FTP.
3. Placez le dossier `public/` comme racine du nom de domaine.
4. Créez une base de données MySQL sur votre hébergeur et renseignez les identifiants dans le fichier `.env` sur le serveur.
