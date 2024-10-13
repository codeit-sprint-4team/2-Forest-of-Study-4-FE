import React from "react";
import Modal from "../modal/Modal"; // 공용 모달

const StudyDeleteModal = ({ studyName, onClose, onDelete }) => {
  return (
    <Modal
      title="스터디 삭제"
      modalContent={
        <div>
          <p>{studyName}을(를) 삭제하시겠습니까?</p>
          <p>이 작업은 되돌릴 수 없습니다.</p>
        </div>
      }
      exitText="취소"
      buttonText="삭제"
      handleButtonClick={onDelete}
      onClose={onClose}
    />
  );
};

export default StudyDeleteModal;