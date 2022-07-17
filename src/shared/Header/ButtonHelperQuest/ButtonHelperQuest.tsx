import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IconQuestion } from '../../../icons/iconQuestion';
import { rating } from '../../hooks/useRating';
import { ModalHelper } from '../../ModalHelper';
import styles from './buttonhelperquest.css';

export function ButtonHelperQuest({start = false, statusDis = false}: any) {
  let style = styles.btn;
  const dispatch = useDispatch();
  const store = useSelector((state: any) => state);
  let [onDisabled, setOnDisabled] = useState(false);
  const [onOpenModal, setOnOpenModal] = useState(false);
  const modalCont = document.querySelector('#modal');
  if (modalCont === null) return null;

  if (start) {
    style = styles.btn + ' ' + styles.start;
    onDisabled = statusDis;
    if (store.helperBtn.includes('ButtonHelperQuest')) {
      style = styles.btn + ' ' + styles.start + ' ' + styles.active;
    }
  }


  function changeActive() {
    if (!store.helperBtn.includes('ButtonHelperQuest')) {
      const array = [...store.helperBtn, 'ButtonHelperQuest'];
      dispatch({
        type: 'CHANGE_BTN_HELPER',
        helperBtn: array,
      })
    } else {
      if (store.helperBtn.length != 0) {
        const index = store.helperBtn.indexOf('ButtonHelperQuest');
        const array = [...store.helperBtn];
        array.splice(index, 1)
        dispatch({
          type: 'CHANGE_BTN_HELPER',
          helperBtn: array,
        })
      }
    }
  }

  function closeModal() {
    setOnOpenModal(false);
  }

  function activeHelper() {
    setOnOpenModal(true);
    setOnDisabled(true);

    dispatch({
      type: 'UPDATE_HELPER',
      helperAddLetter: store.helperAddLetter,
      helperMinusLetter: store.helperMinusLetter,
      stringGame: store.stringGame,
      penaltyRating: store.userStat.penaltyRating + rating.btnQuest,
    });
  }

  const topFunc = start ? changeActive : activeHelper

  return (
    <div>
      <button className={style} disabled={onDisabled} onClick={topFunc}>
        <IconQuestion />
      </button>

      {
        onOpenModal &&
        ReactDOM.createPortal(<ModalHelper title='Подсказка из словаря' text={store.helperValue} funcClose={closeModal} />, modalCont)
      }
    </div>

  );
}
