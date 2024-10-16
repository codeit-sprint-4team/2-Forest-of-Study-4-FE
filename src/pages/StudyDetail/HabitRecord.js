import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import sticker_empty from '../../assets/imgs/sticker_empty.png';
import sticker_light_green_100_01 from '../../assets/imgs/sticker_light_green_100_01.png';
import '../../style/HabitRecord.css';

const HabitTable = () => {
  const [habits, setHabits] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const studyId = queryParams.get('studyId');

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await fetch(`https://two-forest-of-study-4-be.onrender.com/habits?studyId=${studyId}`);
        const data = await response.json();
        setHabits(data);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };

    const fetchCompletedHabits = async () => {
      try {
        const response = await fetch(`https://two-forest-of-study-4-be.onrender.com/records/completedHabits?studyId=${studyId}`);
        const data = await response.json();
        setCompletedHabits(data);
      } catch (error) {
        console.error('Error fetching completed habits:', error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await fetchHabits();
      await fetchCompletedHabits();
      setLoading(false);
    };

    if (studyId) {
      fetchData();
    }
  }, [studyId]);

  const isHabitCompleted = (habitId, day) => {
    return completedHabits.some(completed => {
      const completedDate = new Date(completed.completeDate);
      return completed.habitId === habitId && completedDate.getDay() === day;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="habitContainer">
      <h2 className="habitTitle">습관 기록표</h2>
      <table className="habitTable">
        <thead>
          <tr>
            <th></th>
            {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map(habit => (
            <tr key={habit.id}>
              <td>{habit.habitName}</td>
              {[0, 1, 2, 3, 4, 5, 6].map(day => (
                <td key={day}>
                  <img 
                    src={isHabitCompleted(habit.id, day) ? sticker_light_green_100_01 : sticker_empty} 
                    alt="스티커 이미지" 
                    width="30" 
                    height="30" 
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