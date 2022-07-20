import React, { useState } from 'react';
import { SpaceLetter } from '../GameSpace/SpaceWords/SpaceString/SpaceLetter';
import styles from './modaluserhelp.css';

interface IPropsModal {
  funcCheck: () => void;
  funcBtnClick: () => void;
}

export function ModalUserHelp({funcCheck, funcBtnClick}: IPropsModal) {


  return (
    <div className={styles.modal}>
      <h3 className={styles.title}>Как играть?</h3>
      <div className={styles.content}>
        <p className={styles.descr}>
          Введите слово, после подтверждения, игра его проверит и подсветит буквы:
        </p>
        <ul className={styles.list}>
          <li>
            <div className={styles.let}><SpaceLetter itemLetter='А' id={'none'} winLet='С' onActive={false} /></div> <div>- буквы нет в загаданном слове;</div>
          </li>
          <li>
            <div className={styles.let}><SpaceLetter itemLetter='А' id={'none'} winLet='С' onActive={true} /></div> <div>- буква есть в слове, но вы <b>не угадали позицию</b>;</div>
          </li>
          <li>
            <div className={styles.let}><SpaceLetter itemLetter='А' id={'none'} winLet='А' onActive={true} /></div> <div>- буква есть в слове, и она уже на <b>своем месте</b>;</div>
          </li>
        </ul>

        <div className={styles.contBtn}>
          <div className={styles.contCheck}>
              <input className={styles.check} onClick={funcCheck} type={'checkbox'} id={'check'}/> <label htmlFor={'check'}>- больше не показывать</label>
          </div>
          <button className={styles.btn} onClick={funcBtnClick}>
            Понятно
          </button>
        </div>
      </div>


    </div>
  );
}
