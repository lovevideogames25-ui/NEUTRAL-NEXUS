window.onload = () => {
  const loadingScreen = document.getElementById("loading");
  const fadeOutTime = Math.random() * 0.4;
  setTimeout(() => {
    loadingScreen.style.opacity = 0;
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, fadeOutTime * 200);
};
