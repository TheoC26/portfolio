const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", {
  willReadFrequently: true,
});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  effect.canvasWidth = canvas.width;
  effect.canvasHeight = canvas.height;
  effect.renderText();
});

class Particle {
  constructor(effect, x, y, radius, color, frictionMultiplier, easeMultiplier) {
    this.effect = effect;
    this.x = (Math.random() * effect.canvasWidth) / 2 + effect.canvasWidth / 4;
    this.y = effect.canvasHeight / 2;
    this.originX = x;
    this.originY = y;
    this.radius = radius;
    this.color = color;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = Math.random() * frictionMultiplier;
    this.ease = Math.random() * easeMultiplier + 0.07;
  }
  draw() {
    this.effect.context.fillStyle = this.color;
    this.effect.context.beginPath();
    this.effect.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.effect.context.fill();
  }
  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    this.force = -this.effect.mouse.radius / this.distance;
    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx = this.force * Math.cos(this.angle);
      this.vy = this.force * Math.sin(this.angle);
    }

    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
  }
}

class Effect {
  constructor(context, canvasWidth, canvasHeight) {
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.particles = [];
    this.particleGap = 4;
    this.mouse = {
      radius: 20000,
      x: undefined,
      y: undefined,
    };
    window.addEventListener("mousemove", (event) => {
      this.mouse.x = event.x;
      this.mouse.y = event.y;
    });
  }

  renderText() {
    this.context.font = "600 96px Mosk";
    this.context.fillText(
      "hello world",
      this.canvasWidth / 2 - 200,
      this.canvasHeight / 2
    );
    this.convertToParticles();
  }

  convertToParticles() {
    this.particles = [];
    const pixles = this.context.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < this.canvasHeight; y += this.particleGap) {
      for (let x = 0; x < this.canvasWidth; x += this.particleGap) {
        const index = (x + y * pixles.width) * 4;
        const alpha = pixles.data[index + 3];
        if (alpha > 0) {
          const red = pixles.data[index + 0];
          const green = pixles.data[index + 1];
          const blue = pixles.data[index + 2];
          const radius = Math.random() * 2 + 1.2;
          const color = `rgb(${red}, ${green}, ${blue})`;
          this.particles.push(
            new Particle(this, x, y, radius, color, 0.007, 0.5)
          );
        }
      }
    }
  }

  morphText(text, fontSize, x, y) {
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    this.context.font = `${fontSize}px Mosk 900`;
    this.context.fillStyle = "rgb(0, 0, 0)";
    this.context.fillText(text, x, y);
    const pixles = this.context.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    );
    let particlesUsed = 0;
    this.context.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < this.canvasHeight; y += this.particleGap) {
      for (let x = 0; x < this.canvasWidth; x += this.particleGap) {
        const index = (x + y * pixles.width) * 4;
        const alpha = pixles.data[index + 3];
        if (alpha > 0) {
          particlesUsed++;
          const red = pixles.data[index + 0];
          const green = pixles.data[index + 1];
          const blue = pixles.data[index + 2];
          const radius = Math.random() * 2 + 1.2;
          const color = `rgb(${red}, ${green}, ${blue})`;
          if (this.particles[particlesUsed] != undefined) {
            this.particles[particlesUsed].color = color;
            this.particles[particlesUsed].originX = x;
            this.particles[particlesUsed].originY = y;
          } else {
            this.particles.push(
              new Particle(this, x, y, radius, color, 0.007, 0.5)
            );
          }
        }
      }
    }

    for (let i = particlesUsed; i < this.particles.length; i++) {
      this.particles[i].color = "rgba(0, 0, 0, 0)";
    }
  }

  render() {
    this.particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
  }
}

const effect = new Effect(ctx, canvas.width, canvas.height);
effect.renderText();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.render();

  requestAnimationFrame(animate);
}
animate();
setTimeout(() => {
  effect.morphText(
    "morphed text",
    100,
    window.innerWidth / 2 - 200,
    window.innerHeight / 2
  );
}, 2000);
