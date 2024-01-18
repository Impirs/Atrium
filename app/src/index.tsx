import React, { useEffect } from 'react';
import 'process/browser';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

const MainContent: React.FC = () => {
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, []);
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Content />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <MainContent />
    </Router>
  </React.StrictMode>
);
