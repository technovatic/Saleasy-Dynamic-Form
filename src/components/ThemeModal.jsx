import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ThemeModal = ({ onClose, onSave, surveyName }) => {
  const themes = [
    { name: 'Gradient', className: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500' },
    { name: 'Nature Background', className: 'bg-green-400', image: 'https://images.unsplash.com/photo-1539634262233-7c0b48ab9503?q=80&w=2025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Full Color', className: 'bg-blue-500' },
  ];
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleSave = () => {
    if (selectedTheme) {
      onSave(selectedTheme);
      // Make an API call to save the selected theme for the survey
      fetch('http://localhost:5000/api/surveys/theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ surveyTitle: surveyName, theme: selectedTheme.name }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Theme saved:', data);
      })
      .catch(error => {
        console.error('Error saving theme:', error);
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow-lg relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Select Theme</h2>
        <div className="space-y-4">
          {themes.map((theme) => (
            <div
              key={theme.name}
              className={`p-4 border rounded cursor-pointer ${theme.className} ${selectedTheme === theme ? 'border-black' : 'border-transparent'}`}
              onClick={() => setSelectedTheme(theme)}
              style={{ backgroundImage: theme.image ? `url(${theme.image})` : 'none', backgroundSize: 'cover' }}
            >
              {theme.name}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
