import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  lightMode?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true, lightMode = false }) => {
  const iconHeight = size === 'sm' ? 36 : size === 'md' ? 44 : 56;
  const textColor = lightMode ? '#FFFFFF' : '#386635';

  return (
    <div className="flex items-center gap-2.5" style={{ cursor: 'pointer' }}>
      
      {/* Official A2 Realtors Skyline + Mountain Logo SVG */}
      <svg 
        height={iconHeight} 
        viewBox="0 0 400 320" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Mountain Contour Lines */}
        <path 
          d="M20 230 L115 175 L180 200 L235 160 L300 200 L380 230 L380 240 L220 240 L180 215 L130 240 L20 240 Z" 
          fill="#386635" 
        />
        <path 
          d="M40 240 C100 200 160 210 200 230 C250 190 310 200 360 240" 
          stroke="#386635" 
          strokeWidth="12" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Central High-Rise Tower with Pointed Crown */}
        <path d="M170 80 L195 40 L220 80 L220 210 L170 210 Z" fill="#386635" />
        <polygon points="195,58 185,78 205,78" fill="#FAFAFA" />

        {/* Left Side Buildings */}
        <path d="M135 120 L162 105 L162 215 L135 215 Z" fill="#386635" />
        <path d="M110 145 L130 135 L130 220 L110 220 Z" fill="#386635" />

        {/* Right Side Buildings */}
        <path d="M228 105 L255 120 L255 215 L228 215 Z" fill="#386635" />
        <path d="M260 135 L280 145 L280 220 L260 220 Z" fill="#386635" />

        {/* Architectural Windows Highlight Cutouts */}
        <line x1="195" y1="95" x2="195" y2="200" stroke="#FAFAFA" strokeWidth="4" />
        <line x1="148" y1="125" x2="148" y2="200" stroke="#FAFAFA" strokeWidth="3" />
        <line x1="242" y1="125" x2="242" y2="200" stroke="#FAFAFA" strokeWidth="3" />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span 
            style={{ 
              fontFamily: 'Outfit, sans-serif', 
              fontWeight: 900, 
              fontSize: size === 'sm' ? '1.15rem' : size === 'md' ? '1.35rem' : '1.75rem', 
              color: textColor, 
              letterSpacing: '0.04em', 
              lineHeight: 1 
            }}
          >
            A2 REALTORS
          </span>
          <span 
            style={{ 
              fontSize: '0.58rem', 
              fontWeight: 700, 
              color: lightMode ? 'rgba(255,255,255,0.75)' : '#64748B', 
              letterSpacing: '0.12em', 
              textTransform: 'uppercase', 
              marginTop: 2 
            }}
          >
            Dehradun Property Partner
          </span>
        </div>
      )}

    </div>
  );
};
