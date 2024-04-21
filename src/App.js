import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Initial from './pages/Login-Register/Initial';
import Main from './pages/Main/Main'
import UserSettings from './pages/Profile/UserSettings';
import ChangePassword from './pages/Profile/ChangePassword';
import ViewHistory from './pages/Profile/History/ViewHistory';
import DatasetsHistory from './pages/Profile/History/DatasetsHistory';
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
        <Route path="/user-settings/history/datasets" element={<DatasetsHistory/>} />
        <Route path="/file" element={<File/>} />
      </Routes>
    </Router>
  );
}

export default App;
