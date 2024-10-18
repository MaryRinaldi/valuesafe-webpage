import React from 'react';
import { Link } from 'react-router-dom';
import Presentation from "../../assets/images/valuesafe_presentation.png"


function FrontPage({darkMode}) {
  return (
    <div className="frontpage-container">
    <img src={Presentation} alt="Valuesafe" className="valuesafe_presentation" />
      <div className="button-container">
        {/* Bottone per accedere alla dashboard (DashBoard.jsx) */}
      </div>
    </div>
  );
}

export default FrontPage;
