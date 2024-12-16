export { themeChange, setTheme, getTheme};
import { getStorageItem, setStorageItem } from "./local-storage";
import { changeToCustomTheme } from "./settings";

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

    setTheme(newTheme);
}

function setTheme(theme) {
    if(!theme){
        theme = getStorageItem('theme') || 'light';
    }

    if(getStorageItem('custom-theme') !== '[]' && getStorageItem('custom-theme')){
        const customTheme = JSON.parse(getStorageItem('custom-theme'));
        changeToCustomTheme(customTheme);
    }

    const root = document.querySelector(':root');
    
    root.setAttribute('data-theme', theme);
    root.style.setProperty('--primary-color', `var(--primary-${theme}-color)`);
    root.style.setProperty('--secondary-color', `var(--secondary-${theme}-color)`);
    root.style.setProperty('--tertiary-color', `var(--tertiary-${theme}-color)`);
    root.style.setProperty('--quaternary-color', `var(--quaternary-${theme}-color)`);
    root.style.setProperty('--quinary-color', `var(--quinary-${theme}-color)`);

    setStorageItem('theme',theme);
}

function getTheme(){
    const root = document.querySelector(':root');
    return root.getAttribute('data-theme');
}

window.themeChange = themeChange;
window.setTheme = setTheme;
window.getTheme = getTheme;
