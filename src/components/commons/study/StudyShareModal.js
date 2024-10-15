import React, { useState } from "react";
import Modal from "../../commons/modal/StudyModal";
import "../../../style/StudyShareModal.css";

const StudyShareModal = ({ studyUrl, onClose, onSubmit }) => {
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(studyUrl);
      onSubmit();
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <Modal
      title="스터디 공유"
      modalContent={
        <div className="share-modal-content">
          <p>아래 링크를 복사하세요!:</p>
          <input type="text" value={studyUrl} readOnly />
        </div>
      }
      buttonText="복사하기"
      handleButtonClick={handleCopyClick}
      handleOutsideClick={onClose}
    />
  );
};

export default StudyShareModal;
