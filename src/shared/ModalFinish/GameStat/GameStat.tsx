import React from 'react';
import { useSelector } from 'react-redux';
import styles from './gamestat.css';

export function GameStat() {
  const listArrayLetter: any = [];
  const listArrayWinLetter: any = [];
  const state = useSelector((state): any => state);
  const stat = {
    modeGame: state.modeGame === 'random' ? 'Случайное слово' : 'Прогрессия',
    string: state.stringGame - (state.statusString - 1),
    level: state.timerValue.id ? state.userStat.level + 1 : state.userStat.level,
  }

  state.inputLetter.forEach((el: string) => {
    listArrayLetter.push(
      <div key={el} className={`${styles.letter}`}>
        {el}
      </div>
    )
  })

  state.winLetter.forEach((el: string) => {
    listArrayWinLetter.push(
      <div key={el} className={`${styles.letter}  ${styles.letterWin}`}>
        {el}
      </div>
    )
  })
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.text}>
             Режим игры:
          </div>
          <div className={styles.value}>
            {stat.modeGame}
          </div>
        </li>
        {
          state.modeGame === 'prog' &&
          <li className={styles.item}>
            <div className={styles.text}>
              Уровень:
            </div>
            <div className={styles.value}>
              {stat.level}
            </div>
          </li>
        }

        {
          !state.timerValue.id && state.modeGame === 'random' &&
          <li className={styles.item}>
            <div className={styles.text}>
              Было загадано слово:
            </div>
            <div className={styles.value}>
              {state.winWord}
            </div>
          </li>
        }

        <li className={styles.item}>
          <div className={styles.text}>
             Осталось попыток:
          </div>
          <div className={styles.value}>
            {`${stat.string} / ${state.stringGame}`}
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.text}>
             Символы, которые есть в слове:
          </div>
          <div className={styles.valueCont}>
            {listArrayWinLetter}
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.text}>
             Символы, которые вы уже использовали:
          </div>
          <div className={styles.valueCont}>
            {listArrayLetter}
          </div>
        </li>
      </ul>
    </div>
  );
}
