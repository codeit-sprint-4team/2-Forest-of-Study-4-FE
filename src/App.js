import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./pages/test";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </Router>
  );
}
