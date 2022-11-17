import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Detail from './Detail';
import Login from './Login';
import Main from './Main'
import GradRoute from './gradRoute';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:username" element={<GradRoute><Main /></GradRoute>} />
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Detail/:username/:name" element={<GradRoute><Detail /></GradRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
