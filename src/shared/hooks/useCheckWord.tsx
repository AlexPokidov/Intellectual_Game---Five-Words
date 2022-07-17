import axios from 'axios';
import React  from 'react';
import { arrayWord } from '../../assets/dictionary/dictionWordFive'

export async function useCheckWord(word: string, setOnModalDown: any) {
  let result;
  setOnModalDown(true);
  await axios(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20220625T132559Z.144e84e6b6d37773.0ba5748048bfe86fa5e639e4815298b376ab8097&lang=ru-ru&text=${word}&ui=ru`)
    .then((res) => {
      const arW = word[0] + word.substring(1,).toLowerCase();
      if ((res.data.def.length > 0 && res.data.def[0].pos === 'существительное') || arrayWord.includes(arW)) {
        return result = true
      } else {
        return result = false
      }
    })
    .catch((er) => {
      return result = 'error';
    })
  setOnModalDown(false)
  console.log(result)
  return result
}

