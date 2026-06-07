# RAPPORT PROFESSIONNEL
## Plateforme Ndamli SmartLife

**Étudiant en Licence 2 Génie Informatique**
**Année Universitaire 2025-2026**

---

## Table des matières

1. [Introduction](#introduction)
2. [Présentation du projet](#présentation-du-projet)
3. [Architecture technique](#architecture-technique)
4. [Fonctionnalités principales](#fonctionnalités-principales)
5. [Technologies utilisées](#technologies-utilisées)
6. [Base de données](#base-de-données)
7. [Aspects innovants](#aspects-innovants)
8. [Conclusion et perspectives](#conclusion-et-perspectives)

---

## 1. Introduction

Dans le cadre de ma formation en Licence 2 de Génie Informatique, j'ai développé **Ndamli SmartLife**, une plateforme web innovante destinée à simplifier la gestion de la santé et du quotidien des utilisateurs sénégalais. Ce projet s'inscrit dans une démarche de digitalisation des services de santé et d'accompagnement au quotidien, en tenant compte des spécificités culturelles et linguistiques du contexte sénégalais.

L'objectif principal de cette plateforme est de centraliser plusieurs services essentiels : gestion des médicaments, localisation des pharmacies, diagnostic médical préliminaire, suivi des dépenses, et assistance par intelligence artificielle. Le projet vise à rendre ces services accessibles via une interface moderne et intuitive.

---

## 2. Présentation du projet

### 2.1 Contexte et problématique

Au Sénégal, l'accès aux informations de santé et la gestion quotidienne des dépenses liées à la santé peuvent être complexes. Les utilisateurs font face à plusieurs défis :
- Difficulté à localiser les pharmacies disponibles et leurs stocks
- Manque d'information rapide sur les symptômes et premiers conseils
- Gestion dispersée des dépenses de santé
- Barrières linguistiques (Wolof, Français)

### 2.2 Objectifs du projet

Ndamli SmartLife répond à ces besoins en offrant :
- **Centralisation** : Tous les services de santé au même endroit
- **Accessibilité** : Interface simple et multilingue (Français, Wolof)
- **Localisation** : Services adaptés au contexte sénégalais
- **Personnalisation** : Suivi personnalisé des dépenses et de la santé

### 2.3 Public cible

- Particuliers souhaitant gérer leur santé et leurs dépenses
- Utilisateurs recherchant des informations médicales de base
- Personnes needing localisation rapide de pharmacies
- Population sénégalaise francophone et wolophone

---

## 3. Architecture technique

### 3.1 Architecture globale

Le projet adopte une architecture client-serveur classique avec séparation des responsabilités :

```
┌─────────────────┐         ┌─────────────────┐
│   Client (React)│◄────────┤  Server (Node)  │
│   Frontend      │  HTTP   │  Backend API    │
└─────────────────┘         └────────┬────────┘
                                     │
                              ┌──────▼──────┐
                              │   MySQL DB  │
                              └─────────────┘
```

### 3.2 Structure du projet

Le projet est organisé en trois principaux répertoires :

- **`/client`** : Application frontend React
  - Components : Composants UI réutilisables
  - Pages : Pages principales (Dashboard, Login, Register)
  - Services : API client pour communication avec le backend
  - Context : Gestion de l'état global (authentification, thème)

- **`/server`** : API backend Node.js/Express
  - Controllers : Logique métier
  - Routes : Définition des endpoints API
  - Models : Modèles de données
  - Config : Configuration de la base de données
  - Data : Base de connaissances médicale

- **`/ndamli-smartlife`** : Version TypeScript du frontend (en développement)

### 3.3 Flux de données

1. **Authentification** : JWT tokens pour sécuriser les sessions
2. **Requêtes API** : Axios pour communication client-serveur
3. **Stockage local** : localStorage pour persistance côté client
4. **Base de données** : MySQL pour persistence des données

---

## 4. Fonctionnalités principales

### 4.1 Authentification et gestion utilisateur

- **Inscription** : Création de compte avec email et mot de passe
- **Connexion** : Authentification sécurisée avec JWT
- **Profil utilisateur** : Gestion des informations personnelles et avatar
- **Sécurité** : Hachage des mots de passe avec bcryptjs

**Fichiers concernés :**
- `server/controllers/authController.js`
- `client/src/pages/Login.jsx`
- `client/src/pages/Register.jsx`
- `client/src/components/ProfilPage.jsx`

### 4.2 Gestion des médicaments

- **Recherche** : Recherche de médicaments par nom
- **Disponibilité** : Vérification de la disponibilité en stock
- **Informations** : Détails sur les médicaments (dosage, prix)

**Fichiers concernés :**
- `server/controllers/medicamentController.js`
- `server/routes/medicineRoutes.js`
- `client/src/components/MedicamentsPage.jsx`

### 4.3 Localisation des pharmacies

- **Carte interactive** : Affichage des pharmacies sur une carte (Leaflet)
- **Géolocalisation** : Positionnement de l'utilisateur
- **Filtrage** : Pharmacies les plus proches
- **Informations** : Horaires, contact, services disponibles

**Fichiers concernés :**
- `server/controllers/pharmacyController.js`
- `server/routes/pharmacyRoutes.js`
- `client/src/components/PharmaciesPage.jsx`

### 4.4 Diagnostic médical intelligent

C'est l'une des fonctionnalités les plus innovantes de la plateforme :

- **Analyse des symptômes** : Base de connaissances médicale avec 12 pathologies courantes
- **Support multilingue** : Français et Wolof (dictionnaire intégré)
- **Score de confiance** : Évaluation de la probabilité du diagnostic
- **Recommandations** : Conseils médicaux et médicaments suggérés
- **Historique** : Sauvegarde des diagnostics précédents

**Pathologies couvertes :**
- Paludisme / Fièvre
- Céphalée / Migraine
- Trouble gastro-intestinal
- Infection respiratoire
- Fatigue / Anémie
- Infection bactérienne
- Hypertension
- Diabète
- Problèmes dermatologiques
- Conjonctivite
- Lombalgie
- Stress / Anxiété

**Fichiers concernés :**
- `server/controllers/diagnosticController.js`
- `server/data/knowledgeBase.js`
- `client/src/components/DiagnosticPage.jsx`

### 4.5 Gestion des dépenses

- **Suivi budgétaire** : Enregistrement des dépenses par catégorie
- **Catégorisation** : Transport, Santé, Nourriture, Autres
- **Statistiques** : Graphiques et analyses des dépenses
- **Historique** : Liste des transactions récentes

**Fichiers concernés :**
- `server/controllers/expenseController.js`
- `client/src/components/DepensesPage.jsx`

### 4.6 Assistant IA (Chat)

- **Conversationnel** : Interface de chat pour poser des questions
- **Réponses contextuelles** : Basées sur la base de connaissances
- **Support linguistique** : Réponses en Français et Wolof
- **Intégration** : Panneau latéral accessible depuis le dashboard

**Fichiers concernés :**
- `server/controllers/chatController.js`
- `server/controllers/aiController.js`
- `client/src/components/ChatPanel.jsx`

### 4.7 Transport

- **Informations** : Détails sur les moyens de transport disponibles
- **Recommandations** : Meilleurs options selon le trajet
- **Intégration locale** : Adapté au contexte sénégalais (car rapide, taxi, etc.)

**Fichiers concernés :**
- `client/src/components/TransportPage.jsx`

### 4.8 Dashboard principal

Interface centralisée avec :
- **Vue d'ensemble** : Statistiques clés (dépenses, pharmacies, médicaments)
- **Actions rapides** : Raccourcis vers les fonctionnalités principales
- **Navigation** : Sidebar avec accès à toutes les sections
- **Mode sombre/clair** : Personnalisation de l'interface
- **Notifications** : Système d'alertes

**Fichiers concernés :**
- `client/src/pages/Dashboard.jsx`
- `client/src/components/HomePage.jsx`

---

## 5. Technologies utilisées

### 5.1 Frontend

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| React | 19.2.6 | Framework UI |
| Vite | 8.0.12 | Build tool & dev server |
| React Router DOM | 7.15.1 | Navigation |
| TailwindCSS | 4.3.0 | Styling |
| Lucide React | 1.16.0 | Icônes |
| Axios | 1.16.1 | Requêtes HTTP |
| Leaflet | 1.9.4 | Cartes interactives |
| React Leaflet | 5.0.0 | Intégration Leaflet/React |
| Framer Motion | 12.39.0 | Animations |
| html2canvas | 1.4.1 | Capture d'écran |
| jspdf | 4.2.1 | Génération PDF |

### 5.2 Backend

| Technologie | Version | Utilisation |
|-------------|---------|-------------|
| Node.js | - | Runtime JavaScript |
| Express | 4.18.2 | Framework web |
| MySQL2 | 3.0.0 | Driver MySQL |
| JWT | 9.0.3 | Authentification |
| bcryptjs | 3.0.3 | Hachage mots de passe |
| CORS | 2.8.5 | Gestion CORS |
| dotenv | 16.0.0 | Variables d'environnement |
| Nodemon | 3.0.0 | Dev server (dev) |

### 5.3 Outils de développement

- **ESLint** : Linting du code
- **PostCSS** : Traitement CSS
- **Git** : Gestion de version

---

## 6. Base de données

### 6.1 Schéma relationnel

La base de données MySQL comprend les tables suivantes :

#### Users (Utilisateurs)
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR)
- email (VARCHAR, UNIQUE)
- password_hash (VARCHAR)
- role (VARCHAR)
- avatar (VARCHAR)
- language (VARCHAR, DEFAULT 'fr')
- created_at (TIMESTAMP)
```

#### Medicines (Médicaments)
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR)
- description (TEXT)
- price (DECIMAL)
- availability (BOOLEAN)
- pharmacy_id (INT, FOREIGN KEY)
```

#### Pharmacies (Pharmacies)
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- name (VARCHAR)
- address (VARCHAR)
- latitude (DECIMAL)
- longitude (DECIMAL)
- phone (VARCHAR)
- hours (VARCHAR)
```

#### Expenses (Dépenses)
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- user_id (INT, FOREIGN KEY)
- amount (DECIMAL)
- category (VARCHAR)
- description (TEXT)
- expense_date (DATE)
```

#### Symptom_reports (Rapports de symptômes)
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- user_id (INT, FOREIGN KEY)
- symptoms (TEXT)
- score (INT)
- probable_disease (VARCHAR)
- severity (VARCHAR)
- advice (TEXT)
- medications (TEXT)
- created_at (TIMESTAMP)
```

#### Deliveries (Livraisons)
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- user_id (INT, FOREIGN KEY)
- pharmacy_id (INT, FOREIGN KEY)
- status (VARCHAR)
- delivery_address (TEXT)
- created_at (TIMESTAMP)
```

### 6.2 Configuration

La connexion à la base de données est configurée dans `server/config/db.js` avec utilisation de variables d'environnement pour la sécurité.

---

## 7. Aspects innovants

### 7.1 Support multilingue (Français/Wolof)

La plateforme intègre un dictionnaire Wolof-Français permettant aux utilisateurs de décrire leurs symptômes dans leur langue maternelle. Le système traduit automatiquement les termes Wolof vers le Français pour l'analyse.

**Exemple de traduction :**
- "dama feebar" → "j'ai de la fièvre"
- "sama bopp dafay metti" → "j'ai mal à la tête"
- "sama yaram tang" → "mon corps est chaud"

### 7.2 Base de connaissances médicale locale

La base de connaissances est spécifiquement adaptée au contexte sénégalais :
- Pathologies fréquentes au Sénégal (paludisme, etc.)
- Médicaments disponibles localement
- Conseils adaptés au contexte sanitaire sénégalais
- Informations sur les pharmacies de Dakar

### 7.3 Interface moderne et responsive

Design moderne avec :
- Mode sombre/clair
- Animations fluides (Framer Motion)
- Icônes cohérentes (Lucide React)
- Cartes interactives (Leaflet)
- Graphiques SVG personnalisés

### 7.4 Sécurité

- Hachage des mots de passe (bcryptjs)
- Tokens JWT pour l'authentification
- Validation des entrées
- Protection CORS

---

## 8. Conclusion et perspectives

### 8.1 Bilan du projet

Ce projet m'a permis de mettre en pratique les compétences acquises en Licence 2 de Génie Informatique :

- **Développement frontend** : React, composants, gestion d'état
- **Développement backend** : Node.js, Express, API REST
- **Base de données** : MySQL, schéma relationnel, requêtes SQL
- **Sécurité** : Authentification JWT, hachage, validation
- **UX/UI** : Design responsive, animations, accessibilité
- **Gestion de projet** : Organisation du code, versioning

La plateforme Ndamli SmartLife est fonctionnelle et répond aux objectifs initiaux : centraliser des services de santé essentiels dans une interface moderne et adaptée au contexte sénégalais.

### 8.2 Perspectives d'évolution

Plusieurs pistes d'amélioration pourraient être envisagées :

**Court terme :**
- Intégration d'un système de notifications push
- Amélioration de la base de connaissances médicale
- Ajout de plus de langues (Pulaar, Sérer)
- Tests unitaires et tests d'intégration

**Moyen terme :**
- Intégration avec de vraies APIs de géolocalisation
- Système de paiement en ligne pour les médicaments
- Partenariat avec des pharmacies réelles
- Application mobile native (React Native)

**Long terme :**
- Intelligence artificielle plus avancée pour le diagnostic
- Télémédecine avec consultation vidéo
- Intégration avec le système de santé sénégalais
- Expansion à d'autres pays africains

### 8.3 Remerciements

Je tiens à remercier mes enseignants pour leur encadrement et les connaissances transmises tout au long de cette formation. Ce projet a été une opportunité précieuse pour concrétiser mes compétences techniques et contribuer, à mon échelle, à l'amélioration de l'accès aux services de santé au Sénégal.

---

**Annexe : Structure des fichiers principaux**

```
Ndamli_SmartLife/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.jsx
│   │   │   ├── DiagnosticPage.jsx
│   │   │   ├── PharmaciesPage.jsx
│   │   │   ├── DepensesPage.jsx
│   │   │   ├── ChatPanel.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── diagnosticController.js
│   │   ├── pharmacyController.js
│   │   ├── expenseController.js
│   │   └── ...
│   ├── routes/
│   ├── models/
│   ├── config/
│   ├── data/
│   │   └── knowledgeBase.js
│   └── server.js
└── package.json
```

---

**Rédigé par :** [Votre Nom]
**Date :** Mai 2026
**Formation :** Licence 2 Génie Informatique
