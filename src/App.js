import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/Login-Register/Login';
import Register from './pages/Login-Register/Register';
import Initial from './pages/Login-Register/Initial';
import Main from './pages/Main/Main'
import UserSettings from './pages/Profile/UserSettings';
import ChangePassword from './pages/Profile/ChangePassword';
import ViewHistory from './pages/Profile/ViewHistory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Initial/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/main" element={<Main/>} />
        <Route path="/user-settings/user-profile" element={<UserSettings/>} />
        <Route path="/user-settings/change-password" element={<ChangePassword/>} />
        <Route path="/user-settings/history" element={<ViewHistory/>} />
      </Routes>
    </Router>
  );
}

export default App;
