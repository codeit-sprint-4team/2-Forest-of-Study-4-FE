import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./pages/testPage";
import StudyPage from "./pages/StudyPage/StudyPage";
import Modal from "./components/commons/modal/Modal";
import HabitPage from "./pages/HabitPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/habits" element={<HabitPage />} />
        <Route path="/" element={<Test />} />
        <Route path="/study" element={<StudyPage />} />
      </Routes>
    </Router>
  );
}
