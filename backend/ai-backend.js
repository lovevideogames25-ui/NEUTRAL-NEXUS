const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
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

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'AI Backend Online' });
});

app.listen(PORT, () => {
  console.log(`AI Backend running on port ${PORT}`);
});
