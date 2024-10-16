const completeFocusSession = async (studyTime) => {
  try {
    // 로그인된 사용자 ID를 로컬 스토리지나 세션에서 가져오기
    const userId = localStorage.getItem('userId'); // 로컬 스토리지에 저장된 userId 가져오기

    if (!userId) {
      console.error('로그인된 사용자 ID를 찾을 수 없습니다.');
      return;
    }

    // 포스트 요청으로 공부 완료 정보 전송
    const response = await fetch('http://localhost:3000/timer/success', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        studyTime: studyTime, // 분 단위 공부 시간
      }),
    });

    // 응답 처리
    if (!response.ok) {
      throw new Error('포인트 업데이트 실패');
    }

    const data = await response.json();
    console.log('포인트 업데이트 성공:', data);
  } catch (error) {
    console.error('포인트 업데이트 실패:', error);
  }
};

