import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SurveyPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const [surveyName, setSurveyName] = useState('');
  const [surveyCategory, setSurveyCategory] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (surveyName && surveyCategory) {
      try {
        const response = await fetch('http://localhost:5000/api/surveys', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: surveyName, category: surveyCategory }),
        });

        if (response.ok) {
          navigate('/create-survey', { state: { surveyName, surveyCategory } });
        } else {
          alert('Failed to create survey');
        }
      } catch (error) {
        alert('Error creating survey');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded shadow-lg relative w-full max-w-md">
        <button className="absolute top-2 right-2 text-gray-700" onClick={onClose}>X</button>
        <h1 className="text-2xl font-semibold mb-4">New Survey</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="surveyName" className="block text-gray-700">Survey title</label>
            <input
              type="text"
              id="surveyName"
              className="border border-gray-300 p-2 rounded w-full"
              value={surveyName}
              onChange={(e) => setSurveyName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="surveyCategory" className="block text-gray-700">Survey category</label>
            <select
              id="surveyCategory"
              className="border border-gray-300 p-2 rounded w-full"
              value={surveyCategory}
              onChange={(e) => setSurveyCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option>Community or Volunteer Feedback</option>
              <option>Customer Feedback</option>
              <option>Concept, product or ad testing</option>
              <option>Brand Tracking or Awareness</option>
              <option>General Market Research</option>
              <option>Employee Engagement</option>
              <option>Employee Performance</option>
              <option>General Employee Feedback</option>
              <option>Event Registration</option>
              <option>Event Feedback</option>
              <option>Quiz</option>
              <option>Vote or poll</option>
            </select>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Advanced settings:</h2>
            <label className="block text-gray-700">
              <input type="checkbox" className="mr-2" />
              Copy questions and answers from a doc
            </label>
            <label className="block text-gray-700">
              <input type="checkbox" className="mr-2" />
              Use audience panel to buy targeted responses
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Does your survey need to be HIPAA compliant?
            </label>
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Create survey</button>
        </form>
      </div>
    </div>
  );
};

export default SurveyPopup;
