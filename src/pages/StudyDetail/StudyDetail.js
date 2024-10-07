import Header from "../../components/commons/header/Header";
import HabitTable from "./Habittable.js";
import Introduce from "./Introduce.js";
import "../../style/StudyDetail.css";
import Gnb from "../../components/commons/gnb/Gnb.js"

const StudyDetail = () => {
  return (
    <>
      <Gnb/>
      <div className="study">
        <div className="study-container">
          <Header
            title="연우"
            buttonTo1="/habits"
            buttonTo2="/timer"
            buttonTitle1="오늘의 습관"
            buttonTitle2="오늘의 집중"
          />
          <Introduce 
            content="오늘 하루도 화이팅 :)"
            point="310"
          />
          <HabitTable />
        </div>
      </div>
    </>
  );
};
export default StudyDetail;
