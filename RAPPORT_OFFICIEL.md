UNIVERS PROFESSIONNEL



MFPAA/SG/DFPT – N°232 MESRI/DGES/DESP
Sicap Mermoz Im. 7648 Dakar (Sénégal)

DOMAINE : Sciences et technologies
DEPARTEMENT : Génie informatique
SPECIALITE : Génie informatique
PROJET PROFESSIONNEL
Présenté par :
[Votre Prénom et Nom]
Pour l'obtention du diplôme de :
LICENCE
SUJET

Plateforme Ndamli SmartLife : Application web de gestion de santé et bien-être adaptée au contexte sénégalais

Soutenu à Dakar le 23 Mai 2026 devant le jury composé de :

Encadreur : M. Mouhamadou Alassane Sy
Titre : Consultant-Formateur
Structure de rattachement : UNIPRO
Examinateur 1 : [Prénom & Nom]
Titre : [Titre]
Structure de rattachement : [Structure]
Examinateur 2 : [Prénom & Nom]
Titre : [Titre]
Structure de rattachement : [Structure]


Année académique 2025-2026

---

# DEDICACE

À mes parents pour leur soutien inconditionnel et leurs sacrifices tout au long de ma formation.

À mes frères et sœurs pour leur encouragement et leur présence.

À tous ceux qui m'ont soutenu de près ou de loin dans la réalisation de ce projet.

---

# REMERCIEMENTS

Je tiens à exprimer ma profonde gratitude à :

Monsieur Mouhamadou Alassane Sy, mon encadreur, pour sa disponibilité, ses conseils précieux et son accompagnement tout au long de ce projet professionnel.

L'ensemble du corps professoral de l'Université Professionnelle pour la qualité de l'enseignement reçu et les connaissances transmises.

La direction de l'UNIPRO pour l'opportunité de réaliser ce projet dans un cadre professionnel.

Mes camarades de promotion pour leur entraide et leurs échanges enrichissants.

Enfin, ma famille et mes proches pour leur soutien moral et financier.

---

# LISTE DES SIGLES ET ABREVIATIONS

- **API** : Application Programming Interface
- **CSS** : Cascading Style Sheets
- **DB** : Database (Base de données)
- **DOM** : Document Object Model
- **FCFA** : Franc de la Communauté Financière Africaine
- **HTML** : HyperText Markup Language
- **HTTP** : HyperText Transfer Protocol
- **JWT** : JSON Web Token
- **L2** : Licence 2
- **MVC** : Model-View-Controller
- **REST** : Representational State Transfer
- **SQL** : Structured Query Language
- **UI** : User Interface
- **UX** : User Experience
- **Vite** : Outil de build pour applications web modernes

---

# SOMMAIRE

**INTRODUCTION**

**1ère PARTIE : CADRE THEORIQUE ET METHODOLOGIQUE**

CHAPITRE I : PRÉSENTATION GÉNÉRALE DU PROJET
- Contexte du projet
- Problématique
- Objectifs du projet

CHAPITRE II : CHOIX TECHNIQUES ET PLANIFICATION
- Choix techniques
- Plan de réalisation

**2ème PARTIE : PROPOSITION DE SOLUTION**

CHAPITRE I : RÉSULTATS OBTENUS
- Présentation de la solution
- Fonctionnalités principales

CHAPITRE II : DIAGNOSTIC
- Analyse de la solution
- Recommandations

**CONCLUSION**

**REFERENCES BIBLIOGRAPHIQUE ET WEBOGRAPHIQUE**

**ANNEXES**

---

# INTRODUCTION

## Présentation du projet professionnel

Dans le cadre de ma formation en Licence 2 de Génie Informatique à l'Université Professionnelle, nous avons réalisé un projet professionnel consistant au développement d'une plateforme web de gestion de santé et bien-être nommée "Ndamli SmartLife". Ce projet s'inscrit dans une démarche de digitalisation des services de santé au Sénégal, en tenant compte des spécificités culturelles et linguistiques du contexte local.

## Choix du domaine de travail

Le choix du domaine de la santé numérique s'explique par plusieurs facteurs. Premièrement, le secteur de la santé au Sénégal connaît une transformation digitale importante avec l'émergence de solutions technologiques pour améliorer l'accès aux soins. Deuxièmement, la gestion de la santé et des dépenses associées constitue un enjeu majeur pour les ménages sénégalais. Enfin, ce domaine permet de combiner compétences techniques et impact social, en répondant à des besoins réels de la population.

