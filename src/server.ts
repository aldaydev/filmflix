import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

const tmdbHeaders = {
  Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
  'Content-Type': 'application/json;charset=utf-8'
}

// ---------- GET POPULAR FILMS  ----------
app.get('/api/popular-films', async (_req, res) => {
  try {
    const response = await fetch(`${process.env.TMDB_BASE_URL}/movie/popular?language=es-ES&page=1`, {
      headers: tmdbHeaders
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Se ha producdo un error al cargar las películas');
  }
});

// ---------- GET FILM BY ID  ----------
app.get('/api/film/:id', async (req, res) => {

  const filmId = req.params.id;
  const url = `${process.env.TMDB_BASE_URL}/movie/${filmId}?language=es-ES&append_to_response=videos,similar`

  try {
    const response = await fetch(url, {
      headers: tmdbHeaders
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Se ha producdo un error al cargar la película');
  }
});

// ---------- GET GENRES  ----------
app.get('/api/genres', async (req, res) => {

  const url = `${process.env.TMDB_BASE_URL}/genre/movie/list?language=es`

  try {
    const response = await fetch(url, {
      headers: tmdbHeaders
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Se ha producdo un error al cargar los géneros');
  }
});

// ---------- GET NOW PLAYING FILMS  ----------
app.get('/api/now-playing-films', async (req, res) => {

  const page = req.query['page'] || 1;
  const url = `${process.env.TMDB_BASE_URL}/movie/now_playing?language=es-ES&page=${page}`

  try {
    const response = await fetch(url, {
      headers: tmdbHeaders
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Se ha producdo un error al cargar las películas');
  }
});

// ---------- SEARCH FILMS BY FILTERS  ----------

interface FilmsByFilterQuery {
  with_genres?: string;
  primary_release_year? : string;
  page?: string;
  sort_by?: string;
}

app.get('/api/search-films-by-filters', async (req, res) => {

  const { 
    with_genres = '', 
    primary_release_year = '',
    page, 
    sort_by = '' 
  } = req.query as unknown as FilmsByFilterQuery;

  const withGenres = with_genres ? `&with_genres=${with_genres}` : '';
  const primaryReleaseYear = primary_release_year ? `&primary_release_year=${primary_release_year}` : '';

  const finalQuery = `&page=${page}${withGenres}${primaryReleaseYear}&sort_by=${sort_by}`


  const url = `${process.env.TMDB_BASE_URL}/discover/movie?language=es-ES${finalQuery}`

  try {
    const response = await fetch(url, {
      headers: tmdbHeaders
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Se ha producdo un error al cargar las películas');
  }
});

// ---------- SEARCH FILMS BY NAME  ----------

interface FilmsByNameQuery {
  page?: string;
  query?: string;
}

app.get('/api/search-films-by-name', async (req, res) => {

  const { 
    page, 
    query = '' 
  } = req.query as unknown as FilmsByNameQuery;

  const finalQuery = `&page=${page}&query=${query}`;

  const url = `${process.env.TMDB_BASE_URL}/search/movie?language=es-ES&include_adult=false${finalQuery}`;

  try {
    const response = await fetch(url, {
      headers: tmdbHeaders
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Se ha producdo un error al cargar las películas');
  }
});

// ---------- GET UPCOMING FILMS  ----------
app.get('/api/upcoming-films', async (req, res) => {

  const page = req.query['page'] || 1;
  const url = `${process.env.TMDB_BASE_URL}/movie/upcoming?language=es-ES&page=${page}`

  try {
    const response = await fetch(url, {
      headers: tmdbHeaders
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Se ha producdo un error al cargar las películas');
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
