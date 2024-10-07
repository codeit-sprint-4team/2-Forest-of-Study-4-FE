import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HabitPage from "./pages/HabitPage";
import TestPage from "./pages/testPage.js";
import StudyPage from "./pages/StudyPage"; // 페이지 컴포넌트 가져오기

// src/App.js
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/study-check" element={<StudyPage />} />
        <Route path="/habits" element={<HabitPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
