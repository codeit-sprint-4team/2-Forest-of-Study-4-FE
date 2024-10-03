import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./pages/test";
import Timer from './pages/Timer'; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </Router>
  );
}
