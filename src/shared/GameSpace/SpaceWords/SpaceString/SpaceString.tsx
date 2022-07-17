import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useCheckWord } from '../../../hooks/useCheckWord';
import { ModalError } from '../../../ModalError';
import { ModalFinish } from '../../../ModalFinish';
import { ModalLoader } from '../../../ModalLoader';
import { SpaceLetter } from './SpaceLetter';
import styles from './spacestring.css';

interface IPropsString {
  active: number;
  id: string;
  countVal: string;
  changeString: any;
}

export function SpaceString({active, id, countVal, changeString}: IPropsString) {
  let style = styles.string +' '+ styles.stringActive;
  let [valueString, setValueString] = useState('');
  let timerID;

  const [statusError, setStatusError] = useState(false);
  const [errorLink, setErrorLink] = useState(false);
  const [onModalDown, setOnModalDown] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state: any) => state)
  const winLet = store.winWord;

  const modalCont = document.querySelector('#modal');

  if (modalCont === null) return null;

  if (active !== Number(id)) {
    countVal = ''
    style = styles.string;
  }

  if (statusError && countVal.length !== 5) {
    setStatusError(false)
    clearTimeout(timerID);
  }

  if (statusError) {
    style = styles.string +' '+ styles.stringError;
    timerID = setTimeout(() => {
      setStatusError(false)
    }, 2500)
  }

  if (errorLink) {
    timerID = setTimeout(() => {
      setErrorLink(false);
    }, 2500)
  }

  const onBtn = countVal.length === 5;

  async function handleClickSaveWord() {
    const result = await useCheckWord(countVal, setOnModalDown)
    if (result === false) {
      setStatusError(true)
      return;
    }

    if (result === 'error') {
      setErrorLink(true);
      return;
    }

    setValueString(countVal)
    const key = '';

    const statusWin = store.winWord === countVal;
    let inputLetter = [...store.inputLetter];
    let winLetter = [...store.winLetter];

    for(let i = 0; i < countVal.length; i++) {
      if (!inputLetter.includes(countVal[i])) {
        inputLetter.push(countVal[i])
      }

      if (!winLetter.includes(countVal[i]) && store.winWord.includes(countVal[i])) {
        winLetter.push(countVal[i])
      }
    }

    dispatch({
      type: `SAVE_WORD`,
      action: {
        key,
        statusString: Number(id) + 1,
        statusWin,
        inputLetter: inputLetter,
        winLetter: winLetter,
      }
    })

    changeString(Number(id) + 1);
  }

  useEffect(() => {
    if (store.touchEnter && active === Number(id)) {
      handleClickSaveWord()
      dispatch({
        type: 'CHANGE_STATUS_TOUCH_ENTER',
        touchEnter: false,
      })
    }
    if (store.resetGame) {
      setValueString('')
    }
  })



  if (valueString.length === 0) {
    valueString = countVal
  }

  if (id === '6') {
    style += ` ${styles.helperString}`;
  }

  return (
      <div className={styles.container}>
        <div className={style}>
        <SpaceLetter id = {`${id}1`} itemLetter = {valueString[0]} winLet = {winLet[0]}/>
        <SpaceLetter id = {`${id}2`} itemLetter = {valueString[1]} winLet = {winLet[1]}/>
        <SpaceLetter id = {`${id}3`} itemLetter = {valueString[2]} winLet = {winLet[2]}/>
        <SpaceLetter id = {`${id}4`} itemLetter = {valueString[3]} winLet = {winLet[3]}/>
        <SpaceLetter id = {`${id}5`} itemLetter = {valueString[4]} winLet = {winLet[4]}/>
        </div>
        {
          onBtn &&
          <button className={styles.btn} onClick={handleClickSaveWord}>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="20px" height="20px" viewBox="0 0 256.000000 256.000000"
              preserveAspectRatio="xMidYMid meet">

              <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
              fill="rgb(255, 209, 2)" stroke="none">
              <path d="M1666 1651 c-350 -395 -643 -721 -651 -725 -27 -10 -48 5 -215 158
              -269 246 -281 256 -317 271 -49 21 -139 19 -188 -4 -49 -23 -99 -74 -119 -123
              -21 -49 -20 -134 2 -180 9 -21 160 -213 336 -427 349 -428 352 -431 456 -431
              61 0 123 26 162 67 47 51 1268 2029 1268 2055 0 33 -29 58 -67 58 -28 0 -86
              -62 -667 -719z"/>
              </g>
            </svg>
          </button>
        }

        {
          statusError &&  ReactDOM.createPortal(<ModalError error={false} />, modalCont)
        }

        {
          errorLink && ReactDOM.createPortal(<ModalError error={true} />, modalCont)
        }

        {
          onModalDown &&  ReactDOM.createPortal(<ModalLoader word={countVal} />, modalCont)
        }

        {
          active === Number(id) && store.helperMinusLetter != '' &&
          <SpaceLetter id={'phantom'} itemLetter = {store.helperMinusLetter} winLet = {''} />
        }
    </div>

  );
}
