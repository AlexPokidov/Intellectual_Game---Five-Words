import React from 'react';
import styles from './modalerror.css';

interface IPropError {
  error?: boolean;
  errorKey?: boolean;
}

export function ModalError({error, errorKey = false}: IPropError) {
  return (
    <div className={styles.modal}>
      {
        !error && !errorKey &&
        <span className={styles.text}>
          К сожалению, мы пока не знаем это слово. Или вы ввели не существительное.
        </span>
      }

      {
        error && !errorKey &&
        <span className={styles.text}>Произошла ошибка, проверьте соединение с интернетом, и повторите попытку...</span>
      }

      {
        errorKey &&
        <span className={styles.text}>
          Пожалуйста, поменяйте язык ввода на русский.
        </span>
      }
    </div>
  );
}
