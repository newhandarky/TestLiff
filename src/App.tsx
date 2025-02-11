// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "../src/pages/Home";

import "./pages/all.scss"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

function NotFound() {
  return <h1>404 - 找不到頁面</h1>;
}

export default App
