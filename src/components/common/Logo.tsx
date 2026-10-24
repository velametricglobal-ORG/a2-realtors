import React from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'header';
  showText?: boolean;
  lightMode?: boolean;
  className?: string;
  customHeight?: number;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  lightMode = false,
  className = '',
  customHeight
}) => {
  const heightMap: Record<string, number> = {
    xs: 34,
    sm: 42,
    md: 54,
    lg: 68,
    xl: 86,
    header: 78
  };

  const logoHeight = customHeight || heightMap[size] || 54;
  const isHeader = size === 'header';

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
        alt="A2 Realtors — Your Trust Our Commitment"
        loading="eager"
        decoding="async"
        className={isHeader ? 'header-brand-logo-img' : ''}
        style={{
          height: logoHeight,
          width: 'auto',
          maxHeight: logoHeight,
          objectFit: 'contain',
          display: 'block',
          backgroundColor: lightMode ? '#FFFFFF' : 'transparent',
          padding: lightMode ? '4px 8px' : '0',
          borderRadius: lightMode ? 10 : 6,
          boxShadow: lightMode ? '0 4px 18px rgba(0, 0, 0, 0.3)' : 'none',
          border: lightMode ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'
        }}
      />
    </div>
  );
};

