export {toggleNotificationWindow, addNotification, createNotificationWindow };
import { getStorageItem } from "./local-storage";
import { getNotificationTime } from "./settings";
import { add, parse, isAfter, isBefore } from 'date-fns';

function toggleNotificationWindow() {
    const notificationWindow = document.querySelector('.notification-window');

    if (notificationWindow && notificationWindow.classList.contains('add')) {
        notificationWindow.classList.remove('add');
        notificationWindow.classList.add('remove');
        setTimeout(() => {
            notificationWindow.remove();
            document.querySelector('.notification-counter').setAttribute('count', 0);  
        },500);
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
    if (notificationData) {
        // Cache the current date and time
        let currentDate = new Date();
        let isoString = currentDate.toISOString();
        let currentDateString = isoString.split('T')[0];
        let currentTimeString = isoString.split('T')[1].slice(0, 5);
        
        let notificationTime = parse(`${currentDateString} ${currentTimeString}`, 'yyyy-MM-dd HH:mm', new Date());

        // Cache the notification limit time
        let limit = getNotificationTime().split(':');
        let upcomingTimeLimit = add(currentDate, { hours: parseInt(limit[0], 10) });

        // Use DocumentFragment to batch DOM updates
        let fragment = document.createDocumentFragment();

        notificationData
            .filter(data => {
                let taskNotificationDate = parse(`${data.date} ${data.time}`, 'yyyy-MM-dd HH:mm', new Date());
                return isAfter(taskNotificationDate, notificationTime) && 
                       isBefore(taskNotificationDate, upcomingTimeLimit) && 
                       !data.complete;
            })
            .forEach(data => {
                // Add notifications to the fragment
                addNotification(data, fragment);
            });

    // Append the fragment to the notifications container
    notifications.appendChild(fragment);
    }
}

function formatNotification(data){
    return `
        <div class="notification-content">
            <h4><b>${data.title}</b></h4>
            <h6>${data.time}</h6><br>
            <p>${data.details}</p>
        </div>
        <div class="notification-delete">
            <i class="fas fa-times"></i>
        </div>
    `;
}

function addNotification(data, fragment) {
    const counter = document.querySelector('.notification-counter');
    
    // Calculate the current number of notifications dynamically, before adding a new one
    let currentCount = document.querySelector('.notification-counter').getAttribute('count');
    currentCount = parseInt(currentCount, 10);
    console.log(currentCount);

    // Increment the counter value for the new notification
    let counterValue = 1;
    counterValue += currentCount;

    // Update the counter display
    if (counterValue > 9) {
        counter.innerHTML = "9+";
    } else {
        counter.innerHTML = counterValue;
    }
    counter.setAttribute('count', counterValue);

    // Create the notification
    let notification = document.createElement('div');
    notification.classList.add('notification', `n${counterValue}`);
    notification.innerHTML = formatNotification(data);

    // Add the delete functionality
    const notificationDelete = notification.querySelector('.notification-delete');
    notificationDelete.addEventListener('click', function () {
        notification.remove();

        // Recalculate the counter after deletion
        let updatedCounterValue =document.querySelector('.notification-counter').getAttribute('count');
        if (updatedCounterValue > 9) {
            counter.innerHTML = "9+";
        } else {
            counter.innerHTML = updatedCounterValue;
        }
        counter.setAttribute('count', updatedCounterValue);
        reiterateNotificationNumber();
    });

    // Append the notification to the fragment
    fragment.appendChild(notification);
}


function reiterateNotificationNumber(){
    const notifications = document.querySelectorAll('.notification');
    let counterValue = 0;
    notifications.forEach(notification => {
        counterValue++;
        notification.classList = `notification n${counterValue}`;
    });
}