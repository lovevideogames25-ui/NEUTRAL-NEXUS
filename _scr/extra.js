const fullscreenBtn = document.getElementById("fullscr");
fullscreenBtn.addEventListener("click", () => {
  if (iframe) {
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    }
  }
});
const navBar = document.querySelector(".nav");
const hideNavBtn = document.getElementById("hideNavBtn");
const showNavBtn = document.getElementById("showNavBtn");

hideNavBtn.addEventListener("click", () => {
  navBar.classList.add("nav-hidden");
  showNavBtn.classList.add("btn-visible");
  document.querySelector("iframe").style.height = "100%";
});

showNavBtn.addEventListener("click", () => {
  navBar.classList.remove("nav-hidden");
  showNavBtn.classList.remove("btn-visible");
  document.querySelector("iframe").style.height = "calc(100% - 65px)";
});
