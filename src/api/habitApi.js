const BASE_URL = "https://two-forest-of-study-4-be.onrender.com/habits";

// 습관 목록 가져오기 GET
export const fetchHabits = async (studyId) => {
  try {
    const response = await fetch(`${BASE_URL}?studyId=${studyId}`);
    return await response.json();
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};

// 습관 생성하기 POST
export const createHabit = async (habitName, studyId) => {
  try {
    const response = await fetch(`${BASE_URL}?studyId=${studyId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        habitName,
        studyId,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

// 습관 상태 업데이트 PATCH
export const updateHabitChecked = async (id, checked, studyId) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}?studyId=${studyId}`, {
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

// // 습관 목록 업데이트 PUT
// export const updateHabits = async (updatedHabits) => {
//   try {
//     const response = await fetch(`${BASE_URL}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ habits: updatedHabits }),
//     });
//     return await response.json();
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//   }
// };

// 습관 삭제하기 DELETE
export const deleteHabit = async (id, studyId) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}?studyId=${studyId}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};
