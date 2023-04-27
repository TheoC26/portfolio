window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas");
  const topRef = document.querySelector("#top");
  const projectsRef = document.querySelector("#projects");
  const techRef = document.querySelector("#technologies");
  const aboutmeRef = document.querySelector("#about-me");
  const contactRef = document.querySelector("#contact");
  const blogRef = document.querySelector("#blog");
  const aboutMeHover = document.querySelectorAll(".aboutme-hover");
  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });
  let whichSlide = 0;
  let isHovering = false;
  const leftPadding = 94;
  const topPadding = 156;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function checkVisible(elm) {
    var rect = elm.getBoundingClientRect();
    var viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );
    return !(rect.bottom < window.innerHeight / 2 || rect.top - viewHeight >= -window.innerHeight / 2);
  }

  class Particle {
    constructor(
      type,
      effect,
      x,
      y,
      radius,
      color,
      frictionMultiplier,
      easeMultiplier
    ) {
      this.type = type;
      this.effect = effect;
      this.x =
        (Math.random() * effect.canvasWidth) / 2 + effect.canvasWidth / 4;
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
      // this.effect.context.fillCircle(this.originX, this.originY, this.radius);
      this.effect.context.beginPath();
      this.effect.context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        2 * Math.PI,
        false
      );
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

      this.x +=
        (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
      this.y +=
        (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
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

    getNextParticle(index) {
      for (let i = index + 1; i < this.particles.length; i++) {
        if (this.particles[i].type === "display") {
          return i;
        }
      }
    }

    renderText() {
      this.context.font = "600 96px Mosk";
      this.context.fillText("theodore chan", 130, window.innerHeight - 130);
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
              new Particle("display", this, x, y, radius, color, 0.007, 0.5)
            );
          }
        }
      }
      for (let y = 0; y < this.canvasHeight; y += this.particleGap + 2) {
        for (let x = 0; x < this.canvasWidth; x += this.particleGap + 2) {
          if (Math.random() < 0.13) {
            const radius = Math.random() * 2 + 0.2;
            const color = `rgb(${219}, ${219}, ${219})`;
            this.particles.push(
              new Particle("background", this, x, y, radius, color, 0.1, 0.05)
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
      let pixelIndex = 0;
      let particlesUsed = 0;
      this.context.clearRect(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < this.canvasHeight; y += this.particleGap) {
        for (let x = 0; x < this.canvasWidth; x += this.particleGap) {
          const index = (x + y * pixles.width) * 4;
          const alpha = pixles.data[index + 3];
          if (alpha > 0) {
            particlesUsed++;
            pixelIndex = this.getNextParticle(pixelIndex); // runs one time too early and is missing 0
            if (this.particles[pixelIndex] != undefined) {
              this.particles[pixelIndex].color = `rgb(0, 0, 0)`;
              this.particles[pixelIndex].originX = x;
              this.particles[pixelIndex].originY = y;
            }
          }
        }
      }
      this.particles[0].color = `rgba(0, 0, 0, 0)`; // to hack the first particle so it doens't show up
      for (let i = particlesUsed; i < this.particles.length; i++) {
        if (this.particles[i].type === "display") {
          this.particles[i].color = "rgba(0, 0, 0, 0)";
        }
      }
    }

    morphImage(imagePath, x, y, w, h) {
      let newImage = new Image();
      newImage.src = imagePath;
      newImage.onload = () => {
        // Draw the image onto the context
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(newImage, x, y, w, h);
        const pixles = this.context.getImageData(
          0,
          0,
          this.canvasWidth,
          this.canvasHeight
        );
        let pixelIndex = 0;
        let particlesUsed = 0;
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        for (let y = 0; y < this.canvasHeight; y += this.particleGap) {
          for (let x = 0; x < this.canvasWidth; x += this.particleGap) {
            const index = (x + y * pixles.width) * 4;
            const alpha = pixles.data[index + 3];
            if (alpha > 0) {
              particlesUsed++;
              pixelIndex = this.getNextParticle(pixelIndex); // runs one time too early and is missing 0
              if (this.particles[pixelIndex] != undefined) {
                this.particles[pixelIndex].color = `rgb(0, 0, 0)`;
                this.particles[pixelIndex].originX = x;
                this.particles[pixelIndex].originY = y;
              }
            }
          }
        }
        this.particles[0].color = `rgba(0, 0, 0, 0)`; // to hack the first particle so it doens't show up
        for (let i = particlesUsed; i < this.particles.length; i++) {
          if (this.particles[i].type === "display") {
            this.particles[i].color = "rgba(0, 0, 0, 0)";
          }
        }
      };
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

    if (checkVisible(topRef) && whichSlide != 0) {
      whichSlide = 0;
      effect.morphText("theodore chan", 96, 130, window.innerHeight - 130);
    } else if (checkVisible(projectsRef) && whichSlide != 1) {
      whichSlide = 1;
      effect.morphText("projects", 96, leftPadding, topPadding);
    } else if (checkVisible(techRef) && whichSlide != 2) {
      whichSlide = 2;
      effect.morphText("technologies", 96, leftPadding, topPadding);
    } else if (checkVisible(aboutmeRef) && whichSlide != 3) {
      whichSlide = 3;
      // check hover over different peices of text
      effect.morphText("about me", 96, leftPadding, topPadding);

    } else if (checkVisible(contactRef) && whichSlide != 4) {
      whichSlide = 4;
      effect.morphText("contact", 96, leftPadding, topPadding);
    } else if (checkVisible(blogRef) && whichSlide != 5) {
      whichSlide = 5;
      effect.morphText("blog", 96, leftPadding, topPadding);
    }

    requestAnimationFrame(animate);
  }
  // delay starting the animation for 1 second
  setTimeout(animate, 2000);


  aboutMeHover.forEach((element) => {
    element.addEventListener("mouseover", (e) => {
      if (!isHovering) {
        // switch statement for each element
        if (e.target.innerHTML === "Big Apple") effect.morphImage("aboutme/nyc.png", leftPadding, 15, 273, 178);
        if (e.target.innerHTML === "the slopes") effect.morphImage("aboutme/skier.png", leftPadding - 20, 35, 278, 181);
        if (e.target.innerHTML === "tennis court") effect.morphImage("aboutme/tennis.png", leftPadding - 30, 10, 200, 200);
        if (e.target.innerHTML === "rockstar status") effect.morphImage("aboutme/band.png", leftPadding - 20, 20, 350, 184);

        
        isHovering = true;
      }
      

    });
    element.addEventListener("mouseout", () => {
      isHovering = false;
      effect.morphText("about me", 96, leftPadding, topPadding);
    });
  })

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.canvasWidth = canvas.width;
    effect.canvasHeight = canvas.height;
    effect.renderText();
  });
});
