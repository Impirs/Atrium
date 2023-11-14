import './css/Sidebar.css'

import React from 'react';

import Button from './Button';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul className="nav_list">
        <li>
          <Button imageUrl="../../assets/home.png"  
            to="../pages/Home"/>
          <span className="links_name">Home</span>
          <span className="tooltip">Home</span>
        </li>
        <li>
          <Button imageUrl="../../assets/calendar.png" 
            to="../pages/Calendar"/>
          <span className="links_name">Calenar</span>
          <span className="tooltip">Calendar</span>
        </li>
        <li>
          <Button imageUrl="../../assets/check.png" 
            to="../pages/Todo"/>
          <span className="links_name">Todo</span>
          <span className="tooltip">Todo</span>
        </li>
      </ul>
      <div className="sett">
        <Button imageUrl="../../assets/settings.png"  
            to="../pages/Settings"/>
        <span className="links_name">Settings</span>
      </div>
    </div>
  );
};

export default Sidebar;
