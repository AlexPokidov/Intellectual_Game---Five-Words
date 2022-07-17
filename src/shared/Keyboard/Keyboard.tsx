import React from 'react';
import { arrayAlpabet } from '../../assets/dictionary/dictionWordFive';
import styles from './keyboard.css';
import { KeyButton } from './KeyButton';

const arrayBtn: any[] = [];

arrayAlpabet.forEach((el: string) => {
  arrayBtn.push(
    <KeyButton key={el} value={el} />
  )
})

export function Keyboard() {
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  const orientation = width > height;
  return (
    <div>
      {
        !orientation &&
        <div className={styles.keyboard}>
          <div className={styles.line}>{arrayBtn.slice(0,12)}</div>
          <div className={styles.line}>{arrayBtn.slice(12,23)}</div>
          <div className={styles.line}><KeyButton value={'Backspace'} />{arrayBtn.slice(23)}<KeyButton value={'Enter'} /></div>
        </div>
      }

      { orientation &&
        <div>
          <div className={styles.left}>
            <div className={styles.line}>{arrayBtn.slice(0,5)}</div>
            <div className={styles.line}>{arrayBtn.slice(12,17)}</div>
            <div className={styles.line}><KeyButton value={'Backspace'} />{arrayBtn.slice(23,28)}</div>
          </div>

          <div className={styles.right}>
            <div className={styles.line}>{arrayBtn.slice(5,12)}</div>
            <div className={styles.line}>{arrayBtn.slice(17,23)}</div>
            <div className={styles.line}>{arrayBtn.slice(28)}<KeyButton value={'Enter'} /></div>
          </div>
        </div>
      }
    </div>

  );
}
