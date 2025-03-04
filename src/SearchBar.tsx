import React, { useState } from "react";
import { useSearch } from "./SearchContext"; // Context 사용
import "./SearchBar.css";

interface SearchBarProps {
  boardId: number; // 게시판 ID를 props로 받음
}

const SearchBar: React.FC<SearchBarProps> = ({ boardId }) => {
  const { searchQuery, setSearchQuery } = useSearch(); // Context에서 검색어 관리
  const [inputValue, setInputValue] = useState(searchQuery); // 로컬 상태

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue); // 검색어를 Context에 저장
  };

  return (
    <form onSubmit={handleSearchSubmit} className="search-bar-container">
      <input
        type="text"
        value={inputValue}
        onChange={handleSearchChange}
        placeholder="제목, 작성자 닉네임으로 검색"
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default SearchBar;