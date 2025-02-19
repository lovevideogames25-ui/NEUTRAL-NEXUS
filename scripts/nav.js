document.addEventListener("DOMContentLoaded", () => {
  const leftNavItems = [
    { icon: "fa-home", link: "index.html", tooltip: "Home" },
    { icon: "fa-gamepad-modern", link: "g.html", tooltip: "Games" },
    {
      icon: "fa-browser",
      link: "#",
      tooltip: "Browse",
      isDropdown: true,
      dropdownItems: [
        { link: "tabs.html", tooltip: "Tabs" },
        { link: "a.html", tooltip: "Apps" },
      ],
    },
    {
      icon: "fa-tv",
      link: "#",
      tooltip: "Media",
      isDropdown: true,
      dropdownItems: [
        { link: "m.html", tooltip: "Movies" },
        { link: "#", tooltip: "YTUB" },
      ],
    },
    {
      icon: "fa-robot",
      link: "#",
      tooltip: "AI",
      isDropdown: true,
      dropdownItems: [{ link: "ai.html", tooltip: "Chatbot" }],
    },
  ];

  const rightNavItems = [
    {
      icon: "fa-share-nodes",
      link: "#",
      tooltip: "Socials",
      isDropdown: true,
      dropdownItems: [
        { link: "https://discord.gg/s2WXSyJrwA", tooltip: "Discord" },
      ],
    },
    {
      icon: "fa-ellipsis",
      link: "#",
      tooltip: "Extras",
      isDropdown: true,
      dropdownItems: [
        { link: "links.html", tooltip: "Links" },
        { link: "set.html", tooltip: "Settings" },
        { link: "pn.html", tooltip: "Partners" },
        { link: "cred.html", tooltip: "Credits" },
      ],
    },
  ];

  const leftNavContainer = document.querySelector(".nav-left");
  const rightNavContainer = document.querySelector(".nav-right");

  const createNavButton = (item, container) => {
    const button = document.createElement("button");
    button.className = "nav-button";

    if (item.isDropdown) {
      button.classList.add("nav-dropdown-button");
      button.innerHTML = `<i class="fa-solid fa-regular ${item.icon}"></i>`;
      button.onclick = () => button.classList.toggle("active");

      // tooltip
      const tooltip = document.createElement("span");
      tooltip.className = "tooltip";
      tooltip.textContent = item.tooltip;
      button.appendChild(tooltip);

      const dropdown = document.createElement("div");
      dropdown.className = "nav-dropdown";

      // dropdown
      item.dropdownItems.forEach((dropdownItem) => {
        const dropdownButton = document.createElement("div");
        dropdownButton.className = "nav-dropdown-item";
        dropdownButton.innerHTML = dropdownItem.tooltip;
        dropdownButton.onclick = () =>
          (window.location.href = dropdownItem.link);
        dropdown.appendChild(dropdownButton);
      });

      button.appendChild(dropdown);
    } else {
      button.innerHTML = `<i class="fa-solid fa-regular ${item.icon}"></i>`;
      button.onclick = () => (window.location.href = item.link);

      const tooltip = document.createElement("span");
      tooltip.className = "tooltip";
      tooltip.textContent = item.tooltip;
      button.appendChild(tooltip);
    }

    container.appendChild(button);
  };

  // l
  leftNavItems.forEach((item) => createNavButton(item, leftNavContainer));

  // r
  rightNavItems.forEach((item) => createNavButton(item, rightNavContainer));

  document.addEventListener("click", (event) => {
    const dropdowns = document.querySelectorAll(".nav-dropdown-button");
    dropdowns.forEach((button) => {
      const dropdown = button.querySelector(".nav-dropdown");
      if (dropdown && !button.contains(event.target)) {
        button.classList.remove("active");
      }
    });
  });
});
