export { displayProgress };
import * as d3 from 'd3';

function displayProgress(){
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = "";
    mainContent.classList.add('progress-page');
    mainContent.classList.remove('shows-task-list');

    let progressContainer = document.createElement("div");
    progressContainer.id = "progress-container";
    mainContent.appendChild(progressContainer);

    let svg = d3.select("#progress-container")
                .append("svg")
                .attr("height","100%")
                .attr("width","100%");

    
}

function prepareData(){
    let data = [
        {task: "Task 1", start: 0, end: 20},
        {task: "Task 2", start: 20, end: 40},
        {task: "Task 3", start: 40, end: 60},
        {task: "Task 4", start: 60, end: 80},
        {task: "Task 5", start: 80, end: 100}
    ];
    return data;
}
displayProgress();