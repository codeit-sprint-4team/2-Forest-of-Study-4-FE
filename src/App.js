import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Timer from './pages/Timer'; 

export default function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Timer />} />
      </Routes>
    </Router>
  );
}
