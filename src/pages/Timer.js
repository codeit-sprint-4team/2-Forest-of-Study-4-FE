import React, { useState, useEffect } from 'react';
import Header from "../components/commons/header/Header";
import Gnb from "../components/commons/gnb/Gnb";
import "../style/Timer.css";
import Toast from "../components/commons/toast/Toast";

const Timer = () => {
  const defaultTime = 1500; // 기본값 25분 (1500초)
  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputTime, setInputTime] = useState("25:00");
  const [timerStarted, setTimerStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isOvertime, setIsOvertime] = useState(false);
  const [overtime, setOvertime] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(310); // 예시로 초기 포인트 설정
  const [showToast, setShowToast] = useState(false);
  const [toastContent, setToastContent] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(prevTime => prevTime - 1);
        } else {
          setIsOvertime(true);
          setOvertime(prev => prev + 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (!timerStarted && !isRunning && !isEditing) {
      const [minutes, seconds] = inputTime.split(":").map(Number);
      setTimeLeft(minutes * 60 + (seconds || 0));
      setOvertime(0);
    }
  }, [inputTime]);

  const startTimer = () => {
    if (isPaused) {
      setIsRunning(true);
    } else {
      setTimeLeft(inputTimeToSeconds(inputTime));
      setIsRunning(true);
    }
    setTimerStarted(true);
    setIsPaused(false);
    setIsOvertime(false);
    setOvertime(0);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setIsPaused(true);
    setToastContent("집중이 중단되었습니다.");
    setToastType("toast-error");
    setShowToast(true);
    hideToastAfterDelay();
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(defaultTime);
    setInputTime("25:00");
    setTimerStarted(false);
    setIsPaused(false);
    setIsOvertime(false);
    setOvertime(0);
  };

  const stopTimer = () => {
    if (timeLeft <= 0) {
      // 시간이 다 지나거나 초과된 경우
      const earnedPoints = 3 + Math.floor(overtime / 600);
      setCurrentPoints(prev => prev + earnedPoints); // 포인트 업데이트
      setToastContent(`${earnedPoints} 포인트를 획득하였습니다.`);
      setToastType("toast-success");
    } else {
      // 중간에 정지한 경우
      setToastContent("집중이 중단되었습니다.");
      setToastType("toast-error");
    }
    setShowToast(true);
    hideToastAfterDelay();
    resetTimer();
  };

  const hideToastAfterDelay = () => {
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // 3초 후 토스트 숨기기
  };

  const inputTimeToSeconds = (time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + (seconds || 0);
  };

  const handleTimeClick = () => {
    setIsEditing(true);
    setIsRunning(false);
  };

  const handleInputBlur = () => {
    const seconds = inputTimeToSeconds(inputTime);
    setTimeLeft(seconds);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setInputTime(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const seconds = inputTimeToSeconds(inputTime);
      setTimeLeft(seconds);
      setIsEditing(false);
    }
  };

  return (
    <div className="timer-page">
      <Gnb /> {/* GNB를 상단에 추가 */}
      <div className="timer-wrapper">
        <div className="timer-container">
          <div className="header-wrapper">
            <Header title="title" buttonTitle1="오늘의 습관" buttonTitle2="홈" buttonTo1="/habits" buttonTo2="/" />
          </div>
          <div className="points-display">
            <span>현재까지 획득한 포인트</span>
            <div className="points-value">{currentPoints}P 획득</div>
          </div>
          <div className="timer-content">
            {isEditing ? (
              <input
                type="text"
                value={inputTime}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onBlur={handleInputBlur}
                autoFocus
                className="timer-input"
              />
            ) : (
              <h2
                onClick={handleTimeClick}
                className={`timer-display ${isOvertime ? 'overtime' : timerStarted ? 'running' : ''}`}
              >
                {isOvertime
                  ? `-${Math.floor(overtime / 60)}:${overtime % 60 < 10 ? `0${overtime % 60}` : overtime % 60}`
                  : `${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}`}
              </h2>
            )}

            {isOvertime ? (
              <button onClick={stopTimer} className="timer-button stop-button">
                Stop!
              </button>
            ) : (
              <div className="button-container">
                {timerStarted && (
                  <button onClick={pauseTimer} disabled={isPaused} className={`timer-button ${isPaused ? 'disabled' : ''}`}>
                    Pause
                  </button>
                )}

                <button onClick={startTimer} disabled={!isPaused && timerStarted} className={`timer-button ${!isPaused && timerStarted ? 'disabled' : ''}`}>
                  Start!
                </button>

                {timerStarted && (
                  <button onClick={resetTimer} className="timer-button">
                    Reset
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="scroll-container">
        <div className="scroll-content">
          {/* 필요한 추가 콘텐츠가 있을 경우 여기에 추가 */}
        </div>
      </div>
      {showToast && <Toast toastContent={toastContent} type={toastType} />}
    </div>
  );
};

export default Timer;