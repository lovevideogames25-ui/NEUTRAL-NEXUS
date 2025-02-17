function applyTabCloak() {
  const tabTitle = localStorage.getItem("tabCloakTitle");
  const tabFavicon = localStorage.getItem("tabCloakFavicon");

  if (tabTitle) {
    document.title = tabTitle;
  }

  if (tabFavicon) {
    let faviconLink = document.querySelector("link[rel='icon']");
    if (!faviconLink) {
      faviconLink = document.createElement("link");
      faviconLink.rel = "icon";
      document.head.appendChild(faviconLink);
    }
    faviconLink.href = tabFavicon;
  }
}

document.addEventListener("DOMContentLoaded", applyTabCloak);
