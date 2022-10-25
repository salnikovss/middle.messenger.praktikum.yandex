[Ссылка Pull Request](https://github.com/salnikovss/middle.messenger.praktikum.yandex/pull/4)

# YP Messenger - учебный проект мессенджера

# Команды

## Разработка проекта

```bash
npm install
npm run dev
```

## Сборка проекта

```bash
npm install
npm run build

```

## Запуск проекта

```bash
npm install
npm run start
```

## Статический анализ кода и стилей


```bash
npm run lint
```

## Тесты


```bash
npm run test
```

# UI

[Ссылка на макет в Figma](https://www.figma.com/file/5DGALnwhA2a65XJPQl2Gtz/YP-Messanger?node-id=0%3A1)

## Netlify

```bash
git checkout deploy
git merge main # или иная активная ветка
git push
```

[Ссылка на сборку Netlify](https://subtle-kangaroo-2f4700.netlify.app)

## Heroku

### Первичная настройка:
```bash
heroku login
heroku container:login
heroku create yp-chat-app
heroku container:push web
```

### Релиз
```bash
npm run docker:build
npm run docker:tag
npm run docker:push
npm run heroku:release
npm run heroku # открыть проект в браузере
````



[Ссылка на сборку Heroku](https://yp-chat-app.herokuapp.com/)
