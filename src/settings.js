export {getNotificationTime, setNotificationTime};
import { getStorageItem, setStorageItem } from "./local-storage";

function getNotificationTime() {
    return JSON.parse(getStorageItem('notification-time'));
}

function setNotificationTime(time) {
    setStorageItem('notification-time', JSON.stringify(time));
}