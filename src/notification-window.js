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
    document.querySelector('.notification').appendChild(notificationWindow);
}



function formatNotification(data){
    return `
        <div class="notification">
            <div class="notification-icon">
                <i class="fas fa-${data.icon}"></i>
            </div>
            <div class="notification-content">
                <h4>${data.title}</h4>
                <p>${data.message}</p>
            </div>
            <div class="notification-close">
                <i class="fas fa-times"></i>
            </div>
        </div>
    `;
}

function addNotification(data){
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.classList.add(data.type);
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-${data.icon}"></i>
        </div>
        <div class="notification-content">
            <h4>${data.title}</h4>
            <p>${data.message}</p>
        </div>
        <div class="notification-close">
            <i class="fas fa-times"></i>
        </div>
    `;

    const notificationClose = notification.querySelector('.notification-close');
    notificationClose.addEventListener('click', () => {
        notification.remove();
    });

    document.body.appendChild(notification);
}