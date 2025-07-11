import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

const body = {
  contents: [
    {
      parts: [{ text: "Explain how AI works in a few words" }]
    }
  ]
};

async function testGemini() {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify(body)
    });

    const text = await res.text();
    console.log('🌐 Raw response:', text);
    const data = JSON.parse(text);
    console.log('✅ Gemini API Test Success:\n', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('❌ Gemini Test Failed:', err.message);
  }
}

testGemini();
