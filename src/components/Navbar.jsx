import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHome, faDollarSign, faBell, faQuestionCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    onLogout(); // Call the logout function passed from the parent component
    navigate('/'); // Redirect to the login page
  };

  return (
    <header className="bg-black p-4 flex justify-between items-center sticky top-0 z-50">
      <img 
        src="https://i.pinimg.com/736x/5c/52/07/5c5207dfcf68df10f1af114b5d67b76b.jpg" 
        alt="Salesy Logo" 
        className="h-10 w-auto cursor-pointer" 
        onClick={() => navigate('/header')}
      />
      <div className="hidden md:flex items-center space-x-6 text-white">
        <div className="cursor-pointer" onClick={() => navigate('/header')}>
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Home
        </div>
        <div className="cursor-pointer">
          <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
          Pricing
        </div>
        <div className="cursor-pointer">
          <FontAwesomeIcon icon={faBell} className="mr-2" />
          Notifications
        </div>
        <div className="cursor-pointer">
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
          Support
        </div>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded" 
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Logout
        </button>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-white h-6 w-6" />
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col items-start space-y-3 md:hidden">
          <div className="text-black cursor-pointer" onClick={() => { navigate('/header'); toggleMenu(); }}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </div>
          <div className="text-black cursor-pointer">
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            Pricing
          </div>
          <div className="text-black cursor-pointer">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Notifications
          </div>
          <div className="text-black cursor-pointer">
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
            Support
          </div>
          <button 
            className="bg-green-500 text-black px-4 py-2 rounded" 
            onClick={() => { handleLogout(); toggleMenu(); }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
