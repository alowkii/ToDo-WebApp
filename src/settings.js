export {getNotificationTime, setNotificationTime, displaySettings, changeToCustomTheme};
import { getStorageItem, removeStorageItem, setStorageItem } from "./local-storage";

function getNotificationTime() {
    return JSON.parse(getStorageItem('notification-time'));
}

function setNotificationTime(time) {
    setStorageItem('notification-time', JSON.stringify(time));
}

function displaySettings(){
    toggleSettingWindow();

    const settingsWindow = document.querySelector('.settings-window');
    settingsWindow.innerHTML = `
        <div class="settings-title">
            <p>Settings</p>
        </div>
        <div class="close-settings">
            <i class="fas fa-times" onclick="toggleSettingWindow()"></i>
        </div>
        <div class="settings-content">
            <div class="settings-item">
                <p>Notification Time</p>
                <input type="time" id="notification-time" value="${getNotificationTime()}">
            </div>
            <div class="settings-item">
                <p>Custom Theme</p>
                <button onclick="setCustomTheme()">Upload</button>
                <button onclick="setDefaultTheme()">Default</button>
            </div>
            <div class="settings-save">
                <button onclick="saveSettings()">Save</button>
            </div>
        </div>
    `;
}

function toggleSettingWindow(){
    if(document.querySelector('.settings-window')){
        document.querySelector('.settings-window').remove();
    }else{
        const settingsWindow = document.createElement('div');
        settingsWindow.classList.add('settings-window');
        document.querySelector('body').appendChild(settingsWindow);
    }

    //toggle blur overlay
    const blurOverlay = document.getElementById("blur-overlay");
    if(blurOverlay.style.display == "block"){
        blurOverlay.style.display = "none";
    }else{
        blurOverlay.style.display = "block";
    }
}

function saveSettings(){
    const notificationTime = document.getElementById('notification-time').value;
    setNotificationTime(notificationTime);
    
    toggleSettingWindow();
}

function setCustomTheme(){
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.click();

    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(){
            const customTheme = JSON.parse(reader.result);
            setStorageItem('custom-theme', JSON.stringify(customTheme));
            if(customTheme){
                changeToCustomTheme(customTheme);
            }
        }
    });
}

function changeToCustomTheme(theme){
    const root = document.querySelector(':root');
    root.style.setProperty('--primary-light-color', theme.light.primary);
    root.style.setProperty('--secondary-light-color', theme.light.secondary);
    root.style.setProperty('--tertiary-light-color', theme.light.tertiary);
    root.style.setProperty('--quaternary-light-color', theme.light.quaternary);
    root.style.setProperty('--quinary-light-color', theme.light.quinary);

    root.style.setProperty('--primary-dark-color', theme.dark.primary);
    root.style.setProperty('--secondary-dark-color', theme.dark.secondary);
    root.style.setProperty('--tertiary-dark-color', theme.dark.tertiary);
    root.style.setProperty('--quaternary-dark-color', theme.dark.quaternary);
    root.style.setProperty('--quinary-dark-color', theme.dark.quinary);

    root.style.setProperty('--priority-low', theme.priority.low);
    root.style.setProperty('--priority-medium', theme.priority.medium);
    root.style.setProperty('--priority-high', theme.priority.high);
}

function setDefaultTheme(){
    removeStorageItem('custom-theme');

    const root = document.querySelector(':root');
    root.style.setProperty('--primary-light-color', '#EBF0F2');
    root.style.setProperty('--secondary-light-color', '#404040');
    root.style.setProperty('--tertiary-light-color', '#735646');
    root.style.setProperty('--quaternary-light-color', '#8C7456');
    root.style.setProperty('--quinary-light-color', '#A6916A');

    root.style.setProperty('--primary-dark-color', '#1d1d1d');
    root.style.setProperty('--secondary-dark-color', '#EBF0F2');
    root.style.setProperty('--tertiary-dark-color', '#A6916A');
    root.style.setProperty('--quaternary-dark-color', '#5E4B32');
    root.style.setProperty('--quinary-dark-color', '#735646');

    
    root.style.setProperty('--priority-low', 'limegreen');
    root.style.setProperty('--priority-medium', 'rgba(255, 255, 0, 0.938)');
    root.style.setProperty('--priority-high', 'red');
}

window.saveSettings = saveSettings;
window.toggleSettingWindow = toggleSettingWindow;
window.setCustomTheme = setCustomTheme;
window.setDefaultTheme = setDefaultTheme;
