// Start Pixi with a transparent canvas that fills the window.
const app = new PIXI.Application();
await app.init({ resizeTo: window, backgroundAlpha: 0, antialias: true });
app.canvas.setAttribute('aria-hidden', 'true');
document.body.appendChild(app.canvas);

// Use one Graphics object for the whole grid.
const dots = new PIXI.Graphics();
app.stage.addChild(dots);

// Start outside the screen so the dots stay small until the mouse moves.
let mouseX = -1000;
let mouseY = -1000;

window.addEventListener('pointermove', moveMouse);

function moveMouse(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

// Redraw the grid every frame. Dots near the mouse become larger.
app.ticker.add(drawDots);

function drawDots() {
  dots.clear();

  for (let x = 0; x < app.screen.width; x += 36) {
    for (let y = 0; y < app.screen.height; y += 36) {
      const distance = Math.hypot(x - mouseX, y - mouseY);
      const radius = Math.max(1, 7 - distance / 25);
      dots.circle(x, y, radius);
    }
  }

  dots.fill({ color: '#c6ff4d', alpha: 0.2 });
}
