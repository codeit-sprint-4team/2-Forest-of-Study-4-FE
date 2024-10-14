import React, { useState } from "react";
import EditPasswordModal from "../../components/commons/study/EditPasswordModal"; // 비밀번호 확인+스터디 수정 모달
import StudyShareModal from "../../components/commons/study/StudyShareModal"; // 스터디 공유 모달
import StudyDeleteModal from "../../components/commons/study/StudyDeleteModal"; // 스터디 삭제 모달
import CommonToast from "../../components/commons/toast/CommonToast"; // 스터디 토스트 


import "../../style/StudyDashboard.css";

const StudyDashboard = ({ study, studyId }) => {
  const [activeModal, setActiveModal] = useState(""); // 하나의 상태로 모달 관리
  const [toastInfo, setToastInfo] = useState();

  // 토스트 메시지 표시 함수
  const showToast = (message, type) => {
    setToastInfo({ message, type });
    setTimeout(() => setToastInfo(), 3000); // 3초 후 숨김
  };

  const handleCloseModal = () => setActiveModal("");

  const handleEditConfirm = (updatedName, updatedDescription) => {
    showToast("스터디 정보가 수정되었습니다.", "toast-success");
    handleCloseModal();
  };

  const handleDeleteConfirm = () => {
    showToast("스터디가 삭제되었습니다.", "toast-success");
    handleCloseModal();
  };

  const handleCopyComplete = () => {
    showToast("스터디가 복사되었습니다!", "toast-success");
    handleCloseModal();
  };

  return (
    <div className="study-dashboard">
      <div className="study-item">
        {/* 버튼 순서 유지: 공유하기 | 수정하기 | 삭제하기 */}
        <div className="study-actions">
          <button
            className="share-button"
            onClick={() => setActiveModal("share")}
          >
            공유하기
          </button>
          <div className="divider">|</div>
          <button
            className="edit-button"
            onClick={() => setActiveModal("edit")}
          >
            수정하기
          </button>
          <div className="divider">|</div>
          <button
            className="delete-button"
            onClick={() => setActiveModal("delete")}
          >
            스터디 삭제하기
          </button>
        </div>
      </div>

      {activeModal === "edit" && (
        <EditPasswordModal
          study={study}
          onClose={handleCloseModal}
          onConfirm={handleEditConfirm}
        />
      )}

      {activeModal === "delete" && (
        <StudyDeleteModal
          studyName={study.name}
          onClose={handleCloseModal}
          onDelete={handleDeleteConfirm}
        />
      )}

      {activeModal === "share" && (
        <StudyShareModal
          studyUrl={`https://example.com/study/${studyId}`}
          onClose={handleCloseModal}
          onSubmit={handleCopyComplete}
        />
      )}

      {toastInfo && (
        <CommonToast toastContent={toastInfo.message} type={toastInfo.type} />
      )}
    </div>
  );
};

export default StudyDashboard;

// 클립보드 복사 함수
const copyClipBoard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    console.log("복사에 실패하였습니다");
  }
};
