const navigationItems = document.querySelectorAll("#navigation");
const topRef = document.querySelector("#top");
const techRef = document.querySelector("#technologies");
const projectsRef = document.querySelector("#projects");
const aboutmeRef = document.querySelector("#about-me");
const contactRef = document.querySelector("#contact");
const cursorRef = document.querySelector("#cursor");
const buttonsRef = document.querySelectorAll("button");
const ancorsRef = document.querySelectorAll("a");
const inputsRef = document.querySelectorAll("input");
const textAreaRefs = document.querySelectorAll("textarea");
// const blogRef = document.querySelector("#blog");
const parent = document.querySelector("#parent");
let whichSlide = 0;

let mouse = {
  x: 0,
  y: 0,
};

// if hovering over a button, change the width of the cursor
buttonsRef.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    cursorRef.classList.add("hover");
  });
  button.addEventListener("mouseleave", () => {
    cursorRef.classList.remove("hover");
  });
});

// if hovering over a link, change the width of the cursor
ancorsRef.forEach((ancor) => {
  ancor.addEventListener("mouseenter", () => {
    cursorRef.classList.add("hover");
  });
  ancor.addEventListener("mouseleave", () => {
    cursorRef.classList.remove("hover");
  });
});

// if hovering over an input, add input class
inputsRef.forEach((input) => {
  input.addEventListener("mouseenter", () => {
    cursorRef.classList.add("input");
  });
  input.addEventListener("mouseleave", () => {
    cursorRef.classList.remove("input");
  });
});
textAreaRefs.forEach((textArea) => {
  textArea.addEventListener("mouseenter", () => {
    cursorRef.classList.add("input");
  });
  textArea.addEventListener("mouseleave", () => {
    cursorRef.classList.remove("input");
  });
});


document.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function lerp(current, target, factor) {
  return current * (1 - factor) + target * factor;
}

function calcDistance(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2);
}

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  return !(
    rect.bottom < window.innerHeight / 2 ||
    rect.top - viewHeight >= -window.innerHeight / 2
  );
}

class NavItem {
  constructor(element, i) {
    this.domElement = element;
    this.index = i;
    this.boundingClientRect = this.domElement.getBoundingClientRect();
    this.triggerArea = 60;
    this.interpolationFactor = 0.2;

    this.lerpingData = {
      x: { current: 0, target: 0 },
      y: { current: 0, target: 0 },
    };
    this.resize();
    this.render();
  }

  resize() {
    window.addEventListener("resize", () => {
      this.boundingClientRect = this.domElement.getBoundingClientRect();
    });
  }

  render() {
    const distance = calcDistance(
      mouse.x,
      mouse.y,
      this.boundingClientRect.left + this.boundingClientRect.width / 2,
      this.boundingClientRect.top + this.boundingClientRect.height / 2
    );
    let targetHolder = { x: 0, y: 0 };
    if (distance < this.triggerArea) {
      targetHolder.x =
        mouse.x -
        (this.boundingClientRect.left + this.boundingClientRect.width / 2);
      targetHolder.y =
        mouse.y -
        (this.boundingClientRect.top + this.boundingClientRect.height / 2);
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

    var scrollTop =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop;

    if (checkVisible(topRef)) {
      this.domElement.style.display = "block";
      this.domElement.style.transitionDuration = "80ms";
      this.domElement.style.left = `${
        this.boundingClientRect.left + this.lerpingData.x.current / 3
      }px`;
      this.domElement.style.top = `${
        this.boundingClientRect.top + this.lerpingData.y.current / 3
      }px`;
      this.domElement.style.transform = `rotateY(${
        -this.lerpingData.x.current / 2.5
      }deg) rotateX(${this.lerpingData.y.current / 2.5}deg)`;
    } else {
      if (window.innerWidth > 10000) {
        this.domElement.style.transitionDuration = "500ms";
        this.domElement.style.left = `${80}%`;
        this.domElement.style.transform = `rotate3d(0, 1, -.1, ${0}deg)`;
        if (this.index == 0) this.domElement.style.top = `${25}%`;
        if (this.index == 1) this.domElement.style.top = `${35}%`;
        if (this.index == 2) this.domElement.style.top = `${45}%`;
        if (this.index == 3) this.domElement.style.top = `${55}%`;
        if (this.index == 4) this.domElement.style.top = `${65}%`;
      } else {
        this.domElement.style.transitionDuration = "300ms";
        this.domElement.style.top = "0%";
        this.domElement.style.left = "100%";
      }
    }

    if (this.domElement.innerText == "technologies") {
      if (checkVisible(techRef)) {
        this.domElement.style.fontSize = "40px";
      } else {
        this.domElement.style.fontSize = "30px";
      }
    } else if (this.domElement.innerText == "projects") {
      if (checkVisible(projectsRef)) {
        this.domElement.style.fontSize = "40px";
      } else {
        this.domElement.style.fontSize = "30px";
      }
    } else if (this.domElement.innerText == "about me") {
      if (checkVisible(aboutmeRef)) {
        this.domElement.style.fontSize = "40px";
      } else {
        this.domElement.style.fontSize = "30px";
      }
    } else if (this.domElement.innerText == "contact") {
      if (checkVisible(contactRef)) {
        this.domElement.style.fontSize = "40px";
      } else {
        this.domElement.style.fontSize = "30px";
      }
    }

    // this.domElement.style.transform = `translate(${targetHolder.x}px, ${targetHolder.y}px)`;

    window.requestAnimationFrame(() => {
      this.render();
    });
  }
}

navigationItems.forEach((navigationItem, i) => {
  new NavItem(navigationItem, i);
});

function allowScroll() {
  parent.style.overflow = "scroll";
}

setTimeout(allowScroll, 2000);
