import React, { useState } from "react";
import '../../../style/Modal.css'

function Modal({ title, exittext, content, buttontext, handleButtonClick}) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button onClick={openModal}>모달을 여는 버튼입니다</button>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{title}</h2>
            <span className="close" onClick={closeModal}>
              {exittext}
            </span>
            <div>{content}</div>
            <button className="submit-button" onClick={handleButtonClick}>{buttontext}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;