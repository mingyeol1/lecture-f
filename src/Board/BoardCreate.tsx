import React, { useEffect, useState } from "react";
import "./BoardCreate.css";
import { authAxiosInstance } from "../config";

interface Board {
  id: number;
  name: string;
}

const BoardList: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [newBoardName, setNewBoardName] = useState<string>("");

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await authAxiosInstance.get<Board[]>("/boards");
      setBoards(response.data);
    } catch (error) {
      console.error("게시판을 불러오는 중 오류 발생:", error);
    }
  };

  const createBoard = async () => {
    if (!newBoardName.trim()) return;
    try {
      await authAxiosInstance.post("/boards", { name: newBoardName });
      setNewBoardName("");
      fetchBoards();
    } catch (error) {
      console.error("게시판 생성 중 오류 발생:", error);
    }
  };

  return (
    <div className="board-container">
      <h1 className="board-title">게시판 목록</h1>
      <div className="board-input-container">
        <input
          type="text"
          placeholder="새 게시판 이름"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
          className="board-input"
        />
        <button onClick={createBoard} className="board-add-button">게시판 추가</button>
      </div>
      <div className="board-list">
        {boards.map((board) => (
          <div key={board.id} className="board-card">
            <div className="board-card-content">
              <span className="board-name">{board.name}</span>
              <button className="board-delete-button">삭제</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardList;