//import './App.css';
import React from 'react';
//import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';

// Компонент для основного окна
const MainContent = () => (
  <div>
    <h2>Main Content</h2>
    <Outlet />
  </div>
);

// Компоненты для каждой вкладки
const Home = () => <div>Home Page</div>;
const Calendar = () => <div>Calendar Page</div>;
const ToDoList = () => <div>ToDo List Page</div>;

function App() {
  return (
    <Router>
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px', padding: '10px', background: '#eee' }}>
        <h3>Tab Navigation</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/calendar">Calendar</Link>
          </li>
          <li>
            <Link to="/todo">ToDo List</Link>
          </li>
        </ul>
      </div>
      <MainContent />
    </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/todo" element={<ToDoList />} />
      </Routes>
    </Router>
  );
}

export default App;