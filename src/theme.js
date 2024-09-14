function themeChange(){
    const iconBtn = document.querySelector('#theme');
    iconBtn.classList.toggle('rotate');

    const icon = document.querySelector('#theme .theme-icon');

    setTimeout(() => {
        iconBtn.classList.toggle('rotate');
        if(icon.classList.contains('fa-sun')){
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }, 250);
}

window.themeChange = themeChange;
