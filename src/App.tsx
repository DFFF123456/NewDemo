import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Detail from './Detail';
import Lists from './Lists';
import Login from './Login';
import Main from './Main'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:username" element={<Main />} />
          <Route path="/Login" element={<Login/>} />
          <Route path="/Detail/:username/:name" element={<Detail/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
