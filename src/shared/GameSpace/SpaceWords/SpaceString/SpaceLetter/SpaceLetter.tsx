import React from 'react';
import { useSelector } from 'react-redux';
import styles from './spaceletter.css';

interface IPropsLetter {
  itemLetter: string;
  id: string;
  winLet: string;
  onActive?: boolean;
}

export function SpaceLetter({itemLetter, id, winLet, onActive = false}: IPropsLetter) {
  let style = `${styles.letter} `;

  const state = useSelector((state: any) => state);
  // if (itemLetter) {
  //   style += ` ${styles.swashIn}`;
  // }
  if (onActive) {
    status();
  }
  function status() {
    if (state.winWord.includes(itemLetter) || onActive) {
      style = styles.letter + ' ' + styles.letter_position;
    }

    if (itemLetter === winLet) {
      style = styles.letter + ' ' + styles.letter_win;
    }
  }

  if (Number(id[0]) < Number(state.statusString)) {
    status()
  }

  if (state.helperAddLetter.index != '') {
    if (id === `${state.statusString}${state.helperAddLetter.index}`) {
      style += ` ${styles.helper}`;
    }
  }

  if (id === 'phantom') {
    style += ` ${styles.minusLetter}`;
  }

  return (
    <div id={id} className={style}>

      {
        itemLetter &&
        <div className={styles.swashIn}>{itemLetter}</div>
      }
      {
        id === `${state.statusString}${state.helperAddLetter.index}` &&
        <div className={styles.pfantom}>
          {state.helperAddLetter.letter}
        </div>
      }
    </div>
  );
}
