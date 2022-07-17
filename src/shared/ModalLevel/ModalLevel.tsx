import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { arrayWordLevel } from '../../assets/dictionary/dictionWordFive';
import styles from './modallevel.css';

export function ModalLevel({funcClose}: any) {
  const listLevel: any = [];
  const state = useSelector((state: any) => state);

  arrayWordLevel.forEach((el, index) => {
    let style = `${styles.level}`

    if (state.userStat.level === index) {
      style = `${styles.level} ${styles.levelActive}`
    } else if (state.userStat.level > index) {
      style = `${styles.level} ${styles.levelWin}`
    }

    listLevel.push(
      <div key={el.word} className={style}>
        {index + 1}
        {
          state.userStat.level < index &&
          <svg className={styles.svg} version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="30px" height="30px" viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet">

          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
          fill="#000000" stroke="none">
          <path d="M2460 4849 c-222 -20 -431 -115 -597 -273 -141 -133 -240 -301 -289
          -491 -23 -87 -27 -127 -31 -306 l-6 -206 -96 -6 c-351 -21 -633 -257 -721
          -601 -19 -77 -20 -110 -20 -1046 0 -1101 -5 -1036 87 -1220 40 -81 62 -109
          148 -195 86 -86 114 -108 195 -148 187 -93 95 -87 1405 -87 730 0 1174 4 1215
          10 261 41 471 193 586 425 88 179 84 118 84 1209 0 930 -1 964 -20 1046 -55
          228 -209 419 -425 526 -112 55 -183 74 -307 81 l-98 6 0 166 c0 183 -16 306
          -53 416 -52 153 -118 263 -223 375 -222 235 -514 346 -834 319z m322 -353
          c104 -36 174 -82 263 -171 87 -87 137 -168 175 -290 20 -60 24 -99 28 -268 l4
          -197 -693 2 -694 3 1 185 c0 208 11 265 70 386 66 133 180 247 319 317 154 77
          362 90 527 33z m1005 -1267 c161 -55 284 -200 313 -369 8 -45 10 -340 8 -980
          l-3 -915 -24 -60 c-71 -177 -213 -292 -392 -315 -97 -12 -2159 -13 -2256 0
          -180 23 -324 138 -394 315 l-24 60 -3 915 c-2 655 0 932 8 975 32 165 146 300
          312 368 53 22 53 22 1178 27 619 3 1147 4 1174 2 28 -3 74 -13 103 -23z"/>
          <path d="M2490 2609 c-189 -21 -369 -148 -453 -322 -45 -93 -61 -162 -60 -267
          0 -175 77 -332 218 -447 49 -40 166 -103 193 -103 9 0 12 -39 12 -163 0 -151
          2 -167 23 -207 31 -59 76 -82 147 -78 67 5 102 27 130 84 18 35 20 60 20 202
          0 125 3 162 13 162 25 0 153 68 195 103 138 116 214 273 215 446 1 170 -53
          303 -172 422 -132 132 -292 188 -481 168z m180 -341 c131 -56 194 -222 132
          -350 -44 -89 -149 -158 -242 -158 -97 0 -213 79 -247 168 -46 121 3 264 111
          327 79 46 160 50 246 13z"/>
          </g>
          </svg>
        }
      </div>
    )
  })

  useEffect(() => {
    function handleClick(el: any) {
      const element = document.querySelector(`.${styles.modal}`);
      if (element === null) return;
      if (!element.contains(el.target)) {
        funcClose();
      }
    }
    document.addEventListener('click', handleClick);

    return function cleanup() {
      document.removeEventListener('click', handleClick)
    }
  })
  return (
    <div className={styles.modal}>
      <h2 className={styles.title}>Уровни Прогрессии:</h2>

      <div className={styles.contLevel}>
        {listLevel}
      </div>

      <button className={styles.btn} onClick={funcClose}>Ок</button>
    </div>
  );
}
