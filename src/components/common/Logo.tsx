import React from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightMode?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  lightMode = false,
  className = ''
}) => {
  const heightMap = {
    xs: 32,
    sm: 38,
    md: 46,
    lg: 58,
    xl: 72
  };

  const logoHeight = heightMap[size] || 46;

  return (
    <div 
      className={`brand-logo-wrapper flex items-center ${className}`}
      style={{ 
        cursor: 'pointer', 
        userSelect: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1.0)';
      }}
    >
      <img
        src="/logo.png"
        alt="A2 Realtors — Dehradun Property Partner"
        style={{
          height: logoHeight,
          width: 'auto',
          maxHeight: logoHeight,
          objectFit: 'contain',
          display: 'block',
          borderRadius: lightMode ? 10 : 8,
          boxShadow: lightMode ? '0 4px 16px rgba(0, 0, 0, 0.25)' : 'none'
        }}
      />
    </div>
  );
};

