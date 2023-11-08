import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Импортируем компонент Sidebar
import Home from './pages/Home';
import Calendar from './pages/Calendar';
import TodoList from './pages/Todo';

// Компонент для основного окна
const MainContent: React.FC = () => (
  <div>
    <div style={{ display: 'flex' }}>
      <Sidebar /> {/* Вставляем сайдбар в основное окно */}
      <div>
        <h2>Main Content</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/todo" element={<TodoList />} />
        </Routes>
      </div>
    </div>
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