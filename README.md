# Klick landing

Первая версия публичного лендинга Klick. Проект собран отдельно от основного кабинета, чтобы лендинг можно было независимо развивать и размещать.

## Запуск

```bash
npm install
npm run dev
```

Production-сборка:

```bash
npm run build
```

Ссылка кнопок перехода в продукт задаётся переменной окружения:

```bash
VITE_APP_URL=https://app.example.com/auth/sign
VITE_DEMO_URL=https://app.example.com/auth/sign?demo=true
```

Если `VITE_APP_URL` не указана, локально используется `http://localhost:5173/auth/sign`. Если не задана `VITE_DEMO_URL`, к адресу приложения автоматически добавляется параметр `demo=true`.

Продуктовый анализ, позиционирование и перечень материалов для следующих итераций находятся в [docs/landing-brief.md](docs/landing-brief.md).
