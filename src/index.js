import "./styles.css";
import "./icon.js";
import { themeChange, getTheme, setTheme } from "./theme.js";
import { toggleMenu } from "./menu.js";
import { userSignInPrompt, userInfoPrompt } from "./user.js";
import { addContent, showEmptyCaseWindow } from "./body-content.js";
import { toggleNotificationWindow, addNotification, loadNotificationWindow } from "./notification-window.js";
import { getStorageItem, setStorageItem } from "./local-storage.js";
import { getNotificationTime, setNotificationTime } from "./settings.js";

if(getStorageItem('theme') == null){
    setTheme('light');
    setStorageItem('theme', 'light');
}else{
    setTheme(getStorageItem('theme'));
}

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
window.toggleMenu = toggleMenu;
window.themeChange = themeChange;
window.setTheme = setTheme;
window.getTheme = getTheme;