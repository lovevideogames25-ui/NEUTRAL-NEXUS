document.addEventListener("DOMContentLoaded", () => {
  const leftNavItems = [
    { icon: "fa-home", link: "index.html" },
    { icon: "fa-gamepad-modern", link: "g.html" },
    { icon: "fa-browser", link: "tabs.html" },
    { icon: "fa-grid", link: "a.html" },
    { icon: "fa-tv", link: "m.html" },
    { icon: "fa-robot", link: "ai.html" },
  ];

  const rightNavItems = [
    { icon: "fa-handshake", link: "pn.html" },
    { icon: "fa-cog", link: "set.html" },
  ];

  const leftNavContainer = document.querySelector(".nav-left");
  const rightNavContainer = document.querySelector(".nav-right");

  // L
  leftNavItems.forEach((item) => {
    const button = document.createElement("button");
    button.className = "nav-button";
    button.innerHTML = `<i class="fa-solid fa-regular ${item.icon}"></i>`;
    button.onclick = () => (window.location.href = item.link);
    leftNavContainer.appendChild(button);
  });

  // R
  rightNavItems.forEach((item) => {
    const button = document.createElement("button");
    button.className = "nav-button";
    button.innerHTML = `<i class="fa-solid fa-regular ${item.icon}"></i>`;
    button.onclick = () => (window.location.href = item.link);
    rightNavContainer.appendChild(button);
  });
});
