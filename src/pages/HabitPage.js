import React from "react";
import Header from "../components/commons/header/Header";

function HabitPage() {
  return (
    <div className="habit">
      <div className="habitOutside">
        <div>
          <Header
            title="title"
            buttonTo1="/"
            buttonTo2="/"
            buttonTitle1="오늘의 집중"
            buttonTitle2="홈"
          />
        </div>
      </div>
    </div>
  );
}

export default HabitPage;
