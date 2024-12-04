import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignUp from './User/SignUp/SignUp';
import SignIn from './User/SignIn/SignIn';




function App() {
  return (
   <Routes>
    <Route path='/signup'  element={<SignUp />}/>
    <Route path='/signin' element ={<SignIn />} />

   </Routes>
  );
}

export default App;