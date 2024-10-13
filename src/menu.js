export { toggleMenu, addProjectWindow, createMenu, updateProjectItems, addProjectWindowItems, callProjectPrompt };
import { callTaskQueryWindow, showEmptyCaseWindow } from './body-content.js';
import { getStorageItem, removeStorageItem, setStorageItem } from './local-storage.js';
import { displayTasks } from './task-list.js';
import { displayViewPortInfo } from './viewport-info.js';
import { displayFilteredTasks, displayTasksToday } from './filter-methods.js';

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
    if(document.getElementById('menu-window')){
        return;
    }
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

    document.querySelector("#project-window").addEventListener('click', function(event){
        if(event.target.tagName != 'BUTTON'){
            return;
        }
        
        displayFilteredTasks(event.target.innerText);
        displayViewPortInfo();
    });

    document.getElementById("all-task-page").addEventListener('click', function(){
        displayTasks("all");
        displayViewPortInfo();
    });

    document.getElementById("today-task-page").addEventListener('click', function(){
        displayTasksToday();
    });

    document.getElementById('add-project-btn').addEventListener('click', function(){
        //Adds project to the project list
        if(document.getElementById('project-prompt')){
            return;
        }
        let project = callProjectPrompt();
        console.log(project);
    });
}

function callProjectPrompt(){
    const projectPrompt = document.createElement('div');
    projectPrompt.id = 'project-prompt';
    projectPrompt.innerHTML = ` <p>Add New Project</p>
                                <button id="close-project-prompt"><i class="fas fa-times"></i></button>
                                <input type="text" id="project-input" placeholder="Project Name" maxlength="25">
                                <button type="submit" id="project-submit">Add Project</button>`;
    document.body.appendChild(projectPrompt);

    document.getElementById('project-submit').addEventListener('click', () => {
        const project = document.getElementById('project-input').value;
        
        if(project == null || project == ""){
            return;
        }
        updateProjectItems(project);
        updateProjectWindowItems();
        displayFilteredTasks(project);
        if(document.getElementById("chooseProjectBtn")){
            document.getElementById("chooseProjectBtn").setAttribute("project", project);
        }
        document.getElementById('project-prompt').remove();
    });

    document.getElementById('close-project-prompt').addEventListener('click', function(){
        document.getElementById('project-prompt').remove();
    });
}

function updateProjectWindowItems(){
    const projectItems = JSON.parse(getStorageItem('projects')) || [];
    const projectWindow = document.getElementById("project-window");
    if(!projectWindow){
        return;
    }
    projectWindow.innerHTML = '';
    projectItems.forEach(project => {
        const projectItem = document.createElement('button');
        projectItem.id = `${project}-project-item`;
        projectItem.classList.add('project-item');
        projectItem.innerText = project;
        projectWindow.appendChild(projectItem);
    });
}

function addTaskBtn(menu){
    const addTaskWindow = document.createElement('div');
    addTaskWindow.id = 'add-task-window';

    const addTaskBtn = document.createElement('button');
    addTaskBtn.id = 'add-task-btn';
    addTaskBtn.innerHTML = `<div><i class="fas fa-plus"></i></div>
                            <p>Add Task</p>`;
    addTaskBtn.addEventListener('click', () => {
        callTaskQueryWindow();
    });

    addTaskWindow.appendChild(addTaskBtn);

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
    if(document.getElementById("project-window")){
        const projectWindow = document.getElementById("project-window");
        updateProjectItems();
        addProjectWindowItems(projectWindow);
    }
    const projectContainer = document.createElement('div');
    projectContainer.id = 'project-container';
    menu.appendChild(projectContainer);

    const projectBtn = document.createElement('div');
    projectBtn.id = 'project-btn';
    projectBtn.innerHTML = `<p>Project List</p>
                            <button id="add-project-btn"><i class="fas fa-plus"></i></button>`;
    projectContainer.appendChild(projectBtn);
    
    const projectWindow = document.createElement('div');
    projectWindow.id = 'project-window';
    projectContainer.appendChild(projectWindow);

    updateProjectItems();
    addProjectWindowItems(projectWindow);
}

function addProjectWindowItems(projectWindow){
    const projectItems = JSON.parse(getStorageItem('projects')) || [];
    if(!projectWindow){
        const projectContainer = document.getElementById("project-container");
        projectWindow = document.createElement("div");
        projectWindow.id = "project-window";
        projectContainer.appendChild(projectWindow);
    }
    projectWindow.innerHTML = '';
    projectItems.forEach(project => {
        const projectItem = document.createElement('button');
        projectItem.id = `${project}-project-item`;
        projectItem.classList.add('project-item');
        projectItem.innerText = project;
        projectWindow.appendChild(projectItem);
    });
}

function updateProjectItems(project=""){
    const projectItems = JSON.parse(getStorageItem('projects')) || [];
    if(!projectItems.includes(project) && !(project == "")){
        projectItems.push(project);
    }
    const tasks = JSON.parse(getStorageItem('tasks'));
    const projects = tasks.filter(task => task.project != undefined).map(task => task.project);
    projects.forEach(project => {
        if(!projectItems.includes(project)){
            projectItems.push(project);
        }
    });
    if(!projectItems.includes('Default')){
        projectItems.push('Default');
    }
    projectItems.sort();
    setStorageItem('projects', JSON.stringify(projectItems));
}

function addFooterItems(menu){
    const footer = document.createElement('footer');
    menu.appendChild(footer);

    const footerItems = [
        {name: 'Github', url: 'https://github.com/alowkii/ToDo-WebApp'},
        {name: 'LinkedIn', url: 'https://www.linkedin.com/in/alowkii/'},
        {name: 'x-twitter', url: 'https://twitter.com/alowkiii'},
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