// import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from "../src/pages/Home";
import Info from "../src/pages/Info";

import "./pages/all.scss"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  )
}

function NotFound() {
  return <h1>404 - 找不到頁面</h1>;
}

export default App
