const canvas = document.getElementById('galaxy');
const ctx = canvas.getContext('2d');
const musica = document.getElementById('musica');

let width, height;
let estrellas = [];
let particulas = [];

// ===== INTENTAR REPRODUCIR MÚSICA DESDE EL INICIO =====
function intentarReproducir() {
  musica.play().catch(() => {
    // Si el navegador bloquea el autoplay, se activa con cualquier clic/toque
    const activar = () => {
      musica.play().catch(() => {});
      document.removeEventListener('click', activar);
      document.removeEventListener('touchstart', activar);
    };
    document.addEventListener('click', activar);
    document.addEventListener('touchstart', activar);
  });
}

intentarReproducir();
window.addEventListener('load', intentarReproducir);

// ===== TAMAÑO CANVAS =====
function redimensionar() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', redimensionar);
redimensionar();

// ===== ESTRELLAS =====
for (let i = 0; i < 250; i++) {
  estrellas.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radio: Math.random() * 1.5 + 0.3,
    brillo: Math.random(),
    velocidad: Math.random() * 0.02 + 0.006
  });
}

// ===== PARTÍCULAS =====
function crearParticula() {
  const colores = ['#ff6b9d', '#c44dff', '#6b5cff', '#ff9ec4', '#a78bfa'];
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radio: Math.random() * 2 + 0.5,
    vida: Math.random() * 100 + 50,
    color: colores[Math.floor(Math.random() * colores.length)]
  };
}
for (let i = 0; i < 100; i++) particulas.push(crearParticula());

// ===== ANIMACIÓN =====
function animar() {
  ctx.fillStyle = 'rgba(0, 0, 8, 0.2)';
  ctx.fillRect(0, 0, width, height);

  // Estrellas
  estrellas.forEach(e => {
    e.brillo += e.velocidad;
    if (e.brillo > 1 || e.brillo < 0.2) e.velocidad *= -1;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.radio, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.3 + e.brillo * 0.7})`;
    ctx.fill();
  });

  // Partículas
  particulas.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vida--;
    if (p.vida <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
      particulas[i] = crearParticula();
    }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 12;
    ctx.shadowColor = p.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  requestAnimationFrame(animar);
}
animar();