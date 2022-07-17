import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { Keyboard } from '../Keyboard';
import { BtnOpenKeyboard } from './BtnOpenKeyboard';
import styles from './gamespace.css';
import { SpaceWords } from './SpaceWords';

export function GameSpace() {
  const modalCont = document.querySelector('#modal');
  const [onKeyboard, setOnKeyboard] = useState(false);
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  const orientation = width > height;

  useEffect(() => {
    if (width < 1000) {
      setOnKeyboard(true);
    }
  });

  function openKeyboard() {
    onKeyboard ? setOnKeyboard(false) : setOnKeyboard(true);
  }

  if (modalCont === null) return null;
  return (
    <div className={styles.space}>
      <SpaceWords />
      <BtnOpenKeyboard func = {openKeyboard}/>

      { onKeyboard &&
        ReactDOM.createPortal(<Keyboard />, modalCont)
      }
    </div>
  );
}
