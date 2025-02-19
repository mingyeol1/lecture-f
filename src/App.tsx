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




function App() {
  return (

    <Routes>
      <Route path='/signup'  element={<SignUp />}/>
      <Route path='/signin' element ={<SignIn />} />
      <Route path='/modify' element ={<Modify />} />
      <Route path='/creatboard' element ={<BoardList />} />
      <Route path='/lectureboard/:boardId' element={<LectureBoard />} />
      <Route path='/boards/:boardId/lectures/:lectureId' element={<LectureRead />} />
      <Route path='/mainpage' element ={<MainPage />} />

 

 
    </Routes>

  );
}

export default App;