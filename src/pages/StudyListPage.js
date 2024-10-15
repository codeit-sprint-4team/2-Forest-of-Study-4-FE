import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/StudyListPage.css";
import Gnb from "../components/commons/gnb/Gnb";
import { fetchStudies } from "../api/studyApi";

const StudyListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [visibleStudies, setVisibleStudies] = useState(6);
  const [recentStudies, setRecentStudies] = useState([]);
  const [studies, setStudies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudiesData = async () => {
      const studiesData = await fetchStudies();
      setStudies(studiesData);
    };
    fetchStudiesData();
  }, []);

  useEffect(() => {
    const storedRecentStudies =
      JSON.parse(localStorage.getItem("recentStudies")) || [];
    setRecentStudies(storedRecentStudies);
  }, []);

  const filteredStudies = studies.filter((study) =>
    study.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudies = filteredStudies.sort((a, b) => {
    if (sortOption === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOption === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortOption === "highPoints") {
      return b.points - a.points;
    } else if (sortOption === "lowPoints") {
      return a.points - b.points;
    }
    return 0;
  });

  const loadMore = () => setVisibleStudies((prev) => prev + 3);

  const handleStudyClick = (study) => {
    const updatedRecentStudies = [
      study,
      ...recentStudies.filter((s) => s.id !== study.id),
    ].slice(0, 3);
    setRecentStudies(updatedRecentStudies);
    localStorage.setItem("recentStudies", JSON.stringify(updatedRecentStudies));
    navigate(`/study-detail?studyId=${study.id}`);
  };

  return (
    <div className="study-list-page">
      <Gnb />
      <section className="frame recent-studies">
        <h2>최근 조회한 스터디</h2>
        <div className="study-list">
          {recentStudies.length ? (
            recentStudies.map((study) => (
              <StudyCard
                key={study.id}
                study={study}
                onClick={() => handleStudyClick(study)}
              />
            ))
          ) : (
            <p className="empty-studies-message">아직 조회한 스터디가 없어요</p>
          )}
        </div>
      </section>

      <section className="frame browse-studies">
        <div className="browse-header">
          <h2>스터디 둘러보기</h2>
          <div className="search-sort">
            <input
              type="text"
              placeholder="검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="recent">최근 순</option>
              <option value="oldest">오래된 순</option>
              <option value="highPoints">많은 포인트 순</option>
              <option value="lowPoints">적은 포인트 순</option>
            </select>
          </div>
        </div>
        <div className="study-list">
          {sortedStudies.length ? (
            sortedStudies
              .slice(0, visibleStudies)
              .map((study) => (
                <StudyCard
                  key={study.id}
                  study={study}
                  onClick={() => handleStudyClick(study)}
                />
              ))
          ) : (
            <p className="empty-studies-message">
              아직 둘러 볼 스터디가 없어요
            </p>
          )}
        </div>
        {visibleStudies < sortedStudies.length && (
          <button className="load-more" onClick={loadMore}>
            더보기
          </button>
        )}
      </section>
    </div>
  );
};

const StudyCard = ({ study, onClick }) => {
  const isColor = /^#([0-9A-F]{3}){1,2}$/i.test(study.background);

  const cardStyle = isColor
    ? { backgroundColor: study.background }
    : {
        backgroundImage: `url(${study.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };

  const nicknameStyle = isColor
    ? { color: getNicknameColor(study.background) }
    : { color: "white" };

  const progressStyle = isColor ? { color: "#414141" } : { color: "white" };

  return (
    <div
      className={isColor ? "study-card" : "study-card image-background"}
      style={cardStyle}
      onClick={onClick}
    >
      <div className="study-card-frame">
        <div className="study-card-header">
          <h3>
            <span style={nicknameStyle} className="nickname">
              {study.nickname}
            </span>
            의 {study.name}
          </h3>
          <span className="study-progress" style={progressStyle}>
            {study.progressDays}일째 진행 중
          </span>
        </div>
        <p className="study-description">{study.description}</p>
        <div className="study-card-footer">
          <div className="study-icons">
            <span>🙋‍♂️ {study.participants}</span>
            <span>🔥 {study.activities}</span>
            <span>❤️ {study.likes}</span>
          </div>
          <div className="study-points">{study.points}P 획득</div>
        </div>
      </div>
    </div>
  );
};

const getNicknameColor = (backgroundColor) => {
  const colors = {
    "#e1edde": "#578246",
    "#fff1cc": "#c18e1b",
    "#e0f1f5": "#418099",
    "#fde0e9": "#bc3c6a",
  };
  return colors[backgroundColor.toLowerCase()] || "#414141";
};

export default StudyListPage;
