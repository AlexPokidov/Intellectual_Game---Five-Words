import React, { useEffect, useState } from 'react';
import { ButtonHelperMinusLetters } from './ButtonHelperMinusLetters';
import { ButtonHelperPlusLetter } from './ButtonHelperPlusLetter';
import { ButtonHelperQuest } from './ButtonHelperQuest';
import { ButtonHelperTimer } from './ButtonHelperTimer';
import { ButtonPause } from './ButtonPause';
import { ButtonStat } from './ButtonStat';
import { Route, Routes } from 'react-router-dom';
import styles from './header.css';
import { GameTablo } from './GameTablo';
import { useSelector } from 'react-redux';
import { ButtonHelperPlusWord } from './ButtonHelperPlusWord';
import { ButtonHelperSynonim } from './ButtonHelperSynonim';
import ReactDOM from 'react-dom';
import { ModalStart } from '../ModalStart';

export function Header() {
  const store = useSelector((state: any) => state);
  const modalCont = document.querySelector('#modal');
  const [onOpenModalErrorOrientation, setOnOpenModalErrorOrientation] = useState(false);
  // const width = document.documentElement.clientWidth;
  const width = 1000;
  if (modalCont === null) return null;

  const listBtn = [];

  if (store.helperBtn.includes('ButtonHelperQuest')) {
    listBtn.push(<ButtonHelperQuest key={'ButtonHelperQuest'}/>);
  }
  if (store.helperBtn.includes('ButtonHelperPlusLetters')) {
    listBtn.push(<ButtonHelperPlusLetter key={'ButtonHelperPlusLetters'}/>);
  }
  if (store.helperBtn.includes('ButtonHelperMinusLetters')) {
    listBtn.push(<ButtonHelperMinusLetters key={'ButtonHelperMinusLetters'}/>);
  }
  if (store.helperBtn.includes('ButtonHelperPlusWord')) {
    listBtn.push(<ButtonHelperPlusWord key={'ButtonHelperPlusWord'}/>);
  }
  if (store.helperBtn.includes('ButtonHelperSynonim')) {
    listBtn.push(<ButtonHelperSynonim key={'ButtonHelperSynonim'}/>);
  }

  useEffect(() => {
    function observeOrientation() {
      let prop = 0.49;
      const height = screen.height;
      const width = screen.width;
      if (width > 1800) return;
      if (width > height && width < 600) {
        prop = 0.3;
      } else if (width > height && width > 1800) {
        prop = 0.6;
      }
      const onLandscape = height < (width * prop);
      if (onLandscape) {
        document.body.classList.add(`${styles.displayBlock}`)
        setOnOpenModalErrorOrientation(true)
      } else {
        if (document.body.classList.contains(`${styles.displayBlock}`)) {
          document.body.classList.remove(`${styles.displayBlock}`)
        }
        setOnOpenModalErrorOrientation(false);
      }
    }
    console.log(screen)
    observeOrientation()

    window.addEventListener('resize', observeOrientation);
  })
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>FW</h1>

      <Routes>
        /*/Intellectual_Game---Five-Words */
        <Route path='/game' element={
          <div className={styles.containerBtn}>
            {
              width > 800 &&
              <GameTablo />
            }
            <ButtonPause />
            {
              listBtn.length != 0 && <div className={styles.containerHelper}>
              {listBtn}
              </div>
            }
          </div>
        } />
      </Routes>

      { ReactDOM.createPortal(
          <div className={styles.developer}>
          developed by Alex Pokidov
          </div>, modalCont)}

      {
          onOpenModalErrorOrientation &&
          ReactDOM.createPortal(<ModalStart funcName={() => {}} statusError={true} />, modalCont)
      }

    </header>
  );
}
