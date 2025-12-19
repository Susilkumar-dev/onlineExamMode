import React from 'react';

const GlassCard = ({ 
  children, 
  className = '', 
  padding = 'medium',
  hover = true,
  onClick
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  const hoverClass = hover ? 'hover-lift cursor-pointer' : '';

  return (
    <div 
      onClick={onClick}
      className={`glass-panel rounded-2xl ${paddingClasses[padding]} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;