const https = require('https');

// TMDB API configuration
const TMDB_API_KEY = 'ee4b8b7f5be1c41e074883981946aeff';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Helper function to make TMDB API requests
function fetchTMDB(endpoint, params = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', TMDB_API_KEY);
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });

    const req = https.request(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// TV Show Details Handler
exports.details = async (event, context) => {
  const { id } = event.queryStringParameters || {};
  
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'TV show ID is required' })
    };
  }

  try {
    // Fetch TV show details from TMDB
    const data = await fetchTMDB(`/tv/${id}`, {
      language: 'en-US'
    });

    // Transform seasons data
    const seasons = data.seasons.map(season => ({
      season_number: season.season_number,
      episode_count: season.episode_count,
      name: season.name,
      overview: season.overview,
      poster_path: season.poster_path ? `https://image.tmdb.org/t/p/w500${season.poster_path}` : null,
      air_date: season.air_date
    })).filter(season => season.season_number > 0); // Filter out special seasons

    return {
      statusCode: 200,
      body: JSON.stringify({ seasons })
    };

  } catch (error) {
    console.error('Error fetching TV show details:', error);

    // Return fallback data if TMDB API fails
    const fallbackSeasons = [
      { season_number: 1, episode_count: 10, name: 'Season 1', overview: '', poster_path: null, air_date: '2020-01-01' },
      { season_number: 2, episode_count: 12, name: 'Season 2', overview: '', poster_path: null, air_date: '2021-01-01' },
      { season_number: 3, episode_count: 8, name: 'Season 3', overview: '', poster_path: null, air_date: '2022-01-01' },
      { season_number: 4, episode_count: 10, name: 'Season 4', overview: '', poster_path: null, air_date: '2023-01-01' }
    ];

    return {
      statusCode: 200,
      body: JSON.stringify({ seasons: fallbackSeasons })
    };
  }
};

// Handler function
exports.handler = async (event, context) => {
  const { type, search } = event.queryStringParameters || {};

  try {
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

    return {
      statusCode: 200,
      body: JSON.stringify({ tvshows })
    };

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

    return {
      statusCode: 200,
      body: JSON.stringify({ tvshows: fallbackTVShows })
    };
  }
};
