
import { omdb } from './api.js';
import { addCards } from './ui.js';

// Éléments HTML
const input = document.querySelector('#search');
const films = document.querySelector('#films');
const status = document.querySelector('#status');
const more = document.querySelector('#more');

// Variables
let timer;
let controller;
let query = '';
let page = 1;
let total = 0;
let loading = false;
let version = 0;

// Rechercher les films
async function load(append = false) {
    if (loading && append) return;

    const currentVersion = ++version;

    controller?.abort();
    controller = new AbortController();

    loading = true;
    more.disabled = true;
    more.hidden = true;
    status.textContent = 'Recherche en cours...';

    try {
        const data = await omdb(
            { s: query, page: page, type: 'movie' },
            controller.signal
        );

        if (currentVersion !== version) return;

        const results = data.Search || [];
        total = Number(data.totalResults || 0);

        // Garder uniquement les films depuis 2020
        const filmsRecents = results.filter(movie => {
            const annee = parseInt(movie.Year, 10);
            return annee >= 2020;
        });

        // Afficher les films récents
        addCards(films, filmsRecents, append);

        status.textContent = films.children.length
            ? films.children.length + ' film(s) affiché(s) depuis 2020'
            : 'Aucun film récent affiché.';

        // Bouton Charger plus
        more.hidden = page * 10 >= total;

    } catch (error) {
        if (error.name !== 'AbortError' && currentVersion === version) {
            status.textContent = error.message;
        }

    } finally {
        if (currentVersion === version) {
            loading = false;
            more.disabled = false;
        }
    }
}

// Barre de recherche
input.addEventListener('input', () => {
    clearTimeout(timer);
    controller?.abort();

    version++;
    loading = false;
    query = input.value.trim();
    page = 1;
    total = 0;

    films.replaceChildren();
    more.hidden = true;

    if (query.length < 3) {
        status.textContent = 'Saisissez au moins 3 lettres pour rechercher un film';
        return;
    }

    timer = setTimeout(() => load(false), 350);
});

// Bouton Charger plus
more.addEventListener('click', () => {
    if (loading) return;

    page++;
    load(true);
});
