import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./pages/test";
import HabitTable from "./pages/Habittable";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/habittable" element={<HabitTable />} />
      </Routes>
    </Router>
  );
}
