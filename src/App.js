import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./pages/testPage";
import Modal from "./components/commons/modal/Modal";
import HabitPage from "./pages/HabitPage";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/habits" element={<HabitPage />} />
        <Route path="/" element={<Test />} />
        <Route path="/modal" element={<Modal />} />
      </Routes>
    </Router>
  );
}
