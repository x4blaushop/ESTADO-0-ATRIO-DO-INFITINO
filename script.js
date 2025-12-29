const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letras = "01";
const tamanho = 14;
const colunas = canvas.width / tamanho;
const quedas = Array(Math.floor(colunas)).fill(0);

function desenharMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#62ff8a";
  ctx.font = tamanho + "px monospace";

  quedas.forEach((y, i) => {
    const texto = letras[Math.floor(Math.random() * letras.length)];
    ctx.fillText(texto, i * tamanho, y * tamanho);

    if (y * tamanho > canvas.height && Math.random() > 0.975) {
      quedas[i] = 0;
    }
    quedas[i]++;
  });
}

setInterval(desenharMatrix, 50);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
