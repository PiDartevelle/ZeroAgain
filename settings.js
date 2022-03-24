const buttonOnOff = document.querySelector(".onoff");
const soundButton = document.querySelector(".sound");

soundButton.addEventListener("click", () => {
  buttonOnOff.classList.toggle("show");
});

const chooseMode = document.querySelector(".choosemode");
const buttonDiff = document.querySelector(".diff");

buttonDiff.addEventListener("click", () => {
  chooseMode.classList.toggle("pop");
});

const btn = document.getElementById("rules");
const rulesNeon = document.querySelector(".neon");

btn.addEventListener("click", () => {
  rulesNeon.classList.toggle("style");
});

const audio = document.querySelector(".audio");
const btnOn = document.querySelector(".on");
const btnOff = document.querySelector(".off");

btnOn.addEventListener("click", () => {
  audio.play();
});

btnOff.addEventListener("click", () => {
  audio.pause();
});

const musicOnOff = document.querySelector(".music");

musicOnOff.addEventListener("click", () => {
  audio.play();
  if (musicOnOff.innerText === "Play") {
    musicOnOff.innerText = "Stop";
  } else {
    audio.pause();
    musicOnOff.innerText = "Play";
  }
});

localStorage.setItem("audio", "audio");
