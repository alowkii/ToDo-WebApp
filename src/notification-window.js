export {toggleNotificationWindow, addNotification };
import { getStorageItem, setStorageItem } from "./local-storage";
import { getNotificationTime, setNotificationTime } from "./settings";
import {add, formatDistance, isToday, subDays, parse, isAfter, isBefore} from 'date-fns';

function toggleNotificationWindow() {
    const notificationWindow = document.querySelector('.notification-window');

    if (notificationWindow && notificationWindow.classList.contains('add')) {
        notificationWindow.classList.remove('add');
        notificationWindow.classList.add('remove');
    } else {
        if (!notificationWindow) {
            createNotificationWindow();
        }
        const newNotificationWindow = document.querySelector('.notification-window');
        newNotificationWindow.classList.add('add');
        newNotificationWindow.classList.remove('remove');
    }
}

function createNotificationWindow() {
    const notificationWindow = document.createElement('div');
    notificationWindow.classList.add('notification-window');
    notificationWindow.innerHTML = ``;

    // Create the close button directly
    const notificationClose = document.createElement('div');
    notificationClose.classList.add('notificationBtn');
    notificationClose.classList.add('notificationClose');
    notificationClose.innerHTML = `<i class="fas fa-times"></i>`;
    notificationClose.addEventListener('click', toggleNotificationWindow);

    notificationWindow.appendChild(notificationClose);
    
    
    const notifications = document.createElement('div');
    notifications.classList.add('notifications');
    notificationWindow.appendChild(notifications);

    // Append the window to the correct container
    document.querySelector('.notification-container').appendChild(notificationWindow);

    // Add notifications
    const notificationData = JSON.parse(getStorageItem('tasks'));
    if(notificationData){
        notificationData.forEach(data => {

        // Combine date and time from data to create the task date
        let taskNotificationDate = parse(`${data.date} ${data.time}`, 'yyyy-MM-dd HH:mm', new Date());

        // Get the current time and create a notification time using getNotificationTime()
        let currentDate = new Date();
        let notificationTime = parse(
        `${currentDate.toISOString().split('T')[0]} ${currentDate.toISOString().split('T')[1]}`,
        'yyyy-MM-dd HH:mm:ss.SSS',
        new Date()
        );

        let limit = getNotificationTime().split(':');
        // Calculate given limit hours from the current time
        let upcomingTimeLimit = add(currentDate, { hours: limit[0] });

        // Add notification if the task is within the next 12 hours and is after the notification time
        if (isAfter(taskNotificationDate, notificationTime) && isBefore(taskNotificationDate, upcomingTimeLimit)) {
            addNotification(data);
        }
        });
    }
}

function formatNotification(data){
    return `
        <div class="notification-content">
            <h4><b>${data.title}</b></h4>
            <h6>${data.date}</h6><br>
            <p>${data.details}</p>
        </div>
        <div class="notification-delete">
            <i class="fas fa-times"></i>
        </div>
    `;
}

function addNotification(data) {
    const counter = document.querySelector('.notification-counter');
    let counterValue = parseInt(document.querySelectorAll('.notification').length);
    counterValue++;
    if(counterValue > 9){
        counter.innerHTML = "9+";
    }else{
        counter.innerHTML = counterValue;
    }

    const notifications = document.querySelector('.notifications');

    let notification = document.createElement('div');
    notification.classList.add('notification');
    notification.classList.add(`n${counterValue}`);
    notification.innerHTML = formatNotification(data);
    
    notifications.appendChild(notification);

    //delete notification
    const notificationDelete = notification.querySelector('.notification-delete');
    notificationDelete.addEventListener('click', function(){
        notification.remove();
        counterValue--;
        if(counterValue > 9){
            counter.innerHTML = "9+";
        }else{
            counter.innerHTML = counterValue;
        }
        reiterateNotificationNumber();
    });
}

function reiterateNotificationNumber(){
    const notifications = document.querySelectorAll('.notification');
    let counterValue = 0;
    notifications.forEach(notification => {
        counterValue++;
        notification.classList = `notification n${counterValue}`;
    });
}