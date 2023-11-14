import './css/Button.css'

import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  imageUrl: string;
  to: string;
}

const Button: React.FC<ButtonProps> = ({ imageUrl, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button className="custom-button" onClick={handleClick}>
      <img src={imageUrl} alt="Button Icon" className="button-icon" />
    </button>
  );
};

export default Button;