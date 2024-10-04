import React, { useState } from "react";
import './Modal.css';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setErrorMessage("");
  };


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleSubmit = async () => {
    try {
      const response = await fetch("어떤 주소가 있겠지요 아직은 없지만...", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("비밀번호가 맞습니다!");
        closeModal();
      } else {
        setErrorMessage(result.message || "비밀번호가 틀렸습니다.");
      }
    } catch (error) {
      console.error("에러 발생:", error);
      setErrorMessage("오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <button onClick={openModal}>모달을 여는 무언가</button>
      {isOpen && (
        <div className="modal">
          <div className="modalContent">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>비밀번호</h2>
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={handlePasswordChange}
            />
            <button onClick={handleSubmit}>수정하러 가기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;