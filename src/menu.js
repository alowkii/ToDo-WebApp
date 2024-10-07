export {toggleMenu};

    import { add } from 'date-fns';
import {addToDoIconTo, callTaskQueryWindow} from './body-content.js';

function toggleMenu(){
    createMenu();

    const menu = document.querySelector('#menu-window');
    if(menu.style.display == 'flex'){
        hideMenu();
    }else{
        showMenu();
    };
}

function hideMenu(){
    const menu = document.querySelector('#menu-window');
    menu.style.animation = 'slideOut 0.5s forwards';
    setTimeout(() => {
        menu.style.display = 'none';
    }, 500);

    const menuBtn = document.getElementById('menuBtn');
    menuBtn.style.transition = '0.5s';
    menuBtn.style.transform = 'translateX(0) rotate(0deg)';
}

function showMenu(){
    const menu = document.querySelector('#menu-window');
    menu.style.animation = 'slideIn 0.5s forwards';
    menu.style.display = 'flex';

    const menuBtn = document.getElementById('menuBtn');
    menuBtn.style.transition = '0.5s';
    menuBtn.style.transform = 'translateX(14.5rem) rotate(90deg)';
}

function createMenu() {
    const menu = document.createElement('div');
    menu.id ='menu-window';
    menu.style.display = 'none';
    document.querySelector('menu').appendChild(menu);

    const logo = document.createElement('div');
    logo.id = 'logo-container';
    menu.appendChild(logo);

    addTaskBtn(menu);

    addMenuItems(menu);
    menu.appendChild(document.createElement('hr'));
    addProjectWindow(menu);
    
    addFooterItems(menu);

    // // ********** MENU CLICK BEHAVIOR **********
    // // This shows weird behavior when the menu is clicked.
    // // Might need to be removed
    // const rest_of_the_content = document;
    // const menu_content = document.querySelector('#menu-window');
    // rest_of_the_content.addEventListener('click', function(event){
    //     if(event.target != menu_content && event.target != document.querySelector('#menuBtn') && event.target != document.querySelector('#menuBtn i')){
    //         hideMenu();
    //     }
    // });
}

function addTaskBtn(menu){
    const addTaskWindow = document.createElement('div');
    addTaskWindow.id = 'add-task-window';
    
    addToDoIconTo(addTaskWindow, 'add-task-icon');

    menu.appendChild(addTaskWindow);
}

function addMenuItems(menu){
    const menuContent = document.createElement('div');
    menuContent.id = 'menu-content';
    menu.appendChild(menuContent);

    const menuItems = [
        {name: 'All', id: 'all-task-page'},
        {name: 'Today', id: 'today-task-page'},
        {name: 'Search', id: 'search-tasks'},
        {name: 'Progress', id: 'progress-page'},
    ];

    menuItems.forEach(item => {
        const menuItem = document.createElement('button');
        menuItem.id = item.id;
        menuItem.innerText = item.name;
        menuContent.appendChild(menuItem);
    });
}

function addProjectWindow(menu){
    const projectContainer = document.createElement('div');
    projectContainer.id = 'project-container';
    menu.appendChild(projectContainer);

    const projectBtn = document.createElement('div');
    projectBtn.id = 'project-btn';
    projectBtn.innerHTML = `<p>Projects</p>
                            <button><i class="fas fa-plus"></i></button>`;
    projectContainer.appendChild(projectBtn);
    
}

function addFooterItems(menu){
    const footer = document.createElement('footer');
    menu.appendChild(footer);

    const footerItems = [
        {name: 'Github', url: 'https://github.com/alowkii/ToDo-WebApp'},
        {name: 'LinkedIn', url: 'https://www.linkedin.com/in/alexander-low/'},
        {name: 'Twitter', url: 'https://twitter.com/alowkii'},
    ];

    footerItems.forEach(item => {
        const footerItem = document.createElement('a');
        footerItem.href = item.url;
        footerItem.innerHTML = `<i class="fab fa-${item.name.toLowerCase()}"></i>`;
        footer.appendChild(footerItem);
    });

    const settings = document.createElement('button');
    settings.id = 'settings';
    settings.innerHTML = '<i class="fas fa-cog"></i>';
    footer.appendChild(settings);
}

window.toggleMenu = toggleMenu;