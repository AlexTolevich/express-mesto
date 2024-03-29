# Проект Mesto, backend сервер на Express.JS

## Описание проекта

Создан собственный API сервер для проекта "Mesto" на Express.JS, с использованием базы данных MongoDB.
Реализовано:
- Регистрация пользователей
- Авторизация пользователей
- Добавление карточек пользователями в базу данных
- Удаление карточек из базы данных
- Редактирование данных профиля пользователя в базе данных
- Обновление данных отметок нравится в базе данных (установка лайка, снятие лайка, массив лайков)
- Валидация данных приходящих данных на стороне backend
- Настроен мидлвэр "limiter" ограничивающий количества запросов с одного IP
- Обработка ошибок на стороне сервера 

## Технологии

- Node.JS
- Express.JS
- MongoDB
- Mongoose

## Инструкции
### Для начала работы вам необходимо:

- установить [NodeJS](https://nodejs.org/en/) - позволяет работать с менеджером пакетов NPM и выполнять JS код вне
  браузеров
- установить [GIT](https://git-scm.com/) - система контроля версий
- установить [MongoDB Community Server](https://www.mongodb.com/try/download/community) - сервер баз данных MongoDB 

### Установка

- клонировать проект с удаленного репозитория, для чего выполнить
  команду `git clone git@github.com:AlexTolevich/express-mesto.git`
- установить модули прописанные в зависимостях package.json, для чего выполнить команду `npm install`

### Работа с проектом

`mongod` - запускает сервер базы данных MongoDB
`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Директории

`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки  

## [Ссылка на деплой проекта](https://api.mestechko.nomoredomains.work)
