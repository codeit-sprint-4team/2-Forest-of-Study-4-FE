const BASE_URL = "https://two-forest-of-study-4-be.onrender.com/habits";

// 습관 목록 가져오기 GET
export const fetchHabits = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    return await response.json();
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};

// 습관 상태 업데이트 PATCH
export const updateHabitChecked = async (id, checked) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked }),
    });
    return await response.json();
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};
