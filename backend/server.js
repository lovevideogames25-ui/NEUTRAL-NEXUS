const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, model } = req.body;
    
    // Forward to your AI API logic here
    // This is a placeholder - you'll need to integrate with your actual AI APIs
    
    res.json({
      response: `AI Response for: ${message} using model: ${model}`
    });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Failed to process AI request' });
  }
});

// YouTube API endpoint with -Topic filter
app.get('/api/spotify/tracks', async (req, res) => {
  try {
    const query = req.query.q || 'popular music 2024';
    const apiKey = process.env.YOUTUBE_API_KEY;
    const apiKey2 = process.env.YOUTUBE_API_KEY_2;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'YouTube API key not configured' });
    }
    
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query + ' music')}&maxResults=50&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      // Try backup key
      if (data.error.errors && data.error.errors[0].reason === 'quotaExceeded' && apiKey2) {
        const backupUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query + ' music')}&maxResults=50&key=${apiKey2}`;
        const backupResponse = await fetch(backupUrl);
        const backupData = await backupResponse.json();
        
        if (backupData.error) {
          return res.status(429).json({ quotaExceeded: true, error: 'YouTube API quota exceeded' });
        }
        
        // Filter to only include - Topic channels
        const topicChannels = backupData.items.filter(item => 
          item.snippet.channelTitle && item.snippet.channelTitle.includes('- Topic')
        );
        
        const tracks = topicChannels.map(item => ({
          title: item.snippet.title,
          artist: item.snippet.channelTitle,
          imageUrl: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
          id: item.id.videoId
        }));
        
        return res.json({ tracks });
      }
      
      return res.status(500).json({ error: data.error.message || 'YouTube API error' });
    }
    
    // Filter to only include - Topic channels (official music distribution)
    const topicChannels = data.items.filter(item => 
      item.snippet.channelTitle && item.snippet.channelTitle.includes('- Topic')
    );
    
    const tracks = topicChannels.map(item => ({
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      imageUrl: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
      id: item.id.videoId
    }));
    
    res.json({ tracks });
  } catch (error) {
    console.error('Music Error:', error);
    res.status(500).json({ error: 'Failed to fetch music' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend Online' });
});

// Export for Vercel
module.exports = app;

// Listen only if not in Vercel environment
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
  });
}
