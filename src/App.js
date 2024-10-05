import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./pages/test";
import Modal from "./components/commons/modal/Modal";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/modal" element={<Modal
  title="비밀번호"
  exittext="나가기"
  content="모달 내용입니다."
  buttontext="수정하러 가기"
  handleButtonClick="aa"
/>} />
      </Routes>
    </Router>
  );
}
