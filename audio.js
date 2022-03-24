const audio = document.querySelector(".audio");

function () {
  if (localStorage.getItem("audio") === "audio") {
    audio.play();
  }
}
audio.play();
