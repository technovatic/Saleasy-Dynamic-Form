import React, { useEffect, useState } from 'react';
import SurveyCard from './SurveyCard';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/surveys')
      .then(response => response.json())
      .then(data => setSurveys(data))
      .catch(error => console.error('Error fetching surveys:', error));
  }, []);

  return (
    <div className="p-4">
      {surveys.map(survey => (
        <SurveyCard key={survey.id} survey={survey} />
      ))}
    </div>
  );
};

export default SurveyList;
