const BASE_URL = "https://two-forest-of-study-4-be.onrender.com/habits";

// 습관 목록 가져오기 GET
export const fetchHabits = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    if (!response.ok) {
      throw new Error("에러가 발생했습니다.");
    }
    return await response.json();
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};
