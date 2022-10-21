import React from 'react';
import './App.css';
import {Routes, Route, BrowserRouter as Routers} from 'react-router-dom'
import Registration from './pages/Registration'
import DashBoard from './pages/DashBoard';
import Login from './pages/Login';
import MyProfile from './components/MyProfile';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <>
      <Routers>
        <Routes>
          <Route exact path="/registration" element={<Registration/>} />
          <Route exact path="/" element={<DashBoard />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path='/myprofile' element={<MyProfile />} />
          <Route exact path="/editprofile" element={<EditProfile />} />
        </Routes>
      </Routers>
    </>

  );
}

export default App;
