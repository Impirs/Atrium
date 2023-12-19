import './css/Content.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import FloatingWindow from './Window';
import Home from '../pages/Home';
import Calendar from '../pages/Calendar';
import Todo from '../pages/Todo';
import Settings from '../pages/Settings';

const Content: React.FC = () => {
  return (
    <div className="content">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default Content;
