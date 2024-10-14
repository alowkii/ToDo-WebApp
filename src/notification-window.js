export {toggleNotificationWindow, addNotification, loadNotificationWindow };
import { getStorageItem } from "./local-storage";
import { getNotificationTime } from "./settings";
import { add, parse, isAfter, isBefore } from 'date-fns';

//initialize the notification window
function loadNotificationWindow() {
    createNotificationWindow();
    const NotificationWindow = document.querySelector('.notification-window');
    NotificationWindow.style.display = 'none';
    NotificationWindow.classList.add('remove');
}

//toggle the notification window
function toggleNotificationWindow() {
    const notificationWindow = document.querySelector('.notification-window');

    if (notificationWindow && notificationWindow.classList.contains('add')) {
        notificationWindow.classList.remove('add');
        notificationWindow.classList.add('remove');
        setTimeout(() => {
            notificationWindow.style.display = 'none';
        }, 500);
    } else {
        const newNotificationWindow = document.querySelector('.notification-window');
        newNotificationWindow.classList.add('add');
        newNotificationWindow.style.display = 'block';
        newNotificationWindow.classList.remove('remove');
    }
}

//create the notification window
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

//format the notification
function formatNotification(data){
    return `
        <div class="notification-content">
            <h3><b>${data.title}</b></h3>
            <p class="notification-meta">
                <span>${data.time}</span> | <span>${data.date}</span>
            </p>
            <p>${data.details}</p>
        </div>
        <div class="notification-delete">
            <button">
                <i class="fas fa-times"></i>
            </button>
        </div>

    `;
}

//add the formatted notification to the window
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
        updatedCounterValue = parseInt(updatedCounterValue, 10);
        updatedCounterValue--;
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

//reiterate the notification number
function reiterateNotificationNumber(){
    const notifications = document.querySelectorAll('.notification');
    let counterValue = 0;
    notifications.forEach(notification => {
        counterValue++;
        notification.classList = `notification n${counterValue}`;
    });
}