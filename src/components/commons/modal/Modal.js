import React from "react";
import "../../../style/Modal.css";
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
}) {
  const location = useLocation();

  return (
    <div className="CommonModal">
      <div className="modalBox">
        <h2 className="modalTitle">{title}</h2>
        <div className="modalContent">{modalContent}</div>
        <div className="modalButton">
          <button className="modalClose" onClick={handleCloseClick}>
            {exitText}
          </button>
          <button className="submitButton" onClick={handleButtonClick}>
            {buttonText}
          </button>
        </div>
      </div>
      {(location.pathname === "/study-detail" ||
        location.pathname === "/modal") && (
        <div className="movePage">
          <Link to="/Habit">
            <img src={btn_habit} alt="btn_habit" className="modalImg" />
          </Link>
          <Link to="/Focus">
            <img src={btn_focus} alt="btn_focus" className="modalImg" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Modal;
