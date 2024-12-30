export { displayTasksToday, displayFilteredTasks };
import { callTaskQueryWindow } from './body-content.js';
import { displayTasks } from './task-list.js';
import { displayViewPortInfo } from './viewport-info.js';
import {add, formatDistance, isToday, subDays} from 'date-fns';


function displayTasksToday(){
    displayTasks("all");
    const tasks  = document.querySelectorAll('#task-list .task');
    let count = 0;
    tasks.forEach(task => {
        const taskDateStr = task.querySelector('.task-date').textContent;
        const taskDate = new Date(taskDateStr);
        if(!isToday(taskDate)){
            task.remove();
            count++;
        }
    });
    count = tasks.length - count;
    
    const taskList = document.querySelector('#task-list');
    if(taskList){
        taskList.setAttribute("project-list", "Today");
        if(count == 0){
            taskList.innerHTML = '<p>No tasks found</p>' + taskList.innerHTML;
        }
        document.querySelector("#append-icon").addEventListener('click', () => {
            callTaskQueryWindow();
        });
        displayViewPortInfo();
    }else{
        displayViewPortInfo();
    }
}

function displayFilteredTasks(project){
    displayTasks("all");

    const tasks  = document.querySelectorAll('#task-list .task');
    let count = 0;
    tasks.forEach(task => {
        if(task.getAttribute('project') != project){
            task.remove();
            count++;
        }
    });
    count = tasks.length - count;
    const taskList = document.querySelector('#task-list');
    if(taskList){
        taskList.setAttribute("project-list", project);
        if(count == 0){
            taskList.innerHTML = '<p>No tasks found</p>' + taskList.innerHTML;
        }   
    }
    
    if(document.querySelector("#append-icon")){
        document.querySelector("#append-icon").addEventListener('click', () => {
            callTaskQueryWindow();
        });
    }
    displayViewPortInfo();
}