import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
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
   const boardId = 1; // 📌 원하는 boardId 값 지정 (동적으로 받을 경우 로직 추가)
  return (

    

    <SearchProvider> {/* SearchContext로 감싸서 모든 컴포넌트에서 접근 가능 */}
       <SearchBar boardId={boardId} /> {/* boardId를 넘겨줘야 함 */}
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