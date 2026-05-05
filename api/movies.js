const express = require('express');
const https = require('https');
const http = require('http');

const router = express.Router();

// TMDB API configuration
const TMDB_API_KEY = 'YOUR_TMDB_API_KEY'; // You'll need to add your TMDB API key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

router.get('/movies', async (req, res) => {
  try {
    const { type, search } = req.query;
    
    let apiUrl;
    
    if (search && search.trim() !== '') {
      // Search movies
      apiUrl = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(search)}&language=en-US&page=1&include_adult=false`;
    } else {
      // Get movies by category
      switch(type) {
        case 'now_playing':
          apiUrl = `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
          break;
        case 'top_rated':
          apiUrl = `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
          break;
        case 'popular':
        default:
          apiUrl = `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
          break;
      }
    }

    // Make API request
    const response = await makeHttpRequest(apiUrl);
    const data = JSON.parse(response);
    
    // Transform movie data
    const movies = data.results.map(movie => ({
      title: movie.title,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      posterPath: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      overview: movie.overview,
      id: movie.id
    }));

    res.json({ movies });

  } catch (error) {
    console.error('Error fetching movies:', error);
    
    // Return fallback movies if API fails
    const fallbackMovies = [
      { title: 'Featured Movie', releaseDate: '2024', rating: 8.5, posterPath: null, overview: 'An exciting action-packed adventure.', id: 1 },
      { title: 'Action Movie', releaseDate: '2024', rating: 7.8, posterPath: null, overview: 'Thrilling action sequences.', id: 2 },
      { title: 'Drama Movie', releaseDate: '2023', rating: 8.2, posterPath: null, overview: 'Emotional storytelling.', id: 3 },
      { title: 'Comedy Movie', releaseDate: '2024', rating: 7.5, posterPath: null, overview: 'Laugh-out-loud moments.', id: 4 },
      { title: 'Sci-Fi Movie', releaseDate: '2024', rating: 8.9, posterPath: null, overview: 'Future technology and adventure.', id: 5 },
      { title: 'Romance Movie', releaseDate: '2023', rating: 7.9, posterPath: null, overview: 'Love story that touches the heart.', id: 6 },
      { title: 'Thriller Movie', releaseDate: '2024', rating: 8.1, posterPath: null, overview: 'Suspenseful thriller.', id: 7 },
      { title: 'Horror Movie', releaseDate: '2023', rating: 7.6, posterPath: null, overview: 'Scary horror film.', id: 8 },
      { title: 'Adventure Movie', releaseDate: '2024', rating: 8.3, posterPath: null, overview: 'Epic adventure story.', id: 9 },
      { title: 'Fantasy Movie', releaseDate: '2023', rating: 8.0, posterPath: null, overview: 'Magical fantasy world.', id: 10 },
      { title: 'Mystery Movie', releaseDate: '2024', rating: 7.7, posterPath: null, overview: 'Intriguing mystery.', id: 11 },
      { title: 'Documentary', releaseDate: '2023', rating: 8.4, posterPath: null, overview: 'Educational documentary.', id: 12 }
    ];

    res.json({ movies: fallbackMovies });
  }
});

function makeHttpRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    
    req.end();
  });
}

module.exports = router;
