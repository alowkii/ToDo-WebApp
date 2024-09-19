import "./styles.css";
import "./icon.js";
import "./theme.js";
import "./menu.js";

const root = document.querySelector(":root");
const theme = root.getAttribute("data-theme");
changeTheme(theme);
