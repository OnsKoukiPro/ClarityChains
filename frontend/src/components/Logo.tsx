import React from 'react';
import ClarityChainLogoWhite from 'figma:asset/8cea1a267cd31dbfc8ab290dd155e3aaf5db0a96.png';

interface LogoProps {
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'hero' | 'mega' | 'ultra';
  className?: string;
}

export function Logo({ size = 'default', className = '' }: LogoProps) {
  const sizeConfig = {
    sm: {
      height: 'h-6', // 24px
      width: 'w-auto'
    },
    default: {
      height: 'h-8', // 32px
      width: 'w-auto'
    },
    lg: {
      height: 'h-12', // 48px
      width: 'w-auto'
    },
    xl: {
      height: 'h-20', // 80px
      width: 'w-auto'
    },
    hero: {
      height: 'h-32', // 128px
      width: 'w-auto'
    },
    mega: {
      height: 'h-40', // 160px
      width: 'w-auto'
    },
    ultra: {
      height: 'h-60', // 240px
      width: 'w-auto'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src={ClarityChainLogoWhite}
        alt="ClarityChain"
        className={`${config.height} ${config.width} object-contain bg-transparent`}
      />
    </div>
  );
}