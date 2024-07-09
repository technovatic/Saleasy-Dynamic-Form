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

let surveys = [];
let surveyQuestions = {};
let surveyThemes = {};

app.post('/api/surveys', (req, res) => {
  const { name, theme } = req.body;
  const newSurvey = { id: surveys.length + 1, name, theme };
  surveys.push(newSurvey);
  res.json(newSurvey);
});

app.post('/api/surveys/theme', (req, res) => {
  const { surveyTitle, theme } = req.body;
  surveyThemes[surveyTitle] = theme;
  res.json({ message: 'Theme saved successfully!' });
});

app.post('/api/surveys/questions', (req, res) => {
  const { surveyTitle, questions } = req.body;
  surveyQuestions[surveyTitle] = questions;
  res.json({ message: 'Questions saved successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
