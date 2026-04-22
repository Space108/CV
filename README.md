# CV - Advanced Space UI

Современный одностраничный CV-сайт в стиле **Advanced Tech-Noir** с живым космическим фоном, glassmorphism-интерфейсом и плавными UI-анимациями.

<br>

<a href="https://space108.github.io/CV/">
  <img src="https://img.shields.io/badge/Открыть_сайт-1E90FF?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Сайт CV">
</a> 

<br>
<br>

## Что реализовано

- Динамический фон на `canvas` (`space.js`): глубокий космос, летящие звезды с псевдо-3D глубиной, мягкая туманность и терминальные строки на дальнем плане.
- Blur-акценты фона: темно-синие и фиолетовые световые пятна с плавным дрейфом.
- Glassmorphism-блоки: полупрозрачные карточки с `backdrop-filter`, тонкими границами и мягкими тенями.
- Анимированная hero-секция: акцентный заголовок, технологичный визуальный стиль и адаптивная структура.
- Плавные появления секций и карточек через GSAP + ScrollTrigger.
- Кнопка прокрутки "Наверх".

## Технологии

- `HTML5`
- `CSS3` (glassmorphism, gradients, blur, responsive)
- `JavaScript` (canvas animation, UI behavior)
- `GSAP` + `ScrollTrigger`
- Google Fonts: `Inter`, `JetBrains Mono`

## Структура

- `index.html` - разметка страницы
- `styles.css` - визуальный стиль и адаптивность
- `space.js` - динамический космический фон на canvas
- `scripts.js` - интерфейсные анимации и поведение страницы

## Локальный запуск

Открой `index.html` напрямую в браузере или подними простой локальный сервер:

```bash
python -m http.server 4173
```

После запуска сайт будет доступен по адресу: `http://localhost:4173`
