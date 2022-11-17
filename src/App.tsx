import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Detail from './component/Detail/Detail';
import Login from './component/Login/Login';
import Main from './Main'
import GradRoute from './gradRoute';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/:username" element={<GradRoute><Main /></GradRoute>} />
          <Route path="/Detail/:username/:name" element={<GradRoute><Detail /></GradRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
