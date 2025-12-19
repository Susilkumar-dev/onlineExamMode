import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'medium',
  hover = false,
  shadow = 'medium'
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  const shadowClasses = {
    none: '',
    small: 'shadow',
    medium: 'shadow-lg',
    large: 'shadow-xl'
  };

  const hoverClass = hover ? 'hover:shadow-xl transition-shadow duration-300' : '';

  return (
    <div className={`bg-white rounded-xl ${paddingClasses[padding]} ${shadowClasses[shadow]} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
};

export default Card;