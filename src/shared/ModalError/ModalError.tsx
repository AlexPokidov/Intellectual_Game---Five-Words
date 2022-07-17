import React from 'react';
import styles from './modalerror.css';

export function ModalError({error}: any) {
  return (
    <div className={styles.modal}>
      {
        !error &&
        <span className={styles.text}>
          К сожалению, мы пока не знаем это слово. Или вы ввели не существительное.
        </span>
      }

      {
        error &&
        <span className={styles.text}>Произошла ошибка, проверьте соединение с интернетом, и повторите попытку...</span>
      }
    </div>
  );
}
