import React from "react";
import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home'; // Импортируем компонент Home
import Calendar from '../pages/Calendar'; // Импортируем компонент Calendar
import Todo from '../pages/Todo'; // Импортируем компонент Todo
import './css/Content.css';

const Content: React.FC = () => {
    return (
      <div className="content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </div>
    );
  };
  
  export default Content;