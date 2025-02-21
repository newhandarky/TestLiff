import { Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
// import liff from '@line/liff';

// import LIFFInspectorPlugin from '@line/liff-inspector';
// import { LiffMockPlugin } from '@line/liff-mock';

import Home from "../src/pages/Home";
import Info from "../src/pages/Info";

import "./pages/all.scss";

function App() {
  // useEffect(() => {
  //   // 啟用 LIFF Mock 插件
  //   liff.use(new LiffMockPlugin());

  //   // 啟用 LIFF Inspector 插件
  //   liff.use(new LIFFInspectorPlugin());

  //   // 初始化 LIFF 並啟用模擬模式
  //   liff.init({ liffId: '2006884711-Q5r6z736', mock: true }).then(() => {
  //     // 設定模擬數據
  //     liff.$mock.set({
  //       getProfile: () => ({
  //         displayName: 'Mock User',
  //         userId: 'mock-user-id',
  //         statusMessage: 'This is a mocked profile!',
  //       }),
  //       isInClient: () => true, // 模擬在 LINE 客戶端內運行
  //     });

  //     console.log('LIFF 已初始化 (模擬模式)');
  //   }).catch((err) => {
  //     console.error('LIFF 初始化失敗:', err);
  //   });
  // }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function NotFound() {
  return <h1>404 - 找不到頁面</h1>;
}

export default App;
