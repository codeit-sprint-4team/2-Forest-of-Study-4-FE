import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Modal from "./components/commons/modal/Modal";
import HabitPage from "./pages/HabitPage";
import TestPage from "./pages/testPage.js";
import StudyPage from "./pages/StudyPage";
import StudyDetail from "./pages/StudyDetail/StudyDetail.js";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/study-check" element={<StudyPage />} />
        <Route path="/habits" element={<HabitPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/modal" element={<Modal />} />
        <Route path="/study-detail" element={<StudyDetail />} />
      </Routes>
    </Router>
  );
}
