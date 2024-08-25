## ВСТУП
Сучасний світ став свідком стрімкого розвитку ринку криптовалют та акцій. З кожним днем росте інтерес до цих активів, що породжує потребу в ефективному їх управлінні та моніторингу. Однак, зростання різноманітності та складнощів у виборі можливих інвестиційних об'єктів вносить непевність серед інвесторів.

З урахуванням цих факторів, стає важливим розробка інструменту, який спростить процес управління активами та допоможе інвесторам приймати обґрунтовані рішення. Метою даної курсової роботи є створення веб-платформи "Менеджер активів", що дозволить користувачам ефективно вести облік та аналізувати їхні інвестиції в криптовалюти, акції та іноземні валюти.

Цей проект передбачає розробку зручного та інтуїтивно зрозумілого інтерфейсу, який надасть користувачам можливість з легкістю відстежувати ринкові тенденції, аналізувати ризики та приймати обдумані рішення з їхніми інвестиціями. Використання технологій розробки веб-додатків, таких як NextJS , дозволить забезпечити надійну та безперебійну роботу платформи.

## Функціональність
Веб-сайт має мати наступний функціонал:
*	Можливість авторизації та входу в обліковий запис;
*	Можливість створення портфелю;
*	Можливість додавання до портфелю криптовалюти, акції та\або іноземні валюти;
*	Графік портфелю, де відображається частка кожного активу.
*	Відображення прибутку чи збитку певного активу , портфелю.
*	Можливість за допомогою графіка переглядати історію зміни ціни всього портфелю.
*	Працювати з базою даних;

## Вимоги до реалізації
<img height="30" width="30" src="https://cdn.simpleicons.org/javascript" /> <img height="30" width="30" src="https://cdn.simpleicons.org/typescript" /> <img height="30" width="30" src="https://cdn.simpleicons.org/nextdotjs" /> <img height="30" width="30" src="https://cdn.simpleicons.org/react" /> <img height="30" width="30" src="https://cdn.simpleicons.org/postgresql" /> <img height="30" width="30" src="https://cdn.simpleicons.org/prisma" /> <img height="30" width="30" src="https://cdn.simpleicons.org/sass" /> <img height="30" width="30" src="https://cdn.simpleicons.org/html5" /> <img height="30" width="30" src="https://cdn.simpleicons.org/css3" />
*	Використання мови JavaScript\TypeScript та фреймворку NextJS;
*	Використання паттернів MVC;
*	Використання PostgreSQL та Prisma;

## Реалізований проект
### Початкова сторінка
![Початкова сторінка](https://github.com/Maxson71/SMARTFOLIO/assets/77611206/cd8a16e4-72ee-46c7-a1bd-a9c216dd3f60)
### Сторінка з портфелями
![Сторінка з портфелями](https://github.com/Maxson71/SMARTFOLIO/assets/77611206/5846d040-9a58-4fb4-a08e-f05ff1b939ed)
### Форма для додавання активу
![Форма для додавання активу](https://github.com/Maxson71/SMARTFOLIO/assets/77611206/6b994a9e-98be-4e68-b2b6-fc895f291792)
<div align="center">
  <img src="https://github.com/Maxson71/SMARTFOLIO/assets/77611206/c3c9571d-9f1d-4a89-908f-ea81566be744" width="500">
</div>
<div align="center">
  <img src="https://github.com/Maxson71/SMARTFOLIO/assets/77611206/f7b22c7c-7b34-4716-b678-74c2e36d6d3e" width="500">
</div>
<div align="center">
  <img src="https://github.com/Maxson71/SMARTFOLIO/assets/77611206/15cc5889-21d8-4c71-a23e-a33b8e70a9fb" width="500">
</div>

### Сторінка портфелю
![Сторінка портфелю](https://github.com/Maxson71/SMARTFOLIO/assets/77611206/6a9f6725-5e6d-4425-bf74-046e2c4eb65f)

### Демонстрація заповненого портфелю
![Демонстрація заповненого портфелю](https://github.com/Maxson71/SMARTFOLIO/assets/77611206/9c918eb8-7101-49b1-8d51-b521eda02acc)

### Загальна сторінка всіх портфелів 
![Загальна сторінка всіх портфелів ](https://github.com/Maxson71/SMARTFOLIO/assets/77611206/28a16177-f1c4-4aa2-9935-61edabea97eb)

## ВИСНОВКИ
Підбиваючи підсумки, можна сказати, що автор розробив веб-сайт на основі NextJS, використавши TypeScript, SCSS(CSS), HTML. Кінцевий продукт був протестований і перевірений на помилки. Застосування NextJS забезпечило легке програмування і поєднання frontend і backend. Крім того, використання паттерну MVC сприяє чіткому розподілу обов'язків між компонентами програми та полегшило розвиток і підтримку коду. 

Щодо роботи з базою даних, було використано supabase (на PostgreSDL), який забезпечує зберігання та обробку даних користувачів, портфелів і активів (транзакцій). Взаємодія з базою даних здійснюється через Prisma, яка дозволяє виконувати операції з даними, такі як створення, оновлення, видалення та пошук. Використання Prisma дозволило легко поєднати NextJS з базою даних, і не занурюватись у синтаксис PostgreSDL.

Використання цього продукту дозволить спрости слідкування за своїми активами.


