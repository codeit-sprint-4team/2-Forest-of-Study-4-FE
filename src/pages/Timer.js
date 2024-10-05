import React, { useState, useEffect } from 'react';

const Timer = () => {
  const defaultTime = 1500; // 기본값 25분 (1500초)
  const [timeLeft, setTimeLeft] = useState(defaultTime); // 타이머 시간
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 시간을 편집 중인지 여부
  const [inputTime, setInputTime] = useState("25:00"); // 사용자 입력 시간
  const [timerStarted, setTimerStarted] = useState(false); // 타이머가 시작되었는지 여부
  const [isPaused, setIsPaused] = useState(false); // 타이머가 일시정지되었는지 여부
  const [isOvertime, setIsOvertime] = useState(false); // 시간 초과 여부

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      
      // 타이머가 0에 도달하면 초과 상태로 변경하고, 계속 진행되도록 설정
      if (timeLeft <= 0) {
        setIsOvertime(true); // 시간 초과 상태로 변경
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // 시간을 바로 반영하고, 타이머가 시작되지 않았다면 UI에도 즉시 업데이트
  useEffect(() => {
    if (!timerStarted && !isRunning && !isEditing) {
      const [minutes, seconds] = inputTime.split(":").map(Number);
      setTimeLeft(minutes * 60 + (seconds || 0)); // 시간을 초로 변환해서 설정
    }
  }, [inputTime]);

  const startTimer = () => {
    if (isPaused) {
      setIsRunning(true); // 일시 정지된 타이머 다시 시작
    } else {
      setTimeLeft(inputTimeToSeconds(inputTime)); // 새로 시작할 때 시간을 설정
      setIsRunning(true);
    }
    setTimerStarted(true);  // 타이머 시작됨을 표시
    setIsPaused(false);     // 일시 정지 상태 해제
    setIsOvertime(false);   // 초과 상태 해제
  };

  const pauseTimer = () => {
    setIsRunning(false); // 타이머 일시 정지
    setIsPaused(true);    // 일시 정지 상태로 설정
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(defaultTime); // 기본값으로 리셋 (25분)
    setInputTime("25:00"); // 입력 시간도 기본값으로 리셋
    setTimerStarted(false); // 타이머가 다시 리셋되면 시작 상태가 아님
    setIsPaused(false);     // 일시 정지 상태 해제
    setIsOvertime(false);   // 초과 상태 해제
  };

  const stopTimer = () => {
    resetTimer(); // 타이머를 리셋하고 초기 상태로 되돌림
  };

  const inputTimeToSeconds = (time) => {
    const [minutes, seconds] = time.split(":").map(Number);
    return minutes * 60 + (seconds || 0);
  };

  const handleTimeClick = () => {
    setIsEditing(true); // 시간을 편집 상태로 변경
    setIsRunning(false); // 시간을 편집하는 동안에는 타이머가 작동하지 않음
  };

  const handleInputChange = (e) => {
    setInputTime(e.target.value); // 입력된 값을 업데이트
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const seconds = inputTimeToSeconds(inputTime);
      setTimeLeft(seconds); // 시간을 초로 변환해서 설정
      setIsEditing(false); // 편집 모드 종료
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {/* 타이머 시간 표시 또는 입력 필드 */}
      {isEditing ? (
        <input
          type="text"
          value={inputTime}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}  // onKeyDown 이벤트 사용
          onBlur={() => setIsEditing(false)} // 입력 필드 밖을 클릭하면 편집 모드 종료
          autoFocus
          style={{ fontSize: '48px', textAlign: 'center', width: '150px' }} // 타이머 입력 필드 스타일
        />
      ) : (
        <h2 
          onClick={handleTimeClick} 
          style={{ 
            color: isOvertime ? '#818181' : (timerStarted ? 'red' : 'black'), // 시간 초과 시 색상 변경
            fontSize: '48px', 
            cursor: 'pointer', 
            marginBottom: '20px', 
            textAlign: 'center' 
          }}
        >
          {isOvertime && timeLeft < 0 
            ? `-${Math.abs(Math.floor(timeLeft / 60))}:${Math.abs(timeLeft % 60) < 10 ? `0${Math.abs(timeLeft % 60)}` : Math.abs(timeLeft % 60)}` 
            : `${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}`
          }
        </h2>
      )}

      {/* 시간 초과 시 Stop 버튼만 표시 */}
      {isOvertime && timeLeft < 0 ? (
        <button 
          onClick={stopTimer} 
          style={{
            backgroundColor: '#A3C182', 
            color: 'white', 
            padding: '10px 20px', 
            fontSize: '16px', 
            borderRadius: '10px'
          }}
        >
          Stop!
        </button>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
          {/* Pause 버튼 */}
          {timerStarted && (
            <button 
              onClick={pauseTimer} 
              disabled={isPaused}  // 일시 정지 중일 때 비활성화
              style={{
                backgroundColor: isPaused ? '#818181' : '#6E9A52', // 일시 정지 시 색상 변경
                color: 'white', 
                padding: '10px 20px', 
                fontSize: '16px', 
                borderRadius: '10px',
                cursor: isPaused ? 'not-allowed' : 'pointer' // 비활성화 시 커서 변경
              }}
            >
              Pause
            </button>
          )}

          {/* Start 버튼 - 타이머 시작 후 비활성화 상태로 유지 */}
          <button 
            onClick={startTimer} 
            disabled={!isPaused && timerStarted}  // 타이머 시작 중이거나 정지 상태가 아닐 때 비활성화
            style={{
              backgroundColor: (!isPaused && timerStarted) ? '#818181' : '#A3C182',  // 비활성화 시 색상 변경
              color: 'white', 
              padding: '10px 20px', 
              fontSize: '16px', 
              borderRadius: '10px',
              cursor: (!isPaused && timerStarted) ? 'not-allowed' : 'pointer' // 비활성화 시 커서 변경
            }}
          >
            Start!
          </button>

          {/* Reset 버튼 */}
          {timerStarted && (
            <button 
              onClick={resetTimer} 
              style={{
                backgroundColor: '#A3C182', 
                color: 'white', 
                padding: '10px 20px', 
                fontSize: '16px', 
                borderRadius: '10px'
              }}
            >
              Reset
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Timer;

