import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom'; // useLocation 추가
import SignUp from './User/SignUp/SignUp';
import SignIn from './User/SignIn/SignIn';
import Modify from './User/modify/Modify';
import BoardList from './Board/BoardCreate';
import MainPage from './Main/MainPage';
import LectureBoard from './Lecture/LectureBoard';
import LectureRead from './Lecture/LectureRead';
import LectureCreate from './Lecture/LectureCreate';
import { SearchProvider } from './SearchContext';
import SearchBar from './SearchBar';

function App() {
  const location = useLocation(); // 현재 경로 확인
  const boardId = 1; // 📌 원하는 boardId 값 지정 (동적으로 받을 경우 로직 추가)

  // LectureBoard 경로일 때만 SearchBar를 렌더링
  const isLectureBoard = location.pathname.startsWith('/lectureboard');

  return (
    <SearchProvider>
      {/* LectureBoard 경로일 때만 SearchBar 렌더링 */}
      {isLectureBoard && <SearchBar boardId={boardId} />}
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/modify' element={<Modify />} />
        <Route path='/createboard' element={<BoardList />} />
        <Route path='/lectureboard/:boardId' element={<LectureBoard />} />
        <Route path='/boards/:boardId/lectures/:lectureId' element={<LectureRead />} />
        <Route path='/' element={<MainPage />} />
        <Route path='/boards/:boardId/createlecture' element={<LectureCreate />} />
      </Routes>
    </SearchProvider>
  );
}

export default App;