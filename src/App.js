import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./pages/test";
import Modal from "./components/commons/modal/Modal";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/modal" element={<Modal />} />
      </Routes>
    </Router>
  );
}
