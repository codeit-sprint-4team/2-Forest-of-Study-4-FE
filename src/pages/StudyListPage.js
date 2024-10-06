import React, { useState } from "react";
import "../style/StudyListPage.css";
import { mockStudyData } from "../mock";

const StudyListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [visibleStudies, setVisibleStudies] = useState(3);

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

  return (
    <div className="study-list-page">
      <section className="frame recent-studies">
        <h2>최근 조회한 스터디</h2>
        <div className="study-list">
          {sortedStudies.slice(0, 3).map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
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
            <StudyCard key={study.id} study={study} />
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

const StudyCard = ({ study }) => {
  const cardStyle = study.cardColor
    ? { backgroundColor: study.cardColor }
    : {
        backgroundImage: `url(${study.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };

  const hasImageBackground = study.image ? "image-background" : "";

  return (
    <div className={`study-card ${hasImageBackground}`} style={cardStyle}>
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
