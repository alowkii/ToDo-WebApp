import "./styles.css";
import "./icon.js";
import "./theme.js";
import "./menu.js";
import "./local-storage.js";
import {addContent} from "./body-content.js";
import { toggleNotificationWindow, addNotification } from "./notification-window.js";
import { getStorageItem } from "./local-storage.js";

setTheme(getStorageItem('theme'));
addContent();

window.toggleNotificationWindow = toggleNotificationWindow;
window.addNotification = addNotification;