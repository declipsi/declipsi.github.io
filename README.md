# Diana Palii — Portfolio & Interactive Resume

Интерактивное scrollytelling-портфолио и резюме Дианы Палий — специалиста по визуальной рекламе, 2D/3D моушн-дизайнера, AI-креатора.

## Запуск локально (Development)

Требования: [Node.js](https://nodejs.org/) (версии 18 или выше)

1. Установите зависимости:
   ```bash
   npm install
   ```

2. Запустите локальный сервер разработки:
   ```bash
   npm run dev
   ```

3. Откройте в браузере: `http://localhost:3000`

## Сборка (Production)

```bash
npm run build
```

Собранная статическая версия сайта будет находиться в директории `dist/`.

## Публикация на GitHub Pages

В репозитории настроен автоматический GitHub Actions workflow (`.github/workflows/deploy.yml`).

Чтобы сайт заработал на GitHub Pages:
1. Запушьте изменения в ветку `main`.
2. В репозитории на GitHub перейдите в **Settings** → **Pages**.
3. В разделе **Build and deployment** выберите:
   - **Source**: `GitHub Actions`
4. После завершения workflow сайт будет доступен по адресу:
   `https://<ваш-логин>.github.io/declipsiweb/`
