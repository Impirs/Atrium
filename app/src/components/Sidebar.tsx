import './css/Sidebar.css'
import React from 'react';
import Button from './Button';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Button imageUrl="../../assets/home.svg" to="../pages/Home" />
          </li>
          <li>
            <Button imageUrl="../../assets/calendar.svg" to="../pages/Calendar" />
          </li>
          <li>
            <Button imageUrl="../../assets/todolist.svg" to="../pages/Todo" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
