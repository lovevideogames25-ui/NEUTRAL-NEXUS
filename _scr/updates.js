function updateBattery() {
  if ("getBattery" in navigator) {
    navigator.getBattery().then(function (battery) {
      function updateAll() {
        const level = battery.level;
        const percent = Math.round(level * 100);
        document.getElementById("battery-percent").textContent = percent + "%";
        document.querySelector(".battery-level").style.width =
          30 * level + "px";
      }
      updateAll();
      battery.addEventListener("levelchange", updateAll);
    });
  } else {
    document.getElementById("battery-percent").textContent = "N/A";
  }
}
updateBattery();

function updateTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const timeString = hours + ":" + formattedMinutes + " " + ampm;
  document.getElementById("time-display").textContent = timeString;
}

function updateDate() {
  const dateElement = document.getElementById("date");
  if (!dateElement) return;

  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  hours = hours % 12 || 12;
  const day = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();

  dateElement.textContent = `${day}, ${month} ${date}`;
}
updateTime();
updateDate();
setInterval(updateTime, 1000);
