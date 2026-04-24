# ULTIMATEUNBLOCKER Backend

Backend services for ULTIMATEUNBLOCKER.

## Installation

```bash
npm install
```

## Environment Variables

Set the following environment variables:

- `YOUTUBE_API_KEY` - Your YouTube Data API v3 key
- `YOUTUBE_API_KEY_2` - Backup YouTube API key (for quota fallback)

## Running Locally

```bash
npm start
```

The server will run on port 3000 by default.

## API Endpoints

### GET /api/spotify/tracks
Fetches music tracks from YouTube with -Topic channel filtering.

Query parameters:
- `q` - Search query (optional, defaults to "popular music 2024")

### POST /api/chat
AI chat endpoint (placeholder for AI API integration).

Body:
- `message` - User message
- `model` - AI model to use

### GET /health
Health check endpoint.

## Deployment

Deploy to Vercel or similar platform with the following settings:

- **Install Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:** Add YOUTUBE_API_KEY and YOUTUBE_API_KEY_2
