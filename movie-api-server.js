const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// TMDB API Configuration from frontend-api.js
const TMDB_API_KEY = 'ee4b8b7f5be1c41e074883981946aeff';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// TMDB API Functions
async function fetchTMDB(endpoint, params = {}) {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', TMDB_API_KEY);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.success === false) {
            throw new Error(data.status_message || 'TMDB API error');
        }

        return data;
    } catch (error) {
        console.error('TMDB API error:', error);
        throw error;
    }
}

// Movie API endpoint
app.get('/api/movies', async (req, res) => {
  try {
    const { type, search } = req.query;
    
    let endpoint;
    let params = {};
    
    if (search && search.trim() !== '') {
        endpoint = '/search/movie';
        params.query = search;
        params.include_adult = false;
        params.language = 'en-US';
        params.page = 1;
    } else if (type === 'now_playing') {
        endpoint = '/movie/now_playing';
        params.language = 'en-US';
        params.page = 1;
    } else if (type === 'top_rated') {
        endpoint = '/movie/top_rated';
        params.language = 'en-US';
        params.page = 1;
    } else {
        endpoint = '/movie/popular';
        params.language = 'en-US';
        params.page = 1;
    }
    
    const data = await fetchTMDB(endpoint, params);
    
    // Transform data to match expected format
    const movies = data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
        backdropPath: movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : null,
        releaseDate: movie.release_date,
        rating: movie.vote_average,
        voteCount: movie.vote_count
    }));

    res.json({ movies });

  } catch (error) {
    console.error('Error fetching movies:', error);
    
    // Return fallback movies if TMDB API fails
    const fallbackMovies = [
      { title: 'The Dark Knight', releaseDate: '2008', rating: 9.0, posterPath: null, overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', id: 1 },
      { title: 'Inception', releaseDate: '2010', rating: 8.8, posterPath: null, overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', id: 2 },
      { title: 'Interstellar', releaseDate: '2014', rating: 8.6, posterPath: null, overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', id: 3 },
      { title: 'The Matrix', releaseDate: '1999', rating: 8.7, posterPath: null, overview: 'A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.', id: 4 },
      { title: 'Pulp Fiction', releaseDate: '1994', rating: 8.9, posterPath: null, overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', id: 5 },
      { title: 'The Shawshank Redemption', releaseDate: '1994', rating: 9.3, posterPath: null, overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', id: 6 },
      { title: 'Fight Club', releaseDate: '1999', rating: 8.8, posterPath: null, overview: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.', id: 7 },
      { title: 'Forrest Gump', releaseDate: '1994', rating: 8.8, posterPath: null, overview: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.', id: 8 },
      { title: 'The Godfather', releaseDate: '1972', rating: 9.2, posterPath: null, overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', id: 9 },
      { title: 'Goodfellas', releaseDate: '1990', rating: 8.7, posterPath: null, overview: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.', id: 10 },
      { title: 'The Silence of the Lambs', releaseDate: '1991', rating: 8.6, posterPath: null, overview: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.', id: 11 },
      { title: 'Se7en', releaseDate: '1995', rating: 8.6, posterPath: null, overview: 'Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.', id: 12 }
    ];

    res.json({ movies: fallbackMovies });
  }
});

// TV Show Details API endpoint
app.get('/api/tvshows/details/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch TV show details from TMDB
    const data = await fetchTMDB(`/tv/${id}`, {
      language: 'en-US'
    });

    // Fetch season details
    const seasonsData = await fetchTMDB(`/tv/${id}`, {
      language: 'en-US'
    });

    // Transform seasons data
    const seasons = seasonsData.seasons.map(season => ({
      season_number: season.season_number,
      episode_count: season.episode_count,
      name: season.name,
      overview: season.overview,
      poster_path: season.poster_path ? `https://image.tmdb.org/t/p/w500${season.poster_path}` : null,
      air_date: season.air_date
    })).filter(season => season.season_number > 0); // Filter out special seasons

    res.json({ seasons });

  } catch (error) {
    console.error('Error fetching TV show details:', error);

    // Return fallback data if TMDB API fails
    const fallbackSeasons = [
      { season_number: 1, episode_count: 10, name: 'Season 1', overview: '', poster_path: null, air_date: '2020-01-01' },
      { season_number: 2, episode_count: 12, name: 'Season 2', overview: '', poster_path: null, air_date: '2021-01-01' },
      { season_number: 3, episode_count: 8, name: 'Season 3', overview: '', poster_path: null, air_date: '2022-01-01' },
      { season_number: 4, episode_count: 10, name: 'Season 4', overview: '', poster_path: null, air_date: '2023-01-01' }
    ];

    res.json({ seasons: fallbackSeasons });
  }
});

// TV Show API endpoint
app.get('/api/tvshows', async (req, res) => {
  try {
    const { type, search } = req.query;
    
    let endpoint;
    let params = {};
    
    if (search && search.trim() !== '') {
        endpoint = '/search/tv';
        params.query = search;
        params.include_adult = false;
        params.language = 'en-US';
        params.page = 1;
    } else if (type === 'on_the_air') {
        endpoint = '/tv/on_the_air';
        params.language = 'en-US';
        params.page = 1;
    } else if (type === 'top_rated') {
        endpoint = '/tv/top_rated';
        params.language = 'en-US';
        params.page = 1;
    } else {
        endpoint = '/tv/popular';
        params.language = 'en-US';
        params.page = 1;
    }
    
    const data = await fetchTMDB(endpoint, params);
    
    // Transform data to match expected format
    const tvshows = data.results.map(show => ({
        id: show.id,
        title: show.name,
        overview: show.overview,
        posterPath: show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : null,
        backdropPath: show.backdrop_path ? `https://image.tmdb.org/t/p/w500${show.backdrop_path}` : null,
        releaseDate: show.first_air_date,
        rating: show.vote_average,
        voteCount: show.vote_count
    }));

    res.json({ tvshows });

  } catch (error) {
    console.error('Error fetching TV shows:', error);
    
    // Return fallback TV shows if TMDB API fails
    const fallbackTVShows = [
      { title: 'Breaking Bad', releaseDate: '2008', rating: 9.5, posterPath: null, overview: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine.', id: 1 },
      { title: 'Game of Thrones', releaseDate: '2011', rating: 9.3, posterPath: null, overview: 'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns.', id: 2 },
      { title: 'Stranger Things', releaseDate: '2016', rating: 8.7, posterPath: null, overview: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.', id: 3 },
      { title: 'The Crown', releaseDate: '2016', rating: 8.6, posterPath: null, overview: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.', id: 4 },
      { title: 'The Mandalorian', releaseDate: '2019', rating: 8.8, posterPath: null, overview: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.', id: 5 },
      { title: 'The Office', releaseDate: '2005', rating: 8.9, posterPath: null, overview: 'A mockumentary sitcom that depicts the everyday work lives of office employees in the Scranton, Pennsylvania branch of the Dunder Mifflin paper company.', id: 6 },
      { title: 'Friends', releaseDate: '1994', rating: 8.9, posterPath: null, overview: 'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.', id: 7 },
      { title: 'The Simpsons', releaseDate: '1989', rating: 8.7, posterPath: null, overview: 'The satiric adventures of a working-class family in the misfit city of Springfield.', id: 8 },
      { title: 'Westworld', releaseDate: '2016', rating: 8.5, posterPath: null, overview: 'Set at the intersection of the near future and the reimagined past, it explores a world in which every human appetite can be indulged.', id: 9 },
      { title: 'Black Mirror', releaseDate: '2011', rating: 8.8, posterPath: null, overview: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.', id: 10 },
      { title: 'House of Cards', releaseDate: '2013', rating: 8.6, posterPath: null, overview: 'A Congressman works with his equally conniving wife to exact revenge on the people who betrayed him.', id: 11 },
      { title: 'The Witcher', releaseDate: '2019', rating: 8.2, posterPath: null, overview: 'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world.', id: 12 }
    ];

    res.json({ tvshows: fallbackTVShows });
  }
});

// Fallback route for movie requests
app.get('/movies', async (req, res) => {
  try {
    const { type, search } = req.query;
    
    // For now, return fallback data
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
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
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

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Movie API server running on port ${PORT}`);
    console.log(`Available endpoints:`);
    console.log(`  - http://localhost:${PORT}/api/movies?type=popular`);
    console.log(`  - http://localhost:${PORT}/api/movies?type=now_playing`);
    console.log(`  - http://localhost:${PORT}/api/movies?type=top_rated`);
    console.log(`  - http://localhost:${PORT}/api/movies?search=movie+title`);
  });
}

module.exports = app;
