/**
 * Neutral Nexus - Navigation
 * A completely new design by HamburgerGuy
 */

const navContainer = document.getElementById("nav-items");

navItems.forEach((item, index) => {
  const navItemstem = document.createElement("a");
  navItemstem.className = "nav-item" + (index === 0 ? " active" : "");
  navItemstem.innerHTML = `
          <div class="icon-container">
            <i class="fa-regular ${item.icon}"></i>
          </div>
          <span class="nav-text">${item.title}</span>
        `;
  navItemstem.href = "#";
  navItemstem.onclick = (e) => {
    e.preventDefault();
    if (item.url) {
      loadPage(item.url, navItemstem);
    }
  };
  navContainer.appendChild(navItemstem);
});

function loadPage(url, selectedItem) {
  const frame = document.getElementById("frame");
  frame.src = url;
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => item.classList.remove("active"));
  selectedItem.classList.add("active");
}

document.querySelector(".fa-handshake").parentElement.onclick = () => {
  const partnersUrl = "page/partners.html";
  const frame = document.getElementById("frame");
  frame.src = partnersUrl;
};

document.querySelector(".fa-cog").parentElement.onclick = () => {
  const settingsUrl = "page/options.html";
  const frame = document.getElementById("frame");
  frame.src = settingsUrl;
};

function setActiveNav(title) {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => item.classList.remove("active"));
  const activeItem = Array.from(navItems).find((item) =>
    item.textContent.includes(title)
  );
  if (activeItem) activeItem.classList.add("active");
}

document.querySelector(".fa-expand").parentElement.onclick = () => {
  const frame = document.getElementById("frame");
  if (frame.requestFullscreen) {
    frame.requestFullscreen();
  } else if (frame.mozRequestFullScreen) {
    frame.mozRequestFullScreen();
  } else if (frame.webkitRequestFullscreen) {
    frame.webkitRequestFullscreen();
  } else if (frame.msRequestFullscreen) {
    frame.msRequestFullscreen();
  }
};
