export {toggleNotificationWindow, addNotification, loadNotificationWindow };
import { getStorageItem, setStorageItem } from "./local-storage";
import { getNotificationTime } from "./settings";
import { add, parse, isAfter, isBefore } from 'date-fns';
import { displayTasks, editCallTaskQueryWindow } from "./task-list";

//initialize the notification window
function loadNotificationWindow() {
    const notificationWindow = document.querySelector('.notification-window');
    if (notificationWindow) {
        notificationWindow.remove();
        const counter = document.querySelector('.notification-counter');
        counter.innerHTML = "0";
        counter.setAttribute('count', 0);
    }

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
    
    // Notification title
    const notificationTitle = document.createElement('div');
    notificationTitle.classList.add('notification-title');
    notificationTitle.innerHTML = `<p>Notifications</p>`;

    notificationWindow.appendChild(notificationTitle);
    
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
                return isBefore(taskNotificationDate, upcomingTimeLimit) && 
                       !data.complete && data.notify;
            })
            .forEach(data => {
                // Add notification index to the data
                data["index"] = notificationData.indexOf(data);
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
        </div>
        <div class="notification-delete" index=${data.index}>
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

    // Add the click functionality
    notification.addEventListener('click', () => {
        editCallTaskQueryWindow(data, data.index, false);
        toggleNotificationWindow();
    });

    // Add the delete functionality
    const notificationDelete = notification.querySelector('.notification-delete');
    notificationDelete.addEventListener('click', function (event) {
        event.stopPropagation();

        let index = notificationDelete.getAttribute('index');
        let notificationData = JSON.parse(getStorageItem('tasks'));

        // Update the notification status
        notificationData[index].notify = false;
        setStorageItem('tasks', JSON.stringify(notificationData));

        // Remove the notification from the window
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
        displayTasks();
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