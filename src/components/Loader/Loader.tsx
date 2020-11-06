import React from 'react';
import './Loader.sass';

const Loader: React.FC = () => {
  return <div className='loader'>
    <div className='loader__item'/>
    <div className='loader__item'/>
    <div className='loader__item'/>
    <div className='loader__item'/>
  </div>;
};

export default Loader;
