import React, { useEffect } from "react";
import "../../../style/Toast.css"

const Toast = ({ toastContent, type }) => {
  const getIcon = () => {
    if (type === "toast-success") {
      return "🎉";
    } else if (type === "toast-error") {
      return "🚨";
    }
    return "ℹ️";
  };

  return (
    <div className={`toast ${type}`}>
      <span className="toast-icon">{getIcon()}</span>
      <span className="toast-message">{toastContent}</span>
    </div>
  );
};

export default Toast;
