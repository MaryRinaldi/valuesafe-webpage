import React, { useState } from 'react';
import '../../App.css'

function Modal({ showModal, closeModal, modalContent }) {
  
  return (
    <>
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div  className='modal-content' onClick={(e) => e.stopPropagation()}>
            {modalContent}
            <button className="close-button" onClick={closeModal}>
            &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
