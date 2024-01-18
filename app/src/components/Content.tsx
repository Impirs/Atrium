import './css/Content.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Calendar from '../pages/Calendar';
import Settings from '../pages/Settings';

const Content: React.FC = () => {
  return (
    <div className="content">
      <Routes>
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};

export default Content;
