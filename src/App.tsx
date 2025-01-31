import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import SignUp from './User/SignUp/SignUp';
import SignIn from './User/SignIn/SignIn';
import Modify from './User/modify/Modify';




function App() {
  return (

    <Routes>
      <Route path='/signup'  element={<SignUp />}/>
      <Route path='/signin' element ={<SignIn />} />
      <Route path='/modify' element ={<Modify />} />
 

 
    </Routes>

  );
}

export default App;