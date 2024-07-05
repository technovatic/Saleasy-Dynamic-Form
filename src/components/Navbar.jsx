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
    // Perform logout actions here (if any), e.g., clearing session or state
    onLogout(); // Call the logout function passed from the parent component
    navigate('/'); // Redirect to the login page
  };

  return (
    <header className="bg-black p-4 flex justify-between items-center sticky top-0 z-50">
      <img src="https://i.pinimg.com/736x/5c/52/07/5c5207dfcf68df10f1af114b5d67b76b.jpg" alt="Salesy Logo" className="h-10 w-auto" />
      <div className="hidden md:flex items-center">
        <div className="text-white mr-6" onClick={() => navigate('/header')}>
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          Home
        </div>
        <div className="flex items-center text-white mr-8">
          <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
          Pricing
        </div>
        <div className="flex items-center text-white mr-8">
          <FontAwesomeIcon icon={faBell} className="mr-2" />
          Notifications
        </div>
        <div className="flex items-center text-white mr-8">
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
          Support
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
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
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md p-4 flex flex-col items-start md:hidden">
          <div className="text-black mr-6 mb-3" onClick={() => navigate('/header')}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </div>
          <div className="flex items-center text-black mr-6 mb-3">
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" />
            Pricing
          </div>
          <div className="flex items-center text-black mr-8 mb-3">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Notifications
          </div>
          <div className="flex items-center text-black mr-8 mb-3">
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
            Support
          </div>
          <button className="bg-green-500 text-black px-4 py-2 rounded mb-3" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
