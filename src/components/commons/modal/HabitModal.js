import React from "react";
import { useLocation } from "react-router-dom";
import "../../../style/Modal.css";
import "../../../style/habit.css";
import "../../../style/habitModal.css";
import { HabitList } from "../../HabitList";

export default function HabitModal({
  title,
  handleCloseClick,
  habits,
  setHabits,
}) {
  // URL에서 studyId 가져오기
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const studyId = searchParams.get("studyId");

  return (
    <div className="CommonModal">
      <div className="modalBox">
        <h2 className="modalTitle">{title}</h2>
        <div className="modalContent">
          <div>
            <HabitList
              habits={habits}
              setHabits={setHabits}
              onClose={handleCloseClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
