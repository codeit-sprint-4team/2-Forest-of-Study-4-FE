import { useLocation, useNavigate } from "react-router-dom";
import "../../../style/Gnb.css";

export default function Gnb() {
  const location = useLocation();
  const navigate = useNavigate();

  const showStudyButtonPaths = ["/", "/createStudy"];

  // 버튼 클릭 시 페이지 이동
  const handleButtonClick = () => {
    navigate("/createStudy");
  };

  return (
    <div className="globalForest">
      <img
        className="globalForestIcon"
        src="/imgs/globalForest.png"
        alt="동물의 숲"
      />
      {showStudyButtonPaths.includes(location.pathname) && (
        <button className="createStudyButton" onClick={handleButtonClick}>
          <picture>
            <source
              media="(min-width: 1200px)"
              srcSet="/imgs/createStudyIcon1.png"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/imgs/createStudyIcon2.png"
            />
            <img src="/imgs/createStudyIcon3.png" alt="스터디 만들기" />
          </picture>
        </button>
      )}
    </div>
  );
}
