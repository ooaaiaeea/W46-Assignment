const app = new PIXI.Application();

await app.init({
  resizeTo: window,
  backgroundAlpha: 0,
  antialias: true
});

app.canvas.setAttribute('aria-hidden', 'true');
document.body.appendChild(app.canvas);

const dots = new PIXI.Graphics();
app.stage.addChild(dots);

let mouseX = -1000;
let mouseY = -1000;

window.addEventListener('pointermove', moveMouse);

function moveMouse(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

app.ticker.add(drawDots);

function drawDots() {
  dots.clear();

  for (let x = 0; x < app.screen.width; x += 36) {
    for (let y = 0; y < app.screen.height; y += 36) {

      // Measure the distance between each dot and the mouse.
      const distance = Math.hypot(x - mouseX, y - mouseY);

      // Dots near the mouse grow. The smallest radius is 1.
      const radius = Math.max(1, 7 - distance / 25);

      dots.circle(x, y, radius);
    }
  }

  dots.fill({
    color: '#ffffff',
    alpha: 0.15
  });
}