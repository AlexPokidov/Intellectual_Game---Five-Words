import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { arrayAlpabet } from '../../../assets/dictionary/dictionWordFive';
import { IconMinusBtnLetter } from '../../../icons/iconMinusBtnLetter';
import { rating } from '../../hooks/useRating';
import { ModalHelper } from '../../ModalHelper';
import styles from './buttonhelperminusletters.css';

export function ButtonHelperMinusLetters({start = false, statusDis = false}: any) {
  let style = styles.btn;
  const dispatch = useDispatch();
  const store = useSelector((state: any) => state);
  let [onDisabled, setOnDisabled] = useState(false);
  const [onOpenModal, setOnOpenModal] = useState(false);
  const modalCont = document.querySelector('#modal');
  const [text, setText] = useState('');
  if (modalCont === null) return null;

  if (start) {
    style = styles.btn + ' ' + styles.start;
    onDisabled = statusDis;
    if (store.helperBtn.includes('ButtonHelperMinusLetters')) {
      style = styles.btn + ' ' + styles.start + ' ' + styles.active;
    }
  }

  function closeModal() {
    setOnOpenModal(false);
  }

  function activeHelper() {
    generateHelper();
    setOnOpenModal(true);
    setOnDisabled(true);
  }

  function generateHelper() {
    let indexLetter: any;

    for(let i = 0; i < 100; i++) {
      indexLetter = Math.floor(Math.random() * arrayAlpabet.length);

      if (!store.winWord.includes(arrayAlpabet[indexLetter])) {
        break
      }
    }

    dispatch({
      type: 'UPDATE_HELPER',
      helperAddLetter: store.helperAddLetter,
      helperMinusLetter: `${arrayAlpabet[indexLetter]}`,
      stringGame: store.stringGame,
      penaltyRating: store.userStat.penaltyRating + rating.btnMinusLetter,
    })

    setText(`Мы точно знаем, что буквы ~"${arrayAlpabet[indexLetter]}"~ нет в загаданном слове.`)
  }

  const topFunc = start ? changeActive : activeHelper

  function changeActive() {
    if (!store.helperBtn.includes('ButtonHelperMinusLetters')) {
      const array = [...store.helperBtn, 'ButtonHelperMinusLetters'];
      dispatch({
        type: 'CHANGE_BTN_HELPER',
        helperBtn: array,
      })
    } else {
      if (store.helperBtn.length != 0) {
        const index = store.helperBtn.indexOf('ButtonHelperMinusLetters');
        const array = [...store.helperBtn];
        array.splice(index, 1)
        dispatch({
          type: 'CHANGE_BTN_HELPER',
          helperBtn: array,
        })
      }
    }
  }

  return (
    <div>
      <button className={style} disabled={onDisabled} onClick={topFunc}>
      <IconMinusBtnLetter />
      </button>

      {
        onOpenModal &&
        ReactDOM.createPortal(<ModalHelper title='Подсказка от Архитектора' text={text} funcClose={closeModal} />, modalCont)
      }
    </div>

  );
}
