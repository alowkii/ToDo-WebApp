export { addContent };
import {formatDistance, subDays} from 'date-fns';
import { setStorageItem} from './local-storage.js';

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
    const addIcon = document.createElement("div");
    addIcon.id = "add-icon";
    addIcon.innerHTML = "<i class='fas fa-plus'></i>";
    emptyCaseWindowContent.appendChild(addIcon);

    showEmptyCaseWindow();

    addIcon.addEventListener("mouseup", () => {
        callTaskQueryWindow();
        hideEmptyCaseWindow();
    });
}

function showEmptyCaseWindow(){
    const content = document.getElementById("main-content");
    if(content.innerHTML != "") {
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

    formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });
    
    const date = new Date();
    console.log(date);

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

document.getElementById("pop-up").addEventListener("submit", (event) => {
    event.preventDefault();
    hidePopUp();

    const taskData = new FormData(event.target);

    const taskName = {};
    taskData.forEach((value, key) => {
        taskName[key] = value;
    });

    const jsonString = JSON.stringify(taskName);

    setStorageItem("task", jsonString);

    console.log(jsonString);
});