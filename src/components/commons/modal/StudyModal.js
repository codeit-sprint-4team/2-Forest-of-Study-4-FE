import React from "react";
import "../../../style/StudyModal.css";
import { Link, useLocation } from "react-router-dom";
import btn_habit from "../../../assets/imgs/btn_habit.png";
import btn_focus from "../../../assets/imgs/btn_focus.png";

function Modal({
  title,
  modalContent,
  exitText,
  buttonText,
  handleCloseClick,
  handleButtonClick,
  modalBottom,
  handleOutsideClick,
}) {
  return (
    <div className="CommonModal" onClick={handleOutsideClick}>
      <div className="modalBox" onClick={(e) => e.stopPropagation()}>
        <h2 className="modalTitle">{title}</h2>
        <div className="modalContent">{modalContent}</div>
        <div className="modalButtonWrapper">
          {exitText && (
            <button className="modalClose" onClick={handleCloseClick}>
              {exitText}
            </button>
          )}
          <button className="submitButton" onClick={handleButtonClick}>
            {buttonText}
          </button>
        </div>
      </div>
      {modalBottom}
    </div>
  );
}

export default Modal;
