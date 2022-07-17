import React  from 'react';

/*Константы используемые для расчета рейтинга*/

export const rating = {
  btnMinusLetter: 75,
  btnPlusLetter: 100,
  btnSinonim: 125,
  btnPlusWord: 150,
  btnQuest: 200,
  bonusWord: 1050,
  bonusLevel: 200,
  bonusHardLevel: 50,
}

export function useRating(rating: number, penaltyRating: number) {
  return rating - penaltyRating;
}
