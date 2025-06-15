
import React from 'react';

const PandaLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <circle cx="35" cy="35" r="15" fill="black" />
    <circle cx="65" cy="35" r="15" fill="black" />
    <circle cx="50" cy="50" r="30" fill="white" stroke="black" strokeWidth="2" />
    <circle cx="40" cy="50" r="5" fill="black" />
    <circle cx="60" cy="50" r="5" fill="black" />
    <path d="M45 65 Q50 70 55 65" stroke="black" strokeWidth="2" fill="none" />
  </svg>
);

export default PandaLogo;
