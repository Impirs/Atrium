import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

const MainContent: React.FC = () => (
  <div style={{ display: 'flex' }}>
    <Sidebar />
    <Content />
  </div>
);

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
