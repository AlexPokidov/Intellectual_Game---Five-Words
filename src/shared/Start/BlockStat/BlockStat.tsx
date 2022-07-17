import React from 'react';
import { useSelector } from 'react-redux';
import { useRating } from '../../hooks/useRating';
import styles from './blockstat.css';

interface IObjStat {
  countWord: number,
  rating: number,
  penaltyRating: number,
  timeToGame: number,
  saveWord: number,
  level: number,
  saveLevel: number,
  hardWord: {
    time: number,
    word: string,
  },
}

export function BlockStat() {
  const objStat: IObjStat = useSelector((store: any) => store.userStat);
  const rating = useRating(objStat.rating, objStat.penaltyRating);
  let descrRating = '';
  const percentRating = rating === 0 ? 0 : rating / objStat.rating * 100;

  if (percentRating > 90) {
    descrRating = '~Отлично~';
  } else if (percentRating > 75) {
    descrRating = '~Хорошо~';
  } else if (percentRating > 60) {
    descrRating = '~Нормально~';
  } else if (percentRating > 50) {
    descrRating = '~Плохо~';
  } else {
    descrRating = '~Ужасно~';
  }

  const valueTime = `${Math.trunc(objStat.timeToGame / 3600)} ч. ${Math.trunc((objStat.timeToGame % 3600) / 60)} м. ${objStat.timeToGame % 60} с.`
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <span className={styles.text}>
            Угадано слов:
          </span>
          <div className={styles.value}>
            {objStat.countWord}
          </div>
        </li>

        <li className={styles.item}>
          <span className={styles.text}>
            Время в игре:
          </span>
          <div className={styles.valueTime}>
            {valueTime}
          </div>
        </li>

        <li className={styles.item}>
          <span className={styles.text}>
            Кол-во попыток:
          </span>
          <div className={styles.value}>
            {objStat.saveWord}
          </div>
        </li>

        <li className={styles.item}>
          <span className={styles.text}>
            Рейтинг:
          </span>
          <div className={styles.value}>
            {rating}
          </div>

          {
            rating != 0 &&
            <div className={styles.descrRating}>
              {descrRating}
            </div>
          }
        </li>

        <li className={styles.item}>
          <span className={styles.text}>
            Уровень в "Прогрессии":
          </span>
          <div className={styles.value}>
            {objStat.level}
          </div>
        </li>

        <li className={styles.item}>
          <span className={styles.text}>
            Самое сложное слово:
          </span>
          <div className={styles.value}>
            {objStat.hardWord.word}
          </div>
        </li>

      </ul>
    </div>
  );
}
