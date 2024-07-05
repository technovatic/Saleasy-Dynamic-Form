import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from './Navbar';
import { faComments, faUserPlus, faEdit, faCheckSquare, faListAlt, faStar, faCaretDown, faThList, faUpload, faSort, faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ThemeModal = ({ onClose, onSave, surveyName }) => {
  const themes = [
    { name: 'Office Background', className: 'bg-green-400', image: 'https://t3.ftcdn.net/jpg/06/76/11/34/360_F_676113431_1rqsM7P24VBWGZiFVyLjJOxyQtCgEqKk.jpg' },
    { name: 'Nature Background', className: 'bg-green-400', image: 'https://img.freepik.com/free-photo/green-grassy-park-field-outdoors-concept_53876-74927.jpg' },
    { name: 'Full Color', className: 'bg-blue-500'},
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
        body: JSON.stringify({ surveyTitle: surveyName, theme: selectedTheme }),
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
      <div className="bg-gradient-to-br p-8 rounded shadow-lg relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <button className="absolute top-2 right-2 text-white hover:text-gray-800" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="text-xl font-semibold mb-4">Select Theme</h2>
        <div className="space-y-4">
          {themes.map((theme) => (
            <div
              key={theme.name}
              className={`p-4 border rounded cursor-pointer ${theme.className} ${selectedTheme === theme.name ? 'border-black' : 'border-transparent'}`}
              onClick={() => setSelectedTheme(theme)}
              style={{ backgroundImage: theme.image ? `url(${theme.image})` : 'none', backgroundSize: 'cover' }}
            >
              {theme.name}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-green-500 text-black px-4 py-2 rounded" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

const FormBuilder = ({ selectedTheme, surveyName }) => {
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: `question-${questions.length + 1}`,
        text: '',
        type: 'Multiple Choice',
        options: ['', '', '', ''],
      },
    ]);
  };

  const handleQuestionChange = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;

    if (key === 'type') {
      if (value === 'Multiple Choice') {
        newQuestions[index].options = ['', '', '', ''];
      } else if (value === 'Single Choice') {
        newQuestions[index].options = ['', ''];
      }
    }

    setQuestions(newQuestions);
  };

  const addOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push('');
    setQuestions(newQuestions);
  };

  const removeOption = (index, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[index].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = [...questions];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setQuestions(items);
  };

  const formik = useFormik({
    initialValues: {
      questions: [],
    },
    onSubmit: (values) => {
      console.log('Form values:', values);
      
      // Send questions to the backend
      fetch('http://localhost:5000/api/surveys/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveyTitle: surveyName,
          questions: questions,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Questions saved:', data);
        setQuestions([]); // Clear questions after submitting
      })
      .catch(error => {
        console.error('Error saving questions:', error);
      });
    },
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="questions">
        {(provided) => (
          <div ref={provided.innerRef} className="overflow-y-auto max-h-96">
            <form onSubmit={formik.handleSubmit} className="p-4">
              {questions.map((question, index) => (
                <Draggable key={question.id} draggableId={question.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-4 border rounded-lg bg-white flex flex-col space-y-4 group glassmorphism mb-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Q{index + 1}</span>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100">
                          <button type="button" onClick={() => removeQuestion(index)} className="text-red-500">
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                          <button type="button" className="text-blue-500">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="border-b flex-grow px-2 py-1 focus:outline-none"
                        placeholder="Enter your question"
                        value={question.text}
                        onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                      />
                      {question.type === 'Multiple Choice' && (
                        <>
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2 group">
                              <input
                                type="text"
                                className="border-b flex-grow px-2 py-1 focus:outline-none"
                                placeholder={`Option ${String.fromCharCode(97 + optionIndex)}`}
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...question.options];
                                  newOptions[optionIndex] = e.target.value;
                                  handleQuestionChange(index, 'options', newOptions);
                                }}
                              />
                              <div className="flex space-x-2 opacity-0 group-hover:opacity-100">
                                <button type="button" onClick={() => removeOption(index, optionIndex)} className="text-red-500">
                                  <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <button type="button" className="text-blue-500">
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </div>
                            </div>
                          ))}
                          {question.options.length < 4 && (
                            <button type="button" onClick={() => addOption(index)} className="text-green-500 mt-2">
                              + Add Option
                            </button>
                          )}
                        </>
                      )}
                      {question.type === 'Single Choice' && (
                        <>
                          {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2 group">
                              <input
                                type="text"
                                className="border-b flex-grow px-2 py-1 focus:outline-none"
                                placeholder={`Option ${String.fromCharCode(97 + optionIndex)}`}
                                value={option}
                                onChange={(e) => {
                                  const newOptions = [...question.options];
                                  newOptions[optionIndex] = e.target.value;
                                  handleQuestionChange(index, 'options', newOptions);
                                }}
                              />
                              <div className="flex space-x-2 opacity-0 group-hover:opacity-100">
                                <button type="button" onClick={() => removeOption(index, optionIndex)} className="text-red-500">
                                  <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <button type="button" className="text-blue-500">
                                  <FontAwesomeIcon icon={faEdit} />
                                </button>
                              </div>
                            </div>
                          ))}
                          {question.options.length < 2 && (
                            <button type="button" onClick={() => addOption(index)} className="text-green-500 mt-2">
                              + Add Option
                            </button>
                          )}
                        </>
                      )}
                      <select
                        className="border rounded-lg px-2 py-1 focus:outline-none"
                        value={question.type}
                        onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
                      >
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="Single Choice">Single Choice</option>
                      </select>
                    </div>
                  )}
                </Draggable>
              ))}
              <div className="text-center mb-4">
                <button
                  type="button"
                  onClick={addQuestion}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Add Question
                </button>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const CreateSurvey = () => {
  const location = useLocation();
  const { surveyName } = location.state || { surveyName: '' };
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  const renderBuildSection = () => (
    <div className="lg:w-1/5 bg-gray-100 p-4 items-start justify-start mt-0 space-y-3">
      <button className="text-left w-full p-2 bg-green-500 text-white rounded flex items-center border border-black">
        <FontAwesomeIcon icon={faListAlt} className="mr-2" /> Build
      </button>
      <div className="mt-1 space-y-5">
        <button className="text-left w-full p-2 bg-white rounded shadow flex items-center border border-black">
          <FontAwesomeIcon icon={faCheckSquare} className="mr-2" /> Multiple Choice
        </button>
        <button className="text-left w-full p-2 bg-white rounded shadow flex items-center border border-black">
          <FontAwesomeIcon icon={faListAlt} className="mr-2" /> Checkboxes
        </button>
        <button className="text-left w-full p-2 bg-white rounded shadow flex items-center border border-black">
          <FontAwesomeIcon icon={faStar} className="mr-2" /> Star Rating
        </button>
        <button className="text-left w-full p-2 bg-white rounded shadow flex items-center border border-black">
          <FontAwesomeIcon icon={faCaretDown} className="mr-2" /> Dropdown
        </button>
        <button className="text-left w-full p-2 bg-white rounded shadow flex items-center border border-black">
          <FontAwesomeIcon icon={faThList} className="mr-2" /> Ranking
        </button>
        <button className="text-left w-full p-2 bg-white rounded shadow flex items-center border border-black">
          <FontAwesomeIcon icon={faUpload} className="mr-2" /> File Upload
        </button>
        <button className="text-left w-full p-2 bg-white rounded shadow flex items-center border border-black">
          <FontAwesomeIcon icon={faSort} className="mr-2" /> Sorting
        </button>
        <button className="text-left w-full p-2 bg-white rounded shadow flex items-center border border-black">
          <FontAwesomeIcon icon={faImage} className="mr-2" /> Image
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-stretch bg-gray-400 pt-4 px-4 mt-1 mb-0 lg:h-2xl ">
        <div className="w-full flex items-center justify-between mb-2 mt-3">
          <h1 className="text-2xl font-bold">{surveyName}</h1>
          <div className="ml-auto flex space-x-4">
           <div className="bg-yellow-400 rounded-lg p-2 flex items-center">
              <span className="text-black hover:text-gray-700 cursor-pointer">
                <FontAwesomeIcon icon={faEdit} className="ml-1" /> Edit Reports
              </span>
            </div>
            <div className="bg-yellow-400 rounded-lg p-2">
              <FontAwesomeIcon icon={faComments} className="text-black hover:text-gray-700 cursor-pointer" />
            </div>
            <div className="bg-yellow-400 rounded-lg p-2 flex items-center">
              <span className="text-black hover:text-gray-700 cursor-pointer">
                <FontAwesomeIcon icon={faUserPlus} className="ml-1" /> Add Collaborators
              </span>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row mt-2 mb-1">
          {renderBuildSection()}
          <div className="lg:w-4/5 p-4 border border-red-400 justify-start">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Survey Form</h2>
              <button className="bg-green-500 text-black bold px-4 py-2 rounded" onClick={() => setThemeModalVisible(true)}>
                Select Theme
              </button>
            </div>
            <FormBuilder selectedTheme={selectedTheme} />
          </div>
        </div>
        {themeModalVisible && <ThemeModal onClose={() => setThemeModalVisible(false)} onSave={(theme) => setSelectedTheme(theme.name)} surveyName={surveyName} />}
      </div>
    </>
  );
};

export default CreateSurvey;
