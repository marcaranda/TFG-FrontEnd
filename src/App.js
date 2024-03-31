import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Initial from './pages/Login-Register/Initial';
import Main from './pages/Main/Main'
import UserSettings from './pages/Profile/UserSettings';
import ChangePassword from './pages/Profile/ChangePassword';
import ViewHistory from './pages/Profile/ViewHistory';
import File from './pages/File/File';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Initial/>} />
        <Route path="/main" element={<Main/>} />
        <Route path="/user-settings/user-profile" element={<UserSettings/>} />
        <Route path="/user-settings/change-password" element={<ChangePassword/>} />
        <Route path="/user-settings/history" element={<ViewHistory/>} />
        <Route path="/file" element={<File/>} />
      </Routes>
    </Router>
  );
}

export default App;
