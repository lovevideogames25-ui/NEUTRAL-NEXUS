// Netlify serverless function for YouTube Data API v3
exports.handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const query = event.queryStringParameters.q || '';
    const apiKey = process.env.YOUTUBE_API_KEY;
    const apiKey2 = process.env.YOUTUBE_API_KEY_2;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'YouTube API key not configured' })
      };
    }

    let url;
    if (query) {
      // Search YouTube with - Topic filter for official music channels
      url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query + ' music -Topic')}&maxResults=12&key=${apiKey}`;
    } else {
      // Get popular music videos with - Topic filter
      url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&q=popular music 2024 -Topic&maxResults=12&key=${apiKey}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      // Check if quota exceeded and try backup key
      if (data.error.errors && data.error.errors[0].reason === 'quotaExceeded' && apiKey2) {
        const backupUrl = query
          ? `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query + ' music -Topic')}&maxResults=12&key=${apiKey2}`
          : `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&order=viewCount&q=popular music 2024 -Topic&maxResults=12&key=${apiKey2}`;
        
        const backupResponse = await fetch(backupUrl);
        const backupData = await backupResponse.json();
        
        if (backupData.error) {
          return {
            statusCode: 429,
            body: JSON.stringify({ quotaExceeded: true, error: 'YouTube API quota exceeded' })
          };
        }
        
        // Filter backup data to only include -Topic channels
        const topicChannels = backupData.items.filter(item => 
          item.snippet.channelTitle && item.snippet.channelTitle.endsWith('-Topic')
        );

        const tracks = topicChannels.map(item => ({
          title: item.snippet.title,
          artist: item.snippet.channelTitle,
          imageUrl: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
          id: item.id.videoId
        }));
        
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
          },
          body: JSON.stringify({ tracks })
        };
      }
      
      return {
        statusCode: 500,
        body: JSON.stringify({ error: data.error.message || 'YouTube API error' })
      };
    }

    // Filter to only include -Topic channels (official music distribution)
    const topicChannels = data.items.filter(item => 
      item.snippet.channelTitle && item.snippet.channelTitle.endsWith('-Topic')
    );

    const tracks = topicChannels.map(item => ({
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      imageUrl: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
      id: item.id.videoId
    }));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify({ tracks })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
