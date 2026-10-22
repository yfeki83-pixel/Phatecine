import { omdb } from './api.js';

const target = document.querySelector('#film');
const status = document.querySelector('#status');
const id = new URLSearchParams(location.search).get('id');

// Afficher les détails du film
async function start() {

    if (!id) {
        status.textContent = 'Aucun film sélectionné.';
        return;
    }

    status.textContent = 'Chargement...';

    try {
        // Récupérer le film
        const movie = await omdb({ i: id, plot: 'full' });

        const section = document.createElement('section');
        section.className = 'detail';

        // Affiche du film
        const poster = document.createElement('div');
        poster.className = 'detail-poster';

        if (movie.Poster && movie.Poster !== 'N/A') {
            const img = document.createElement('img');
            img.src = movie.Poster;
            img.alt = 'Affiche de ' + movie.Title;
            poster.append(img);
        } else {
            poster.textContent = 'Affiche indisponible';
        }

        // Informations du film
        const info = document.createElement('div');

        function ajouter(texte) {
            const p = document.createElement('p');
            p.textContent = texte;
            info.append(p);
        }

        const titre = document.createElement('h1');
        titre.textContent = movie.Title;
        info.append(titre);

        ajouter('Année : ' + movie.Year);
        ajouter('Genre : ' + movie.Genre);
        ajouter('Acteurs : ' + movie.Actors);

        // Résumé
        const resume = document.createElement('h2');
        resume.textContent = 'Résumé complet';
        info.append(resume);

        ajouter(movie.Plot || 'Résumé indisponible.');

        // Notes
        const notes = document.createElement('h2');
        notes.textContent = 'Notes';
        info.append(notes);

        ajouter('IMDb : ' + movie.imdbRating);

        if (movie.Ratings) {
            for (const rating of movie.Ratings) {
                ajouter(rating.Source + ' : ' + rating.Value);
            }
        }
        

        // Afficher sur le site
        section.append(poster, info);
        target.replaceChildren(section);

        status.textContent = '';

    } catch (error) {
        status.textContent = error.message;
    }
}

start();
