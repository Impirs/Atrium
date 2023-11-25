import './css/Content.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
import Todo from '../pages/Todo';
import Settings from '../pages/Settings';

const Content: React.FC = () => {
  return (
    <div className="content">
      <Routes>
        {/* <Route path="/" element={<Navigate to="/home" />} /> */}

        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default Content;
