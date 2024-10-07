import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Test from "./pages/testPage";
import Modal from "./components/commons/modal/Modal";
import HabitPage from "./pages/HabitPage";
import TestPage from "./pages/testPage.js";
import StudyPage from "./pages/StudyPage"; // 페이지 컴포넌트 가져오기
import StudyListPage from "./pages/StudyListPage"; //스터디 리스트 페이지
import CreateStudyPage from "./pages/CreateStudyPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/createStudy" element={<CreateStudyPage />} />
        <Route path="/habit" element={<HabitPage />} />
        <Route path="/study-check" element={<StudyPage />} />
        <Route path="/habits" element={<HabitPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/" element={<StudyListPage />} />
      </Routes>
    </Router>
  );
}
