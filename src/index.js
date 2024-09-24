import "./styles.css";
import "./icon.js";
import "./theme.js";
import "./menu.js";
import {addContent} from "./body-content.js";
import { toggleNotificationWindow, addNotification } from "./notification-window.js";

setTheme(localStorage.getItem("theme"));
addContent();

window.toggleNotificationWindow = toggleNotificationWindow;
window.addNotification = addNotification;