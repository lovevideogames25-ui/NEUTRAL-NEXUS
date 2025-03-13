document.addEventListener("DOMContentLoaded", function () {
  const abCloakBtn = document.getElementById("abCloakBtn");
  
  if (window !== window.parent) {
    abCloakBtn.style.opacity = "0.6";
    abCloakBtn.disabled = true;
  }

  abCloakBtn.addEventListener("click", function () {
    const newTab = window.open("about:blank", "_blank");
    if (newTab) {
      newTab.document.write(`
        <html>
          <head>
            <style>
              html, body {
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
              }
              iframe {
                width: 100%;
                height: 100%;
                border: none;
              }
            </style>
          </head>
          <body>
            <iframe src="${window.location.origin}"></iframe>
          </body>
        </html>
      `);
      newTab.document.close();
    } else {
      alert("Popup blocked! Please allow popups for this site.");
    }
  });
});


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
