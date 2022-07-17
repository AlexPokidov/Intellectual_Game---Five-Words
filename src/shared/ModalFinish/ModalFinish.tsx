import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { randomWinWord } from '../../App';
import { arrayWord, arrayWordLevel } from '../../assets/dictionary/dictionWordFive';
import { GameStat } from './GameStat';
import styles from './modalfinish.css';

interface IPropsModalFinish {
  title: string;
  textBtn?: string;
  onFinish?: boolean;
  funcOpen: () => void;
  funcResetGame?: () => void;
}

export function ModalFinish({title, textBtn, onFinish = false, funcOpen, funcResetGame,}: IPropsModalFinish) {
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const funcReset = funcResetGame ? funcResetGame : resetGame;
  const linkUrl = funcResetGame ? '/Intellectual_Game---Five-Words' : '/Intellectual_Game---Five-Words/game';
  useEffect(() => {
    function handleClick(el: any) {
      const element = document.querySelector(`.${styles.modal}`);
      if (element === null) return;
      if (!element.contains(el.target)) {
        funcOpen();
      }
    }
    document.addEventListener('click', handleClick);

    return function cleanup() {
      document.removeEventListener('click', handleClick)
    }
  })
  function resetGame() {
    const winWord = state.modeGame === 'prog' ? arrayWordLevel[state.userStat.level].word.toLocaleUpperCase() : randomWinWord(arrayWord).toLocaleUpperCase();
    const helperValue = state.modeGame === 'prog' ? arrayWordLevel[state.userStat.level].help : '';
    dispatch({
      type: 'CONTINUE_GAME',
      winWord: winWord,
      helperValue: helperValue,
    })
    dispatch({
      type: 'UPDATE_TIMER',
      timerValue: {
        id: true,
        timerStart: 0,
        timerStop: 0,
      },
    });
    funcOpen();
  }

  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>
        {title}
      </h2>
        <div>
          <div className={styles.textStat}>
            <GameStat />
          </div>
          <Link to={linkUrl} className={styles.btnReset} onClick={funcReset}>
            {textBtn}
          </Link>
        </div>
      <button className={styles.btnClose} onClick={funcOpen}>
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="20px" height="20px" viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet">

          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="rgb(255, 209, 2)" stroke="none">
          <path d="M395 5076 c-170 -41 -316 -188 -355 -356 -28 -120 -7 -261 54 -364
          14 -23 419 -435 900 -916 l876 -875 -888 -890 c-956 -958 -930 -929 -967
          -1070 -29 -115 -13 -234 47 -347 94 -177 315 -263 549 -214 140 30 103 -3
          1054 947 484 483 885 879 890 879 5 0 406 -395 890 -879 816 -815 885 -881
          945 -909 207 -96 457 -57 600 94 135 142 166 360 78 543 -29 61 -99 133 -927
          958 l-896 891 871 874 c543 544 881 890 897 918 44 78 60 152 55 259 -6 115
          -30 185 -93 269 -123 163 -346 232 -540 166 -111 -37 -161 -84 -1029 -953
          l-850 -850 -875 872 c-941 936 -918 916 -1056 952 -69 18 -160 18 -230 1z"/>
          </g>
        </svg>
      </button>
    </div>
  );
}
