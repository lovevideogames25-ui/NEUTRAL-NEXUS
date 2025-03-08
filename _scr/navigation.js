function createButton(icon, tooltip, loc) {
  const button = document.createElement("button");
  const iconElement = document.createElement("i");
  const tooltipSpan = document.createElement("span");

  iconElement.className = icon;
  tooltipSpan.className = "tooltip";
  tooltipSpan.textContent = tooltip;

  button.appendChild(iconElement);
  button.appendChild(tooltipSpan);

  button.addEventListener("click", () => {
    document.getElementById("iframe").src = loc;
  });

  return button;
}

function generateNav(navData, position) {
  const navContainer = document.getElementById(position);
  navData.forEach(({ icon, tooltip, loc }) => {
    const button = createButton(icon, tooltip, loc);
    navContainer.appendChild(button);
  });
}

generateNav(navButtons.left, "nav-left");
generateNav(navButtons.right, "nav-right");
