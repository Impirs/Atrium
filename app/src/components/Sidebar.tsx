import './css/Sidebar.css'
import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul className="nav_list">
        <li>
          <Link to="../pages/Home">
            <Button imageUrl="../../assets/home.svg" />
            <span className="links_name">Home</span>
          </Link>
          <span className="tooltip">Home</span>
        </li>
        <li>
          <Link to="../pages/Calendar">
            <Button imageUrl="../../assets/calendar.svg" />
            <span className="links_name">Calenar</span>
          </Link>
          <span className="tooltip">Calendar</span>
        </li>
        <li>
          <Link to="../pages/Todo">
            <Button imageUrl="../../assets/todolist.svg" />
            <span className="links_name">Todo</span>
          </Link>
          <span className="tooltip">Todo</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

