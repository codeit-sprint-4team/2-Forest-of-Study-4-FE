import React from "react";
import "./Toast.css";

const Toast = ({ toastContent, type }) => {
  return (
    <div className={`toast ${type}`}>
      <span className="toast-icon">🔴</span>
      <span className="toast-message">{toastContent}</span>
    </div>
  );
};

export default Toast;
