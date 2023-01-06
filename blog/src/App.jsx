import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import SinglePage from './pages/singlepage/SinglePage';
import Write from './pages/write/Write';
import Profile from './pages/profile/Profile';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

import { persistStor } from './redux/store';
import UpdateProfile from './pages/updateProfile/UpdateProfile';
function App() {
  const user = useSelector((state) => state.user.currentUser.user) 
// const user= false

  return (
      <PersistGate loading={null} persistor={persistStor}>
    <div className=''>
  <Routes>
        <Route path='/' element={user? <Home  />:<Login/> } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/post/:id' element={ user &&<SinglePage />} />
        <Route path='/write/' element={ user && <Write />} />
        <Route path='/profile/:id' element={ user && <Profile />} />
          <Route path='/edit/:id' element={user && <UpdateProfile />} />

  </Routes>
    </div>
      </PersistGate>
  );
}

export default App;