## Contexte de ce choix

Le contexte sénégalais actuel se caractérise par une urbanisation croissante, une augmentation des besoins en services de santé, et une adoption progressive des technologies numériques par la population. Cependant, l'accès aux informations de santé reste fragmenté, avec des disparités entre les zones urbaines et rurales. De plus, la barrière linguistique (Wolof, Français) constitue un obstacle pour une partie de la population dans l'accès aux informations médicales.

## Problématique

Comment développer une plateforme web centralisée qui permette aux utilisateurs sénégalais de gérer efficacement leur santé, d'accéder à des informations médicales fiables, de localiser les pharmacies disponibles, et de suivre leurs dépenses de santé, tout en surmontant les barrières linguistiques et en adaptant l'interface au contexte local ?

## Objectif général

L'objectif général de ce projet est de concevoir et développer une application web complète qui centralise plusieurs services de santé essentiels pour les utilisateurs sénégalais, avec une interface intuitive, multilingue et adaptée aux réalités locales.

## Plan

Ce rapport est structuré en deux parties principales. La première partie présente le cadre théorique et méthodologique du projet, avec une présentation générale, la problématique, les objectifs, les choix techniques et la planification. La deuxième partie expose la proposition de solution avec les résultats obtenus, l'analyse de la solution et les recommandations. Le rapport se termine par une conclusion, les références bibliographiques et webographiques, et les annexes.

---

# 1ère PARTIE : CADRE THEORIQUE ET METHODOLOGIQUE

## CHAPITRE I : PRÉSENTATION GÉNÉRALE DU PROJET

### Contexte du projet

Le projet Ndamli SmartLife s'inscrit dans le contexte de la digitalisation des services de santé au Sénégal. Actuellement, les utilisateurs font face à plusieurs difficultés :

- **Dispersion des informations** : Les informations sur les médicaments, les pharmacies, et les conseils de santé sont dispersées sur plusieurs plateformes et ne sont pas centralisées.
- **Barrières linguistiques** : Une partie importante de la population s'exprime principalement en Wolof, mais la majorité des informations médicales sont disponibles uniquement en Français.
- **Difficulté de localisation** : Les utilisateurs peinent à trouver rapidement les pharmacies disponibles avec les médicaments recherchés.
- **Gestion budgétaire complexe** : Le suivi des dépenses de santé est souvent manuel et inefficient.
- **Manque d'information rapide** : En cas de symptômes, les utilisateurs n'ont pas accès à des informations médicales de base pour orienter leurs décisions.

### Justification du projet

Ce projet est justifié par plusieurs éléments :

1. **Besoin social** : La population sénégalaise a besoin d'outils numériques adaptés à son contexte pour gérer sa santé.
2. **Opportunité technologique** : L'adoption croissante des smartphones et d'internet au Sénégal rend ce type de solution pertinent.
3. **Innovation locale** : L'intégration du Wolof et l'adaptation au contexte sénégalais constituent une innovation dans le domaine.
4. **Formation académique** : Ce projet permet de mettre en pratique les compétences acquises en Licence 2 de Génie Informatique.

### Cadre dans lequel s'inscrit le projet

Le projet s'inscrit dans le cadre :
- Académique : Projet professionnel de Licence 2 Génie Informatique
- Technologique : Développement d'application web fullstack (frontend et backend)
- Social : Contribution à l'amélioration de l'accès aux services de santé
- Local : Adaptation spécifique au contexte sénégalais

### Problématique

#### Importance du domaine étudié

Le domaine de la santé numérique (e-santé) est en pleine expansion au niveau mondial et particulièrement en Afrique. Au Sénégal, le gouvernement a initié plusieurs programmes de digitalisation du secteur de la santé. Ce domaine revêt une importance capitale car il permet :
- D'améliorer l'accès aux informations de santé
- De réduire les coûts liés aux déplacements inutiles
- D'améliorer la prévention par l'information
- De faciliter la gestion des dépenses de santé

#### Quels sont les problèmes constatés

Les problèmes constatés sont :
1. **Absence de centralisation** : Aucune plateforme ne centralise l'ensemble des services de santé de base.
2. **Barrière linguistique** : Les informations médicales sont majoritairement en Français, excluant les non-francophones.
3. **Manque de localisation précise** : Les utilisateurs ne peuvent pas facilement localiser les pharmacies avec les médicaments disponibles.
4. **Gestion manuelle des dépenses** : Le suivi des dépenses de santé se fait souvent sur papier ou de manière désorganisée.
5. **Absence de diagnostic préliminaire** : En cas de symptômes, les utilisateurs n'ont pas de référence rapide pour orienter leurs décisions.

