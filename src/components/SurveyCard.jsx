import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SurveyCard = ({ survey }) => {
  return (
    <div className="p-4 border rounded-lg bg-white flex flex-col space-y-4 group glassmorphism mb-4">
      <div className="flex items-center justify-between">
        <span className="font-bold">{survey.surveyTitle}</span>
        <div className="flex space-x-2">
          <Link to={`/survey/${survey.id}`}>
            <button type="button" className="text-blue-500">
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </Link>
        </div>
      </div>
      <ul>
        {survey.questions.map((question, index) => (
          <li key={index} className="border-b px-2 py-1">{question.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyCard;
