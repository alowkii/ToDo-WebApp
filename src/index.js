import "./styles.css";
import "./icon.js";
import "./theme.js";
import "./menu.js";
import "./local-storage.js";
import "./progress-page.js";
import { userSignInPrompt, userInfoPrompt } from "./user.js";
import { addContent } from "./body-content.js";
import { toggleNotificationWindow, addNotification, loadNotificationWindow } from "./notification-window.js";
import { getStorageItem } from "./local-storage.js";
import { getNotificationTime, setNotificationTime } from "./settings.js";
import { displaySearchPage } from "./search-page.js";

setTheme(getStorageItem('theme'));
addContent();

let notificationTime = getNotificationTime();
if(!notificationTime || notificationTime == ""){
    setNotificationTime("12:00");
    addNotification();
}

loadNotificationWindow();

//Refresh the page every 1 minute
setInterval(() => {
    loadNotificationWindow();
}, 1000 * 60);

window.toggleNotificationWindow = toggleNotificationWindow;
window.addNotification = addNotification;
window.userSignInPrompt = userSignInPrompt;
window.userInfoPrompt = userInfoPrompt;