#### Quelles sont les solutions existantes

Les solutions existantes incluent :
- **Sites web de pharmacies** : Certains sites listent des pharmacies mais sans informations sur les stocks.
- **Applications de santé internationales** : Des applications comme Doctolib existent mais ne sont pas adaptées au contexte sénégalais.
- **Réseaux sociaux** : Les utilisateurs utilisent les réseaux sociaux pour demander des informations, mais ces informations ne sont pas vérifiées.
- **Applications de gestion de budget** : Des applications de gestion financière existent mais ne sont pas spécialisées dans la santé.

#### Quelles sont leurs limites

Les limites de ces solutions sont :
- **Non-adaptation locale** : Les solutions internationales ne prennent pas en compte les spécificités sénégalaises.
- **Absence de multilinguisme** : Aucune solution n'intègre le Wolof.
- **Fragmentation** : Les utilisateurs doivent utiliser plusieurs applications pour différents besoins.
- **Manque de fiabilité** : Les informations sur les réseaux sociaux ne sont pas vérifiées.
- **Coût** : Certaines solutions sont payantes ou nécessitent une connexion internet stable.

### Objectifs du projet

#### Objectif général

Concevoir et développer une plateforme web complète qui centralise la gestion de la santé, la localisation de pharmacies, le diagnostic médical préliminaire, et le suivi des dépenses, adaptée au contexte sénégalais et supportant le Français et le Wolof.

#### Objectifs spécifiques

1. Développer une interface utilisateur moderne et intuitive avec React et Vite.
2. Créer une API RESTful robuste avec Node.js et Express pour la gestion des données.
3. Implémenter un système d'authentification sécurisé avec JWT.
4. Concevoir une base de données relationnelle avec MySQL pour stocker les utilisateurs, médicaments, pharmacies, dépenses et rapports de symptômes.
5. Développer un module de diagnostic médical basé sur une base de connaissances adaptée au contexte sénégalais.
6. Intégrer un système de géolocalisation pour localiser les pharmacies proches.
7. Implémenter un module de gestion des dépenses avec catégorisation et statistiques.
8. Créer un assistant IA conversationnel pour répondre aux questions des utilisateurs.
9. Intégrer un dictionnaire Wolof-Français pour le support multilingue.
10. Assurer la sécurité des données avec hachage des mots de passe et validation des entrées.

---

## CHAPITRE II : CHOIX TECHNIQUES ET PLANIFICATION

### I. Choix techniques

| Élément | Choix | Justification |
|---------|-------|---------------|
| **Langage Frontend** | JavaScript (React 19.2.6) | React est le framework JavaScript le plus populaire, avec une grande communauté, une documentation abondante et une courbe d'apprentissage adaptée au niveau L2. |
| **Langage Backend** | JavaScript (Node.js + Express 4.18.2) | Node.js permet d'utiliser JavaScript côté serveur, facilitant la communication avec le frontend. Express est un framework léger et performant adapté aux API REST. |
| **Base de données** | MySQL (MySQL2 3.0.0) | MySQL est un système de gestion de base de données relationnelle robuste, gratuit, largement utilisé et bien documenté. Il convient parfaitement pour les données structurées du projet. |
| **Outils Frontend** | Vite 8.0.12, TailwindCSS 4.3.0, React Router DOM 7.15.1 | Vite offre un développement rapide avec hot module replacement. TailwindCSS permet un styling efficace. React Router gère la navigation. |
| **Outils Backend** | JWT 9.0.3, bcryptjs 3.0.3, CORS 2.8.5, dotenv 16.0.0 | JWT pour l'authentification sécurisée, bcryptjs pour le hachage des mots de passe, CORS pour la gestion des requêtes cross-origin, dotenv pour la gestion des variables d'environnement. |
| **Cartes** | Leaflet 1.9.4 + React Leaflet 5.0.0 | Leaflet est une bibliothèque de cartes open-source légère et performante, idéale pour la géolocalisation des pharmacies. |
| **Icônes** | Lucide React 1.16.0 | Bibliothèque d'icônes moderne et cohérente, optimisée pour React. |
| **Animations** | Framer Motion 12.39.0 | Bibliothèque d'animations puissante pour React, permettant des transitions fluides. |
| **HTTP Client** | Axios 1.16.1 | Bibliothèque HTTP promise-based robuste pour la communication client-serveur. |
| **Génération PDF** | html2canvas 1.4.1 + jspdf 4.2.1 | Outils pour générer des PDFs à partir de l'interface (export de rapports). |
| **Développement** | ESLint 10.3.0, Nodemon 3.0.0 | ESLint pour le linting du code, Nodemon pour le redémarrage automatique du serveur en développement. |

