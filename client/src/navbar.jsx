import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './assets/images/intelligearth_logo.png';
import './App.css';
import Modal from './components/pages/Modal';
import Feedback from './components/views/Feedback.jsx';

function NavBar({ darkMode }) {
  const [showModal, setShowModal] = useState(false);
  const [language, setLanguage] = useState('en'); // Stato per la lingua
  const location = useLocation(); // Per ottenere la route corrente

  // Funzione per cambiare la lingua
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Traduzioni simulate
  const translations = {
    en: {
      dashboard: 'Dashboard',
      feedback: 'Feedback',
      tools: 'ValueSafe',
      register: 'Register',
      login: 'Login',
    },
    it: {
      dashboard: 'Bacheca',
      feedback: 'Feedback',
      tools: 'ValueSafe',
      register: 'Registrati',
      login: 'Accedi',
    },
  };

  // Seleziona la lingua corrente
  const currentTranslation = translations[language];

  // Se siamo su "/" o "/FrontPage", mostra una navbar specifica
  if (location.pathname === '/' || location.pathname === '/FrontPage') {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <img src={Logo} alt="Intelligearth Logo" className="logo" />

          {/* Register finto, reindirizza alla dashboard */}
          <Link to="/dashboard" className={`navbar-link ${darkMode ? 'dark-mode' : ''}`}>
            {currentTranslation.register}
          </Link>

          {/* Login finto, reindirizza alla dashboard */}
          <Link to="/dashboard" className={`navbar-link ${darkMode ? 'dark-mode' : ''}`}>
            {currentTranslation.login}
          </Link>

          {/* Selettore della lingua */}
          <div className="language-selector">
            <button
              className={`language-button ${darkMode ? 'dark-mode' : ''}`}
              onClick={() => handleLanguageChange('en')}
            >
              English
            </button>
            <button
              className={`language-button ${darkMode ? 'dark-mode' : ''}`}
              onClick={() => handleLanguageChange('it')}
            >
              Italian
            </button>
          </div>
        </div>
      </nav>
    );
  }

  // Altrimenti, mostra la navbar per le altre routes
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={Logo} alt="Intelligearth Logo" className="logo" />

        {/* Link alla dashboard */}
        <Link to="/dashboard" className={`navbar-link ${darkMode ? 'dark-mode' : ''}`}>
          {currentTranslation.dashboard}
        </Link>

        {/* Bottone Feedback */}
        <Link to="#" className={`navbar-link ${darkMode ? 'dark-mode' : ''}`} onClick={openModal}>
          {currentTranslation.feedback}
        </Link>

        {/* Link agli strumenti (ValueSafe) */}
        <Link to="/tools" className={`navbar-link ${darkMode ? 'dark-mode' : ''}`}>
          {currentTranslation.tools}
        </Link>
      </div>

      {/* Modal per Feedback */}
      {showModal && <Modal showModal={showModal} closeModal={closeModal} modalContent={<Feedback />} />}
    </nav>
  );
}

export default NavBar;
