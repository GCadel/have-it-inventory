import React from 'react';
import style from './Loader.module.css';

const Loader = () => {
  return (
    <div className={style['loading-container']}>
      <div className={style.loader}></div>
      <p>Loading. Please wait...</p>
    </div>
  );
};

export default Loader;