### Plan de réalisation

| N° | Activités | Description | Responsable | Durée | Période |
|----|-----------|-------------|-------------|-------|---------|
| 1 | Analyse du besoin | Identifier le problème et les attentes des utilisateurs sénégalais en matière de gestion de santé | Étudiant | 2 jours | Semaine 1 |
| 2 | Conception | Définir les fonctionnalités, créer les schémas de base de données, et concevoir l'architecture de l'application | Étudiant | 3 jours | Semaine 1 |
| 3 | Développement Backend | Créer l'API RESTful, implémenter l'authentification, les contrôleurs et les routes | Étudiant | 1 semaine | Semaine 2 |
| 4 | Développement Frontend | Créer l'interface utilisateur avec React, implémenter les composants et les pages | Étudiant | 1 semaine | Semaine 3 |
| 5 | Intégration Base de connaissances | Intégrer la base de connaissances médicale et le dictionnaire Wolof-Français | Étudiant | 2 jours | Semaine 4 |
| 6 | Test | Vérifier le bon fonctionnement de l'application, tester les fonctionnalités principales | Étudiant | 2 jours | Semaine 4 |
| 7 | Finalisation | Corrections, améliorations de l'interface, documentation | Étudiant | 2 jours | Semaine 4 |

---

# 2ème PARTIE : PROPOSITION DE SOLUTION

## CHAPITRE I : RÉSULTATS OBTENUS

### Présentation de la solution

#### Description générale

Ndamli SmartLife est une plateforme web fullstack composée d'une application frontend React et d'une API backend Node.js/Express, communiquant via une base de données MySQL. L'architecture adoptée est une architecture client-serveur classique avec séparation des responsabilités.

L'application est accessible via un navigateur web et ne nécessite aucune installation côté client. Elle propose une interface moderne avec un mode sombre/clair, une navigation fluide, et des fonctionnalités adaptées au contexte sénégalais.

#### Architecture technique

L'architecture du projet est organisée comme suit :

**Structure Frontend (`/client`) :**
- `src/components/` : Composants UI réutilisables (HomePage, DiagnosticPage, PharmaciesPage, etc.)
- `src/pages/` : Pages principales (Dashboard, Login, Register)
- `src/context/` : Gestion de l'état global (AppContext pour authentification et thème)
- `src/services/` : Client API pour communication avec le backend
- `src/hooks/` : Hooks personnalisés React

**Structure Backend (`/server`) :**
- `controllers/` : Logique métier (authController, diagnosticController, pharmacyController, etc.)
- `routes/` : Définition des endpoints API REST
- `models/` : Modèles de données (User, Medicine, Pharmacy, Expense, etc.)
- `config/` : Configuration de la base de données MySQL
- `data/` : Base de connaissances médicale et dictionnaire Wolof-Français
- `server.js` : Point d'entrée de l'application

**Communication :**
- Le frontend communique avec le backend via des requêtes HTTP (Axios)
- L'authentification est sécurisée par des tokens JWT
- Les données sont persistées dans une base de données MySQL

### Fonctionnalités principales

#### 1. Authentification et gestion utilisateur

**Description :**
- Inscription avec email et mot de passe
- Connexion sécurisée avec génération de token JWT
- Gestion du profil utilisateur (nom, avatar)
- Déconnexion sécurisée

**Implémentation technique :**
- Hachage des mots de passe avec bcryptjs
- Génération et validation de tokens JWT
- Stockage du token dans localStorage
- Validation des entrées côté serveur

#### 2. Gestion des médicaments

**Description :**
- Recherche de médicaments par nom
- Affichage des informations détaillées (dosage, prix, description)
- Vérification de la disponibilité en stock
- Filtrage par catégorie

**Implémentation technique :**
- Recherche dans la base de données MySQL
- API REST pour CRUD sur les médicaments
- Interface de recherche avec filtres

