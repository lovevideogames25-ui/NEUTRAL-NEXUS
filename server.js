const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

// YouTube search endpoint
app.get('/api/yt', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Use Invidious API (public YouTube frontend)
    const invidiousInstance = 'https://invidious.snopyta.org';
    const searchUrl = `${invidiousInstance}/api/v1/search?q=${encodeURIComponent(query)}`;
    
    const response = await axios.get(searchUrl);
    const videos = response.data;
    
    if (videos && videos.length > 0) {
      const videoId = videos[0].videoId;
      return res.json({ video_id: videoId });
    } else {
      return res.status(404).json({ error: 'No videos found' });
    }
  } catch (error) {
    console.error('YouTube search error:', error);
    return res.status(500).json({ error: 'Failed to search YouTube' });
  }
});

const PORT = 5232;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
