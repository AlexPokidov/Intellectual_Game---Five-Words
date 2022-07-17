import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IconPlusLetter } from '../../../icons/iconPlusLetter';
import { rating } from '../../hooks/useRating';
import { ModalHelper } from '../../ModalHelper';
import styles from './buttonhelperplusletter.css';

export function ButtonHelperPlusLetter({start = false, statusDis = false}: any) {
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
    if (store.helperBtn.includes('ButtonHelperPlusLetters')) {
      style = styles.btn + ' ' + styles.start + ' ' + styles.active;
    }
  }

  function closeModal() {
    setOnOpenModal(false);
  }

  function activeHelper() {
    generateHelper()
    setOnOpenModal(true);
    setOnDisabled(true);
  }

  function generateHelper() {
    let indexLetter: any;

    for (let i = 0; i < 100; i++) {
      indexLetter = Math.floor(Math.random() * 5);
      if (store.winLetter.includes(store.winWord[indexLetter])) {
        indexLetter = null;
        continue;
      } else {
        break;
      }
    }

    if (indexLetter === null) {
      setText('Уже угаданы все буквы, вероятно, осталось расставить их по местам.')
      return
    }

    setText(`Мы нашли букву ~${store.winWord[indexLetter]}~ на позиции ${indexLetter + 1}`)
    dispatch({
      type: 'UPDATE_HELPER',
      helperAddLetter: {
        letter: `${store.winWord[indexLetter]}`,
        index: indexLetter + 1,
      },
      helperMinusLetter: store.helperMinusLetter,
      stringGame: store.stringGame,
      penaltyRating: store.userStat.penaltyRating + rating.btnPlusLetter,
    })

    return
  }

  const topFunc = start ? changeActive : activeHelper

  function changeActive() {
    if (!store.helperBtn.includes('ButtonHelperPlusLetters')) {
      const array = [...store.helperBtn, 'ButtonHelperPlusLetters'];
      dispatch({
        type: 'CHANGE_BTN_HELPER',
        helperBtn: array,
      })
    } else {
      if (store.helperBtn.length != 0) {
        const index = store.helperBtn.indexOf('ButtonHelperPlusLetters');
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
        <IconPlusLetter />
      </button>

      {
        onOpenModal &&
        ReactDOM.createPortal(<ModalHelper title='Подсказка из алфавита' text={text} funcClose={closeModal} />, modalCont)
      }
    </div>

  );
}