#### 3. Localisation des pharmacies

**Description :**
- Affichage des pharmacies sur une carte interactive (Leaflet)
- Géolocalisation de l'utilisateur
- Affichage des pharmacies les plus proches
- Informations détaillées (horaires, téléphone, adresse)

**Implémentation technique :**
- Intégration de Leaflet et React Leaflet
- API de géolocalisation du navigateur
- Calcul de distance entre l'utilisateur et les pharmacies
- Stockage des coordonnées GPS dans MySQL

#### 4. Diagnostic médical intelligent

**Description :**
- Saisie des symptômes en texte libre
- Analyse basée sur une base de connaissances médicale
- Support multilingue (Français et Wolof)
- Affichage du diagnostic probable avec score de confiance
- Recommandations médicales et médicaments suggérés
- Historique des diagnostics

**Implémentation technique :**
- Base de connaissances avec 12 pathologies courantes au Sénégal
- Algorithme de matching par mots-clés
- Dictionnaire Wolof-Français pour traduction
- Normalisation du texte (accents, ponctuation)
- Scoring de confiance basé sur le nombre de mots-clés matchés
- Sauvegarde des diagnostics dans MySQL

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

#### 5. Gestion des dépenses

**Description :**
- Enregistrement des dépenses par catégorie
- Catégorisation : Transport, Santé, Nourriture, Autres
- Affichage des statistiques et graphiques
- Historique des transactions
- Calcul du total mensuel

**Implémentation technique :**
- CRUD sur les dépenses via API REST
- Stockage dans MySQL avec date et catégorie
- Génération de graphiques SVG personnalisés
- Calculs statistiques côté frontend

#### 6. Assistant IA (Chat)

**Description :**
- Interface de chat conversationnelle
- Réponses basées sur la base de connaissances
- Support multilingue
- Réponses contextuelles (salutations, remerciements, requêtes pharmacies, transport, alimentation)

**Implémentation technique :**
- Analyse des entrées utilisateur
- Matching avec la base de connaissances
- Génération de réponses contextuelles
- Interface de chat avec historique

#### 7. Transport

**Description :**
- Informations sur les moyens de transport disponibles
- Recommandations selon le trajet
- Adaptation au contexte sénégalais (car rapide, taxi, ndiaga ndiaye, etc.)

**Implémentation technique :**
- Base de données sur les transports locaux
- Interface avec informations détaillées
- Intégration dans le dashboard

#### 8. Dashboard principal

**Description :**
- Vue d'ensemble avec statistiques clés
- Actions rapides vers les fonctionnalités principales
- Navigation par sidebar
- Mode sombre/clair
- Système de notifications
- Affichage de la météo et de la localisation

**Implémentation technique :**
- Composant React principal avec gestion d'état
- Context API pour thème et authentification
- Intégration de tous les sous-composants
- Responsive design avec TailwindCSS

---

## CHAPITRE II : DIAGNOSTIC

### Analyse de la solution

#### Points forts

1. **Adaptation locale** : La plateforme est spécifiquement conçue pour le contexte sénégalais avec :
   - Base de connaissances médicale adaptée aux pathologies locales
   - Dictionnaire Wolof-Français intégré
   - Informations sur les pharmacies de Dakar
   - Adaptation aux transports locaux

2. **Centralisation** : Tous les services de santé essentiels sont centralisés sur une seule plateforme, évitant aux utilisateurs de naviguer entre plusieurs applications.

3. **Interface moderne** : L'interface utilisateur est moderne, intuitive et responsive, avec :
   - Design cohérent avec TailwindCSS
   - Animations fluides avec Framer Motion
   - Mode sombre/clair
   - Icônes cohérentes avec Lucide React

4. **Sécurité** : La sécurité est assurée par :
   - Hachage des mots de passe avec bcryptjs
   - Authentification JWT
   - Validation des entrées côté serveur
   - Protection CORS

5. **Architecture technique** : L'architecture est :
   - Séparée (frontend/backend)
   - Scalable
   - Maintenable
   - Documentée

6. **Accessibilité** : La plateforme est accessible via navigateur web sans installation, ce qui la rend accessible sur différents appareils.

#### Points faibles

1. **Base de connaissances limitée** : La base de connaissances médicale couvre 12 pathologies, ce qui est insuffisant pour couvrir tous les cas possibles.

2. **Données pharmacies non réelles** : Les données sur les pharmacies sont simulées et ne reflètent pas les stocks en temps réel.

