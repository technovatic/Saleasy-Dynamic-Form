const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

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
