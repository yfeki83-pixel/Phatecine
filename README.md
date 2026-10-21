# 🎬 Phatecine — Mini-projet Cinéma

## Présentation du projet

Phatecine est un site web réalisé dans le cadre du mini-projet Cinéma. Le but est de permettre aux habitants d'un village de découvrir des films, d'en rechercher et de consulter leurs informations.

Le site récupère les informations des films grâce à **l'API OMDb (The Open Movie Database)**.

## Fonctionnalités

- Affichage de trois films mis en avant sur la page d'accueil.
- Bouton **« Charger plus »** pour afficher d'autres films de **2024**.
- Recherche de films en temps réel, sans recharger la page.
- Bouton pour afficher davantage de résultats de recherche.
- Affichage des affiches, titres et liens vers les détails des films.
- Consultation des détails : résumé, genre, acteurs et notes.
- Page de contact supplémentaire.

## Pages du site

| Fichier | Description |
| --- | --- |
| `index.html` | Accueil et films mis en avant |
| `search.html` | Recherche de films |
| `movie.html` | Informations détaillées sur un film |
| `contacte.html` | Page de contact |

## Technologies utilisées

- **HTML** : structure des pages.
- **CSS** : présentation et mise en forme.
- **JavaScript** : recherche, boutons et affichage dynamique.
- **API OMDb** : récupération des informations sur les films.

## Organisation du JavaScript

| Fichier | Rôle |
| --- | --- |
| `js/api.js` | Envoie les requêtes à OMDb |
| `js/config.js` | Contient la configuration de la clé API |
| `js/index.js` | Gère les films de l'accueil |
| `js/search.js` | Gère la recherche et les résultats |
| `js/movie.js` | Affiche les détails du film sélectionné |
| `js/ui.js` | Crée les cartes des films |

## Comment lancer le projet ?

1. Ouvrir le dossier du projet dans **Visual Studio Code**.
2. Installer l'extension **Live Server**, si nécessaire.
3. Vérifier que la clé API OMDb est renseignée dans `js/config.js`.
4. Faire un clic droit sur `index.html`.
5. Sélectionner **Open with Live Server**.
6. Le site s'ouvre dans le navigateur.

Une connexion Internet est nécessaire pour récupérer les informations depuis OMDb.

## Objectif pédagogique

Ce projet permet de mettre en pratique HTML, CSS et JavaScript, d'utiliser une API externe et de réaliser un site composé de plusieurs pages avec des fonctionnalités interactives.

## Auteur

**Yessin Feki** — Projet étudiant, 2026.


## Dépôt GitHub

Le projet Phatecine est disponible sur GitHub.

Lien du dépôt :
https://github.com/yfeki83-pixel/Phatecine