// src/pages/StudyPage.js
import React, { useState } from "react";
import StudyItem from "../components/StudyItem";
import EditPasswordModal from "../components/EditPasswordModal";
import "../style/StudyEdit.css";

const StudyPage = () => {
  // 스터디 목록 초기 데이터 (수정가능!)
  const [studies, setStudies] = useState([
    { 
      id: 1, 
      name: "의 개발공장", 
      description: "Slow And Steady Wins The Race! 다들 오늘 하루도 파이팅 :)", 
      progress: "10일째 진행 중", 
      points: 50 
    },
    { 
      id: 2, 
      name: "의 UX 스터디", 
      description: "Slow And Steady Wins The Race!!", 
      progress: "62일째 진행 중", 
      points: 310 
    }
    // 추가 스터디 데이터를 여기에 더 추가해보기..
  ]);

  // 스터디 수정 함수
  const handleUpdateStudy = (updatedStudy) => {
    setStudies((prevStudies) =>
      prevStudies.map((study) =>
        study.id === updatedStudy.id ? updatedStudy : study
      )
    );
  };

  // 스터디 삭제 함수
  const handleDeleteStudy = (studyId) => {
    setStudies((prevStudies) => prevStudies.filter((study) => study.id !== studyId));
  };

  return (
    <div className="study-page">
      <h1>스터디 목록</h1>
      <div className="study-list">
        {studies.map((study) => (
          <StudyItem
            key={study.id}
            study={study}
            onUpdate={handleUpdateStudy}
            onDelete={handleDeleteStudy}
          />
        ))}
      </div>
    </div>
  );
};

export default StudyPage;
