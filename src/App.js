import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HabitPage from "./pages/HabitPage";
import TestPage from "./pages/testPage.js";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/habit" element={<HabitPage />} />
        <Route path="/" element={<TestPage />} />
      </Routes>
    </Router>
  );
}
