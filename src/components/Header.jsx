import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFolder, faList, faTh, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Header = ({ onCreateSurvey }) => {
  return (
    <header className="flex flex-col items-start justify-between p-4 bg-white shadow-md mt-2">
      <div className="flex flex-col md:flex-row w-full justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold mb-2 md:mb-0">Welcome</h1>
        <button 
          className="ml-auto p-2 bg-gray-300 text-blue-600 hover:bg-blue-300 rounded shadow-md"
          onClick={onCreateSurvey}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Create Survey
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center w-full max-w-screen-2xl">
        <div className="flex items-center w-full bg-gray-100 rounded-lg px-3 py-2 border-black border mb-4 md:mb-0">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="flex-grow bg-transparent border-none focus:outline-none"
          />
        </div>
        <div className="flex space-x-2 ml-0 md:ml-4">
          <button className="p-2 bg-gray-400 rounded hover:bg-gray-300">
            <FontAwesomeIcon icon={faFolder} className="text-gray-600" />
          </button>
          <button className="p-2 bg-gray-400 rounded hover:bg-gray-300">
            <FontAwesomeIcon icon={faList} className="text-gray-600" />
          </button>
          <button className="p-2 bg-gray-400 rounded hover:bg-gray-300">
            <FontAwesomeIcon icon={faTh} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
};

const GoogleWorldMap = () => {
  // Your implementation of Google World Map component here
  return (
    <div className="w-full bg-gray-200 mt-1 p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Survey Cities</h2>
      <div class="h-svh md:h-800">
        <iframe
          title="Google World Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497393.16643494926!2d-74.2598756266162!3d40.69767000567883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1626948945034!5m2!1sen!2sin"
          width="100%"
          height="100%" 
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

const SurveyPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const [surveyName, setSurveyName] = useState('');
  const [surveyCategory, setSurveyCategory] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (surveyName && surveyCategory) {
      try {
        const response = await axios.post('http://localhost:5000/api/surveys', {
          title: surveyName,
          category: surveyCategory,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.status === 200) {
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg relative">
        <button className="absolute top-2 right-2" onClick={onClose}>X</button>
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
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Create survey</button>
        </form>
      </div>
    </div>
  );
};

const App = () => {
  const [isSurveyPopupVisible, setSurveyPopupVisible] = useState(false);

  const handleCreateSurvey = () => {
    setSurveyPopupVisible(true);
  };

  const handleCloseSurveyPopup = () => {
    setSurveyPopupVisible(false);
  };

  return (
    <div>
      <Header onCreateSurvey={handleCreateSurvey} />
      <GoogleWorldMap /> {/* Adding the Google World Map component */}
      {isSurveyPopupVisible && <SurveyPopup onClose={handleCloseSurveyPopup} />}
    </div>
  );
};

export default App;
