import React, { useState, useEffect, Fragment } from "react";
import Header from "../components/commons/header/Header";
import Gnb from "../components/commons/gnb/Gnb";
import Modal from "../components/commons/modal/Modal";
import "../style/habit.css";
// import { habitData } from "../mock";
import { fetchHabits, updateHabitChecked } from "../api/habitApi";

function HabitPage() {
  const [todayTime, setTodayTime] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [habits, setHabits] = useState([]);

  //현재 시간 표시
  useEffect(() => {
    const updateTime = () => {
      const todayTime = new Date();
      const minuteSecond = todayTime.toLocaleTimeString("ko-KR", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const formattedDate = `${todayTime.getFullYear()}-${
        todayTime.getMonth() + 1
      }-${todayTime.getDate()} ${minuteSecond}`;
      setTodayTime(formattedDate);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // 백엔드에서 습관 데이터 가져오기
  useEffect(() => {
    const loadHabits = async () => {
      const data = await fetchHabits();
      setHabits(data);
    };

    loadHabits();
  }, []);

  //예시 모달
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  //checked
  const handleHabitClick = async (id, checked) => {
    const updatedHabit = await updateHabitChecked(id, !checked);
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, checked: updatedHabit.checked } : habit
      )
    );
  };

  return (
    <>
      <Gnb />
      <div className="habit">
        <div className="habitOutside">
          <Header
            title="title"
            buttonTo1="/"
            buttonTo2="/"
            buttonTitle1="오늘의 집중"
            buttonTitle2="홈"
          />
          <div>
            <p className="timeTitle">현재 시간</p>
            <div className="timeDisplay">{todayTime}</div>
          </div>
          <div className="habitInside">
            <div className="habitTop">
              <div className="habitTitle">오늘의 습관</div>
              <div onClick={toggleModal} className="habitListChange">
                목록수정
              </div>
            </div>
            <div className="habitList">
              {habits.length === 0 ? (
                <div className="noneHabitList">
                  <p>
                    아직 습관이 없어요
                    <br />
                    목록 수정을 눌러 습관을 생성해보세요
                  </p>
                </div>
              ) : (
                <div className="habitItemContainer">
                  {habits.map((habit) => (
                    <div
                      key={habit.id}
                      className={`habitItem ${habit.checked ? "checked" : ""}`}
                      onClick={() => handleHabitClick(habit.id, habit.checked)}
                    >
                      {habit.habitName}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {modalOpen && (
          <Modal
            title="목록 수정"
            modalContent="모달 내용"
            exitText="취소"
            buttonText="수정 완료"
            handleButtonClick={toggleModal}
          />
        )}
      </div>
    </>
  );
}

export default HabitPage;
