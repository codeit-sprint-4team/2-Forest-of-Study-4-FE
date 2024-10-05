import React from "react";
import ReactDOM from "react-dom/client"; // 새로운 import 경로
import "./index.css";
import App from "./App";

// 기존 ReactDOM.render() 대신 ReactDOM.createRoot() 사용
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
