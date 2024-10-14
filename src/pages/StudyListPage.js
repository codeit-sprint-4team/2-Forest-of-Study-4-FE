import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/StudyListPage.css";
import Gnb from "../components/commons/gnb/Gnb";
import { fetchStudies } from "../api/studyApi";

const StudyListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [visibleStudies, setVisibleStudies] = useState(6);
  const [recentStudies, setRecentStudies] = useState([]);
  const [studies, setStudies] = useState([]);

  useEffect(() => {
    const fetchStudiesData = async () => {
      try {
        const studiesData = await fetchStudies();
        setStudies(studiesData);
      } catch (error) {
        console.error("스터디 목록 조회 실패:", error);
      }
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

  const sortedStudies = [...filteredStudies].sort((a, b) => {
    if (sortOption === "recent") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortOption === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return 0;
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
      <Gnb />
      <section className="frame recent-studies">
        <h2>최근 조회한 스터디</h2>
        <div className="study-list">
          {recentStudies.length > 0 ? (
            recentStudies.map((study) => (
              <Link key={study.id} to={`/study-detail?studyId=${study.id}`}>
                <StudyCard
                  key={study.id}
                  study={study}
                  onClick={() => handleStudyClick(study)}
                />
              </Link>
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
            </select>
          </div>
        </div>
        <div className="study-list">
          {sortedStudies.slice(0, visibleStudies).map((study) => (
            <Link key={study.id} to={`/study-detail?studyId=${study.id}`}>
              <StudyCard
                key={study.id}
                study={study}
                onClick={() => handleStudyClick(study)}
              />
            </Link>
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
  const isColor = /^#([0-9A-F]{3}){1,2}$/i.test(study.background);

  const cardStyle = isColor
    ? { backgroundColor: study.background }
    : {
        backgroundImage: `url(${study.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };

  return (
    <div className="study-card" style={cardStyle} onClick={onClick}>
      <div className="study-card-frame">
        <div className="study-content">
          <h3>{`${study.nickname}의 ${study.name}`}</h3>
          <p>{study.description}</p>
        </div>
      </div>
    </div>
  );
};

export default StudyListPage;
