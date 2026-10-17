---
title: LUXORIA Prestige
emoji: 🏰
colorFrom: yellow
colorTo: gray
sdk: docker
app_port: 7860
pinned: false
---

# LUXORIA - Plateforme Immobilière de Prestige

Projet découpé en deux dossiers autonomes :
- **`backend/`** : API & logique métier (Laravel 12, SQLite, Inertia Server)
- **`frontend/`** : Interface utilisateur (React 19, Tailwind CSS, Vite 7)

---

## 🚀 Démarrage Rapide

### Option 1 : Via l'Invite de Commande (CMD)

Ouvrez **deux fenêtres d'invite de commande (cmd)** :

#### 1. Terminal 1 - Backend (Laravel)
```bash
cd backend
php artisan serve
```
> Le serveur backend démarre sur : **`http://127.0.0.1:8000`**

#### 2. Terminal 2 - Frontend (Vite)
```bash
cd frontend
npm run dev
```
> Le serveur de développement Vite démarre sur : **`http://127.0.0.1:5173`**

Accédez à votre application dans le navigateur : **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

### Option 2 : En 1 Clic (Fichiers Windows `.bat`)

À la racine du projet :
- Double-cliquez sur **`start-all.bat`** : lance automatiquement le backend, le frontend et ouvre votre navigateur.
- Ou lancez individuellement **`start-backend.bat`** et **`start-frontend.bat`**.

---

## 🔑 Identifiants d'Administration

- **URL de connexion** : `http://127.0.0.1:8000/admin/login`
- **Email** : `admin@luxoria.com`
- **Mot de passe** : `password123`

---

## 📁 Structure du Projet

```text
luxoria/
├── backend/                  # Application Laravel
│   ├── app/                  # Contrôleurs, Modèles, Requests
│   ├── bootstrap/            # Initialisation Laravel
│   ├── config/               # Fichiers de configuration
│   ├── database/             # Migrations, Seeders et base SQLite
│   ├── public/               # Point d'entrée public, images, build assets
│   ├── resources/views/      # Vue Blade principale (app.blade.php)
│   ├── routes/               # Routes web.php
│   ├── storage/              # Fichiers de cache, sessions, logs
│   ├── artisan               # CLI Laravel
│   ├── composer.json         # Dépendances PHP
│   └── .env                  # Configuration d'environnement
│
├── frontend/                 # Application Frontend React
│   ├── src/                  # Composants, Pages React et Styles
│   │   ├── Layouts/          # Layouts Admin et Public
│   │   ├── Pages/            # Pages Inertia (Home, Projets, Admin, etc.)
│   │   ├── app.css           # Styles Tailwind CSS personnalisés
│   │   └── app.jsx           # Point d'entrée React Inertia
│   ├── public/               # Images et assets statiques
│   ├── package.json          # Dépendances NPM
│   ├── vite.config.js        # Configuration Vite & liaison avec le Backend
│   └── tailwind.config.js    # Configuration Tailwind CSS
│
├── start-all.bat             # Lanceur automatique complet
├── start-backend.bat         # Lanceur Backend seul
├── start-frontend.bat        # Lanceur Frontend seul
└── README.md
```

---

## 🛠️ Commandes Utiles

### Compilation de production (Frontend)
```bash
cd frontend
npm run build
```
Les fichiers compilés sont générés directement dans `backend/public/build/`.

### Réinitialisation base de données (Backend)
```bash
cd backend
php artisan migrate:fresh --seed
```
