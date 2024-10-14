import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/commons/header/Header";
import Gnb from "../components/commons/gnb/Gnb";
import "../style/habit.css";
import { fetchHabits, updateHabitChecked, updateHabits } from "../api/habitApi";
import HabitModal from "../components/commons/modal/HabitModal";

function HabitPage() {
  const [todayTime, setTodayTime] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const habitsRef = useRef(habits);

  useEffect(() => {
    habitsRef.current = habits;
  }, [habits]);

  // URL에서 studyId 가져오기
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studyId = searchParams.get("studyId");

  // 현재 시간 표시
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
      setLoading(true);
      const data = await fetchHabits(studyId);

      if (!data || !Array.isArray(data)) {
        setHabits([]); // 데이터가 없으면 빈 배열 설정
        setLoading(false);
        return;
      }

      // habit의 createdAt과 updatedAt을 한국 시간으로 변환
      const convertedData = data.map((habit) => {
        const convertedCreatedAt = new Date(
          new Date(habit.createdAt).getTime() + 9 * 60 * 60 * 1000
        ).toISOString();
        const convertedUpdatedAt = new Date(
          new Date(habit.updatedAt).getTime() + 9 * 60 * 60 * 1000
        ).toISOString();

        return {
          ...habit,
          createdAt: convertedCreatedAt,
          updatedAt: convertedUpdatedAt,
        };
      });
      // 변환된 데이터를 setHabits에 저장
      setHabits(convertedData);
      setLoading(false);
    };

    loadHabits();
  }, []);

  // 모달 열기/닫기
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // checked 상태 변경
  const handleHabitClick = async (id, checked) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, checked: !habit.checked } : habit
      )
    );
    await updateHabitChecked(id, !checked, studyId);
  };

  // 자정에 checked 상태 false로 변경
  function scheduleHabitResetAtMidnight() {
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );
    // const timeUntilMidnight = 10 * 1000; // 10초 후 테스트용
    const timeUntilMidnight = nextMidnight - now; // 실제 자정 기준
    setTimeout(async () => {
      const updatedHabits = habits.map((habit) => ({
        ...habit,
        checked: false,
      }));
      setHabits(updatedHabits);
      for (const habit of updatedHabits) {
        await updateHabitChecked(habit.id, false, habit.studyId);
      }
      scheduleHabitResetAtMidnight();
    }, timeUntilMidnight);
  }
  useEffect(() => {
    scheduleHabitResetAtMidnight();
  }, []);

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
              {loading ? (
                <div className="loading">로딩 중...</div> // 로딩 중일 때 표시
              ) : habits.length === 0 ? (
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
          <HabitModal
            title="목록 수정"
            handleCloseClick={() => setModalOpen(!modalOpen)}
            handleCloseModal={toggleModal}
            habits={habits}
            setHabits={setHabits}
          />
        )}
      </div>
    </>
  );
}

export default HabitPage;
