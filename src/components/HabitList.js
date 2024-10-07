import React, { useState, useEffect } from "react";
import { fetchHabits, updateHabitChecked } from "../api/habitApi";
import "../style/habitModal.css";

export function HabitList() {
  const [habits, setHabits] = useState([]);
  const [habitItems, setHabitItems] = useState([]);
  const [showInput, setShowInput] = useState(false); // 입력창 표시 여부
  const [newHabit, setNewHabit] = useState(""); // 새로운 항목 입력값 관리

  // 백엔드에서 습관 데이터 가져오기
  useEffect(() => {
    const loadHabits = async () => {
      const data = await fetchHabits();
      setHabits(data);
    };

    loadHabits();
  }, []);

  // 입력창 보이기
  const handleAddHabitClick = () => {
    setShowInput(true);
  };

  // 입력값 저장 함수
  const handleInputChange = (e) => {
    setNewHabit(e.target.value);
  };

  // 엔터키로 저장
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newHabit.trim() !== "") {
      setHabitItems([...habitItems, { habitName: newHabit }]);
      setNewHabit("");
      setShowInput(false);
    }
  };

  return (
    <div className="habitModal">
      <div className="habitItemContainer">
        {habits.map((habit) => (
          <div className="rowHabit" key={habit.id}>
            <div className={`habitItem ${habit.checked ? "checked" : ""}`}>
              {habit.habitName}
            </div>
            <button className="deleteIcon">
              <img
                className="deleteIconImg"
                src="/imgs/deleteIcon.png"
                alt="deleteIcon"
              ></img>
            </button>
          </div>
        ))}
        {showInput && (
          <div className="habitInputContainer">
            <input
              type="text"
              value={newHabit}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder=""
              className="habitInput"
            />
            <button className="deleteIcon">
              <img
                className="deleteIconImg"
                src="/imgs/deleteIcon.png"
                alt="deleteIcon"
              ></img>
            </button>
          </div>
        )}
        <button className="addHabitButton" onClick={handleAddHabitClick}>
          <span className="plus">+</span>
        </button>
      </div>
    </div>
  );
}
