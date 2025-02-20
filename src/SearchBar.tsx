import React, { useState } from 'react';
import { useSearch } from './SearchContext'; // SearchContext 가져오기
import "./SearchBar.css";

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch(); // 검색어와 setter 함수
  const [inputValue, setInputValue] = useState(searchQuery); // 로컬 상태로 검색어 관리

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // 입력값 상태 변경
  };

  const handleSearchSubmit = () => {
    setSearchQuery(inputValue); // 검색어를 Context에 업데이트
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={inputValue}
        onChange={handleSearchChange}
        placeholder="검색어를 입력하세요"
      />
      <button onClick={handleSearchSubmit}>검색</button>
    </div>
  );
};

export default SearchBar;
