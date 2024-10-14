import "./styles.css";
import "./icon.js";
import "./theme.js";
import "./menu.js";
import "./local-storage.js";
import { userSignInPrompt, userInfoPrompt } from "./user.js";
import { addContent } from "./body-content.js";
import { toggleNotificationWindow, addNotification, createNotificationWindow } from "./notification-window.js";
import { getStorageItem } from "./local-storage.js";
import { getNotificationTime, setNotificationTime } from "./settings.js";

setTheme(getStorageItem('theme'));
addContent();

let notificationTime = getNotificationTime();
if(!notificationTime || notificationTime == ""){
    setNotificationTime("12:00");
    addNotification();
}

createNotificationWindow();


window.toggleNotificationWindow = toggleNotificationWindow;
window.addNotification = addNotification;
window.userSignInPrompt = userSignInPrompt;
window.userInfoPrompt = userInfoPrompt;