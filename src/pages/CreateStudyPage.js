import React, { useState, useEffect } from "react";
import Gnb from "../components/commons/gnb/Gnb";
import { backgrounds } from "../mock";
import "../style/CreateStudyPage.css";

const CreateStudyPage = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    studyName: "",
    description: "",
    password: "",
    passwordConfirm: "",
  });

  const [touchedFields, setTouchedFields] = useState({
    studyName: false,
    password: false,
  });
  const [selectedBackground, setSelectedBackground] = useState(1);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleBackgroundSelect = (id) => {
    setSelectedBackground(id);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setTouchedFields((prev) => ({ ...prev, [id]: true }));
  };

  const isPasswordMismatch =
    touchedFields.password && formData.password !== formData.passwordConfirm;

  useEffect(() => {
    const { studyName, nickname, description, password, passwordConfirm } =
      formData;
    const isFormValid =
      studyName &&
      nickname &&
      description &&
      password &&
      password === passwordConfirm;
    setIsButtonEnabled(isFormValid);
  }, [
    formData.studyName,
    formData.nickname,
    formData.description,
    formData.password,
    formData.passwordConfirm,
  ]);

  return (
    <div className="create-study-container">
      <Gnb />
      <div className="create-study-page">
        <h1>스터디 만들기</h1>

        <form className="study-form">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            placeholder="닉네임을 입력해 주세요"
            value={formData.nickname}
            onChange={handleInputChange}
          />

          <label
            htmlFor="studyName"
            className={
              touchedFields.studyName && !formData.studyName
                ? "error-label"
                : ""
            }
          >
            스터디 이름
          </label>
          <input
            type="text"
            id="studyName"
            placeholder="스터디 이름을 입력해 주세요"
            value={formData.studyName}
            onChange={handleInputChange}
            className={
              touchedFields.studyName && !formData.studyName
                ? "error-input"
                : ""
            }
          />
          {touchedFields.studyName && !formData.studyName && (
            <p className="error-message">*스터디 이름을 입력해주세요</p>
          )}

          <label htmlFor="description">소개</label>
          <textarea
            id="description"
            placeholder="소개 멘트를 작성해 주세요"
            value={formData.description}
            onChange={handleInputChange}
          ></textarea>

          <label>배경을 선택해주세요</label>
          <div className="background-options">
            {backgrounds.map((bg) => (
              <div
                key={bg.id}
                className={`background-item ${
                  selectedBackground === bg.id ? "selected" : ""
                }`}
                style={{
                  backgroundColor:
                    bg.type === "color" ? bg.value : "transparent",
                  backgroundImage:
                    bg.type === "image" ? `url(${bg.value})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => handleBackgroundSelect(bg.id)}
              >
                {selectedBackground === bg.id && (
                  <img
                    src="/imgs/ic_bg_selected.png"
                    alt="선택된 배경"
                    className="selected-icon"
                  />
                )}
              </div>
            ))}
          </div>

          <label htmlFor="password">비밀번호</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              value={formData.password}
              onChange={handleInputChange}
            />
            <img
              src={
                showPassword
                  ? "/imgs/btn_visibility_on_24px.png"
                  : "/imgs/btn_visibility_off_24px.png"
              }
              alt="비밀번호 표시"
              className="visibility-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <label
            htmlFor="passwordConfirm"
            className={isPasswordMismatch ? "error-label" : ""}
          >
            비밀번호 확인
          </label>
          <div className="password-wrapper">
            <input
              type={showPasswordConfirm ? "text" : "password"}
              id="passwordConfirm"
              placeholder="비밀번호를 확인해 주세요"
              value={formData.passwordConfirm}
              onChange={handleInputChange}
              className={isPasswordMismatch ? "error-input" : ""}
            />
            <img
              src={
                showPasswordConfirm
                  ? "/imgs/btn_visibility_on_24px.png"
                  : "/imgs/btn_visibility_off_24px.png"
              }
              alt="비밀번호 표시"
              className="visibility-icon"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
            />
          </div>

          {isPasswordMismatch && (
            <p className="error-message">*비밀번호가 일치하지 않습니다</p>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={!isButtonEnabled}
          >
            만들기
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudyPage;
