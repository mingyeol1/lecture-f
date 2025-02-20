import React, { useEffect, useState } from "react";
import { authAxiosInstance } from "../config";
import "./LectureBoard.css";
import { useParams, useNavigate } from "react-router-dom";

interface Lecture {
  id: number;
  title: string;
  uploaderNickname: string;
  imagesUrl?: string[]; // 강의 이미지 URL
  rating: number; // 강의 평점
  createdAt: string; // 강의 생성일 (필수 추가)
}

const LectureBoard: React.FC = () => {
  const { boardId } = useParams<{ boardId?: string }>();
  const navigate = useNavigate();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (boardId) {
      fetchLectures(page);
    }
  }, [page, boardId]);

  const fetchLectures = async (page: number) => {
    try {
      const response = await authAxiosInstance.get(`/boards/${boardId}/lectures/all?page=${page}&size=10`);
      const sortedLectures = response.data.content.sort((a: Lecture, b: Lecture) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // 최신순으로 정렬
      });
      setLectures(sortedLectures);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("강의 목록을 불러오는 중 오류 발생:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="lecture-board-container">
      <h1 className="lecture-title">강의 목록</h1>
      <div className="lecture-grid">
        {lectures.map((lecture) => (
          <div
            key={lecture.id}
            className="lecture-card"
            onClick={() => navigate(`/boards/${boardId}/lectures/${lecture.id}`)}
          >
            <div className="lecture-thumbnail">
              {lecture.imagesUrl && lecture.imagesUrl.length > 0 ? (
                <img src={lecture.imagesUrl[0]} alt="썸네일" />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>
            <h3 className="lecture-card-title">{lecture.title}</h3>
            <p className="lecture-card-instructor">{lecture.uploaderNickname}</p>
            <div className="lecture-rating">
              <span>⭐ {lecture.rating}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
          이전
        </button>
        <span>
          {page + 1} / {totalPages}
        </span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
          다음
        </button>
      </div>
    </div>
  );
};

export default LectureBoard;
