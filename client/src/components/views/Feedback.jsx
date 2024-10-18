import React, { useState } from 'react';
import Modal from '../pages/Modal';

const Feedback = () => {
  const [feedback, setFeedback] = useState({
        countryRepresented: '',
        regionRepresented: '',
        useForTool: {
          predictVaccinationNeed: false,
          understandOutbreaks: false,
        },
        usabilityMap: 0,
        usabilityPredictionTool: 0,
        additionalComments: '',
        overallExperience: 0,
        featureRequests: '',
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        useForTool: {
          ...prevFeedback.useForTool,
          [name]: checked,
        },
      }));
    } else {
    setFeedback({ ...feedback, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedback),
    });

    if (response.ok) {
      alert('Feedback submitted successfully!');
      setFeedback({
        countryRepresented: '',
        regionRepresented: '',
        useForTool: {
          predictVaccinationNeed: false,
          understandOutbreaks: false,
        },
        usabilityMap: 0,
        usabilityPredictionTool: 0,
        additionalComments: '',
        overallExperience: 0,
        featureRequests: '',
      });
      setShowModal(false);
    } else {
      alert('Failed to submit feedback');
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h3>We appreciate your feedback</h3>  
      <label>
      Company of representation:
        <textarea
          name="countryRepresented"
          value={feedback.countryRepresented}
          onChange={handleInputChange}
        />
      </label>
      <label>
        <br>
        </br>Your area of representation:
        <textarea
          name="regionRepresented"
          value={feedback.regionRepresented}
          onChange={handleInputChange}
        />
      </label>
      <label id='checkLabel'>
  You used ValueSafe to:
    <input
      type="checkbox"
      name="predictVaccinationNeed"
      checked={feedback.useForTool.predictVaccinationNeed}
      onChange={handleInputChange}
    />
     <span className="checkInputText">Predict depreciation</span>
    <input
      type="checkbox"
      name="understandOutbreaks"
      checked={feedback.useForTool.understandOutbreaks}
      onChange={handleInputChange}
    />
     <span className="checkInputText">Understand risks</span>
</label>
      <label>
        Usability of the map:
        <input
          type="number"
          name="usabilityMap"
          value={feedback.usabilityMap}
          onChange={handleInputChange}
          min="0"
          max="5"
          required
        />
      </label>

      <label>
      Comments about the map:
        <textarea
          name="additionalComments"
          value={feedback.additionalComments}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Usability of prediction tool:
        <input
          type="number"
          name="usabilityPredictionTool"
          value={feedback.usabilityPredictionTool}
          onChange={handleInputChange}
          min="0"
          max="5"
          required
        />
      </label>

      <label>
        What functionalities would you like to see in ValueSafe?
        <textarea
          name="featureRequests"
          value={feedback.featureRequests}
          onChange={handleInputChange}
        />
      </label>

      <label>
        Overall experience with ValueSafe:
        <input
          type="number"
          name="overallExperience"
          value={feedback.overallExperience}
          onChange={handleInputChange}
          min="0"
          max="5"
          required
        />
      </label>
      <label>
        If you want a team member to contact you,      <br></br>
        please leave your e-mail:
        <textarea
          name="emailContact"
          value={feedback.emailContact}
          onChange={handleInputChange}
        />
      </label>
      <br></br>
      <button type="submit" className='submit-button'>Submit Feedback</button>
    </form>
    </>
  );
};

export default Feedback;
