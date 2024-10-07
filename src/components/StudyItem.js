// src/components/StudyItem.js
import React, { useState } from "react";
import StudyEditModal from "./StudyEditModal";
import "../style/StudyEdit.css";

const StudyItem = ({ study, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing(true);

  const handleDeleteClick = () => {
    if (window.confirm("정말로 이 스터디를 삭제하시겠습니까?")) {
      onDelete(study.id);
    }
  };

  const handleModalClose = () => setIsEditing(false);

  const handleSave = (updatedStudy) => {
    onUpdate(updatedStudy);
    setIsEditing(false);
  };

  return (
    <div className="study-item">
      <h3>{study.name}</h3>
      <p>{study.description}</p>
      <button className="edit-button" onClick={handleEditClick}>수정</button>
      <button className="delete-button" onClick={handleDeleteClick}>삭제</button>
      
      {isEditing && (
        <StudyEditModal
          study={study}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default StudyItem;