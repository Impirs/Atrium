import React from 'react';
import './css/Topbar.css'

const Topbar: React.FC = () => {
  return (
    <div className="topbar">
      <div className="left-icon">
        {/* Ваша левая иконка */}
        <img src="left-icon.png" alt="Left Icon" />
      </div>
      <div className="right-icon">
        {/* Ваша правая иконка */}
        <img src="right-icon.png" alt="Right Icon" />
      </div>
    </div>
  );
};

export default Topbar;