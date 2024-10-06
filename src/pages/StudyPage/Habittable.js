import React, { useState } from "react";
import sticker_empty from "../../assets/imgs/sticker_empty.png";
import sticker_light_green_100_01 from "../../assets/imgs/sticker_light_green_100_01.png";
import { habitData } from "../../mock";
import "../../style/Habittable.css";

const days = ["월", "화", "수", "목", "금", "토", "일"];

const HabitTable = () => {
  const [CheckHabit, setCheckHabit] = useState(
    habitData.map(() => days.map(() => false))
  );

  const toggleCheck = (habitIndex, dayIndex) => {
    const updatedState = [...CheckHabit];
    updatedState[habitIndex][dayIndex] = !updatedState[habitIndex][dayIndex];
    setCheckHabit(updatedState);
  };

  return (
    <div className="habit-container">
      <h2 className="habit-title">습관 기록표</h2>
      <table className="habit-table">
        <thead>
          <tr>
            <th></th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habitData.map((habit, habitIndex) => (
            <tr key={habit.id}>
              <td>{habit.content}</td>
              {days.map((day, dayIndex) => (
                <td key={dayIndex}>
                  <img
                    src={
                      CheckHabit[habitIndex][dayIndex]
                        ? sticker_light_green_100_01
                        : sticker_empty
                    }
                    alt={
                      CheckHabit[habitIndex][dayIndex] ? "Checked" : "Unchecked"
                    }
                    onClick={() => toggleCheck(habitIndex, dayIndex)}
                    style={{ cursor: "pointer", width: "40px", height: "40px" }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitTable;
