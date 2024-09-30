export { displayTasks };
import { setStorageItem, getStorageItem, removeStorageItem} from "./local-storage.js";
import { addToDoIconTo, showEmptyCaseWindow } from "./body-content.js";

function displayTasks(){
    const taskList = JSON.parse(getStorageItem("tasks"));
    if(!taskList || taskList.length == 0){
        return;
    }

    const taskListElement = document.createElement("div");
    taskListElement.classList.add("task-list");

    for(let i = 0; i < taskList.length; i++){
        const task = taskList[i];
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.innerHTML = formatTaskDiv(task);
        taskListElement.appendChild(taskElement);
    }

    const mainContent = document.getElementById("main-content");
    console.log(mainContent);
    mainContent.appendChild(taskListElement);
    showEmptyCaseWindow();
}

function formatTaskDiv(task){
    return `
        <div class="task-title">${task.title}</div>
        <div class="task-description">${task.description}</div>
        <div class="task-date">${task.date}</div>
        <div class="task-time">${task.time}</div>
        <div class="task-priority">${task.priority}</div>
        <div class="task-delete">
            <i class="fas fa-trash-alt"></i>
        </div>
    `;
}