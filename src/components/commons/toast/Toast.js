import React, { useEffect, useState } from "react";
import "./Toast.css";

const Toast = ({ toastContent, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) {
        onClose();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className={`toast ${type}`}>
      <span className="toast-icon">🔴</span>
      <span className="toast-message">{toastContent}</span>
    </div>
  );
};

export default Toast;
