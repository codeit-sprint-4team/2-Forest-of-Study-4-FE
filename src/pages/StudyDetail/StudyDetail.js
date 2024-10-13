import { useLocation, Link } from "react-router-dom";
import Header from "../../components/commons/header/Header";
import HabitTable from "./Habittable.js";
import Introduce from "./Introduce.js";
import "../../style/StudyDetail.css";
import Gnb from "../../components/commons/gnb/Gnb.js";
import StudyDashboard from './StudyDashboard.js';  // StudyDashboard(수정/삭제/공유 버튼) 추가

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const StudyDetail = () => {
  const query = useQuery();
  const studyId = query.get("studyId");
  const [study, setStudy] = useState(null); // study 상태 추가
  const [loading, setLoading] = useState(true); // loading 상태 추가

  useEffect(() => {
    // 예시 API 호출
    const fetchStudyData = async () => {
      try {
        const response = await fetch(`/api/studies/${studyId}`); // 실제 API 경로에 맞게 수정하기
        const data = await response.json();
        setStudy(data);
      } catch (error) {
        console.error("Error fetching study data:", error);
      } finally {
        setLoading(false); // 데이터 로드 후 loading 상태 false로 변경
      }
    };

    fetchStudyData();
  }, [studyId]); // studyId가 변경될 때마다 데이터 재요청

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <>
      <Gnb />
      <div className="study">
        <div className="studyContainer">
          <Header
            title="연우"
            buttonTo1={`/habits?studyId=${studyId}`}
            buttonTo2="/timer"
            buttonTitle1="오늘의 습관"
            buttonTitle2="오늘의 집중"
          />
          <Introduce content="오늘 하루도 화이팅 :)" point="310" />
          <HabitTable />

          <StudyDashboard study={study} />
        </div>
      </div>
    </>
  );
};
export default StudyDetail;
