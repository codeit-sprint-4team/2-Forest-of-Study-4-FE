// src/components/EditPasswordModal.js
import React, { useState } from "react";
import "../style/EditPasswordModal.css";

const EditPasswordModal = ({ studyName, onClose, onConfirm }) => {
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirm = () => {
    // 권한 확인 후 수정 페이지로 이동하는 함수 호출
    onConfirm(password);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <header className="modal-header">
          <h2>{studyName}</h2>
          <button className="modal-close-button" onClick={onClose}>
            나가기
          </button>
        </header>
        <p>권한이 필요해요!</p>
        <div className="password-input-container">
          <label htmlFor="password">비밀번호</label>
          <div className="input-wrapper">
            <input
              type="password"
              id="password"
              value={password}
              placeholder="비밀번호를 입력해 주세요."
              onChange={handleChange}
            />
            <span className="show-password-icon">👁️</span>
          </div>
        </div>
        <button className="confirm-button" onClick={handleConfirm}>
          수정하러 가기
        </button>
      </div>
    </div>
  );
};

export default EditPasswordModal;
