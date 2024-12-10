import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Router, Routes } from 'react-router-dom';
import SignUp from './User/signUp/SignUp';
import SignIn from './User/signIn/SignIn';




function App() {
  return (

    <Routes>
      <Route path='/signup'  element={<SignUp />}/>
      <Route path='/signin' element ={<SignIn />} />
 

 
    </Routes>

  );
}

export default App;