import React from 'react';

type IconProps = {
  className?: string;
};

export const EthereumIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L5 12.5L12 16.5L19 12.5L12 2Z" fill="#8C8C8C" />
    <path d="M12 17.5L5 13.5L12 22L19 13.5L12 17.5Z" fill="#3C3C3B" />
  </svg>
);

export const PolygonIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.994 6.203L12.015 3L7.006 6.203L9.51 10.395L7.006 14.587L12.015 17.79L17.025 14.556L14.52 10.395L16.994 6.203Z"
      fill="#8247E5"
    />
  </svg>
);

export const ArbitrumIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#28A0F0" />
    <path d="M8 6L16 12L8 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
