import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HabitPage from "./pages/HabitPage";
import StudyListPage from "./pages/StudyListPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/habit" element={<HabitPage />} />
        <Route path="/" element={<StudyListPage />} />
      </Routes>
    </Router>
  );
}
