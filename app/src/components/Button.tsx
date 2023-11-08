import React from 'react';

interface ButtonProps {
  imageUrl: string;
}

const Button: React.FC<ButtonProps> = ({ imageUrl }) => {
  return (
    <button className="custom-button">
      <img
        src={imageUrl} // Используем переданное изображение
        alt="Button Icon"
        className="button-icon"
      />
    </button>
  );
};

export default Button;