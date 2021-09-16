import { lego } from "@armathai/lego";
import { ViewEvents } from "./configs/view-events";

const BORDER_SIZE = 4;
const homeIndicator = "home-indicator";
const homeIndicatorL = "home-indicator-l";
const homeIndicatorP = "home-indicator-p";
const notch = "notch";
const notchTop = "notch-top";
const notchLeft = "notch-left";
const notchRight = "notch-right";
const roundedBorders = "border-radius";

function lp(l, p) {
  if (window.matchMedia("(orientation: portrait)").matches) {
    // you're in PORTRAIT mode
    return p;
  }
  if (window.matchMedia("(orientation: landscape)").matches) {
    // you're in LANDSCAPE mode
    return l;
  }
  return null;
}

function getBaseWidth() {
  return lp(1200, 675);
}

function getBaseHeight() {
  return lp(675, 1200);
}

function getSafeAreaLeftRightMargin() {
  return 15;
}

function getSafeAreaTopBottomMargin() {
  return lp(15, 20);
}

function getLeftTopInactiveAreaWidth() {
  return lp(275, 275);
}

function getLeftTopInactiveAreaHeight() {
  return lp(72, 75);
}

function getRightTopInactiveAreaWidth() {
  return lp(144, 140);
}

function getRightTopInactiveAreaHeight() {
  return lp(124, 122);
}

function getRightBottomInactiveAreaWidth() {
  return lp(123, 106);
}

function getRightBottomInactiveAreaHeight() {
  return lp(67, 70);
}

function isIphoneXScreenSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return lp(
    () => width === 812 && height === 375,
    () => width === 375 && height === 812
  )();
}

function addStyle(css) {
  const head = document.getElementsByTagName("head")[0];
  const style = document.createElement("style");
  style.type = "text/css";
  style.appendChild(document.createTextNode(css));
  head.appendChild(style);
}

function addHomeIndicatorClass() {
  const css = `
  .${homeIndicator} {
      position: absolute;
      left: 50%;
      bottom: 5px;
      height: 5px;
      background-color: #FFF;
      border-radius: 3px;
  }

  .${homeIndicatorL} {
      width: 180px;
      margin-left: -90px;
  }

  .${homeIndicatorP} {
      width: 140px;
      margin-left: -70px;
  }
  `;
  addStyle(css);
}

function addNotchClass() {
  const css = `
  .${notch} {
      position: absolute;
      background-color: #000000;
      z-index: 222;
      opacity: .9;
  }

  .${notchTop} {
      left: 50%;
      top: 0;
      width: 210px;
      height: 30px;
      margin-left: -105px;
      border-radius: 0 0 20px 20px;
  }

  .${notchLeft} {
      left: 0;
      top: 50%;
      height: 210px;
      width: 30px;
      margin-top: -105px;
      border-radius: 0 20px 20px 0;
  }
  
  .${notchRight} {
      right: 0;
      top: 50%;
      height: 210px;
      width: 30px;
      margin-top: -105px;
      border-radius: 20px 0 0 20px;
  }
  `;
  addStyle(css);
}

function addRoundedBordersClass() {
  const css = `
  .${roundedBorders} {
      border-radius: 44px;
  }
  `;
  addStyle(css);
}

function createNotch() {
  const notchDiv = document.createElement("div");

  return notchDiv;
}

function createNotches() {
  return { top: createNotch(), left: createNotch(), right: createNotch() };
}

function createHomeIndicator() {
  const homeIndicatorDiv = document.createElement("div");
  if (isIphoneXScreenSize()) {
    homeIndicatorDiv.classList.add(homeIndicator, lp(homeIndicatorL, homeIndicatorP));
  }
  return homeIndicatorDiv;
}

function setInactiveAreaSize(element, width, height) {
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
}

