import React, { useState, useEffect, Fragment } from "react";
import Header from "../components/commons/header/Header";
import "../style/habit.css";

function HabitPage() {
  const [todayTime, setTodayTime] = useState("");

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

  return (
    <Fragment>
      <div className="habit">
        <div className="habitOutside">
          <div>
            <Header
              title="title"
              buttonTo1="/"
              buttonTo2="/"
              buttonTitle1="오늘의 집중"
              buttonTitle2="홈"
            />
          </div>
          <div>
            <p className="timeTitle">현재 시간</p>
            <div className="timeDisplay">{todayTime}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HabitPage;
