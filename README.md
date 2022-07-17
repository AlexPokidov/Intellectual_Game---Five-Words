# Intellectual_Game---Five-Words
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
	![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)  
[![Typing SVG](https://readme-typing-svg.herokuapp.com?color=%2336BCF7&lines=Intellectual+Game+Five+Words)](ссылка)
- Увлекательная интеллектуальная игра в слова. Попробуйте, вам обязательно понравится).
- Полностью адаптивное, кроссбраузерное веб-приложение.
- Для запуска демонстрации: https://alexpokidov.github.io/Intellectual_Game---Five-Words
### Контейнер Docker
Вы сможете развернуть демонстрацию приложения с помощью docker контейнера. Репозиторий в dockerHub, для скачивания образа:

    docker pull alexpokidov/intellectualgamefivewords
   После локальной загрузки репозитория выполните команду для запуска контейнера Docker:
   

    docker run -dp 3000:3000 alexpokidov/intellectualgamefivewords
   После чего необходимо немного подождать пока запустится локальный сервер, приложение будет доступно по адресу:
   

    http://localhost:3000/
## Идея игры

Задача игра разгадать слово из 5 букв за 5 попыток, основываясь лишь на подсказки игры. 


## Что вы здесь найдете?

 - Два режима игры, "случайное слово" и "прогрессия".
 - "Случайное слово" - режим игры, при котором каждый раз игра загадывает рандомное слово. В данном режиме возможно активировать до 3х подсказок за трек игры.
 - "Прогрессия" - игровая кампания. 30 уровней уровней игры, слова здесь загаданы таким образом, чтобы каждый следующий уровень был несколько сложней предыдущего. (От наиболее часто используемого слова к более редкому).
 - "Трек игры" - это последовательность этапов игры, когда игрок продолжает игру не возвращаясь на стартовую страницу.
 - Пять различных подсказок, которые могут помочь в трудной ситуации и сделают игровой процесс более гибким.
 - Рейтинговая система - разработана с целью сдерживания игроков к использованию подсказок. 
 - **Загаданное слово** - Это **существительное** из 5 букв, исключено использование названий городов, рек, стран, имен, кличек и тп.
 - На вход игра принимает только **реальные слова** и только **существительные**
 - Небольшая статистика, чтобы сделать игровой процесс более увлекательным с духом соревнования).

## Как играть?

 1. Если вы впервые запустили игру - введите Имя или никнейм, так игра будет узнавать вас после каждого перерыва.
 2. Выберете режим игры, а так-же активируйте подсказки. На стартовом экране так-же можно ознакомиться с кратким описанием игры, посмотреть статистику и карту прогрессии.
 3. Нажать кнопку "Начать игру".
 4. Появится игровая карта из 5 строк и кастомной клавиатуры (если вы играете с мобильного устройства).
 5. Вводите слова, а дальше сами все увидите)

## Подсказки в игре

Пять подсказок, которые сделают процесс прохождения игры более интересным:

 - ***Краткое определение*** - в режиме "прогрессия" игрок сможет активировать подсказку с кратким определение слова.
 - ***+1 буква загаданного слова*** - доступно в режиме "прогрессия". При активации игра подскажет одну рандомную букву из загаданного слова, и даже покажет ее позицию)
 - ***-1 буква из алфавита*** - доступно в любом режиме. При активации игра покажет рандомную букву, которой точно нет в загаданном слове.
 - ***+1 попытка*** - доступно в любом режиме. После активации на карте игры появится дополнительная строка для ввода. **Важно** активировать пока игрок не израсходовал собственные попытки.
 - ***Синонимы*** - доступно в режиме "случайное слово". После активации игра покажет похожие по смыслу слова. **Важно**, это могут быть не совсем синонимы, т.к слова подобраны искусственными алгоритмами.

## Особенности игры

 - Игра принимает на вход только реальные существительные из 5 букв. Введенное слово, после фиксации отправляется на проверку в Яндекс.Словарь и в собственную небольшую базу слов. Если слово не проходит проверку, игра оповестит об этом.
 - Использование подсказок ограничено только по треку игры, однако их можно реактивировать на старте. Поэтому я решил ввести рейтинговую систему) (читать ниже)
 - Обратите внимание на карту "прогрессии". Каждый 5й уровень является контрольным. Т.е. если игрок проиграет по ходу прохождения прогрессии на уровне, который не кратен пяти, то его прогресс прохождения прогрессии откатится до "контрольного уровня". Режим "случайное слово" не оказывает влияния на прогрессию. Если игрок просто перезапустит игру - это тоже не окажет влияния на сброс. Важно только **поражение**.
 - В игре ведется статистика игрового времени. Мы фиксируем только время завершенной игры, т.е победа или поражение. Если вы начинаете игру заново, фиксации времени игры не произойдет.

## Что такое рейтинг?

Система очков, разработанная для балансировки игры. За каждое результативное действие игроку начисляются очки. Результативное действие - это победа в любом режиме и прохождение уровня прогрессии. Система весов выглядит так:
Начисляем очки:

 - Победу в раунде - 1050
 - Прохождение уровня - 200
 - Бонус за сложность уровня (за каждые 5 уровней) - +50 (к уровню)

Снижаем очки за бонусы:

 - _**Краткое определение**_- 200
 - ***+1 буква загаданного слова*** - 100
 - ***-1 буква из алфавита*** - 75
 - ***+1 попытка*** - 150
 - ***Синонимы*** - 125

Игра дает оценку рейтинга по следующей системе:

 - **Отлично** - >90% максимального рейтинга.
 - **Хорошо** - >75%
 - **Нормально** - >60%
 - **Плохо** - >50%
 - **Ужасно** - < 50%

## Используемые технологии

 - React
 - Redux
 - React-router
 - TypeScript
 - Axios
 - CSS-modules
 - API Яндекс.Словарь
 - Сборка - Webpack
