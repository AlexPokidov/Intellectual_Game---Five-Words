import React from 'react';
import styles from './modalloader.css';

interface IModalLoader {
  word: string,
}

export function ModalLoader({word}: IModalLoader) {
  const wordResult = word.toLocaleUpperCase();
  return (
    <div className={styles.modal}>
      <h5 className={styles.title}>
        Проверяем слово
      </h5>
      <div className={styles.contLoader}>
        <div className={styles.loader}>{wordResult[0]}</div>
        <div className={styles.loader}>{wordResult[1]}</div>
        <div className={styles.loader}>{wordResult[2]}</div>
        <div className={styles.loader}>{wordResult[3]}</div>
        <div className={styles.loader}>{wordResult[4]}</div>
      </div>
    </div>
  );
}
