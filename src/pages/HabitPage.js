import React, { useState, useEffect, Fragment } from "react";
import Header from "../components/commons/header/Header";
import "../style/habit.css";
import { habitData } from "../mock";

function HabitPage() {
  const [todayTime, setTodayTime] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [habits, setHabits] = useState(habitData);

  //현재 시간 표시
  useEffect(() => {
    const updateTime = () => {
      const todayTime = new Date();
      const minuteSecond = todayTime.toLocaleTimeString("ko-KR", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const formattedDate = `${todayTime.getFullYear()}-${todayTime.getMonth()}-${todayTime.getDate()} ${minuteSecond}`;
      setTodayTime(formattedDate);
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  //예시 모달
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
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
                <div>
                  {habits.map((habit) => (
                    <div
                      key={habit.id}
                      className={`habitItem ${habit.checked ? "checked" : ""}`}
                    >
                      {habit.content}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* 예시모달창 */}
        {modalOpen && (
          <div>
            <p>list</p>
            <button onClick={toggleModal}>취소</button>
          </div>
        )}
      </div>
    </>
  );
}

export default HabitPage;
