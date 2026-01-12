const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/deepseek', async (req, res) => {
  const { prompt } = req.body || {};
  const apiKey = process.env.DEEPSEEK_API_KEY;
  const fallback = [
    'Idea: plataforma de monitoreo hídrico con sensores IoT',
    'Idea: reforestación con especies nativas y mapas de calor',
    'Idea: manejo inteligente del suelo con rotaciones y cubiertas',
    'Idea: analítica de riesgos climáticos para predicción temprana'
  ];

  if (!apiKey) {
    return res.json({ source: 'simulado', ideas: fallback });
  }

  try {
    // Integración real pendiente: usar la API de DeepSeek según su documentación.
    // Por ahora, devolvemos simulación aún cuando exista API_KEY para mantener DEMO.
    return res.json({ source: 'api (simulado)', ideas: fallback, prompt: prompt || '' });
  } catch (err) {
    return res.status(500).json({ error: 'Error al generar ideas', details: String(err) });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor DEMO AgrotecnologIA en http://localhost:${port}`);
});
