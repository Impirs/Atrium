import './css/Sidebar.css'
import React from 'react';
import Button from './Button';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <Button imageUrl="../../assets/home.svg" to="../pages/Home.tsx" />
          </li>
          <li>
            <Button imageUrl="../../assets/calendar.svg" to="../pages/Calendar.tsx" />
          </li>
          <li>
            <Button imageUrl="../../assets/todolist.svg" to="../pages/Todo.tsx" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
