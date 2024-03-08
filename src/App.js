import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from './pages/Login-Register/Login';
import Register from './pages/Login-Register/Register';
import Initial from './pages/Login-Register/Initial';
import NewFile from './pages/File/NewFile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Initial/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/main" element={<NewFile/>} />
      </Routes>
    </Router>
  );
}

export default App;
