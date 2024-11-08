export { displaySearchPage };

function displaySearchPage(){
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = "";
    mainContent.classList.remove('progress-page');
    mainContent.classList.remove('shows-task-list')
    mainContent.classList.add('search-content');
}