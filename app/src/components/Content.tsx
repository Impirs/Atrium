import './css/Content.css';

import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
import Todo from '../pages/Todo';

const Content: React.FC = () => {
  return (
    <div className="content">
      <Routes>
        <Route path="../pages/Home" element={<Home />} />
        <Route path="../pages/Calendar" element={<Calendar />} />
        <Route path="../pages/Todo" element={<Todo />} />
      </Routes>
    </div>
  );
};

export default Content;