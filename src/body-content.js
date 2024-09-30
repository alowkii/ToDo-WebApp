export { addContent, showEmptyCaseWindow, submitTask, callTaskQueryWindow };
import {formatDistance, subDays} from 'date-fns';
import { getStorageItem, setStorageItem} from './local-storage.js';
import { displayTasks } from './task-list.js';

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
    addToDoIconTo(emptyCaseWindowContent);

    displayTasks();
}

function addToDoIconTo(destination){
    const addIcon = document.createElement("div");
    addIcon.id = "add-icon";
    addIcon.innerHTML = "<i class='fas fa-plus'></i>";
    destination.appendChild(addIcon);

    addIcon.addEventListener("mouseup", () => {
        callTaskQueryWindow();
        hideEmptyCaseWindow();
    });
}

function showEmptyCaseWindow(){
    const content = document.getElementById("main-content");
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

    const popUpCloseBtn = document.getElementById("closePopUpBtn");
    popUpCloseBtn.addEventListener("click", () => {
        hidePopUp();
    });
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
    hidePopUp();

    const taskData = new FormData(event.target);

    const taskName = {};
    taskData.forEach((value, key) => {
        taskName[key] = value;
    });

    const jsonString = JSON.stringify(taskName);

    if(getStorageItem("tasks") == null){
        setStorageItem("tasks", "[]");
    }

    const tasks = JSON.parse(getStorageItem("tasks"));
    tasks.push(taskName);
    setStorageItem("tasks", JSON.stringify(tasks));

    console.log(jsonString);

    event.target.reset();
    displayTasks();
}

document.getElementById("pop-up").addEventListener("submit", (event) => {
    submitTask(event);
});