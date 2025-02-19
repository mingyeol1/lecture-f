import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage.css";
import { authAxiosInstance } from "../config";  // Assume axiosInstance is properly set up.

interface Board {
  id: number;
  name: string;
  description: string;
}

const MainPage: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await authAxiosInstance.get<Board[]>("/boards");
      setBoards(response.data);
    } catch (error) {
      console.error("게시판 목록을 불러오는 중 오류 발생:", error);
    }
  };

  return (
    <div className="board-list-container">
      <h1 className="board-list-title">게시판 목록</h1>
      <ul className="board-list">
        {boards.map((board) => (
          <li key={board.id} className="board-item">
            <Link to={`/lectureboard/${board.id}`} className="board-link">
              <h3>{board.name}</h3>
              <p>{board.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
