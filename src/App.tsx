import { Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
// import liff from '@line/liff';

// import LIFFInspectorPlugin from '@line/liff-inspector';
// import { LiffMockPlugin } from '@line/liff-mock';

import Home from "../src/pages/Home";
import Info from "../src/pages/Info";
// import SettingMessage from "../src/pages/SettingMessage";

import "./pages/all.scss";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/info" element={<Info />} />
        {/* <Route path="/setting-message" element={<SettingMessage />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function NotFound() {
  return <h1>404 - 找不到頁面</h1>;
}

export default App;
