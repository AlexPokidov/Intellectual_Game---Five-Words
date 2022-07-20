import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Keyboard } from '../Keyboard';
import { ModalUserHelp } from '../ModalUserHelp';
import { BtnOpenKeyboard } from './BtnOpenKeyboard';
import styles from './gamespace.css';
import { SpaceWords } from './SpaceWords';

export function GameSpace() {
  const state = useSelector((store: any) => store);
  const dispatch = useDispatch();
  const modalCont = document.querySelector('#modal');
  const [onKeyboard, setOnKeyboard] = useState(false);
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  const orientation = width > height;
  const [onActiveCheck, setOnActiveCheck] = useState(true);

  function handleCheck() {
    onActiveCheck ? setOnActiveCheck(false) : setOnActiveCheck(true);
  }

  function handleClickModal() {
    dispatch({
      type: 'CHANGE_STATUS_USER_HELP_SPEC',
      userStat: {
        countWord: state.userStat.countWord,
        rating: state.userStat.rating,
        penaltyRating: state.userStat.penaltyRating,
        timeToGame: state.userStat.timeToGame,
        saveWord: state.userStat.saveWord,
        level: state.userStat.level,
        saveLevel: state.userStat.saveLevel,
        hardWord: state.userStat.hardWord,
        userHelpSpec: onActiveCheck,
      },
      openuserHelpSpec: false,
    })
  }

  useEffect(() => {
    if (width < 1000) {
      setOnKeyboard(true);
    }
  });

  function openKeyboard() {
    onKeyboard ? setOnKeyboard(false) : setOnKeyboard(true);
  }

  if (modalCont === null) return null;
  return (
    <div className={styles.space}>
      <SpaceWords />
      <BtnOpenKeyboard func = {openKeyboard}/>

      { onKeyboard &&
        ReactDOM.createPortal(<Keyboard />, modalCont)
      }

      {
        state.openuserHelpSpec && state.userStat.userHelpSpec &&
        ReactDOM.createPortal(<ModalUserHelp funcCheck={handleCheck} funcBtnClick={handleClickModal} />, modalCont)
      }
    </div>
  );
}
