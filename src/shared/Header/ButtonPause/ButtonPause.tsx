import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { randomWinWord } from '../../../App';
import { arrayWord } from '../../../assets/dictionary/dictionWordFive';
import { IconPause } from '../../../icons/iconPause';
import { ModalFinish } from '../../ModalFinish';
import styles from './buttonpause.css';

export function ButtonPause() {
  const [onPause, setOnPause] = useState(false);
  const modalCont = document.querySelector('#modal');
  const dispatch = useDispatch();

  function onModal() {
    onPause ? setOnPause(false) : setOnPause(true)
  }

  function resetGame() {
    dispatch({
      type: 'RESET_GAME',
      active: {},
    })
  }

  if (modalCont === null) return null;
  return (
    <div>
      <button className={styles.btn} onClick={onModal}>
      <IconPause />
      </button>

      {
        onPause &&
        ReactDOM.createPortal(<ModalFinish funcResetGame={resetGame} textBtn='Начать сначала' title='Меню' funcOpen={onModal} />, modalCont)
      }

    </div>

  );
}
