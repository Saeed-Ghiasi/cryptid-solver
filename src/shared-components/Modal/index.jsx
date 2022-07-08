import React, { useState } from 'react';

import './Modal.css';

function Modal({ showModal, setShowModal, children }) {

  return (
    <div className={`modal ${showModal && 'active'}`} onClick={(e) => {
      if (e.target.className.includes('modal')) setShowModal(false);
    }}>
      <div className="container">
        <input type="button" value="close" onClick={() => setShowModal(false)} />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal;
