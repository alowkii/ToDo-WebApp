export { displayTasks };
import { setStorageItem, getStorageItem, removeStorageItem} from "./local-storage.js";
import { showEmptyCaseWindow, submitTask, callTaskQueryWindow} from "./body-content.js";
import { add } from "date-fns";

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
        if(task.details == ""|| task.details == undefined){
            task.details = "No details";
        }
        if(task.priority == "high"){
            taskElement.classList.add("high-priority");
        }else if(task.priority == "medium"){
            taskElement.classList.add("medium-priority");
        }else{
            taskElement.classList.add("low-priority");
        }
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
        <p class="task-title">${task.title}</p>
        <p class="task-details">${task.details}</p>
        <div class="task-date">${task.date}</div>
        <div class="task-time">${task.time}</div>
        <div class="task-priority"></div>
        <div class="task-delete">
            <i class="fas fa-trash-alt"></i>
        </div>
    `;
}