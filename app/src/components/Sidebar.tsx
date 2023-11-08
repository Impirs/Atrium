import React from 'react';
import { Link } from 'react-router-dom';
import './css/Sidebar.css'
import Home from '../pages/Home'; // Импортируем компонент Home
import Calendar from '../pages/Calendar'; // Импортируем компонент Calendar
import Todo from '../pages/Todo'; // Импортируем компонент TodoList

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link> {/* Используем Link к компоненту Home */}
          </li>
          <li>
            <Link to="/calendar">Calendar</Link> {/* Используем Link к компоненту Calendar */}
          </li>
          <li>
            <Link to="/todolist">Todo</Link> {/* Используем Link к компоненту TodoList */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;