# Ushakov_3.2.3

SpaceX 2020 Launch List - React приложение для отображения запусков SpaceX за 2020 год.

## Описание

Приложение использует SpaceX API для получения данных о запусках ракет в 2020 году и отображает их в виде карточек с возможностью просмотра детальной информации.

## Технологии

- React 18
- TypeScript
- Vite
- Mantine UI
- Tailwind CSS
- SpaceX API v3

## Установка и запуск

```bash
npm install
npm run dev
```

## Сборка проекта

```bash
npm run build
```

## Деплой на GitHub Pages

### Автоматический деплой

Проект настроен на автоматический деплой при пуше в ветку `main`.

1. Убедитесь, что в настройках репозитория включены GitHub Pages
2. Перейдите в Settings → Pages
3. В разделе "Source" выберите "GitHub Actions"
4. Сделайте пуш в ветку `main` - деплой произойдет автоматически

### Ручной деплой

```bash
npm run deploy
```

## Структура проекта

- `/src/components` - React компоненты
- `/src/api` - API клиент для SpaceX
- `/src/store` - State management (useReducer)
- `/src/types` - TypeScript типы

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/Ushakov341/Ushakov_3.2.3)