function toggleText() {
  const toggle = document.getElementById("beastModeToggle");
  const status = document.getElementById("status");

  if (toggle.checked) {
    status.innerHTML = "BEAST MODE: ON";
    status.style.color = "#00ff00";
  } else {
    status.innerHTML = "BEAST MODE: OFF";
    status.style.color = "#ff0000";
  }
}
