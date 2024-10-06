import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./pages/test";
import StudyPage from "./pages/StudyPage/StudyPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/study" element={<StudyPage />} />
      </Routes>
    </Router>
  );
}
