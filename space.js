const canvas = document.getElementById("space-bg");
const ctx = canvas ? canvas.getContext("2d") : null;

if (canvas && ctx) {
    let width = 0;
    let height = 0;
    let dpr = 1;
    let stars = [];
    let codeLines = [];

    const STAR_COUNT = 1200;
    const BASE_SPEED = 0.85;
    const CODE_LINES_COUNT = 20;
    const COMMANDS = [
        "> ANALYZING: Andromeda_Galaxy.meta_data.v3",
        "> SOLAR_CORE: TEMP = 15,700,000 K",
        "> TRACKING: Alpha_Centauri.position",
        "> SUN_RESEARCH: SPECTRAL_CLASS = G2V",
        "> ASTRO_PIPELINE: STATUS = RUNNING",
        "> WARNING: SOLAR_FLARE.intensity_high"
    ];

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createStar() {
        return {
            x: randomRange(-width * 0.5, width * 0.5),
            y: randomRange(-height * 0.5, height * 0.5),
            z: randomRange(1, width),
            speed: randomRange(0.8, 1.4),
            size: randomRange(0.4, 1.1)
        };
    }

    function createCodeLine() {
        return {
            x: randomRange(width * 0.58, width * 0.95),
            y: randomRange(20, height - 30),
            text: COMMANDS[Math.floor(Math.random() * COMMANDS.length)],
            alpha: randomRange(0.02, 0.05),
            drift: randomRange(0.08, 0.25)
        };
    }

    function initScene() {
        stars = Array.from({ length: STAR_COUNT }, createStar);
        codeLines = Array.from({ length: CODE_LINES_COUNT }, createCodeLine);
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        initScene();
    }

    function drawBackground() {
        const bg = ctx.createLinearGradient(0, 0, 0, height);
        bg.addColorStop(0, "#03060f");
        bg.addColorStop(0.55, "#050a16");
        bg.addColorStop(1, "#02040b");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);
    }

    function drawSunGlow() {
        const sunX = width * 0.88;
        const sunY = height * 0.16;

        const glow = ctx.createRadialGradient(sunX, sunY, width * 0.02, sunX, sunY, width * 0.34);
        glow.addColorStop(0, "rgba(255, 205, 130, 0.15)");
        glow.addColorStop(0.45, "rgba(255, 152, 92, 0.09)");
        glow.addColorStop(1, "rgba(255, 100, 40, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);

        const core = ctx.createRadialGradient(sunX, sunY, width * 0.02, sunX, sunY, width * 0.11);
        core.addColorStop(0, "rgba(255, 238, 188, 0.07)");
        core.addColorStop(1, "rgba(255, 180, 90, 0)");
        ctx.fillStyle = core;
        ctx.fillRect(0, 0, width, height);
    }

    function drawStars() {
        const fov = 170;
        ctx.save();
        ctx.translate(width * 0.5, height * 0.5);

        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            s.z -= BASE_SPEED * s.speed;

            if (s.z <= 1) {
                Object.assign(s, createStar(), { z: width });
            }

            const proj = fov / s.z;
            const sx = s.x * proj;
            const sy = s.y * proj;
            const r = Math.max(0.14, Math.min(1.2, s.size * proj));

            const alpha = Math.max(0.05, Math.min(0.42, (1 - s.z / width) * 0.55));
            ctx.beginPath();
            ctx.fillStyle = `rgba(218, 238, 255, ${alpha.toFixed(3)})`;
            ctx.shadowBlur = 3;
            ctx.shadowColor = "rgba(138, 196, 255, 0.28)";
            ctx.arc(sx, sy, r, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
        ctx.shadowBlur = 0;
    }

    function drawTerminalCode() {
        ctx.font = "11px 'JetBrains Mono', monospace";

        for (let i = 0; i < codeLines.length; i++) {
            const line = codeLines[i];
            ctx.fillStyle = `rgba(0, 210, 255, ${line.alpha.toFixed(3)})`;
            ctx.fillText(line.text, line.x, line.y);
            line.y += line.drift;

            if (line.y > height + 20) {
                Object.assign(line, createCodeLine(), { y: -20 });
            }
        }
    }

    function animate() {
        drawBackground();
        drawSunGlow();
        drawStars();
        drawTerminalCode();
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resize);
    resize();
    animate();
}