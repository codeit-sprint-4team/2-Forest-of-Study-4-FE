// src/components/StudyEditModal.js
import React, { useState } from "react";
import "../style/Study.css";

const StudyEditModal = ({ study, onClose, onSave }) => {
  const [formData, setFormData] = useState({ ...study });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>스터디 수정</h2>
        <form onSubmit={handleSubmit}>
          <label>스터디 이름:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>스터디 소개:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <button type="submit" className="save-button">저장</button>
          <button type="button" className="close-button" onClick={onClose}>취소</button>
        </form>
      </div>
    </div>
  );
};

export default StudyEditModal;
