import React, { useState } from "react";
import Modal from "../../commons/modal/Modal"; 

const StudyShareModal = ({ studyUrl, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(studyUrl).then(() => {
      setCopied(true);
    });
  };

  return (
    <Modal
      title="스터디 공유"
      modalContent={
        <div>
          <p>아래 링크를 복사하세요!:</p>
          <input type="text" value={studyUrl} readOnly />
          <button onClick={handleCopyClick}>복사하기</button>
          {copied && <p>스터디 링크가 복사되었습니다!</p>}
        </div>
      }
      exitText="닫기"
      buttonText="복사 완료"
      handleButtonClick={onClose}
    />
  );
};

export default StudyShareModal;
