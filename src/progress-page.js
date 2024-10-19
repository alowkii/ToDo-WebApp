export { displayProgress };
import * as d3 from 'd3';

function displayProgress(){
    document.getElementById('main-content').innerHTML = "";
    document.getElementById('main-content').classList.add('progress-page');
    document.getElementById('main-content').classList.remove('shows-task-list');
}