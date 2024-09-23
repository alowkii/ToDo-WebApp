export {toggleNotificationWindow, addNotification};

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

    let data = {
        title: 'Notification',
        message: 'This is a notification message'
    };
    addNotification(data);
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

    // Append the window to the correct container
    document.querySelector('.notification-container').appendChild(notificationWindow);
}

function formatNotification(data){
    return `
        <div class="notification-content">
            <h4>${data.title}</h4>
            <p>${data.message}</p>
        </div>
        <div class="notification-close">
            <i class="fas fa-times"></i>
        </div>
    `;
}

function addNotification(data) {
    const counter = document.querySelector('.notification-counter');
    let counterValue = parseInt(counter.innerHTML);
    counterValue++;
    if(counterValue > 9){
        counter.innerHTML = "9+";
    }else{
        counter.innerHTML = counterValue;
    }

    const notificationWindow = document.querySelector('.notification-window');
    const notifications = document.createElement('div');
    notifications.classList.add('notifications');

    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerHTML = formatNotification(data);

    notifications.appendChild(notification);
    notificationWindow.appendChild(notifications);

    // Close notification
    const notificationClose = document.querySelector('.notification-close');
    notificationClose.addEventListener('click', function() {
        counterValue--;
        if(counterValue > 9){
            counter.innerHTML = "9+";
        }else{
            counter.innerHTML = counterValue;
        }

        notification.remove();
    });
}