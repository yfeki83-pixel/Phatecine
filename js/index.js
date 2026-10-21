
import { omdb } from './api.js';
import { addCards } from './ui.js';

// Éléments HTML
const films = document.querySelector('#films');
const status = document.querySelector('#status');
const more = document.querySelector('#more');

// Les 3 premiers films

const featured = [
    'Dune: Part Two',
    'Deadpool & Wolverine',
    'The Wild Robot'
];

// Films supplémentaires
const additional = [
    'Wicked',
    'Gladiator II',
    'The Substance',
    'Furiosa: A Mad Max Saga',
    'Beetlejuice Beetlejuice',
    'A Quiet Place: Day One',
    'Twisters',
    'The Fall Guy',
    'Kingdom of the Planet of the Apes',
    'Nosferatu',
    'Conclave'
];

let offset = 0;
let loading = false;

// Rechercher un film dans OMDb
async function lookup(title) {
    const data = await omdb({
        t: title,
        y: 2024,
        plot: 'short'
    });

    return data.imdbID ? data : null;
}

// Afficher les premiers films
async function start() {
    status.textContent = 'Chargement des films...';

    try {
        const results = await Promise.all(featured.map(lookup));
        const valid = results.filter(Boolean);

        addCards(films, valid);

        status.textContent = valid.length ? '' : 'Aucun film trouvé.';
        more.hidden = false;

    } catch (error) {
        status.textContent = error.message;
    }
}

// Bouton Voir plus
more.addEventListener('click', async () => {
    if (loading) return;

    loading = true;
    more.disabled = true;
    status.textContent = 'Chargement des autres films...';

    try {
        const batch = additional.slice(offset, offset + 3);
        const results = await Promise.all(batch.map(lookup));

        addCards(films, results.filter(Boolean), true);

        offset += batch.length;
        more.hidden = offset >= additional.length;
        status.textContent = '';

    } catch (error) {
        status.textContent = error.message;

    } finally {
        loading = false;
        more.disabled = false;
    }
});

// Lancer l'affichage
start();

