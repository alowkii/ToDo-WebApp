import "./styles.css";
import "./icon.js";
import "./theme.js";
import "./menu.js";
import { toggleNotificationWindow, addNotification } from "./notification-window.js";

const root = document.querySelector(":root");
const theme = root.getAttribute("data-theme");
changeTheme(theme);

window.toggleNotificationWindow = toggleNotificationWindow;