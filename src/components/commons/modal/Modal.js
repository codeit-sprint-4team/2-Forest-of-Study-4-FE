import React, { useState } from "react";
import '../../../style/Modal.css'
import { Link } from "react-router-dom";
import btn_habit from "../../../assets/imgs/btn_habit.png"
import btn_focus from "../../../assets/imgs/btn_focus.png"

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
          <Link to="/Habit"> 
            <img src={btn_habit} />
          </Link>
          <Link to="/Focus">
            <img src={btn_focus} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Modal;