import React, { useEffect, useState } from "react";
import { authAxiosInstance } from "../config";
import { useParams, useNavigate } from "react-router-dom";

interface Lecture {
  id: number;
  title: string;
  instructor: string;
}

const LectureBoard: React.FC = () => {
  const { boardId } = useParams<{ boardId?: string }>();  // 🔹 boardId 가져오기
  const navigate = useNavigate();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    console.log("현재 boardId:", boardId); // 🔹 콘솔 로그로 boardId 확인

    if (boardId) {
      fetchLectures(page);
    }
  }, [page, boardId]);

  useEffect(() => {
    if (boardId) {
      fetchLectures(page);
    }
  }, [page, boardId]);

  const fetchLectures = async (page: number) => {
    try {
      const response = await authAxiosInstance.get(`/boards/${boardId}/lectures/all?page=${page}&size=10`);
      setLectures(response.data.content);
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
      <ul className="lecture-list">
        {lectures.map((lecture) => (
          <li key={lecture.id} className="lecture-item">
            <a onClick={() => navigate(`/boards/${boardId}/lectures/${lecture.id}`)} className="lecture-link">
              {lecture.title} - {lecture.instructor}
            </a>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
          이전
        </button>
        <span>{page + 1} / {totalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
          다음
        </button>
      </div>
    </div>
  );
};

export default LectureBoard;
