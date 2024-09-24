import "./styles.css";
import "./icon.js";
import "./theme.js";
import "./menu.js";
import { toggleNotificationWindow, addNotification } from "./notification-window.js";

setTheme(localStorage.getItem("theme"));

window.toggleNotificationWindow = toggleNotificationWindow;