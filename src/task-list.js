export { displayTasks };
import { setStorageItem, getStorageItem, removeStorageItem} from "./local-storage.js";
import { showEmptyCaseWindow, submitTask, callTaskQueryWindow, addToDoIconTo} from "./body-content.js";
import { add } from "date-fns";

function createTaskListElement(){
    if(document.querySelector(".task-list")){
        return;
    }
    const taskListElement = document.createElement("div");
    taskListElement.classList.add("task-list");
    const mainContent = document.getElementById("main-content");
    console.log(mainContent);
    mainContent.appendChild(taskListElement);
}

function deleteTaskListElement(){
    const taskListElement = document.querySelector(".task-list");
    if(taskListElement){
        while(taskListElement.firstChild){
            taskListElement.removeChild(taskListElement.firstChild);
        }
        taskListElement.remove();
    }
}

function addAppendTagElement(destination){
    if(!document.querySelector(".append-task")){
        //add task
        const addTask = document.createElement("div");
        addTask.classList.add("append-task");
        destination.appendChild(addTask);
        //Add the icon to add a new task
        addToDoIconTo(addTask, "append-icon");
    }
}

function displayTasks(){
    let taskList = {};
    try{
        taskList = JSON.parse(getStorageItem("tasks"));
        taskList = sortTasksByDateOrTime(taskList);
    }catch(e){
        removeStorageItem("tasks");
        const mainContent = document.getElementById("main-content");
        mainContent.innerHTML = "";
        showEmptyCaseWindow();
    }

    if(!taskList || taskList.length == 0){
        return;
    }

    //delete previous task list to have a fresh start
    deleteTaskListElement();
    createTaskListElement();
    const taskListElement = document.querySelector(".task-list");

    for(let i = 0; i < taskList.length; i++){
        const task = taskList[i];
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.id = "task-" + i;
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

        //edit task
        const taskEdit = taskElement.querySelector(".task-edit");
        taskEdit.addEventListener('click', function(){
            editCallTaskQueryWindow(taskList,i);
        });

        //delete task
        const taskDelete = taskElement.querySelector(".task-delete");
        taskDelete.addEventListener('click', function(){
            taskElement.remove();
            taskList.splice(i, 1);
            reiterateTaskNumber();
            if(taskList.length == 0){
                removeStorageItem("tasks");
                deleteTaskListElement();
                showEmptyCaseWindow();
            }else{
                setStorageItem("tasks", JSON.stringify(taskList));
                //concurrently reiterate task numbers
                setTimeout(() => {
                    reiterateTaskNumber();
                },0);
            }
            deleteTaskListElement();
            displayTasks();
        });

        //add append Button
        if(document.querySelectorAll(".task").length == taskList.length){
            addAppendTagElement(taskListElement);
        }
    }
    showEmptyCaseWindow();
}

function sortTasksByDateOrTime(taskList){
    taskList.sort((a,b) => {
        if(a.date == b.date){
            return a.time.localeCompare(b.time);
        }
        return a.date.localeCompare(b.date);
    });
    return taskList;
}

function editCallTaskQueryWindow(taskList,index){
    const task = taskList[index];
    callTaskQueryWindow();

    taskList.splice(index, 1);
    setStorageItem("tasks", JSON.stringify(taskList));

    document.getElementById('inputTaskName').value = task.title;
    if(task.details == "No details"){
        document.getElementById('inputTaskDescription').value = "";
    }else{
        document.getElementById('inputTaskDescription').value = task.details;
    }
    document.getElementById('dateInput').value = task.date;
    document.getElementById('timeInput').value = task.time;
    document.getElementById('priority').value = task.priority;

    document.getElementById('addTaskBtn').innerText = "Edit";
    
    //updated values
    document.getElementById('addTaskBtn').addEventListener('click', function(){
        const task = {
            title: document.getElementById('inputTaskName').value,
            details: document.getElementById('inputTaskDescription').value,
            date: document.getElementById('dateInput').value,
            time: document.getElementById('timeInput').value,
            priority: document.getElementById('priority').value
        };

        document.getElementById('addTaskBtn').innerText = "Add";
        displayTasks();
    });
}

function reiterateTaskNumber(){
    const tasks = document.querySelectorAll('.task');
    let counterValue = 0;
    tasks.forEach(task => {
        counterValue++;
        task.id = `task-${counterValue}`;
    });
}

function formatTaskDiv(task){
    return `
        <p class="task-title">${task.title}</p>
        <p class="task-details">${task.details}</p>
        <div class="task-date">${task.date}</div>
        <div class="task-time">${task.time}</div>
        <div class="task-priority" title="${task.priority} priority"></div>
        <div class="task-edit">
            <i class="far fa-edit"></i>
        </div>
        <div class="task-delete">
            <i class="fas fa-trash-alt"></i>
        </div>
    `;
}