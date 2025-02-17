document.addEventListener("DOMContentLoaded", () => {
  const leftNavItems = [
    { icon: "fa-home", link: "index.html", tooltip: "Home" },
    { icon: "fa-gamepad-modern", link: "g.html", tooltip: "Games" },
    { icon: "fa-grid", link: "a.html", tooltip: "Apps" },
    { icon: "fa-browser", link: "tabs.html", tooltip: "Tabs" },
    { icon: "fa-tv", link: "m.html", tooltip: "Movies" },
    { icon: "fa-robot", link: "ai.html", tooltip: "AI" },
  ];

  const rightNavItems = [
    {
      icon: "fa-brands fa-discord",
      link: "https://discord.gg/s2WXSyJrwA",
      tooltip: "Discord",
    },
    {
      icon: "fa-link",
      link: "links.html",
      tooltip: "Links",
    },
    { icon: "fa-handshake", link: "pn.html", tooltip: "Partners" },
    { icon: "fa-ellipsis", link: "cred.html", tooltip: "Credits" },
    { icon: "fa-cog", link: "set.html", tooltip: "Settings" },
  ];

  const leftNavContainer = document.querySelector(".nav-left");
  const rightNavContainer = document.querySelector(".nav-right");

  const createNavButton = (item, container) => {
    const button = document.createElement("button");
    button.className = "nav-button";
    button.innerHTML = `<i class="fa-solid fa-regular ${item.icon}"></i>`;
    button.onclick = () => (window.location.href = item.link);

    const tooltip = document.createElement("span");
    tooltip.className = "tooltip";
    tooltip.textContent = item.tooltip;

    button.appendChild(tooltip);
    container.appendChild(button);
  };

  // append l
  leftNavItems.forEach((item) => createNavButton(item, leftNavContainer));

  // append r
  rightNavItems.forEach((item) => createNavButton(item, rightNavContainer));
});
