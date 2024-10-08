export { displayTasks, editTask };
import { setStorageItem, getStorageItem, removeStorageItem} from "./local-storage.js";
import { showEmptyCaseWindow, submitTask, callTaskQueryWindow, addToDoIconTo} from "./body-content.js";
import { add, set } from "date-fns";

function createTaskListElement(){
    if(document.querySelector(".task-list")){
        return;
    }
    const taskListElement = document.createElement("div");
    taskListElement.classList.add("task-list");
    taskListElement.id = "task-list";
    const mainContent = document.getElementById("main-content");
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

function displayTasks(project="all"){
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = "";

    let taskList = {};
    try{
        taskList = JSON.parse(getStorageItem("tasks"));
        taskList = sortTaskList(taskList);
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
        
        if(task.project == project || project == "all"){
            taskElement.setAttribute("project", task.project);
            taskElement.innerHTML = formatTaskDiv(task);
            taskListElement.appendChild(taskElement);
        }

        //edit task
        const taskEdit = taskElement.querySelector(".task-edit");
        taskEdit.addEventListener('click', function(){
            editCallTaskQueryWindow(task,i);
        });

        //delete task
        const taskDelete = taskElement.querySelector(".task-delete");
        taskDelete.addEventListener('click', function(){
            taskElement.remove();
            taskList.splice(i, 1);
            taskList = sortTaskList(taskList);
            setTimeout(() => {
                reiterateTaskNumber();
            },0);
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

        //check if task is complete
        const taskComplete = taskElement.querySelector(".task-complete");
        taskComplete.addEventListener('click', function(){
            task.complete = !task.complete;
            taskList[i] = task;
            setStorageItem("tasks", JSON.stringify(taskList));
        });
    }
    setTimeout(() => {
        reiterateTaskNumber();
    },0);

    showEmptyCaseWindow();
}

function sortTaskList(taskList){
    taskList = sortTasksByDateOrTime(taskList);
    return taskList;
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

function editCallTaskQueryWindow(task,index){
    callTaskQueryWindow();

    document.getElementById('inputTaskName').value = task.title;
    if(task.details == "No details"){
        document.getElementById('inputTaskDescription').value = "";
    }else{
        document.getElementById('inputTaskDescription').value = task.details;
    }
    document.getElementById('dateInput').value = task.date;
    document.getElementById('timeInput').value = task.time;
    document.getElementById('priority').value = task.priority;
    document.getElementById('chooseProjectBtn').setAttribute("project", task.project);

    // Update button and header when editing a task
    document.getElementById('addTaskBtn').innerText = "Edit";
    document.getElementById('task-popUp-header').innerText = "Edit Task";

    document.getElementById("pop-up").setAttribute("data-edit-index", index);
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
        <input type="checkbox" class="task-complete" ${task.complete ? "checked" : ""}>
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

function editTask(event, taskList){
    // Retrieve the index of the task to edit
    const index = event.target.getAttribute("data-edit-index");
    
    // Update the task at the given index with new values
    const taskData = new FormData(event.target);
    const task = {complete: false};
    taskData.forEach((value, key) => {
        task[key] = value;
    });
    
    // // Update the task at the specific index without removing it
    taskList[index] = task;
    
    taskList = sortTaskList(taskList);
    setStorageItem("tasks", JSON.stringify(taskList));
}