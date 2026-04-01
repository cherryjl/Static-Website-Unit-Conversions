import moonIcon from "../images/moon_icon.png";
import sunIcon from "../images/sun_icon.png";

// Selectors and variables.
const toggleBtn = document.getElementById("modeIcon");
const html = document.documentElement;
const savedTheme = localStorage.getItem("theme");
const sunIconPath = sunIcon;
const moonIconPath = moonIcon;

// Initial theme setup based on saved preference.
if (savedTheme === "dark") {
  html.classList.add("dark-mode");
  toggleBtn.src = moonIconPath;
} else {
  html.classList.remove("dark-mode");
  toggleBtn.src = sunIconPath;
}

// Event listener for toggle button.
toggleBtn.addEventListener("click", () => {
  html.classList.toggle("dark-mode");

  if (html.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.src = moonIconPath;
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.src = sunIconPath;
  }
});
