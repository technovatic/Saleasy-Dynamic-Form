import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import CreateSurvey from './components/CreateSurvey';
import Login from './components/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Perform any additional logout actions here
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for login */}
          <Route path="/" element={isLoggedIn ? <Navigate to="/header" /> : <Login onLogin={handleLogin} />} />

          {/* Route for logged-in user */}
          <Route path="/header" element={isLoggedIn ? <>
            <Navbar onLogout={handleLogout} />
            <Header />
            {/* Other dashboard content */}
          </> : <Navigate to="/" />} />

          {/* Route for /create-survey */}
          <Route path="/create-survey" element={<CreateSurvey />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
