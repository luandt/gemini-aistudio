import React from 'react';

type IconProps = {
  className?: string;
};

export const AaveIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.992 4.469L12.008 2L8.008 4.469L12.008 6.953L15.992 4.469ZM21.992 8.219L17.992 10.703V15.719L21.992 13.234V8.219ZM16.992 11.391L13.008 13.859V22L16.992 19.531V11.391ZM11.008 13.859L7.008 11.391V19.531L11.008 22V13.859ZM6.008 10.703L2.008 8.219V13.234L6.008 15.719V10.703Z"
      fill="#B6509E"
    />
  </svg>
);

export const CompoundIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.27 15.27L12.89 17.58L8.5 15.27V10.47L12.89 8.16L17.27 10.47V15.27Z"
      fill="#00D395"
    />
  </svg>
);
