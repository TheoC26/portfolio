let calculateAngle = (e, item) => {
  // Get the x position of the users mouse, relative to the button itself
  let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
  // Get the y position relative to the button
  let y = Math.abs(item.getBoundingClientRect().y - e.clientY);

  // Calculate half the width and height
  let halfWidth = item.getBoundingClientRect().width / 2;
  let halfHeight = item.getBoundingClientRect().height / 2;

  // Use this to create an angle. I have divided by 6 and 4 respectively so the effect looks good.
  // Changing these numbers will change the depth of the effect.
  let calcAngleX = (x - halfWidth) / 6;
  let calcAngleY = (y - halfHeight) / 4;

  let gX = (1 - x / (halfWidth * 2)) * 100;
  let gY = (1 - y / (halfHeight * 2)) * 100;

  // Add the glare at the reflection of where the user's mouse is hovering
  item.querySelector(
    ".glare"
  ).style.background = `radial-gradient(circle at ${gX}% ${gY}%, rgba(255, 255, 255, 0.5), transparent)`;
  item.style.perspective = `${halfWidth * 6}px`;

  // Set the items transform CSS property
  item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04)`;
  // Reapply this to the shadow, with different dividers
  let calcShadowX = (x - halfWidth) / 3;
  let calcShadowY = (y - halfHeight) / 6;


  let dropShadowColor = `rgba(0, 0, 0, 0.2)`;
  // Add a filter shadow - this is more performant to animate than a regular box shadow.
  item.style.filter = `drop-shadow(${-calcShadowX}px ${-calcShadowY}px 10px ${dropShadowColor})`;
};

document.querySelectorAll(".tech-card").forEach((item) => {
  // For when the user's mouse 'enters' the card
  item.addEventListener("mouseenter", (e) => {
    calculateAngle(e, item);
  });

  // For when the users mouse moves on top of the card
  item.addEventListener("mousemove", (e) => {
    calculateAngle(e, item);
  });

  // For when the user's mouse leaves the card.
  item.addEventListener("mouseleave", function (e) {
    item.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
    let dropShadowColor = `rgba(0, 0, 0, 0.0)`;
    item.style.filter = ``;
    item.querySelector(
      ".glare"
    ).style.background = `radial-gradient(circle at 0% 0%, rgba(255, 255, 255, 0.3), transparent)`;
  });
});
