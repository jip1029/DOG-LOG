const leftBtn = document.getElementById("leftDog");
const rightBtn = document.getElementById("rightDog");
const leftImg = document.getElementById("leftImg");
const rightImg = document.getElementById("rightImg");
const mainContainer = document.getElementById("main-container");
const winnerContainer = document.getElementById("winner-container");
const winningImg = document.getElementById("winningImg");
const restartBtn = document.getElementById("restart");
const clickNum = document.getElementById("clickNum");

let pressCount = 3;
let lastPicked;

const fetchDogs = function () {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((result) => {
      leftImg.src = result.message;
    })
    .catch((err) => console.log(err));
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((result) => {
      rightImg.src = result.message;
    })
    .catch((err) => console.log(err));
};

const fetchOne = function () {
  console.log(lastPicked);
  if (!lastPicked) {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((result) => {
        rightImg.src = result.message;
      });
  } else {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((result) => {
        leftImg.src = result.message;
      });
  }
};

const leftButtonClick = function () {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((result) => {
      leftImg.src = result.message;
      pressCount--;
      lastPicked = true;
      checkWinner();
      clickNum.innerHTML = `Clicks Left: ${pressCount}`;
    })
    .catch((err) => console.log(err));
};

const rightButtonClick = function () {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json())
    .then((result) => {
      rightImg.src = result.message;
      pressCount--;
      lastPicked = false;
      checkWinner();
      clickNum.innerHTML = `Clicks Left: ${pressCount}`;
    })
    .catch((err) => console.log(err));
};

const restartGame = function () {
  if (pressCount > 0) {
    fetchDogs();
  } else {
    fetchOne();
  }
  mainContainer.style.visibility = "visible";
  winnerContainer.style.visibility = "hidden";
  pressCount = 3;
  clickNum.innerHTML = `Times clicked: ${pressCount}`;
};

const checkWinner = function () {
  if (pressCount <= 0) {
    mainContainer.style.visibility = "hidden";
    winnerContainer.style.visibility = "visible";
    if (lastPicked) {
      winningImg.src = rightImg.src;
      saveWinner();
    } else {
      winningImg.src = leftImg.src;
      saveWinner();
    }
  }
};

const saveWinner = function () {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open("Post", "/favDog", true);
  xmlHttp.setRequestHeader("Content-type", "image/jpeg");
  xmlHttp.send(winningImg.src);
};
