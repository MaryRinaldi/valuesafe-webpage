import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import './components/pages/Modal.jsx'
import Tools from './components/views/Tools.jsx';
import Feedback from './components/views/Feedback.jsx'
import Funded from './assets/images/intelligearth_logo.png';
import FrontPage from './components/views/FrontPage.jsx';
import DashBoard from './components/views/DashBoard.jsx';
import NavBar from './navbar.jsx';

function App() {

  const [darkMode, setdarkMode] = useState(false);

  const handleToggle = () => {
    const newState = !darkMode;
    setdarkMode(newState);
  
    if (newState) {
      document.body.classList.add('dark-mode');
      document.getElementById('root').classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.getElementById('root').classList.remove('dark-mode');
    }
  };

  
  return (
    <>  
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <NavBar darkMode={darkMode} />
      <Routes>
          <Route path="/" element={<FrontPage/>} />
          <Route path="/dashboard" element={<DashBoard/>} />         
          <Route path="/feedback" element={<Feedback/>} />
          <Route path="/tools" element={<Tools/>} /> 
          </Routes>
    </div>
    <div className="toggle-container">
        <input
          type="checkbox"
          id="darkModeSwitch"
          className="hidden-checkbox"
          checked={darkMode}
          onChange={handleToggle}
          aria-label={darkMode ? 'Turn on light mode' : 'Turn on dark mode'}
        />
<label className='toggleLabel' htmlFor="darkModeSwitch">
  {darkMode ? 'Dark mode' : 'Light mode'}
</label>
      </div>
      <footer className="footer" >
      <img src={Funded} alt="Funded by" className="funded_logo" />
        <p>
        www.intelligEarth.com<br></br>
        &copy; {new Date().getFullYear()} | IntelligEarth</p>
        <Link to="/dashboard" className="">
          GO TO THE DASHBOARD
        </Link>
      </footer>    
    </>
  );
}


export default App;