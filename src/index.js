import "./styles.css";
import "./icon.js";
import "./theme.js";
import "./menu.js";
import "./local-storage.js";
import { userSignInPrompt, userInfoPrompt } from "./user.js";
import { addContent } from "./body-content.js";
import { toggleNotificationWindow, addNotification } from "./notification-window.js";
import { getStorageItem } from "./local-storage.js";
import { displayTasks } from "./task-list.js";

setTheme(getStorageItem('theme'));
addContent();

window.toggleNotificationWindow = toggleNotificationWindow;
window.addNotification = addNotification;
window.userSignInPrompt = userSignInPrompt;
window.userInfoPrompt = userInfoPrompt;