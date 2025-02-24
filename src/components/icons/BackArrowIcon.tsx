import React from 'react';

const BackArrowIcon: React.FC<{color?: string}> = (props) => {
  const {color = 'rgba(var(--everstakeColorAccent), 1)'} = props;
  return <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M15 7H3.83L8.71 2.12C9.1 1.73 9.1 1.09 8.71 0.700001C8.32 0.310001 7.69 0.310001 7.3 0.700001L0.709996 7.29C0.319996 7.68 0.319996 8.31 0.709996 8.7L7.3 15.29C7.69 15.68 8.32 15.68 8.71 15.29C9.1 14.9 9.1 14.27 8.71 13.88L3.83 9H15C15.55 9 16 8.55 16 8C16 7.45 15.55 7 15 7Z' fill={color}/>
  </svg>;
};

export default BackArrowIcon;
