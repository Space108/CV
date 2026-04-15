// space.js

const canvas = document.getElementById('space-bg');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
let starsCount = 2200; // Сколько звёзд?
let speed = 0.42; // Скорость летящих звёзд
let codeLines = [];
let codeLinesCount = 30; // Сколько строчек кода на фоне?

// Подготовка звёзд
function initStars() {
    stars = [];
    for (let i = 0; i < starsCount; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * width, // 3D-глубина
            size: Math.random() * 1.5
        });
    }
}

// Подготовка строчек кода
function initCodeLines() {
    codeLines = [];
    const commands = [
        "> ANALYZING: Andromeda_Galaxy.meta_data.v3",
        "> SCAN_STATUS: COMPLETE",
        "> SOLAR_CORE: TEMP = 15,700,000 K",
        "> GALAXY_MAP: M31 (Andromeda)",
        "> COMPUTE_RESULT: SUCCESS",
        "> LAUNCHING: Spectrograph_Analysis_Script",
        "> TRACKING: Alpha_Centauri.position",
        "> WARNING: Solar_Flare.intensity_high"
    ];
    for (let i = 0; i < codeLinesCount; i++) {
        codeLines.push({
            x: Math.random() * width,
            y: Math.random() * height,
            text: commands[Math.floor(Math.random() * commands.length)],
            opacity: Math.random() * 0.3
        });
    }
}

// Основной цикл отрисовки
function draw() {
    ctx.clearRect(0, 0, width, height);

    // 1. Рисуем глубокий космический фон (градиенты)
    let grd = ctx.createRadialGradient(width / 2, height / 2, width / 5, width / 2, height / 2, width);
    grd.addColorStop(0, "rgba(12, 18, 34, 1)");
    grd.addColorStop(1, "rgba(3, 6, 14, 1)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    // 1.1 Добавляем размытое "солнце" в углу
    const sunX = width * 0.88;
    const sunY = height * 0.16;
    const sunGlow = ctx.createRadialGradient(sunX, sunY, width * 0.01, sunX, sunY, width * 0.22);
    sunGlow.addColorStop(0, "rgba(255, 192, 112, 0.25)");
    sunGlow.addColorStop(0.35, "rgba(255, 140, 74, 0.12)");
    sunGlow.addColorStop(1, "rgba(255, 100, 40, 0)");
    ctx.fillStyle = sunGlow;
    ctx.fillRect(0, 0, width, height);

    const sunHalo = ctx.createRadialGradient(sunX, sunY, width * 0.03, sunX, sunY, width * 0.1);
    sunHalo.addColorStop(0, "rgba(255, 232, 186, 0.08)");
    sunHalo.addColorStop(1, "rgba(255, 220, 160, 0)");
    ctx.fillStyle = sunHalo;
    ctx.fillRect(0, 0, width, height);

    // 2. Рисуем звёзды с 3D-эффектом
    ctx.fillStyle = "#ffffff";
    for (let i = 0; i < starsCount; i++) {
        let star = stars[i];
        star.z -= speed;

        if (star.z <= 0) {
            star.z = width;
            star.x = Math.random() * width;
            star.y = Math.random() * height;
        }

        // Проекция 3D на 2D-экран (формула)
        let fov = 150; // Угол обзора
        let x2d = (star.x - width / 2) * (fov / star.z) + width / 2;
        let y2d = (star.y - height / 2) * (fov / star.z) + height / 2;
        let size2d = (fov / star.z) * star.size * 0.5;

        // Чем ближе звезда, тем она ярче (имитация глубины)
        let opacity = (1 - star.z / width) * 0.55;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(x2d, y2d, size2d, size2d);
    }

    // 3. Рисуем код (имитацию терминала) на дальнем плане
    ctx.font = "12px 'Inter', monospace";
    for (let i = 0; i < codeLinesCount; i++) {
        let line = codeLines[i];
        ctx.fillStyle = `rgba(0, 210, 255, ${line.opacity})`; // Неоново-голубой
        ctx.fillText(line.text, line.x, line.y);
        line.opacity -= 0.001;
        if (line.opacity <= 0) {
            line.opacity = Math.random() * 0.3;
            line.x = Math.random() * width;
            line.y = Math.random() * height;
        }
    }

    requestAnimationFrame(draw);
}

// Изменение размера холста при изменении окна
function onResize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
    initCodeLines();
}

window.addEventListener('resize', onResize);
onResize(); // Первый запуск
draw();