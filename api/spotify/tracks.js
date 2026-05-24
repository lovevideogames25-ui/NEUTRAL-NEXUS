// Vercel API function for YouTube Data API v3
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const query = req.query.q || '';
    const apiKey = process.env.YOUTUBE_API_KEY;
    const apiKey2 = process.env.YOUTUBE_API_KEY_2;

    if (!apiKey) {
      return res.status(500).json({ error: 'YouTube API key not configured' });
    }

    let url;
    if (query) {
      // Search YouTube
      url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query + ' music')}&maxResults=50&key=${apiKey}`;
    } else {
      // Get popular music videos
      url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&q=popular music 2024&maxResults=50&key=${apiKey}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      // Check if quota exceeded and try backup key
      if (data.error.errors && data.error.errors[0].reason === 'quotaExceeded' && apiKey2) {
        const backupUrl = query
          ? `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query + ' music')}&maxResults=50&key=${apiKey2}`
          : `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&q=popular music 2024&maxResults=50&key=${apiKey2}`;
        
        const backupResponse = await fetch(backupUrl);
        const backupData = await backupResponse.json();
        
        if (backupData.error) {
          return res.status(429).json({ quotaExceeded: true, error: 'YouTube API quota exceeded' });
        }
        
        // Filter backup data to only include - Topic channels
        const topicChannels = backupData.items.filter(item => 
          item.snippet.channelTitle && item.snippet.channelTitle.includes('- Topic')
        );

        const tracks = topicChannels.map(item => ({
          title: item.snippet.title,
          artist: item.snippet.channelTitle,
          imageUrl: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
          id: item.id.videoId
        }));
        
        return res.status(200).json({ tracks });
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

    return res.status(200).json({ tracks });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
