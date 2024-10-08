import React, { useState, useEffect } from "react";
import {
  fetchHabits,
  createHabit,
  deleteHabit,
  updateHabits,
} from "../api/habitApi";
import "../style/Modal.css";
import "../style/habitModal.css";

export function HabitList({ habits, setHabits, onClose }) {
  const [showInput, setShowInput] = useState(false);
  const [newHabit, setNewHabit] = useState("");
  const [templateHabits, setTemplateHabits] = useState(habits);
  const [originalHabits] = useState(habits);

  // 입력창 보이기
  const handleAddHabitClick = () => {
    setShowInput(true);
  };

  // 입력값 저장 함수
  const handleInputChange = (e) => {
    setNewHabit(e.target.value);
  };

  // 엔터키로 저장 (API 호출 없이 templateHabits에만 추가)
  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && newHabit.trim() !== "") {
      const newHabitData = {
        id: Date.now().toString(),
        habitName: newHabit,
        checked: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }; // 임시 ID 사용
      setTemplateHabits([...templateHabits, newHabitData]);
      setNewHabit("");
      setShowInput(false);
    }
  };

  // 수정 완료 버튼을 눌렀을 때 실행되는 함수
  const handleSaveHabit = async () => {
    const addedHabits = templateHabits.filter(
      (habit) => !originalHabits.some((oHabit) => oHabit.id === habit.id)
    );
    for (let habit of addedHabits) {
      await createHabit({ habitName: habit.habitName });
    }

    const deletedHabits = originalHabits.filter(
      (habit) => !templateHabits.some((tHabit) => tHabit.id === habit.id)
    );
    for (let habit of deletedHabits) {
      await deleteHabit(habit.id);
    }

    const newData = await fetchHabits();

    setHabits(newData);
    onClose();
  };

  const handleDeleteHabit = (id) => {
    setTemplateHabits(templateHabits.filter((habit) => habit.id !== id));
  };

  return (
    <div>
      <div className="habitModal">
        <div className="habitModalItems">
          {templateHabits.map((habit) => (
            <div className="rowHabit" key={habit.id}>
              <div className={`habitItem ${habit.checked ? "checked" : ""}`}>
                {habit.habitName}
              </div>
              <button
                className="deleteIcon"
                onClick={() => handleDeleteHabit(habit.id)}
              >
                <img
                  className="deleteIconImg"
                  src="/imgs/deleteIcon.png"
                  alt="deleteIcon"
                />
              </button>
            </div>
          ))}
          {showInput && (
            <div className="habitInputContainer">
              <input
                type="text"
                value={newHabit}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder=""
                className="habitInput"
              />
              <button className="deleteIcon">
                <img
                  className="deleteIconImg"
                  src="/imgs/deleteIcon.png"
                  alt="deleteIcon"
                />
              </button>
            </div>
          )}
          <button className="addHabitButton" onClick={handleAddHabitClick}>
            <span className="plus">+</span>
          </button>
        </div>
        <div className="modalButton">
          <button className="modalClose" onClick={onClose}>
            취소
          </button>
          <button className="submitButton" onClick={handleSaveHabit}>
            수정 완료
          </button>
        </div>
      </div>
    </div>
  );
}
