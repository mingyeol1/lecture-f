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




function App() {
  return (

    <Routes>
      <Route path='/signup'  element={<SignUp />}/>
      <Route path='/signin' element ={<SignIn />} />
      <Route path='/modify' element ={<Modify />} />
      <Route path='/createboard' element ={<BoardList />} />
      <Route path='/lectureboard/:boardId' element={<LectureBoard />} />
      <Route path='/boards/:boardId/lectures/:lectureId' element={<LectureRead />} />
      <Route path='/mainpage' element ={<MainPage />} />
      <Route path='/boards/:boardId/createlecture' element={<LectureCreate />} />

 

 
    </Routes>

  );
}

export default App;