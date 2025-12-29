const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
let w, h, particles = [];

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    for(let i = 0; i < 400; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            size: Math.random() * 3 + 1,
            speed: 0.005 // Velocidade 20% conforme pedido
        });
    }
}

function draw() {
    // Rastro denso para criar a "névoa" vermelha da imagem
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, w, h);

    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 1.5;
        if(p.r < 40) p.r = Math.max(w, h) * 0.8;

        const x = w/2 + Math.cos(p.angle) * p.r;
        const y = h/2 + Math.sin(p.angle) * p.r;

        ctx.fillStyle = "#ff0000";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#ff0000";
        
        // Desenha caracteres ou pontos densos
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", x, y);
    });

    // O Centro do Buraco Negro
    ctx.beginPath();
    ctx.arc(w/2, h/2, 60, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.shadowBlur = 40;
    ctx.shadowColor = "#ff0000";
    ctx.stroke();

    requestAnimationFrame(draw);
}

window.addEventListener("resize", init);
init();
draw();
