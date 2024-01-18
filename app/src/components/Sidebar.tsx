import './css/Sidebar.css'

import React from 'react';
import Button from './Button';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="../../assets/Atrium_3_64.png" alt="icon" />
      </div>
      <ul className="nav_list">
        <li>
          <Button imageUrl="../../assets/calendar.png"
            to="/calendar" />
          <span className="links_name">Calendar</span>
          <span className="tooltip">Calendar</span>
        </li>
      </ul>
      <div className="sett">
        <Button imageUrl="../../assets/settings.png"
          to="/settings" />
        <span className="links_name">Settings</span>
      </div>
    </div>
  );
};


export default Sidebar;
