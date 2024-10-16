import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Modal from "./components/commons/modal/Modal";
import HabitPage from "./pages/HabitPage";
import TestPage from "./pages/testPage.js";
import StudyDetail from "./pages/StudyDetail/StudyDetail.js";
import StudyListPage from "./pages/StudyListPage"; //스터디 리스트 페이지
import CreateStudyPage from "./pages/CreateStudyPage";
import Timer from "./pages/Timer.js";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/createStudy" element={<CreateStudyPage />} />
        <Route path="/habits" element={<HabitPage />} />
        <Route path="/habits" element={<HabitPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/study-detail" element={<StudyDetail />} />
        <Route path="/" element={<StudyListPage />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </Router>
  );
}
