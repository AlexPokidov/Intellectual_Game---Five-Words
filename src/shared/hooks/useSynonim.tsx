import axios from 'axios';
import React  from 'react';

export async function useSynonim(word: string) {
  const result: string[] = [];
  await axios(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20220625T132559Z.144e84e6b6d37773.0ba5748048bfe86fa5e639e4815298b376ab8097&lang=ru-ru&text=${word}&ui=ru`)
    .then((res) => {
      console.log(res)
      const arraySynonim = res.data.def[0].tr;

      arraySynonim.forEach((el: any )=> {
        result.push(el.text);
      });
    })
    .catch((er) => {
      console.log(er)
    })

  return result
}
