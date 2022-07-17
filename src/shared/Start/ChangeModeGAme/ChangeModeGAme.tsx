import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { randomWinWord } from '../../../App';
import { arrayWord, arrayWordLevel } from '../../../assets/dictionary/dictionWordFive';
import { ModalLevel } from '../../ModalLevel';
import styles from './changemodegame.css';

export function ChangeModeGAme() {
  const state = useSelector((store: any) => store);
  const [onModal, setOnModal] = useState(true);
  const dispatch = useDispatch();
  let styleBtnOne = `${styles.btnOne}`
  let styleBtnTwo = `${styles.btnTwo}`

  const modalCont = document.querySelector('#modal');

  if (modalCont === null) return null;

  if (state.modeGame === 'random') {
    styleBtnOne = `${styles.btnOne} ${styles.active}`
  } else {
    styleBtnTwo = `${styles.btnTwo} ${styles.active}`
  }

  function handleClickProg() {
    dispatch({
      type: 'UPDATE_MODE_GAME',
      modeGame: 'prog',
      winWord: arrayWordLevel[state.userStat.level].word.toLocaleUpperCase(),
      helperValue: arrayWordLevel[state.userStat.level].help,
    })

    setOnModal(true)
  }

  function closeModal() {
    setOnModal(false)
  }

  function openModal() {
    setOnModal(true)
  }

  function handleClickRandom() {
    dispatch({
      type: 'UPDATE_MODE_GAME',
      modeGame: 'random',
      winWord: randomWinWord(arrayWord),
    })

    setOnModal(false)
  }
  return (
    <div className={styles.container}>
      <button className={styleBtnOne} onClick={handleClickRandom}>
        Случайное слово
      </button>

      <button className={styleBtnTwo} onClick={handleClickProg}>
        Прогрессия
      </button>

      {
        state.modeGame === 'prog' &&
        <div>
        <button className={styles.btnLvl} onClick={openModal}>
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="20px" height="20px" viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet">

          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="#FFF502" stroke="none">
          <path d="M2945 5107 c-16 -7 -40 -18 -53 -25 -31 -18 -1224 -1451 -1246 -1495
          -36 -77 -7 -206 60 -269 60 -54 91 -58 489 -58 l365 0 0 -1165 0 -1165 -603 0
          c-542 0 -605 -2 -626 -16 -13 -9 -160 -181 -327 -382 l-304 -364 0 -50 c0 -43
          4 -54 34 -84 l34 -34 1311 0 c1454 0 1368 -4 1396 64 13 31 15 251 15 1615 l0
          1580 383 3 c374 3 383 3 424 25 112 61 158 211 95 313 -16 26 -297 369 -625
          762 -554 664 -600 717 -646 737 -55 23 -128 27 -176 8z"/>
          </g>
          </svg>
        </button>
        {
          state.modeGame === 'prog' && onModal &&
          <div>
            {ReactDOM.createPortal(<ModalLevel funcClose={closeModal} />, modalCont)}
          </div>
        }

        </div>

      }
    </div>
  );
}
