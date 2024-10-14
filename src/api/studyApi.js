const BASE_URL = "http://localhost:3000/api";

export const fetchStudies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/studies`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching studies:", error);
  }
};

export const createStudy = async (studyData) => {
  try {
    const response = await fetch(`${BASE_URL}/studies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studyData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating study:", error);
  }
};

export const fetchStudyById = async (studyId) => {
  try {
    const response = await fetch(`${BASE_URL}/studies/${studyId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching study by ID:", error);
  }
};
