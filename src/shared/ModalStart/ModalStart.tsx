import React, { useState } from 'react';
import styles from './modalstart.css';

interface IModalStart {
  funcName: (e: string) => void,
  statusError?: boolean,
}

export function ModalStart({funcName, statusError = false}: IModalStart) {
  const [value, setValue] = useState({
    value: '',
  });

  const handleInput = (e: any) => {
    setValue({value: e.target.value})
  }

  function handleSaveName() {
    localStorage.setItem('userName', value.value);
    funcName(value.value);
  }
  return (
    <div className={styles.container}>

      <div className={styles.modal}>
      <h1 className={styles.title}>Five-Words</h1>
        {
          !statusError &&
          <div className={styles.modal}>
            <span className={styles.text}>Привет, кажется, вы у нас впервые, представьтесь, пожалуйста:</span>
            <input className={styles.input} type="text" value={value.value} onChange={handleInput} />
            <button className={styles.btn} onClick={handleSaveName}>Отправить</button>
          </div>
        }

        {
          statusError &&
            <span className={styles.text}>Привет, кажется, вы переходите в альбомную ориентацию. Мы исключили переход в этот режим на вашем устройстве для обеспечения наиболее приятной игры. Пожалуйста, перейдите в портретную ориентацию.</span>
        }

      </div>
    </div>

  );
}
