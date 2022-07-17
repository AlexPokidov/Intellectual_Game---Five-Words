import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { ButtonHelperMinusLetters } from '../Header/ButtonHelperMinusLetters';
import { ButtonHelperPlusLetter } from '../Header/ButtonHelperPlusLetter';
import { ButtonHelperPlusWord } from '../Header/ButtonHelperPlusWord';
import { ButtonHelperQuest } from '../Header/ButtonHelperQuest';
import { ButtonHelperSynonim } from '../Header/ButtonHelperSynonim';
import { ButtonHelperTimer } from '../Header/ButtonHelperTimer';
import { ModalStart } from '../ModalStart';
import { BlockStat } from './BlockStat';
import { BtnFaq } from './BtnFaq';
import { ChangeModeGAme } from './ChangeModeGAme';
import styles from './start.css';

export function Start() {
  const store = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [name, setName] = useState(localStorage.getItem('userName'));
  let statusDisBtn = [];

  if (store.modeGame === 'random') {
    statusDisBtn = [true, true, false, false, false];
  } else {
    statusDisBtn = [false, false, false, false, true];
  }

  function resetUser() {
    localStorage.clear();
    window.location.reload();
  }

  useEffect(() => {
    if (name && store.nameUser.length === 0) {
      let objStat: any = localStorage.getItem(name);

      if (!objStat) {
        objStat = {
          countWord: 0,
          rating: 0,
          penaltyRating: 0,
          timeToGame: 0,
          saveWord: 0,
          level: 0,
          saveLevel: 0,
          hardWord: {
            time: 0,
            word: 'Вы еще не играли',
          },
        };

        localStorage.setItem(name, JSON.stringify(objStat));
      } else {
        objStat = JSON.parse(objStat);
        console.log(objStat)
      }


      dispatch({
        type: 'SAVE_STAT_USER',
        action: {
          userStat: objStat,
          nameUser: name,
        },
      })
    }
  }, [name])

  const modalCont = document.querySelector('#modal');
  if (modalCont === null) return null;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Привет {name}, давай начнем игру...</h1>

        <Link to='/' className={styles.resetLink} onClick={resetUser}>Я не {name}, сменить пользователя...</Link>

        <div>
          <span className={styles.descrTitle}>Выбери режим игры:</span>
          <ChangeModeGAme />
        </div>

        <div>
          <span className={styles.descrTitle}>Активируй подказки:</span>
          <div className={styles.contBonus}>
            <ButtonHelperQuest start={true} statusDis={statusDisBtn[0]}/>
            <ButtonHelperPlusLetter start={true} statusDis={statusDisBtn[1]}/>
            <ButtonHelperMinusLetters start={true} statusDis={statusDisBtn[2]}/>
            <ButtonHelperPlusWord start={true} statusDis={statusDisBtn[3]} />
            <ButtonHelperSynonim start={true} statusDis={statusDisBtn[4]} />
          </div>
        </div>

        <div>
          <span className={styles.descrTitle}>Немного статистики:</span>
          <BlockStat />
        </div>

        <Link to='Intellectual_Game---Five-Words/game' className={styles.btnStart}>Начать игру</Link>

        <BtnFaq />

        {!name &&
          ReactDOM.createPortal(<ModalStart funcName={setName} />, modalCont)
        }
      </div>
    </div>
  );
}
