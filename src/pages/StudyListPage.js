import React, { useState, useEffect } from "react";
import "../style/StudyListPage.css";
import "../style/Gnb.css";
import { mockStudyData } from "../mock";
import { Link } from "react-router-dom";

const GNB = () => {
  return (
    <div className="globalForest">
      <img
        src="/imgs/globalForest.png"
        alt="Global Forest"
        className="globalForestIcon"
      />
      <Link to="/createStudy" className="createStudyButton">
        <img src="/imgs/createStudyIcon3.png" alt="스터디 만들기 아이콘" />
      </Link>
    </div>
  );
};
const StudyListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [visibleStudies, setVisibleStudies] = useState(6);
  const [recentStudies, setRecentStudies] = useState([]);

  useEffect(() => {
    const storedRecentStudies =
      JSON.parse(localStorage.getItem("recentStudies")) || [];
    setRecentStudies(storedRecentStudies);
  }, []);

  const filteredStudies = mockStudyData.filter((study) =>
    study.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudies = [...filteredStudies].sort((a, b) => {
    if (sortOption === "recent") {
      return b.id - a.id;
    } else if (sortOption === "oldest") {
      return a.id - b.id;
    } else if (sortOption === "highPoints") {
      return b.points - a.points;
    } else {
      return a.points - b.points;
    }
  });

  const loadMore = () => {
    setVisibleStudies((prev) => prev + 3);
  };

  const handleStudyClick = (study) => {
    const updatedRecentStudies = [
      study,
      ...recentStudies.filter((s) => s.id !== study.id),
    ].slice(0, 3);
    setRecentStudies(updatedRecentStudies);
    localStorage.setItem("recentStudies", JSON.stringify(updatedRecentStudies));
  };

  return (
    <div className="study-list-page">
      <GNB />

      <section className="frame recent-studies">
        <h2>최근 조회한 스터디</h2>
        <div className="study-list">
          {recentStudies.length > 0 ? (
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
          {sortedStudies.slice(0, visibleStudies).map((study) => (
            <StudyCard
              key={study.id}
              study={study}
              onClick={() => handleStudyClick(study)}
            />
          ))}
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
  const cardStyle = study.cardColor
    ? { backgroundColor: study.cardColor }
    : {
        backgroundImage: `url(${study.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };

  const hasImageBackground = study.image ? "image-background" : "";

  return (
    <div
      className={`study-card ${hasImageBackground}`}
      style={cardStyle}
      onClick={onClick}
    >
      <div className="study-card-frame">
        <div className="study-content">
          <h3>{study.title}</h3>
          <p>{study.description}</p>
        </div>

        <div className="study-info">
          <div className="participants">
            <img src="/path-to-participant-icon" alt="참여자" />
            {study.participants}
          </div>
          <div className="likes">
            <img src="/path-to-likes-icon" alt="좋아요" />
            {study.thumbsUp}
          </div>
          <div className="comments">
            <img src="/path-to-comments-icon" alt="댓글" />
            {study.comments}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyListPage;
