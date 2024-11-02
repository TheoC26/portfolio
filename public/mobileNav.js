const menuButtonRef = document.querySelector("#menu-button");
const menu1Ref = document.querySelector("#menu1");
const menu2Ref = document.querySelector("#menu2");
const menu3Ref = document.querySelector("#menu3");
const menuRef = document.querySelector("#menu");
let open = false;

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

const checkMenu = () => {
  // console.log(checkVisible(topRef));
  if (checkVisible(topRef)) {
    menuButtonRef.style.opacity = "0";
  } else {
    menuButtonRef.style.opacity = "1";
  }
  window.requestAnimationFrame(() => {
    checkMenu();
  });
};
checkMenu();


menuButtonRef.addEventListener("click", () => {
  if (!open) {
    menuRef.style.top = "0";
    menu1Ref.style.transform = "rotate(45deg)";
    menu1Ref.style.top = "0.75rem";
    menu2Ref.style.opacity = "0";
    menu3Ref.style.transform = "rotate(-45deg)";
    menu3Ref.style.top = "0.75rem";
  } else {
    menuRef.style.top = "-100%";
    menu1Ref.style.transform = "rotate(0deg)";
    menu1Ref.style.top = "0rem";
    menu2Ref.style.opacity = "1";
    menu3Ref.style.transform = "rotate(0deg)";
    menu3Ref.style.top = "1.5rem";
  }
  open = !open;
});
menuRef.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuRef.style.top = "-100%";
    menu1Ref.style.transform = "rotate(0deg)";
    menu1Ref.style.top = "0rem";
    menu2Ref.style.opacity = "1";
    menu3Ref.style.transform = "rotate(0deg)";
    menu3Ref.style.top = "1.5rem";
    open = !open;
  });
});