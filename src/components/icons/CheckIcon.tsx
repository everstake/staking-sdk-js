import React from 'react';

const CheckIcon: React.FC<{color?: string}> = (props) => {
  const {color = 'rgba(var(--everstakeColorAccent), 1)'} = props;
  return <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.99997 16.17L4.82997 12L3.40997 13.41L8.99997 19L21 7L19.59 5.59L8.99997 16.17Z' fill={color}/>
  </svg>;
};

export default CheckIcon;
