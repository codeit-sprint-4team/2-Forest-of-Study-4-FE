import React, { useState, useEffect } from "react";
import sticker_empty from "../../assets/imgs/sticker_empty.png";
import sticker_light_green_100_01 from "../../assets/imgs/sticker_light_green_100_01.png";
import "../../style/habittable.css";

const getCurrentWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(date);
  }

  return dates;
};

const days = ["월", "화", "수", "목", "금", "토", "일"];

const HabitTable = () => {
  const [completedHabits, setCompletedHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentWeekDates = getCurrentWeekDates();

  const CompletedHabitsForWeek = async () => {
    try {
      const response = await fetch("웹주소가 있겠지요");
      const data = await response.json();
      setCompletedHabits(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching completed habits:", error);
      setLoading(false);
    }
  };

  const habitCompleted = (habitId, date) => {
    return completedHabits.some((completed) => {
      const completedDate = new Date(completed.completeDate);
      return (
        completed.habitId === habitId &&
        completedDate.toDateString() === date.toDateString()
      );
    });
  };

  useEffect(() => {
    CompletedHabitsForWeek();
  }, []);

  return (
    <div className="habitContainer">
      <h2 className="habitTitle">습관 기록표</h2>
      <table className="habitTable">
        <thead>
          <tr>
            <th></th>
            {days.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {completedHabits.map((habit) => (
            <tr key={habit.habit.id}>
              <td>{habit.habit.habitName}</td>
              {currentWeekDates.map((date, index) => (
                <td key={index}>
                  {habitCompleted(habit.habitId, date)
                    ? sticker_empty
                    : sticker_light_green_100_01}
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
