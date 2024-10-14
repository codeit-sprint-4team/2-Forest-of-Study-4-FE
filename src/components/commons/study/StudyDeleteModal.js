import React from "react";
import Modal from "../modal/StudyModal"; // 모달 새로 !
import "../../../style/StudyDeleteModal.css";

const StudyDeleteModal = ({ studyName, onClose, onDelete }) => {
  return (
    <Modal
      title="스터디 삭제"
      modalContent={
        <div className="delete-modal-content">
          {studyName}을(를) 삭제하시겠습니까? <br />이 작업은 되돌릴 수
          없습니다.
        </div>
      }
      exitText="취소"
      buttonText="삭제"
      handleCloseClick={onClose}
      handleButtonClick={onDelete}
      onClose={onClose}
    />
  );
};

export default StudyDeleteModal;
