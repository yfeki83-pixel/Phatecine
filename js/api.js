import { API_KEY } from './config.js';

export async function omdb(params, signal) {

    // Vérifier la clé API
    if (!API_KEY || API_KEY === 'VOTRE_CLE_API') {
        throw new Error('Clé API manquante');
    }

    // Préparer l'URL
    const url = new URL('https://www.omdbapi.com/');
    url.searchParams.set('apikey', API_KEY);

    // Ajouter les paramètres de recherche
    for (const key in params) {
        url.searchParams.set(key, params[key]);
    }

    // Envoyer la requête à OMDb
    const response = await fetch(url, { signal });

    // Vérifier la réponse
    if (!response.ok) {
        throw new Error('Erreur de connexion');
    }

    // Récupérer les données
    const data = await response.json();

    // Si aucun film n'est trouvé
    if (data.Response === 'False') {
        return { Search: [], totalResults: '0' };
    }

    // Retourner les films
    return data;
}

