import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HabitPage from "./pages/HabitPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/habit" element={<HabitPage />} />
      </Routes>
    </Router>
  );
}