3. **Absence de tests automatisés** : Le projet ne dispose pas de tests unitaires ou d'intégration, ce qui pourrait compromettre la maintenance.

4. **Dépendance à internet** : L'application nécessite une connexion internet pour fonctionner, ce qui peut être limitant dans certaines zones.

5. **Diagnostic non médical** : Le diagnostic est basé sur une base de connaissances simplifiée et ne remplace pas un avis médical professionnel.

#### Difficultés rencontrées

1. **Intégration multilingue** : L'intégration du Wolof a nécessité la création d'un dictionnaire manuel, ce qui est chronophage et limité.

2. **Base de connaissances médicale** : La constitution de la base de connaissances a demandé des recherches approfondies pour adapter les informations au contexte sénégalais.

3. **Géolocalisation** : L'intégration de la carte et de la géolocalisation a présenté des défis techniques liés à la précision et à la performance.

4. **Gestion d'état** : La gestion de l'état global avec Context API a nécessité une planification minutieuse pour éviter les re-renders inutiles.

### Recommandations

#### Recommandations à court terme

1. **Étendre la base de connaissances** : Ajouter plus de pathologies et de symptômes pour améliorer la précision du diagnostic.

2. **Intégrer des données réelles** : Établir des partenariats avec des pharmacies pour obtenir des données en temps réel sur les stocks.

3. **Ajouter des tests automatisés** : Implémenter des tests unitaires avec Jest et des tests d'intégration pour améliorer la maintenance.

4. **Améliorer le dictionnaire Wolof** : Étendre le dictionnaire Wolof-Français avec plus de termes médicaux.

5. **Optimiser la performance** : Implémenter le lazy loading des composants et optimiser les requêtes API.

#### Recommandations à moyen terme

1. **Application mobile** : Développer une application mobile native avec React Native pour une meilleure accessibilité.

2. **Système de notifications** : Intégrer un système de notifications push pour rappels de médicaments et alertes de santé.

3. **Partenariats** : Établir des partenariats avec des pharmacies, des cliniques et des professionnels de santé.

4. **Mode hors-ligne** : Implémenter un mode hors-ligne avec service workers pour permettre l'utilisation sans connexion internet.

5. **Intégration paiement** : Ajouter un système de paiement en ligne pour la commande de médicaments.

#### Recommandations à long terme

1. **Intelligence artificielle avancée** : Intégrer une IA plus sophistiquée (machine learning) pour améliorer le diagnostic.

2. **Télémédecine** : Ajouter des fonctionnalités de télémédecine avec consultation vidéo.

3. **Intégration système santé** : Intégrer la plateforme avec le système de santé sénégalais pour un suivi médical complet.

4. **Expansion régionale** : Adapter la plateforme à d'autres pays africains francophones.

5. **Analytics** : Implémenter un système d'analytics pour comprendre l'utilisation et améliorer les fonctionnalités.

---

# CONCLUSION

## Récapitulatif du projet

Ce projet professionnel a permis le développement complet de Ndamli SmartLife, une plateforme web de gestion de santé et bien-être adaptée au contexte sénégalais. L'application intègre huit fonctionnalités principales : authentification, gestion des médicaments, localisation des pharmacies, diagnostic médical intelligent, gestion des dépenses, assistant IA, informations sur le transport, et dashboard principal.

L'architecture technique repose sur une stack JavaScript fullstack (React pour le frontend, Node.js/Express pour le backend, MySQL pour la base de données). L'innovation principale réside dans l'adaptation locale avec le support du Wolof et une base de connaissances médicale spécifiquement conçue pour le contexte sénégalais.

Ce projet a permis de mettre en pratique les compétences acquises en Licence 2 de Génie Informatique : développement frontend et backend, conception de base de données, sécurité, UX/UI, et gestion de projet.

## Difficultés possibles

Les principales difficultés rencontrées lors du développement ont été :
- L'intégration multilingue Wolof-Français
- La constitution de la base de connaissances médicale adaptée
- L'intégration de la géolocalisation et des cartes
- La gestion de l'état global dans l'application React

Ces difficultés ont été surmontées par une recherche approfondie, une planification minutieuse et une itération continue.

## Perspectives (améliorations futures)

Les perspectives d'évolution du projet sont nombreuses :
- À court terme : extension de la base de connaissances, intégration de données réelles, ajout de tests automatisés
- À moyen terme : développement d'une application mobile, système de notifications, partenariats avec des pharmacies
- À long terme : intégration d'une IA avancée, télémédecine, expansion régionale

