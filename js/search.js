

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

        addCards(films, results, append);

        status.textContent = total
            ? total + ' résultat(s) trouvé(s)'
            : 'Aucun film trouvé.';

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
        status.textContent = 'Écris au moins 3 lettres pour commencer.';
        return;
    }

    timer = setTimeout(() => load(false), 350);
});

// Bouton Voir plus
more.addEventListener('click', () => {
    if (loading) return;

    page++;
    load(true);
});

