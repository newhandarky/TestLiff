import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom';
import VConsole from 'vconsole';
import App from './App.tsx'

// 初始化 vConsole
const vConsole = new VConsole();

console.log(vConsole, 'vConsole 已啟動');


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
