export { addContent, showEmptyCaseWindow, submitTask, callTaskQueryWindow, addToDoIconTo };
import { getStorageItem, setStorageItem} from './local-storage.js';
import { displayTasks, editTask } from './task-list.js';
import { callProjectPrompt, createMenu, updateProjectItems, addProjectWindowItems } from './menu.js';
import { loadNotificationWindow } from './notification-window.js';

function addContent() {
    const mainContent = document.getElementById("main-content");
    if (mainContent.innerHTML != "") {
        return;
    }

    // Add the empty window content
    const emptyCaseWindowContent = document.createElement("div");
    emptyCaseWindowContent.id = "empty-case-window";
    emptyCaseWindowContent.setAttribute("style", "display: block;");
    document.body.appendChild(emptyCaseWindowContent);

    // Info text for empty window
    const infoText = document.createElement("p");
    infoText.id = "info-text";
    infoText.textContent = "Press the + icon to start your journey!";
    emptyCaseWindowContent.appendChild(infoText);

    // Icon to add ToDo list items
    addToDoIconTo(emptyCaseWindowContent, "add-icon");

    displayTasks();
}

function addToDoIconTo(destination, idForIcon){
    const addIcon = document.createElement("div");
    addIcon.classList.add("add-icon");
    addIcon.id = idForIcon;
    addIcon.innerHTML = "<i class='fas fa-plus'></i>";
    destination.appendChild(addIcon);

    addIcon.addEventListener("mouseup", () => {
        setTimeout(() => {
            callTaskQueryWindow();
        },100);
        hideEmptyCaseWindow();
    });
}

function showEmptyCaseWindow(){
    const content = document.getElementById("main-content");
    const taskList = document.querySelector("#task-list");

    if(content.innerHTML != "" || getStorageItem("tasks") != null){
        hideEmptyCaseWindow();
        return;
    }
    const emptyCaseWindowContent = document.getElementById("empty-case-window");  
    emptyCaseWindowContent.style.display = "block";
}

function hideEmptyCaseWindow(){
    const emptyCaseWindowContent = document.getElementById("empty-case-window");
    emptyCaseWindowContent.style.display = "none";
}

function callTaskQueryWindow(){
    showPopUp();
    document.getElementById("pop-up").reset();
    document.getElementById("pop-up").setAttribute("data-edit-index", "-1");
    document.getElementById("chooseProjectBtn").setAttribute("project", "Default");

    const today = new Date();

    // Format the date as YYYY-MM-DD
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');

    // Set the value of the date input to today's date
    const formattedDate = `${year}-${month}-${day}`;
    document.getElementById('dateInput').value = formattedDate;

    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');

    // Set the value of the time input to the current time
    const formattedTime = `${hours}:${minutes}`;
    document.getElementById('timeInput').value = formattedTime;

    const popUpCloseBtn = document.getElementById("closePopUpBtn");
    popUpCloseBtn.addEventListener("click", () => {
        hidePopUp();
        document.getElementById("pop-up").setAttribute("data-edit-index", "-1");
        document.getElementById("pop-up").reset();
    });

    const projectAddBtn = document.getElementById("chooseProjectBtn");
    const projectList = document.getElementById("task-list");
    if(projectList.getAttribute("project-list") != "all"){
        const project_attribute = projectList.getAttribute("project-list");
        projectAddBtn.setAttribute("project", project_attribute);
    }
    projectAddBtn.addEventListener("click", () => {
        setProject();
    });
}

