const BASE_URL = "https://two-forest-of-study-4-be.onrender.com/studies";

// 스터디 가져오기 GET
export const fetchStudy = async (studyId) => {
  try {
    // const response = await fetch(`${BASE_URL}?studyId=${studyId}`);
    // return await response.json();
    return {
      name: "연우",
      description: "설명설명",
    };
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
};
