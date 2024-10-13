import React, { useState } from "react";
import EditPasswordModal from "../../components/commons/study/EditPasswordModal";  // 비밀번호 확인+스터디 수정 모달
import StudyShareModal from "../../components/commons/study/StudyShareModal"; // 스터디 공유 모달
import StudyDeleteModal from "../../components/commons/study/StudyDeleteModal"; // 스터디 삭제 모달
import Toast from "../../components/commons/toast/Toast";  // 공용 토스트
import "../../style/StudyActions.css";  // 필요한 스타일

const StudyDashboard = ({ study }) => {
  const [activeModal, setActiveModal] = useState(""); // 하나의 상태로 모달 관리
  const [isToastVisible, setToastVisible] = useState(false);
  const [toastContent, setToastContent] = useState("");

  // 토스트 메시지 표시 함수
  const showToast = (message) => {
    setToastContent(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000); // 3초 후 숨김
  };
  
  // 수정 버튼 
  const handleEditClick = () => setEditModalOpen(true);

  // 공유 버튼 
  const handleShareClick = () => setShareModalOpen(true);

  // 삭제 버튼
  const handleDeleteClick = () => setDeleteModalOpen(true);

  const handleDeleteConfirm = () => {
    showToast("스터디가 삭제되었습니다.");
    setDeleteModalOpen(false);
  };

  const handleCopyComplete = () => {
    showToast("📋 스터디가 복사되었습니다!");
    setShareModalOpen(false);
  };

  return (
<div className="study-dashboard">
      <div className="study-item">
        <h3>{study.name}</h3>
        <p>{study.description}</p>

        {/* 버튼 순서 유지: 공유하기 | 수정하기 | 삭제하기 */}
        <div className="study-actions">
          <button className="share-button" onClick={handleShareClick}>
            공유하기
          </button>
          <button className="edit-button" onClick={handleEditClick}>
            수정하기
          </button>
          <button className="delete-button" onClick={handleDeleteClick}>
            스터디 삭제하기
          </button>
        </div>
      </div>


      {/* 수정 모달 */}
      {isEditModalOpen && (
        <StudyEditModal
          study={study}
          onClose={() => setEditModalOpen(false)}
        />
      )}

      {/* 비밀번호 확인 모달 */}
      {isDeleteModalOpen && (
        <EditPasswordModal
          studyName={study.name}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handlePasswordConfirm}  // 비밀번호 확인 로직 추가
        />
      )}

      {/* 공유 완료 및 비밀번호 오류 토스트 */}
      {isShareModalOpen && (
        <StudyShareModal
          studyUrl={'https://example.com/study/&{study.id}'} // 스터디 url 전달
          onClose={() => setShareModalOpen(false)}  // 모달 닫기
          onCopy={handleCopyComplete}  // 복사 완료 }
          />
      )}
    </div>
  );
};

export default StudyDashboard;