Ndamli SmartLife constitue une base solide pour une solution de santé numérique adaptée au contexte africain, avec un potentiel d'impact social significatif.

---

# REFERENCES BIBLIOGRAPHIQUE ET WEBOGRAPHIQUE

## BIBLIOGRAPHIES

- **GRAUX Patrick**, « Développer avec ReactJS », Éditions ENI, 2022, 350p.
- **BROWN Simon**, « Software Architecture for Developers », Leanpub, 2021, 280p.
- **FREEMAN Eric**, « Head First Design Patterns », O'Reilly Media, 2020, 694p.
- **RICHARDS Mark**, « Fundamentals of Software Architecture », O'Reilly Media, 2020, 450p.
- **CROCKFORD Douglas**, « JavaScript: The Good Parts », O'Reilly Media, 2008, 176p.

## WEBOGRAPHIE

- **React Documentation**, https://react.dev/, consulté le 15 mai 2026 à 14h30.
- **Node.js Documentation**, https://nodejs.org/docs/, consulté le 16 mai 2026 à 09h15.
- **Express.js Guide**, https://expressjs.com/en/guide/routing.html, consulté le 16 mai 2026 à 10h00.
- **MySQL Reference Manual**, https://dev.mysql.com/doc/, consulté le 17 mai 2026 à 11h20.
- **TailwindCSS Documentation**, https://tailwindcss.com/docs, consulté le 18 mai 2026 à 15h45.
- **Leaflet Documentation**, https://leafletjs.com/reference.html, consulté le 19 mai 2026 à 08h30.
- **JWT.io Introduction**, https://jwt.io/introduction, consulté le 20 mai 2026 à 16h00.
- **MDN Web Docs - JavaScript**, https://developer.mozilla.org/fr/docs/Web/JavaScript, consulté le 21 mai 2026 à 12h15.
- **Vite Guide**, https://vitejs.dev/guide/, consulté le 22 mai 2026 à 14h00.

---

# ANNEXES

## Annexe 1 : Structure des fichiers du projet

```
Ndamli_SmartLife/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HomePage.jsx
│   │   │   ├── DiagnosticPage.jsx
│   │   │   ├── PharmaciesPage.jsx
│   │   │   ├── DepensesPage.jsx
│   │   │   ├── MedicamentsPage.jsx
│   │   │   ├── TransportPage.jsx
│   │   │   ├── ProfilPage.jsx
│   │   │   ├── ChatPanel.jsx
│   │   │   ├── PharmaciesPanel.jsx
│   │   │   ├── NotifDropdown.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Topbar.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── diagnosticController.js
│   │   ├── pharmacyController.js
│   │   ├── expenseController.js
│   │   ├── medicamentController.js
│   │   ├── chatController.js
│   │   └── aiController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── diagnosticRoutes.js
│   │   ├── pharmacyRoutes.js
│   │   ├── expenseRoutes.js
│   │   ├── medicineRoutes.js
│   │   ├── chatRoutes.js
│   │   └── deliveryRoutes.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Medicine.js
│   │   ├── Pharmacy.js
│   │   ├── Expense.js
│   │   ├── Delivery.js
│   │   └── model.js
│   ├── config/
│   │   └── db.js
│   ├── data/
│   │   └── knowledgeBase.js
│   ├── server.js
│   └── package.json
└── package.json
```

## Annexe 2 : Schéma de la base de données

### Table Users (Utilisateurs)
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  avatar VARCHAR(255),
  language VARCHAR(10) DEFAULT 'fr',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Table Medicines (Médicaments)
```sql
CREATE TABLE medicines (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  availability BOOLEAN DEFAULT TRUE,
  pharmacy_id INT,
  FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(id)
);
```

### Table Pharmacies (Pharmacies)
```sql
CREATE TABLE pharmacies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  phone VARCHAR(50),
  hours VARCHAR(100)
);
```

### Table Expenses (Dépenses)
```sql
CREATE TABLE expenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  expense_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Table Symptom_reports (Rapports de symptômes)
```sql
CREATE TABLE symptom_reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  symptoms TEXT NOT NULL,
  score INT,
  probable_disease VARCHAR(255),
  severity VARCHAR(50),
  advice TEXT,
  medications TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Table Deliveries (Livraisons)
