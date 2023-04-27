const techCardRef = document.querySelectorAll(".tech-card");
function lerp(current, target, factor) {
  return current * (1 - factor) + target * factor;
}

let subtractValue = 0;


function calcDistance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}
class TechCard {
  constructor(element, index) {
    this.index = index;
    this.element = element;
    this.boundingClientRect = this.element.getBoundingClientRect();
    this.interpolationFactor = 0.2;
    this.mouseOver = false;


    this.lerpingData = {
      x: { current: 0, target: 0 },
      y: { current: 0, target: 0 },
    };
    this.element.addEventListener("mouseover", () => {
      this.mouseOver = true;
    });
    this.element.addEventListener("mouseout", () => {
      this.mouseOver = false;
    });
    this.update();
  }

  update() {
    let targetHolder = { x: 0, y: 0 };
    if (this.index == 0) {
        subtractValue = this.boundingClientRect.top - this.element.clientHeight;
    }
    if (this.mouseOver) {
      targetHolder.x =
        mouse.x -
        (this.boundingClientRect.left + this.boundingClientRect.width / 2);
      targetHolder.y =
        mouse.y - (this.boundingClientRect.top - subtractValue + this.boundingClientRect.height);
    }
    this.lerpingData.x.target = targetHolder.x;
    this.lerpingData.y.target = targetHolder.y;
    for (const key in this.lerpingData) {
      this.lerpingData[key].current = lerp(
        this.lerpingData[key].current,
        this.lerpingData[key].target,
        this.interpolationFactor
      );
    }
    // 1804
    this.element.style.transitionDuration = "150ms";
    if (this.mouseOver) {

}

    this.element.style.transform = `rotateY(${
      this.lerpingData.x.current/3
    }deg) rotateX(${-this.lerpingData.y.current/3}deg)`;

    window.requestAnimationFrame(() => {
      this.update();
    });
  }
}

techCardRef.forEach((techCard, i) => {
  new TechCard(techCard, i);
});
