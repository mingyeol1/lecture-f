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
  return (

    

    <SearchProvider> {/* SearchContext로 감싸서 모든 컴포넌트에서 접근 가능 */}
      <SearchBar /> {/* 한 번만 추가하여 모든 컴포넌트에서 사용 가능 */}
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/modify' element={<Modify />} />
        <Route path='/createboard' element={<BoardList />} />
        <Route path='/lectureboard/:boardId' element={<LectureBoard />} />
        <Route path='/boards/:boardId/lectures/:lectureId' element={<LectureRead />} />
        <Route path='/mainpage' element={<MainPage />} />
        <Route path='/boards/:boardId/createlecture' element={<LectureCreate />} />
      </Routes>
    </SearchProvider>

  );
}

export default App;