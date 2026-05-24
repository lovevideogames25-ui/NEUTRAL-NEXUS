const express = require('express');
const cors = require('cors');
const moviesRouter = require('./movies');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', moviesRouter);

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

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Movie API server running on port ${PORT}`);
  });
}

module.exports = app;