function setSafeAreaBounds(element, x, y, width, height) {
  element.style.left = `${x - BORDER_SIZE / 2}px`;
  element.style.top = `${y - BORDER_SIZE / 2}px`;
  element.style.width = `${width - 2 * x - BORDER_SIZE}px`;
  element.style.height = `${height - 2 * y - BORDER_SIZE}px`;
}

function createInactiveArea(width, height, position) {
  const element = document.createElement("div");
  element.style.position = "absolute";
  Object.keys(position).forEach((key) => {
    element.style[key] = position[key];
  });
  element.style.background = "#9B16C8";
  element.style.opacity = "0.8";
  setInactiveAreaSize(element, width, height);
  return element;
}

function createSafeArea(x, y, width, height) {
  const element = document.createElement("div");
  element.style.position = "absolute";
  element.style.pointerEvents = "none";
  element.style.borderColor = "#FFF200";
  element.style.borderStyle = "dashed";
  element.style.borderWidth = `${BORDER_SIZE}px`;
  element.style.opacity = "0.8";
  setSafeAreaBounds(element, x, y, width, height);
  return element;
}

function getCanvasBounds(canvas) {
  const { width, height } = canvas;
  const styleWidth = canvas.style.width.replace("px", "");
  const styleHeight = canvas.style.height.replace("px", "");
  return { width: parseInt(styleWidth || width, 10), height: parseInt(styleHeight || height, 10) };
}

export function addOverlayCommand() {
  // return;
  addRoundedBordersClass();
  addHomeIndicatorClass();
  addNotchClass();
  const creative = document.getElementById("phaser-game");
  const canvas = creative.children[0];
  const leftTopInactiveArea = createInactiveArea(10, 10, { left: 0, top: 0 });
  const rightTopInactiveArea = createInactiveArea(10, 10, { right: 0, top: 0 });
  const rightBottomInactiveArea = createInactiveArea(10, 10, { right: 0, bottom: 0 });
  const homeIndicatorElement = createHomeIndicator();
  const notches = createNotches();
  const safeArea = createSafeArea(0, 0, 10, 10);
  creative.appendChild(leftTopInactiveArea);
  creative.appendChild(rightTopInactiveArea);
  creative.appendChild(rightBottomInactiveArea);
  creative.appendChild(homeIndicatorElement);
  Object.keys(notches).forEach((k) => creative.appendChild(notches[k]));
  creative.appendChild(safeArea);

  const onResize = () => {
    setTimeout(() => {
      const { width, height } = getCanvasBounds(canvas);
      const scaleX = width / getBaseWidth();
      const scaleY = height / getBaseHeight();
      setInactiveAreaSize(
        leftTopInactiveArea,
        scaleX * getLeftTopInactiveAreaWidth(),
        scaleY * getLeftTopInactiveAreaHeight()
      );
      setInactiveAreaSize(
        rightTopInactiveArea,
        scaleX * getRightTopInactiveAreaWidth(),
        scaleY * getRightTopInactiveAreaHeight()
      );
      setInactiveAreaSize(
        rightBottomInactiveArea,
        scaleX * getRightBottomInactiveAreaWidth(),
        scaleY * getRightBottomInactiveAreaHeight()
      );
      setSafeAreaBounds(safeArea, getSafeAreaLeftRightMargin(), getSafeAreaTopBottomMargin(), width, height);
      homeIndicatorElement.setAttribute("class", "");
      Object.keys(notches).forEach((k) => notches[k].setAttribute("class", ""));
      canvas.classList.remove(roundedBorders);
      if (isIphoneXScreenSize()) {
        canvas.classList.add(roundedBorders);
        homeIndicatorElement.classList.add(homeIndicator, lp(homeIndicatorL, homeIndicatorP));
        lp(
          () => {
            notches.left.classList.add(notch, notchLeft);
            notches.right.classList.add(notch, notchRight);
          },
          () => {
            notches.top.classList.add(notch, notchTop);
          }
        ).call(null);
      }
    }, 250);
  };

  lego.event.on(ViewEvents.Game.Resize, onResize);
  onResize();
}
