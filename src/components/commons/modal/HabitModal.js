import React from "react";
import "../../../style/Modal.css";
import "../../../style/habit.css";
import { HabitList } from "../../HabitList";

export default function HabitModal({
  title,
  handleCloseClick,
  habits,
  setHabits,
}) {
  return (
    <div className="CommonModal">
      <div className="modalBox">
        <h2 className="modalTitle">{title}</h2>
        {/* <div className="modalContent">{modalContent}</div> */}
        <div className="modalContent">
          <div className="habitModalContent">
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
