import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ModalFaq } from '../../ModalFaq';
import styles from './btnfaq.css';

export function BtnFaq() {
  const [onModal, setOnModal] = useState(false);
  const modalCont = document.querySelector('#modal');
  if (modalCont === null) return null;

  function openModal() {
    onModal ? setOnModal(false) : setOnModal(true);
  }
  return (
    <div className={styles.btnCont}>
      <button className={styles.btn} onClick={openModal}>
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
      width="40px" height="40px" viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet">

      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
      fill="#FFF502" stroke="none">
      <path d="M679 4666 c-103 -42 -165 -103 -216 -212 l-28 -59 -3 -1297 c-2
      -1294 -2 -1298 19 -1360 35 -106 103 -192 197 -252 64 -40 152 -65 312 -87
      535 -73 1008 -225 1353 -435 l87 -53 0 1638 0 1639 -66 42 c-318 200 -813 366
      -1319 439 -186 28 -264 27 -336 -3z m652 -980 c193 -39 439 -107 581 -160 67
      -25 102 -45 125 -70 79 -86 40 -222 -75 -257 -41 -12 -49 -10 -215 45 -202 67
      -386 113 -593 150 -158 29 -183 40 -222 97 -30 44 -28 129 6 176 53 74 109 77
      393 19z m-119 -830 c197 -35 346 -73 378 -96 60 -43 79 -148 37 -211 -12 -19
      -44 -45 -71 -58 l-48 -24 -123 27 c-67 15 -178 38 -247 50 -141 26 -177 43
      -207 96 -47 84 -9 193 79 229 37 14 53 13 202 -13z"/>
      <path d="M4195 4684 c-585 -85 -1032 -228 -1391 -445 l-84 -50 0 -1639 0
      -1639 78 49 c86 53 266 144 352 179 l55 21 1 143 c2 117 6 159 27 239 49 185
      144 354 277 488 290 293 721 391 1113 255 l67 -24 -2 1067 -3 1067 -31 65
      c-44 91 -102 153 -182 192 -59 29 -76 33 -157 34 -49 1 -103 0 -120 -2z"/>
      <path d="M4122 2060 c-106 -28 -187 -75 -267 -155 -81 -81 -127 -161 -155
      -271 -37 -143 -19 -228 56 -275 103 -64 244 14 244 134 0 145 123 267 270 267
      96 0 200 -70 240 -161 17 -42 21 -66 18 -118 -5 -77 -25 -125 -75 -174 -46
      -47 -92 -68 -169 -77 -75 -9 -120 -33 -152 -81 -20 -28 -23 -44 -20 -90 7 -98
      66 -149 172 -149 207 0 410 129 503 321 48 98 63 161 63 267 0 93 -19 174 -62
      262 -44 91 -168 214 -262 259 -129 62 -270 76 -404 41z"/>
      <path d="M4171 614 c-132 -66 -157 -229 -51 -334 105 -106 268 -81 334 51 43
      88 30 176 -39 244 -68 69 -156 82 -244 39z"/>
      </g>
      </svg>
      </button>

      {
        onModal &&
        ReactDOM.createPortal(<ModalFaq funcOpen={openModal} />, modalCont)
      }
    </div>
  );
}