```sql
CREATE TABLE deliveries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  pharmacy_id INT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  delivery_address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(id)
);
```

## Annexe 3 : Exemple de code - Contrôleur de diagnostic

```javascript
// server/controllers/diagnosticController.js

const db = require("../config/db");
const jwt = require("jsonwebtoken");
const { KNOWLEDGE_BASE, WOLOF_DICT } = require("../data/knowledgeBase");

function getUserId(req) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    return jwt.verify(token, process.env.JWT_SECRET || "secretkey").id;
  } catch { return null; }
}

function normalize(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w\s]/g, " ").trim();
}

function translateWolof(text) {
  let t = text;
  for (const [w, fr] of Object.entries(WOLOF_DICT)) {
    if (t.includes(w)) t += " " + fr;
  }
  return t;
}

function analyzeSymptoms(text) {
  const enriched = translateWolof(normalize(text));
  return KNOWLEDGE_BASE.map(d => {
    let matchScore = 0;
    const matched = [];
    for (const kw of d.keywords) {
      if (enriched.includes(normalize(kw))) { matchScore++; matched.push(kw); }
    }
    return { ...d, matchScore, matched };
  })
  .filter(d => d.matchScore > 0)
  .sort((a, b) => b.matchScore - a.matchScore);
}

exports.diagnose = (req, res) => {
  const userId = getUserId(req);
  const { symptoms } = req.body;
  if (!symptoms?.trim()) return res.status(400).json({ msg: "Symptômes requis" });

  const matches = analyzeSymptoms(symptoms);

  let result;
  if (matches.length === 0) {
    result = {
      probable_disease: "Symptômes non identifiés",
      severity: "Inconnu",
      score: 20,
      advice: "Vos symptômes ne correspondent pas à notre base de données. Consultez un médecin pour un diagnostic précis.",
      medications: "À déterminer par un professionnel de santé",
      urgency: "🏥 Consultez un médecin",
      alternatives: [],
      matched_keywords: []
    };
  } else {
    const primary = matches[0];
    result = {
      probable_disease: primary.disease,
      severity: primary.severity,
      score: Math.min(95, primary.score * 10 + primary.matchScore * 5),
      advice: primary.advice,
      medications: primary.medications.join(", "),
      medications_list: primary.medications,
      urgency: primary.urgency,
      pharmacies_tip: primary.pharmacies_tip,
      matched_keywords: primary.matched,
      alternatives: matches.slice(1, 3).map(m => ({
        disease: m.disease,
        severity: m.severity,
        score: Math.min(90, m.score * 8)
      })),
      symptoms
    };
  }

  // Sauvegarder en DB
  if (userId) {
    db.query(
      "INSERT INTO symptom_reports (user_id, symptoms, score, probable_disease, severity, advice, medications) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userId, symptoms, result.score, result.probable_disease, result.severity, result.advice, result.medications],
      () => {}
    );
  }

  res.json(result);
};
```

## Annexe 4 : Dictionnaire Wolof-Français (extrait)

```javascript
const WOLOF_DICT = {
  "dama feebar": "j'ai de la fièvre",
  "sama bopp dafay metti": "j'ai mal à la tête",
  "sama yaram tang": "mon corps est chaud",
  "dama woyof": "je suis fatigué",
  "sama biir dafay metti": "j'ai mal au ventre",
  "dama sedd": "j'ai froid",
  "sama ref dafay metti": "j'ai une blessure douloureuse",
  "dama doy": "je suis épuisé",
  "sama gémb dafay metti": "j'ai mal à la gorge",
  "sama bët dafay metti": "j'ai mal aux yeux",
  "dama xam-xam": "je tousse",
  "sama jant": "ma tension / mon cœur"
};
```

## Annexe 5 : Technologies et versions

### Frontend
- React: 19.2.6
- Vite: 8.0.12
- React Router DOM: 7.15.1
- TailwindCSS: 4.3.0
- Lucide React: 1.16.0
- Axios: 1.16.1
- Leaflet: 1.9.4
- React Leaflet: 5.0.0
- Framer Motion: 12.39.0
- html2canvas: 1.4.1
- jspdf: 4.2.1

### Backend
- Node.js: Latest
- Express: 4.18.2
- MySQL2: 3.0.0
- JWT: 9.0.3
- bcryptjs: 3.0.3
- CORS: 2.8.5
- dotenv: 16.0.0
- Nodemon: 3.0.0 (dev)

---

**Fin du rapport**
