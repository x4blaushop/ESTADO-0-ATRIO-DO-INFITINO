const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");

let w, h, center;
const particles = [];
const chars = "0101010101ABCDEF".split("");

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    center = { x: w / 2, y: h / 2 };
    particles.length = 0;
    for (let i = 0; i < 300; i++) {
        particles.push({
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            speed: 0.005, // VELOCIDADE 20%
            size: 14 + Math.random() * 6,
            char: chars[Math.floor(Math.random() * chars.length)]
        });
    }
}

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, w, h);

    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 1.2; // Sucção lenta

        if (p.r < 50) p.r = Math.max(w, h) * 0.7;

        const x = center.x + Math.cos(p.angle) * p.r;
        const y = center.y + Math.sin(p.angle) * p.r;

        ctx.fillStyle = "#ff0000";
        ctx.font = p.size + "px monospace";
        // GLOW NO CANVAS
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#ff0000";
        ctx.fillText(p.char, x, y);
    });

    // NÚCLEO DO BURACO NEGRO
    ctx.beginPath();
    ctx.arc(center.x, center.y, 60, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.shadowBlur = 40;
    ctx.shadowColor = "#ff0000";

    requestAnimationFrame(draw);
}

window.addEventListener("resize", init);
init();
draw();
