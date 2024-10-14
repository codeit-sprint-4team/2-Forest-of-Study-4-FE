import { useLocation, Link } from "react-router-dom";
import Header from "../../components/commons/header/Header";
import HabitTable from "./HabitRecord.js";
import Introduce from "./Introduce.js";
import "../../style/StudyDetail.css";
import Gnb from "../../components/commons/gnb/Gnb.js";
import Emoji from "./Emoji.js";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const StudyDetail = () => {
  const query = useQuery();
  const studyId = query.get("studyId");

  return (
    <>
      <Gnb />
      <div className="study">
        <div className="studyContainer">
          <Emoji />
          <Header
            title="연우"
            buttonTo1={`/habits?studyId=${studyId}`}
            buttonTo2="/timer"
            buttonTitle1="오늘의 습관"
            buttonTitle2="오늘의 집중"
          />
          <Introduce content="오늘 하루도 화이팅 :)" point="310" />
          <HabitTable />
        </div>
      </div>
    </>
  );
};
export default StudyDetail;
