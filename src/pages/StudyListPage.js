import React, { useState } from "react";
import "./StudyListPage.css";

const mockStudyData = [
  {
    id: 1,
    title: "이유디의 UX 스터디",
    description: "Slow And Steady Wins The Race!!",
    points: 310,
    participants: 37,
    thumbsUp: 26,
    comments: 14,
    status: "진행 중",
    cardColor: "",
    image: "./imgs/study1.png",
  },
  {
    id: 2,
    title: "K.K.의 UX 스터디",
    description: "나비보벳따우",
    points: 310,
    participants: 29,
    thumbsUp: 26,
    comments: 14,
    status: "완료",
    cardColor: "#E1EDDE",
    image: "",
  },
  {
    id: 3,
    title: "연우 의 개발공장",
    description: "Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)",
    points: 50,
    participants: 12,
    thumbsUp: 11,
    comments: 9,
    status: "진행 중",
    cardColor: "#FFF1CC",
    image: "",
  },
  {
    id: 4,
    title: "이유디의 UX 스터디",
    description: "Slow And Steady Wins The Race!!",
    points: 310,
    participants: 37,
    thumbsUp: 26,
    comments: 14,
    status: "진행 중",
    cardColor: "",
    image: "./imgs/study1.png",
  },
  {
    id: 5,
    title: "K.K.의 UX 스터디",
    description: "나비보벳따우",
    points: 310,
    participants: 29,
    thumbsUp: 26,
    comments: 14,
    status: "완료",
    cardColor: "#E1EDDE",
    image: "",
  },
  {
    id: 6,
    title: "연우 의 개발공장",
    description: "Slow And Steady Wins The Race! 다들 오늘 하루도 화이팅 :)",
    points: 50,
    participants: 12,
    thumbsUp: 11,
    comments: 9,
    status: "진행 중",
    cardColor: "#FFF1CC",
    image: "",
  },
];

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
          {sortedStudies.slice(0, 2).map((study) => (
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
    ? { backgroundColor: study.cardColor } // 색상이 있는 경우 배경색만 지정
    : {
        backgroundImage: `url(${study.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };

  const hasImageBackground = study.image ? "image-background" : "";

  return (
    <div className={`study-card ${hasImageBackground}`} style={cardStyle}>
      <div className="study-content">
        <h3>{study.title}</h3>
        <p>{study.description}</p>

        <div className="study-info">
          <div>포인트: {study.points}</div>
          <div>참여자: {study.participants}</div>
          <div>좋아요: {study.thumbsUp}</div>
          <div>댓글: {study.comments}</div>
        </div>
      </div>
    </div>
  );
};

export default StudyListPage;
