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

    const root = document.querySelector(':root');
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    root.setAttribute('data-theme', newTheme);

    changeTheme(newTheme);
}

function changeTheme(theme) {
    const root = document.querySelector(':root');

    root.style.setProperty('--primary-color', `var(--primary-${theme}-color)`);
    root.style.setProperty('--secondary-color', `var(--secondary-${theme}-color)`);
    root.style.setProperty('--tertiary-color', `var(--tertiary-${theme}-color)`);
    root.style.setProperty('--quaternary-color', `var(--quaternary-${theme}-color)`);
    root.style.setProperty('--quinary-color', `var(--quinary-${theme}-color)`);
}


window.themeChange = themeChange;
