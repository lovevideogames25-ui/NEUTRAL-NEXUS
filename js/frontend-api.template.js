// Frontend API handler for static deployment
// This file handles direct API calls to external services without a backend
// API keys are injected from .env during build process

// AI API Keys - INJECTED FROM .env
const API = 'API_PLACEHOLDER';
const API2 = 'API2_PLACEHOLDER';
const API3 = 'API3_PLACEHOLDER';
const API4 = 'API4_PLACEHOLDER';
const API5 = 'API5_PLACEHOLDER';
const API6 = 'API6_PLACEHOLDER';
const API7 = 'API7_PLACEHOLDER';
const API8 = 'API8_PLACEHOLDER';

// Cloudflare Configuration - INJECTED FROM .env
const CLOUDFLARE_ACCOUNT_ID = 'CLOUDFLARE_ACCOUNT_ID_PLACEHOLDER';
const CLOUDFLARE_GATEWAY_ID = 'CLOUDFLARE_GATEWAY_ID_PLACEHOLDER';

// Music API Keys - INJECTED FROM .env
const SPOTIFY_CLIENT_ID = 'SPOTIFY_CLIENT_ID_PLACEHOLDER';
const SPOTIFY_CLIENT_SECRET = 'SPOTIFY_CLIENT_SECRET_PLACEHOLDER';
const JAMENDO_CLIENT_ID = 'JAMENDO_CLIENT_ID_PLACEHOLDER';

// TMDB API Configuration - INJECTED FROM .env
const TMDB_API_KEY = 'TMDB_API_KEY_PLACEHOLDER';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// YouTube API Configuration - INJECTED FROM .env
const YOUTUBE_API_KEY = 'YOUTUBE_API_KEY_PLACEHOLDER';
const YOUTUBE_API_KEY_2 = 'YOUTUBE_API_KEY_2_PLACEHOLDER';
const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Merriam Webster API - INJECTED FROM .env
const MERRIAM_WEBSTER_API_KEY = 'MERRIAM_WEBSTER_API_KEY_PLACEHOLDER';

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

// Movie Functions
async function fetchMovies(type = 'popular', searchQuery = '') {
    try {
        let endpoint;
        let params = {};
        
        if (searchQuery) {
            endpoint = '/search/movie';
            params.query = searchQuery;
        } else if (type === 'now_playing') {
            endpoint = '/movie/now_playing';
        } else if (type === 'top_rated') {
            endpoint = '/movie/top_rated';
        } else {
            endpoint = '/movie/popular';
        }
        
        const data = await fetchTMDB(endpoint, params);
        
        // Transform data to match backend format
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
        
        return { movies };
    } catch (error) {
        console.error('Error fetching movies:', error);
        return { error: error.message || 'Failed to fetch movies' };
    }
}

// TV Show Functions
async function fetchTVShows(type = 'popular', searchQuery = '') {
    try {
        let endpoint;
        let params = {};
        
        if (searchQuery) {
            endpoint = '/search/tv';
            params.query = searchQuery;
        } else if (type === 'top_rated') {
            endpoint = '/tv/top_rated';
        } else {
            endpoint = '/tv/popular';
        }
        
        const data = await fetchTMDB(endpoint, params);
        
        // Transform data to match backend format
        const shows = data.results.map(show => ({
            id: show.id,
            name: show.name,
            overview: show.overview,
            posterPath: show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : null,
            backdropPath: show.backdrop_path ? `https://image.tmdb.org/t/p/w500${show.backdrop_path}` : null,
            firstAirDate: show.first_air_date,
            rating: show.vote_average,
            voteCount: show.vote_count
        }));
        
        return { shows };
    } catch (error) {
        console.error('Error fetching TV shows:', error);
        return { error: error.message || 'Failed to fetch TV shows' };
    }
}

async function fetchTVDetails(tvId) {
    try {
        const data = await fetchTMDB(`/tv/${tvId}`);
        
        // Transform data to match backend format
        const details = {
            id: data.id,
            name: data.name,
            overview: data.overview,
            posterPath: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null,
            backdropPath: data.backdrop_path ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}` : null,
            firstAirDate: data.first_air_date,
            rating: data.vote_average,
            voteCount: data.vote_count,
            seasons: data.seasons.map(season => ({
                id: season.id,
                seasonNumber: season.season_number,
                episodeCount: season.episode_count,
                name: season.name,
                overview: season.overview,
                posterPath: season.poster_path ? `https://image.tmdb.org/t/p/w500${season.poster_path}` : null,
                airDate: season.air_date
            }))
        };
        
        return { details, seasons: details.seasons };
    } catch (error) {
        console.error('Error fetching TV details:', error);
        return { error: error.message || 'Failed to fetch TV details' };
    }
}

// YouTube API Functions
async function searchYouTube(query, maxResults = 10) {
    try {
        const url = new URL(`${YOUTUBE_BASE_URL}/search`);
        url.searchParams.append('key', YOUTUBE_API_KEY);
        url.searchParams.append('q', query);
        url.searchParams.append('part', 'snippet');
        url.searchParams.append('maxResults', maxResults);
        url.searchParams.append('type', 'video');
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message || 'YouTube API error');
        }
        
        const videos = data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.default.url,
            channelId: item.snippet.channelId,
            channelTitle: item.snippet.channelTitle
        }));
        
        return { videos };
    } catch (error) {
        console.error('Error searching YouTube:', error);
        return { error: error.message || 'Failed to search YouTube' };
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchMovies,
        fetchTVShows,
        fetchTVDetails,
        searchYouTube
    };
}

// Make functions globally available for browser
window.fetchMovies = fetchMovies;
window.fetchTVShows = fetchTVShows;
window.fetchTVDetails = fetchTVDetails;
window.searchYouTube = searchYouTube;

// Make API keys globally available for browser
window.ENV = {
    API,
    API2,
    API3,
    API4,
    API5,
    API6,
    API7,
    API8,
    CLOUDFLARE_ACCOUNT_ID,
    CLOUDFLARE_GATEWAY_ID,
    SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET,
    JAMENDO_CLIENT_ID,
    TMDB_API_KEY,
    YOUTUBE_API_KEY,
    YOUTUBE_API_KEY_2,
    MERRIAM_WEBSTER_API_KEY
};
