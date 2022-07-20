import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import './style.css';
import './assets/img/backg-word.jpg'
import styles from './style.css';
import { Header } from './shared/Header';
import { GameSpace } from './shared/GameSpace';
import { Provider } from 'react-redux';
import { Reducer } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { arrayWord } from './assets/dictionary/dictionWordFive';
import { BrowserRouter, Route, Routes, Outlet} from "react-router-dom";
import { Start } from './shared/Start';

export function randomWinWord(array: string[]) {
  const random = Math.round(Math.random() * (array.length - 1))

  return array[random].toLocaleUpperCase();
}

const local = window.location.pathname;
console.log(local);

let initState = {
  winWord: randomWinWord(arrayWord),
  helperValue: '',
  helperAddLetter: {
    letter: '',
    index: '',
  },
  helperMinusLetter: '',
  stringGame: 5,
  key: '',
  statusWin: false,
  touchEnter: false,
  modeGame: 'random',
  userStat: {
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
    userHelpSpec: true,
  },
  nameUser: '',
  timerValue: {
    id: true,
    timerStart: 0,
    timerStop: 0,
  },
  statusString: 1,
  inputLetter: [],
  winLetter: [],
  helperBtn: [],
  resetGame: false,
  openuserHelpSpec: true,
}

if (local === '/game') {
  const saveState = JSON.parse(localStorage.getItem('saveState') || '');

  initState = saveState;
}

const rootReducer: Reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case 'UPDATE_MODE_GAME':
      return {
        ...state,
        modeGame: action.modeGame,
        winWord: action.winWord,
        helperValue: action.helperValue,
        helperBtn: [],
      }
    case 'SAVE_STAT_USER':
      return {
        ...state,
        userStat: action.action.userStat,
        nameUser: action.action.nameUser,
      }
    case 'UPDATE_STAT_USER':
      return {
        ...state,
        userStat: action.action.userStat,
      }
    case 'UPDATE_TIMER':
      return {
        ...state,
        timerValue: action.timerValue,
      }
    case 'UPDATE_HELPER':
      const objStat = {
        countWord: state.userStat.countWord,
        rating: state.userStat.rating,
        penaltyRating: action.penaltyRating,
        timeToGame: state.userStat.timeToGame,
        saveWord: state.userStat.saveWord,
        level: state.userStat.level,
        saveLevel: state.userStat.saveLevel,
        hardWord: state.userStat.hardWord,
      };
      localStorage.setItem(state.nameUser, JSON.stringify(objStat));
      return {
        ...state,
        helperAddLetter: action.helperAddLetter,
        helperMinusLetter: action.helperMinusLetter,
        stringGame: action.stringGame,
        userStat: objStat,
      }
    case 'USER_WORD':
      return {
        ...state,
        key: action.action.key,
        statusString: action.action.statusString,
        resetGame: false,
      }
    case 'SAVE_WORD':
      return {
        ...state,
        key: action.action.key,
        statusString: action.action.statusString,
        statusWin: action.action.statusWin,
        inputLetter: action.action.inputLetter,
        winLetter: action.action.winLetter,
      }
    case 'CHANGE_STATUS_WIN':
      return {
        ...state,
        statusWin: action.action.statusWin,
      }
    case 'CHANGE_STATUS_USER_HELP_SPEC':
      localStorage.setItem(state.nameUser, JSON.stringify(action.userStat));
      return {
        ...state,
        userStat: action.userStat,
        openuserHelpSpec: action.openuserHelpSpec,
      }
    case 'CHANGE_STATUS_TOUCH_ENTER':
      return {
        ...state,
        touchEnter: action.touchEnter,
      }
    case 'CHANGE_BTN_HELPER':
      return {
        ...state,
        helperBtn: action.helperBtn,
      }
    case 'WIN_WORD':
      return {
        ...state,
        winWord: action.winWord
      }
    case 'CONTINUE_GAME':
      return {
        ...state,
        winWord: action.winWord,
        helperValue: action.helperValue,
        helperAddLetter: {
          letter: '',
          index: '',
        },
        helperMinusLetter: '',
        stringGame: 5,
        key: '',
        statusWin: false,
        touchEnter: false,
        statusString: 1,
        inputLetter: [],
        winLetter: [],
        resetGame: true,
      }
    case 'RESET_GAME':
      return {
        ...state,
        winWord: randomWinWord(arrayWord),
        helperValue: '',
        helperAddLetter: {
          letter: '',
          index: '',
        },
        helperMinusLetter: '',
        stringGame: 5,
        key: '',
        statusWin: false,
        touchEnter: false,
        modeGame: 'random',
        userStat: {
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
          userHelpSpec: true,
        },
        nameUser: '',
        timerValue: {
          id: true,
          timerStart: 0,
          timerStop: 0
        },
        statusString: 1,
        inputLetter: [],
        winLetter: [],
        helperBtn: [],
        resetGame: false,
        openuserHelpSpec: true,
      }
    default:
      return state
  }
}

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  preloadedState: initState,
})


function App() {
  return(
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path='/' element={
            <div>
            <Header />
            <div className={styles.containerMain}>
            <Outlet />
            </div>
          </div>
          }>
            /*Intellectual_Game---Five-Words */
            <Route path='Intellectual_Game---Five-Words' element={<Start />}/>
            <Route path='Intellectual_Game---Five-Words/game' element={<GameSpace />}/>
            <Route path='*' element={<div>
              Страница не найдена
            </div>} />
          </Route>
        </Routes>

      </Provider>
    </BrowserRouter>
  )
}

ReactDom.render(App(), document.getElementById('root'))
