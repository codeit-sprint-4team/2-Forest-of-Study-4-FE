import { useLocation, Link } from "react-router-dom";
import Header from "../../components/commons/header/Header";
import HabitTable from "./HabitRecord.js";
import Introduce from "./Introduce.js";
import Gnb from "../../components/commons/gnb/Gnb.js";
import Emoji from "./Emoji.js";
import StudyDashboard from "./StudyDashboard.js";
import { useEffect, useState } from "react";
import { fetchStudy } from "../../api/studyApi.js";
import "../../style/StudyDetail.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const StudyDetail = () => {
  const query = useQuery();
  const studyId = query.get("studyId");

  const [study, setStudy] = useState(null);

  useEffect(() => {
    const fetchStudyData = async () => {
      try {
        const data = await fetchStudy(studyId);
        setStudy(data);
      } catch (error) {
        console.error("스터디 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchStudyData();
  }, [studyId]);

  if (!study) {
    return <p>스터디 정보를 불러오는 중입니다...</p>;
  }

  return (
    <>
      <Gnb />
      <div className="study">
        <div className="studyContainer">
          <div className="study-top">
            <Emoji />
            <StudyDashboard study={study} studyId={studyId} />
          </div>
          <Header
            title={study.name || "스터디"}
            buttonTo1={`/habits?studyId=${studyId}`}
            buttonTo2="/timer"
            buttonTitle1="오늘의 습관"
            buttonTitle2="오늘의 집중"
          />
          <Introduce content={study.description || "스터디 설명"} point="310" />
          <HabitTable />
        </div>
      </div>
    </>
  );
};

export default StudyDetail;
