import React, { useState } from "react";
import Modal from "../modal/Modal";  // 공용 모달
import Toast from "../toast/Toast"; // 공용 토스트
import "../../../style/EditPasswordAndEditModal.css";

import btnOffIcon from '../../../assets/imgs/btn_off.png';
import btnOnIcon from '../../../assets/imgs/btn_on.png';
import btnEditIcon from '../../../assets/imgs/btn_edit.png';

function EditPasswordAndEditModal({
  study = { name: "", description: "" }, onClose, onConfirm }) {
  const [password, setPassword] = useState("");
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [studyName, setStudyName] = useState(study.name);
  const [studyDescription, setStudyDescription] = useState(study.description);
  const [isToastVisible, setToastVisible] = useState(false);
  const [toastContent, setToastContent] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const showToast = (message) => {
    setToastContent(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000); // 3초 후 숨기기
  };

  const handlePasswordConfirm = () => {
    if (password === "1234") {
      setIsPasswordConfirmed(true);
      showToast("✅ 수정하러 가기.");
    } else {
      showToast("🚨 비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
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
            <div>
              <p>{study.name} 권한이 필요해요!</p>
              <div className="password-input-container">
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호 입력"
                    value={password}
                    onChange={handlePasswordChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handlePasswordConfirm();
                    }}
                  />
                  <img
                    src={showPassword ? btnOnIcon : btnOffIcon}
                    alt="비밀번호 표시"
                    className="show-password-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>수정할 내용을 입력하세요.</p>
              <input
                type="text"
                placeholder="스터디 이름"
                value={studyName}
                onChange={(e) => setStudyName(e.target.value)}
              />
              <textarea
                placeholder="스터디 설명"
                value={studyDescription}
                onChange={(e) => setStudyDescription(e.target.value)}
              />
            </div>
          )
        }
        exitText="취소"
        buttonText={isPasswordConfirmed ? "수정 완료" : "확인"}
        handleButtonClick={isPasswordConfirmed ? handleEditSubmit : handlePasswordConfirm}
        onClose={onClose}
      />
      {isPasswordConfirmed && (
        <div className="modification-button-container">
      </div>
      )}
      {isToastVisible && <Toast toastContent={toastContent} />}
    </>
  );
}

export default EditPasswordAndEditModal;