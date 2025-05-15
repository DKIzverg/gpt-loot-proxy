import express from 'express';
import fetch from 'node-fetch';

const app = express();
app.use(express.json());

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx8mPQ6CGZ2K_HsX5nKZA8RD1t5wRvqnWezajROwb7f3dTp1y5KTvVBR7-Vl107bSuP/exec';
const API_KEY = 'ji89FT23bh';

app.post('/appendLoot', async (req, res) => {
  try {
    const body = {
      id: req.body.id,
      items: req.body.items,
      'X-API-KEY': API_KEY
    };
    const gsRes = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const text = await gsRes.text();
    res.status(gsRes.status).send(text);
  } catch (e) {
    res.status(500).send({ error: String(e) });
  }
});

app.get('/', (_, res) => {
  res.send('Proxy for GPT → Google Apps Script!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy listening on port ${PORT}`));
