import React, { useState } from "react";
import Modal from "../modal/StudyModal"; 
import CommonToast from "../toast/CommonToast"; 

import "../../../style/EditPasswordAndEditModal.css";

function EditPasswordAndEditModal({
  study = { name: "", description: "" },
  onClose,
  onConfirm,
}) {
  const [password, setPassword] = useState("");
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [studyName, setStudyName] = useState(study.name);
  const [studyDescription, setStudyDescription] = useState(study.description);
  const [showPassword, setShowPassword] = useState(false);
  const [toastInfo, setToastInfo] = useState();

  const handlePasswordChange = (e) => setPassword(e.target.value);

  // 토스트 메시지 표시 함수
  const showToast = (message, type) => {
    setToastInfo({ message, type });
    setTimeout(() => setToastInfo(), 3000); // 3초 후 숨김
  };

  const handlePasswordConfirm = () => {
    if (password === "1234") {
      setIsPasswordConfirmed(true);
      showToast("수정하러 가기.", "toast-success");
    } else {
      showToast(
        "비밀번호가 일치하지 않습니다. 다시 입력해주세요.",
        "toast-error"
      );
    }
  };

  const handleEditSubmit = () => {
    onConfirm(studyName, studyDescription);
    onClose();
  };

  return (
    <>
      <Modal
        title={isPasswordConfirmed ? "스터디 수정" : "비밀번호 확인"}
        modalContent={
          !isPasswordConfirmed ? (
            <div className="modalContentInner">
              <p>{study.name} 권한이 필요해요!</p>
              <div className="password-input-container">
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력해 주세요"
                    value={password}
                    onChange={handlePasswordChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handlePasswordConfirm();
                    }}
                  />
                  <img
                    src={
                      showPassword
                        ? "/imgs/btn_visibility_on_24px.png"
                        : "/imgs/btn_visibility_off_24px.png"
                    }
                    alt="비밀번호 표시"
                    className="show-password-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="edit-input-container">
              <p className="edit-input-title">수정할 내용을 입력하세요.</p>
              <input
                type="text"
                placeholder="스터디 이름"
                value={studyName}
                className="edit-input"
                maxLength={50}
                required
                onChange={(e) => setStudyName(e.target.value)}
              />
              <textarea
                className="edit-input edit-textarea"
                placeholder="스터디 설명"
                value={studyDescription}
                onChange={(e) => setStudyDescription(e.target.value)}
              />
            </div>
          )
        }
        // exitText="취소"
        buttonText={isPasswordConfirmed ? "수정 완료" : "수정하러 가기"}
        handleButtonClick={
          isPasswordConfirmed ? handleEditSubmit : handlePasswordConfirm
        }
        onClose={onClose}
        handleOutsideClick={onClose}
      />
      {isPasswordConfirmed && (
        <div className="modification-button-container"></div>
      )}
      {toastInfo && (
        <CommonToast toastContent={toastInfo.message} type={toastInfo.type} />
      )}
    </>
  );
}

export default EditPasswordAndEditModal;
