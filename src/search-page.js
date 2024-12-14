import { editCallTaskQueryWindow } from "./task-list";

export { displaySearchPage };

function displaySearchPage(){
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = "";
    mainContent.classList.remove('progress-page');
    mainContent.classList.remove('shows-task-list')
    mainContent.classList.add('search-content');

    createSearchPage();
}

function createSearchPage(){
    const searchPage = document.createElement('div');
    searchPage.classList.add('search-page');

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('input-container');
    const searchInput = document.createElement('input');
    searchInput.classList.add('search-input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('placeholder', 'Search tasks');
    searchInput.addEventListener('input', () => {
        searchTasks();
    });
    
    inputContainer.appendChild(searchInput);
    searchPage.appendChild(inputContainer);

    const searchResults = document.createElement('div');
    searchResults.classList.add('search-results');

    searchPage.appendChild(searchResults);

    const mainContent = document.getElementById('main-content');
    mainContent.appendChild(searchPage);
}

function searchTasks(){
    const inputContainer = document.querySelector('.input-container');
    inputContainer.style.setProperty('content','');
    inputContainer.style.top = '0.65rem';
    inputContainer.style.position = 'sticky';
    setTimeout(() => {
        const searchInput = document.querySelector('.search-input');
        const searchResults = document.querySelector('.search-results');
        searchResults.innerHTML = "";
        
        if(searchInput.value == ""){
            searchInput.style.position = 'relative';
            return;
        }

        const tasks = JSON.parse(localStorage.getItem('tasks'));
        const searchQuery = searchInput.value.toLowerCase();

        for(let i=0; i<tasks.length; i++){
            if(tasks[i].title.toLowerCase().includes(searchQuery)){
                const taskElement = createTaskElement(tasks[i], i);
                searchResults.appendChild(taskElement);
            }
        }
    }, 150);
}

function createTaskElement(task, i){
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
        <div class="task-title">${task.title}</div>
        <div class="task-date">${task.date}</div>
        <div class="task-time">${task.time}</div>
    `;

    taskElement.addEventListener('click', () => {
        editCallTaskQueryWindow(task, i);
    });

    return taskElement;
}