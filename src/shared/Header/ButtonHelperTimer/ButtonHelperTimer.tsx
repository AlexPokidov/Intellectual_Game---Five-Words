import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconTimer } from '../../../icons/icon-timer';
import styles from './buttonhelpertimer.css';

export function ButtonHelperTimer({start = false, statusDis = false}: any) {
  let style = styles.btn;
  const dispatch = useDispatch();
  const store = useSelector((state: any) => state);

  if (start) {
    style = styles.btn + ' ' + styles.start;
    if (store.helperBtn.includes('ButtonHelperTimer')) {
      style = styles.btn + ' ' + styles.start + ' ' + styles.active;
    }
  }


  function changeActive() {
    if (!store.helperBtn.includes('ButtonHelperTimer')) {
      const array = [...store.helperBtn, 'ButtonHelperTimer'];
      dispatch({
        type: 'CHANGE_BTN_HELPER',
        helperBtn: array,
      })
    } else {
      if (store.helperBtn.length != 0) {
        const index = store.helperBtn.indexOf('ButtonHelperTimer');
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
    <button className={style} disabled={statusDis} onClick={changeActive}>
      <IconTimer />
    </button>

  );
}
