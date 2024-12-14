import { set } from "date-fns";

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
    const searchInput = document.querySelector('.search-input');

    const searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = "";
    
    if(searchInput.value == ""){
        searchInput.style.position = 'relative';
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const searchQuery = searchInput.value.toLowerCase();

    tasks.forEach(task => {
        if(task.title.toLowerCase().includes(searchQuery)){
            const taskElement = createTaskElement(task);
            searchResults.appendChild(taskElement);
        }
    });
}

function createTaskElement(task){
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
        <div class="task-title">${task.title}</div>
        <div class="task-date">${task.date}</div>
        <div class="task-time">${task.time}</div>
    `;

    return taskElement;
}