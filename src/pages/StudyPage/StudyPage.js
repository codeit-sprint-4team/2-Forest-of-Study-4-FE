import Header from "../../components/commons/header/Header";
import HabitTable from "./Habittable";
import Introduce from "./Introduce.js";
import "../../style/StudyPage.css";
import Gnb from "../../components/commons/gnb/Gnb.js"

const StudyPage = () => {
  return (
    <>
      <Gnb/>
      <div className="study">
        <div className="study-container">
          <Header
            title="연우"
            buttonTo1="/"
            buttonTo2="/"
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
export default StudyPage;
