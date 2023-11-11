import './css/Button.css'

import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  imageUrl: string;
  to: string;
}

const Button: React.FC<ButtonProps> = ({ imageUrl, to }) => {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <button className="custom-button">
        <img
          src={imageUrl}
          alt="Button Icon"
          className="button-icon"
        />
      </button>
    </Link>
  );
};

export default Button;