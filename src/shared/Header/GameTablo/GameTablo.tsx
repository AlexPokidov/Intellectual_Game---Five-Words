import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useRating } from '../../hooks/useRating';
import styles from './gametablo.css';

let id: any = 1;

export function GameTablo() {
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [timerValue, setTimerValue]: any = useState(0);
  const level = state.timerValue.id ? state.userStat.level + 1 : state.userStat.level;
  const rating = useRating(state.userStat.rating, state.userStat.penaltyRating);
  function timer() {
    const idTimer = setInterval(() => {
      if (state.timerValue.timerStart === 0) {
        dispatch({
          type: 'UPDATE_TIMER',
          timerValue: {
            id: true,
            timerStart: Date.now(),
            timerStop: 0,
          },
        });
      } else {
        setTimerValue(Math.trunc((Date.now() - state.timerValue.timerStart) / 1000))
      }
    }, 1000)


    return idTimer
  }

  useEffect(() => {
    if (state.timerValue.id) {
      id = timer()
    }


    return () => {
      clearInterval(id)
    }
  })

  const textTime = `${Math.trunc(timerValue / 60)} м. ${timerValue % 60} с.`;
  return (
    <div className={styles.contTimer}>
      <div className={styles.value}>
        <span className={styles.text}>
          Время игры:
        </span>
        {textTime}
      </div>
      <div className={styles.value}>
      <span className={styles.text}>
        Рейтинг:
      </span>
        {rating}
      </div>
      {
        state.modeGame === 'prog' &&
        <div className={styles.value}>
          <span className={styles.text}>
            Уровень:
          </span>
          {level}
        </div>
      }

      <div className={styles.value}>
        <span className={styles.text}>
        Осталось попыток:
        </span>
        {`${state.stringGame - (state.statusString - 1)} / ${state.stringGame}`}
      </div>
    </div>
  );
}
