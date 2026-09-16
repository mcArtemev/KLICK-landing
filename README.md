# Klick landing на Nuxt

Публичный лендинг Klick на Nuxt. Проект собран отдельно от основного кабинета, чтобы лендинг можно было независимо развивать, масштабировать и размещать.

## Запуск

```bash
npm install
npm run dev
```

Production-сборка:

```bash
npm run build
npm run preview
```

Статическая генерация:

```bash
npm run generate
```

Ссылка кнопок перехода в продукт задаётся переменной окружения:

```bash
NUXT_PUBLIC_APP_URL=https://app.example.com/auth/sign
NUXT_PUBLIC_DEMO_URL=https://app.example.com/auth/sign?demo=true
```

Если `NUXT_PUBLIC_APP_URL` не указана, локально используется `http://localhost:5173/auth/sign`. Если не задана `NUXT_PUBLIC_DEMO_URL`, к адресу приложения автоматически добавляется параметр `demo=true`.

Продуктовый анализ, позиционирование и перечень материалов для следующих итераций находятся в [docs/landing-brief.md](docs/landing-brief.md).
