
// Créer une carte de film
export function card(movie, summary = '') {

    const article = document.createElement('article');
    article.className = 'card';

    const link = document.createElement('a');
    link.href = 'movie.html?id=' + encodeURIComponent(movie.imdbID);

    // Affiche du film
    const poster = document.createElement('div');
    poster.className = 'poster';

    if (movie.Poster && movie.Poster !== 'N/A') {
        const img = document.createElement('img');
        img.src = movie.Poster;
        img.alt = 'Affiche de ' + movie.Title;
        img.loading = 'lazy';

        img.onerror = () => {
            poster.textContent = 'Affiche indisponible';
        };

        poster.append(img);
    } else {
        poster.textContent = 'Affiche indisponible';
    }

    // Informations du film
    const info = document.createElement('div');
    info.className = 'info';

    const year = document.createElement('small');
    year.textContent = movie.Year || '';

    const title = document.createElement('h3');
    title.textContent = movie.Title;

    info.append(year, title);

    // Résumé du film
    if (summary && summary !== 'N/A') {
        const p = document.createElement('p');
        p.className = 'summary';
        p.textContent = summary;
        info.append(p);
    }

    // Lien vers les détails
    const label = document.createElement('span');
    label.className = 'detail-link';
    label.textContent = 'Voir les détails →';

    info.append(label);

    link.append(poster, info);
    article.append(link);

    return article;
}

// Afficher les cartes des films
export function addCards(container, items, append = false) {

    if (!append) {
        container.replaceChildren();
    }

    for (const movie of items) {
        container.append(card(movie, movie.Plot));
    }
}

