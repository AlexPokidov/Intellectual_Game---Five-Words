import React, { useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { rating } from '../../hooks/useRating';
import { ModalError } from '../../ModalError';
import { ModalFinish } from '../../ModalFinish';
import { SpaceString } from './SpaceString';
import styles from './spacewords.css';

export function SpaceWords() {
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [statusString, setStatusString] = useState(1);
  const userWord: string = state.key;
  const stat = statusString > state.stringGame || state.statusWin;
  const [openModalFinish, setOpenModalFinish] = useState(false);
  const [onModalError, setOnModalError] = useState(false);
  const modalCont = document.querySelector('#modal');
  const [valueFinish, setValueFinish] = useState({
    title: '',
    stat: {},
    textBtn: ''
  })

  const handleCloseModal = () => {
    setOpenModalFinish(false)
    setStatusString(0)
    setValueFinish({
      title: '',
      stat: {},
      textBtn: ''
    })
    dispatch({
      type: 'CHANGE_STATUS_WIN',
      action: {
        statusWin: false
      }
    })
  }

  if (modalCont === null) return null;

  useEffect(() => {
    if (onModalError) {
      setTimeout(() => {
        setOnModalError(false)
      }, 2500);
    }

    if (stat && !openModalFinish && state.timerValue.timerStop === 0) {
      const timeDate = Math.trunc((Number(Date.now()) - Number(state.timerValue.timerStart)) / 1000);
      let level = state.userStat.level;
      let ratingValue = rating.bonusWord;
      console.log(timeDate)
      if (state.statusWin && statusString < (state.stringGame + 1)) {
        let objHardWord = state.userStat.hardWord;
        if (timeDate > state.userStat.hardWord.time) {
          objHardWord = {
            time: timeDate,
            word: state.winWord,
          }
        }

        if (state.modeGame === 'prog') {
          if (state.userStat.saveLevel === level) {
            ratingValue += rating.bonusLevel;
          }
          level += 1;
          ratingValue += (rating.bonusHardLevel * Math.floor(level / 5));
        }

        setValueFinish({
          title: 'Победа',
          stat: {},
          textBtn: 'Продолжить',
        })

        dispatch({
          type: 'UPDATE_TIMER',
          timerValue: {
            id: false,
            timerStart: state.timerValue.timerStart,
            timerStop: Date.now(),
          },
        })

        const objStat = {
          countWord: state.userStat.countWord + 1,
          rating: state.userStat.rating + ratingValue,
          penaltyRating: state.userStat.penaltyRating,
          timeToGame: state.userStat.timeToGame + timeDate,
          saveWord: state.userStat.saveWord + statusString,
          level: level,
          saveLevel: level,
          hardWord: objHardWord,
          userHelpSpec: state.userStat.userHelpSpec,
        };

        /*Сохраняем объект в LocalStorage*/
        localStorage.setItem(state.nameUser, JSON.stringify(objStat));

        /*Сохраняем в Redux*/
        dispatch({
          type: 'UPDATE_STAT_USER',
          action: {
            userStat: objStat,
          }
        });

      } else {
        level = state.modeGame === 'prog' ? level - (level % 5) : level;
        setValueFinish({
          title: 'Поражение',
          stat: {},
          textBtn: 'Сыграть еще раз',
        })

        const objStat = {
          countWord: state.userStat.countWord,
          rating: state.userStat.rating,
          penaltyRating: state.userStat.penaltyRating,
          timeToGame: state.userStat.timeToGame + timeDate,
          saveWord: state.userStat.saveWord + statusString,
          level: level,
          saveLevel: state.userStat.saveLevel,
          hardWord: state.userStat.hardWord,
          userHelpSpec: state.userStat.userHelpSpec,
        };

        /*Сохраняем объект в LocalStorage*/
        localStorage.setItem(state.nameUser, JSON.stringify(objStat));

        /*Сохраняем в Redux*/
        dispatch({
          type: 'UPDATE_STAT_USER',
          action: {
            userStat: objStat,
          }
        });

        dispatch({
          type: 'UPDATE_TIMER',
          timerValue: {
            id: false,
            timerStart: state.timerValue.timerStart,
            timerStop: Date.now(),
          },
        })
      }

      setOpenModalFinish(stat)
    }

    if (state.resetGame) {
      setStatusString(state.statusString);
    }

    function handlerDown(e: any) {
      if (String(e.key).match(/[a-zA-Z_]/) && String(e.key).length === 1) {
        setOnModalError(true);
      }
      localStorage.setItem('saveState', JSON.stringify(state));
      if (String(e.key) === 'Enter' && state.key.length === 5) {
        dispatch({
          type: 'CHANGE_STATUS_TOUCH_ENTER',
          touchEnter: true,
        })
      } else {
        if (state.touchEnter) {
          dispatch({
            type: 'CHANGE_STATUS_TOUCH_ENTER',
            touchEnter: false,
          })
        }
      }
      if (!String(e.key).match(/[а-яА-Я_]/) && String(e.key) !== 'Backspace' || state.statusWin || statusString === 0) {
        return
      }

      if (userWord.length && String(e.key) === 'Backspace') {
        const key = userWord.length === 1 ? '' : userWord.substring(0, (userWord.length - 1))

        dispatch({
          type: 'USER_WORD',
          action: {
            key,
            statusString,
          }
        })

        return
      }

      if (userWord.length === 5) return

      if (String(e.key) !== 'Backspace') {
        const key = userWord + String(e.key).toUpperCase()

        dispatch({
          type: 'USER_WORD',
          action: {
            key,
            statusString,
          }
        })
      }
    }

    /*Обработчик ввода с клавиатуры*/
    document.addEventListener('keydown', handlerDown);

    return function cleanup() {
      document.removeEventListener('keydown', handlerDown)
    }
  })

  return (
    <div className={styles.words}>
      <SpaceString id='1' active={statusString} countVal={userWord} changeString={setStatusString}/>
      <SpaceString id='2' active={statusString} countVal={userWord} changeString={setStatusString}/>
      <SpaceString id='3' active={statusString} countVal={userWord} changeString={setStatusString}/>
      <SpaceString id='4' active={statusString} countVal={userWord} changeString={setStatusString}/>
      <SpaceString id='5' active={statusString} countVal={userWord} changeString={setStatusString}/>

      {
        state.stringGame === 6 &&
        <SpaceString id='6' active={statusString} countVal={userWord} changeString={setStatusString}/>
      }
      {
        openModalFinish && ReactDOM.createPortal(<ModalFinish title={valueFinish.title} textBtn={valueFinish.textBtn} funcOpen={handleCloseModal} />, modalCont)
      }

      {
        onModalError &&
        ReactDOM.createPortal(<ModalError errorKey={true} />, modalCont)
      }
    </div>
  );
}
