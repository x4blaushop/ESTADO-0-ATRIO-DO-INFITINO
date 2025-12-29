const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
let w, h, particles = [];

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    for(let i = 0; i < 550; i++) { // Alta densidade
        particles.push({
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            speed: 0.004, // Velocidade 20%
            size: Math.random() * 2 + 1,
            char: Math.random() > 0.5 ? "1" : "0"
        });
    }
}

function draw() {
    // Efeito de rastro denso (Massa)
    ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
    ctx.fillRect(0, 0, w, h);

    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 1.6;

        if(p.r < 45) p.r = Math.max(w, h) * 0.75;

        const x = w/2 + Math.cos(p.angle) * p.r;
        const y = h/2 + Math.sin(p.angle) * p.r;

        ctx.fillStyle = "#ff0000";
        ctx.font = p.size + "px monospace";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ff0000";
        ctx.fillText(p.char, x, y);

        // Rastro de energia (Trail)
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 0, 0, 0.3)";
        ctx.moveTo(x, y);
        const lx = w/2 + Math.cos(p.angle - 0.02) * (p.r + 1.6);
        const ly = h/2 + Math.sin(p.angle - 0.02) * (p.r + 1.6);
        ctx.lineTo(lx, ly);
        ctx.stroke();
    });

    // Centro do Buraco Negro
    ctx.beginPath();
    ctx.arc(w/2, h/2, 60, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.shadowBlur = 50;
    ctx.shadowColor = "#ff0000";
    ctx.stroke();

    requestAnimationFrame(draw);
}

window.addEventListener("resize", init);
init();
draw();
