import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🚀 Gemini Interview Coach API is running!');
});

app.post('/generate', async (req, res) => {
  const { jobDescription, resume } = req.body;

  if (!jobDescription || !resume) {
    return res.status(400).json({ error: 'Missing job description or resume.' });
  }

  const prompt = `You are an AI interview coach. Read the following job description and resume, and generate 5 tailored behavioral interview questions:\n\nJob Description:\n${jobDescription}\n\nResume:\n${resume}\n\nBehavioral Questions:\n`;

  try {
    const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      })
    });

    const result = await geminiResponse.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({ error: 'No response from Gemini' });
    }

    res.json({ questions: text.trim() });
  } catch (err) {
    console.error('Gemini API error:', err.message);
    res.status(500).json({ error: 'Failed to generate questions.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
