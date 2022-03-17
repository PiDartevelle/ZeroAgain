const buttonOnOff = document.querySelector(".onOff");
const soundButton = document.querySelector(".sound");

soundButton.addEventListener("click", () => {
  buttonOnOff.classList.toggle("show");
});
