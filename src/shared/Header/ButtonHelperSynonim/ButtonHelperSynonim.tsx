import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IconSynonim } from '../../../icons/iconSynonim';
import { rating } from '../../hooks/useRating';
import { useSynonim } from '../../hooks/useSynonim';
import { ModalHelper } from '../../ModalHelper';
import styles from './buttonhelpersynonim.css';

export function ButtonHelperSynonim({start = false, statusDis = false}: any) {
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
    if (store.helperBtn.includes('ButtonHelperSynonim')) {
      style = styles.btn + ' ' + styles.start + ' ' + styles.active;
    }
  }

  function closeModal() {
    setOnOpenModal(false);
  }

  async function generateHelper() {
    const result = await useSynonim(store.winWord);

    if (result.length === 0) {
      setText('К сожалению, мы не смогли найти синонимы к загаданному слову.');
      return;
    }

    let stringSin = '';

    result.forEach((el: any) => {
      stringSin += ` ~${el.toLocaleUpperCase()}~`;
    })

    setText(`Мы нашли синонимы: ${stringSin}`);

    dispatch({
      type: 'UPDATE_HELPER',
      helperAddLetter: store.helperAddLetter,
      helperMinusLetter: store.helperMinusLetter,
      stringGame: store.stringGame,
      penaltyRating: store.userStat.penaltyRating + rating.btnSinonim,
    });
  }

  async function activeHelper() {
    await generateHelper();
    setOnOpenModal(true);
    setOnDisabled(true);
  }

  const topFunc = start ? changeActive : activeHelper


  function changeActive() {
    if (!store.helperBtn.includes('ButtonHelperSynonim')) {
      const array = [...store.helperBtn, 'ButtonHelperSynonim'];
      dispatch({
        type: 'CHANGE_BTN_HELPER',
        helperBtn: array,
      })
    } else {
      if (store.helperBtn.length != 0) {
        const index = store.helperBtn.indexOf('ButtonHelperSynonim');
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
      <IconSynonim />
      </button>

      {
        onOpenModal &&
        ReactDOM.createPortal(<ModalHelper title='Подсказка из Яндекса' text={text} funcClose={closeModal} />, modalCont)
      }
    </div>

  );
}
