import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './keybutton.css';

export function KeyButton({value}: any) {
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();

  let style = styles.btn;

  let valueBtn = value;

  if (value === 'Enter') {
    style += ` ${styles.enter}`;
    valueBtn = <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="20px" height="20px" viewBox="0 0 256.000000 256.000000"
    preserveAspectRatio="xMidYMid meet">

    <g transform="translate(0.000000,256.000000) scale(0.100000,-0.100000)"
    fill="#000" stroke="none">
    <path d="M1666 1651 c-350 -395 -643 -721 -651 -725 -27 -10 -48 5 -215 158
    -269 246 -281 256 -317 271 -49 21 -139 19 -188 -4 -49 -23 -99 -74 -119 -123
    -21 -49 -20 -134 2 -180 9 -21 160 -213 336 -427 349 -428 352 -431 456 -431
    61 0 123 26 162 67 47 51 1268 2029 1268 2055 0 33 -29 58 -67 58 -28 0 -86
    -62 -667 -719z"/>
    </g>
  </svg>
  }

  if (value === 'Backspace') {
    style += ` ${styles.backspace}`;
    valueBtn = <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="30px" height="15px" viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet">

   <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
   fill="#000000" stroke="none">
   <path d="M1205 3656 c-41 -19 -1021 -1004 -1035 -1039 -14 -40 -13 -93 4 -125
   8 -15 243 -255 523 -534 428 -427 514 -508 548 -518 133 -39 246 112 177 235
   -6 11 -169 178 -361 370 l-351 350 2074 5 2075 5 27 21 c53 39 69 71 69 134 0
   63 -16 95 -69 134 l-27 21 -2077 3 -2076 2 356 358 c310 311 357 362 363 395
   25 132 -101 237 -220 183z"/>
   </g>
   </svg>
  }

  function handleClick() {
    if (value === 'Enter' && state.key.length === 5) {
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

    if (value === 'Enter') return;

    if (state.key.length && value === 'Backspace') {
      const key = state.key.length === 1 ? '' : state.key.substring(0, (state.key.length - 1))

      dispatch({
        type: 'USER_WORD',
        action: {
          key,
          statusString: state.statusString,
        }
      })

      return
    }

    if (state.key.length === 5) return

    if (value !== 'Backspace') {
      const key = state.key + value.toUpperCase()

      dispatch({
        type: 'USER_WORD',
        action: {
          key,
          statusString: state.statusString,
        }
      })
    }
  }

  if (state.inputLetter.includes(value)) {
    style += ` ${styles.btnDown}`;
  }

  if (state.winLetter.includes(value)) {
    style += ` ${styles.btnWin}`;
  }


  return (
    <button className={style} onClick={handleClick}>
      {valueBtn}
    </button>
  );
}
