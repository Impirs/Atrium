import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'; 
import Content from './components/Content';

// Компонент для основного окна
const MainContent: React.FC = () => (
  <div style={{ display: 'flex' }}>
    <Sidebar />
    <Content />
  </div>
);

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;