//Sets project list while adding a task
function setProject(){
    if(document.getElementById("project-window") != null){
        hideProjectList();
    }
    const projectListForm = document.createElement("form");
    projectListForm.id = "project-window";

    const projectItems = JSON.parse(getStorageItem("projects"));
    const projectListTitle = document.createElement("p");
    projectListTitle.textContent = "Choose a project";
    projectListForm.appendChild(projectListTitle);

    const cancelBtn = document.createElement("button");
    cancelBtn.innerHTML = "<i class='fas fa-times'></i>";
    cancelBtn.id = "cancelProjectBtn";
    cancelBtn.addEventListener("click", () => {
        document.getElementById("chooseProjectBtn").setAttribute("project", "Default");
        hideProjectList();
    });
    projectListForm.appendChild(cancelBtn);

    const projectList = document.createElement("div");
    projectList.id = "project-list";
    projectListForm.appendChild(projectList);

    projectItems.forEach(project => {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");
        projectItem.textContent = project;
        projectItem.addEventListener("click", () => {
            document.getElementById("chooseProjectBtn").setAttribute("project", project);
            createMenu();
            const projectWindow = document.getElementById("project-window");
            updateProjectItems();
            addProjectWindowItems(projectWindow);
            hideProjectList();
        });
        projectList.appendChild(projectItem);

        if(document.getElementById("chooseProjectBtn").getAttribute("project") == project){
            projectItem.classList.add("selected");
        }
    });

    const addProjectBtn = document.createElement('div');
    addProjectBtn.classList.add('project-item');
    addProjectBtn.id = 'append-project-btn';
    addProjectBtn.style.backgroundColor = 'var(--primary-color)';
    addProjectBtn.style.color = 'var(--secondary-color)';
    addProjectBtn.innerHTML = `<i class='fas fa-plus'></i>`;
    projectList.appendChild(addProjectBtn);

    document.body.appendChild(projectListForm);

    document.getElementById("append-project-btn").addEventListener("click", () => {
        callProjectPrompt();
        hideProjectList();
    });
}

function hideProjectList(){
    if(document.querySelector("body > #project-window") == null){
        return;
    }
    const projectWindow = document.querySelector("body > #project-window");
    projectWindow.remove();
}

function showPopUp(){
    const popUp = document.getElementById("pop-up");
    popUp.classList.remove("hidePopUp");
    popUp.classList.add("showPopUp");
}

function hidePopUp(){
    setTimeout(() => {
        showEmptyCaseWindow();
    }, 100);
    const popUp = document.getElementById("pop-up");
    popUp.classList.remove("showPopUp");
    popUp.classList.add("hidePopUp");
}


function submitTask(event){
    event.preventDefault();
    const chooseProjectBtn = document.getElementById("chooseProjectBtn");
    let project_attribute = chooseProjectBtn ? chooseProjectBtn.getAttribute("project") : "Default";


    const taskData = new FormData(event.target);
    const task = {complete: false};
    taskData.forEach((value, key) => {
        task[key] = value;
    });
    task.project = project_attribute || "Default";
    if(task.project == "" || task.project == undefined){
        task.project = "Default";
    }

    if(getStorageItem("tasks") == null){
        setStorageItem("tasks", "[]");
    }

    const tasks = JSON.parse(getStorageItem("tasks"));

    if(event.target != null && event.target.getAttribute("data-edit-index") != "-1"){
        const taskList = document.querySelector(".main-content #task-list");
    const projectOption = taskList ? taskList.getAttribute("project-list") : "Default";

        console.log(projectOption);
        if(project_attribute == undefined || project_attribute == "" || projectOption == "all"){
            project_attribute = projectOption;
        }
        editTask(event,tasks,project_attribute);
        // Reset the button and header text for adding new tasks
        document.getElementById('task-popUp-header').innerText = "Add Task";
        document.getElementById('addTaskBtn').innerText = "Add";
        //reset the data-edit-index attribute
        event.target.setAttribute("data-edit-index", "-1");
        hidePopUp();
        displayTasks();
        return;
    }
    tasks.push(task);
    setStorageItem("tasks", JSON.stringify(tasks));

    event.target.reset();
    hidePopUp();
    displayTasks();
    loadNotificationWindow();
}

document.getElementById("pop-up").addEventListener("submit", (event) => {
    submitTask(event);
});