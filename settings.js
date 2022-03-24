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
