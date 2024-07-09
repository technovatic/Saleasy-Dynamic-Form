const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors({ origin: 'https://saleasy-dynamic-form.vercel.app' }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://kelurvishal:<password>@cluster0.yrou6df.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const surveySchema = new mongoose.Schema({
  name: String,
  theme: String,
  questions: Array
});

const Survey = mongoose.model('Survey', surveySchema);

app.post('/api/surveys', async (req, res) => {
  try {
    const { name, theme, questions } = req.body;
    const newSurvey = new Survey({ name, theme, questions });
    await newSurvey.save();
    res.json(newSurvey);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save survey' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
