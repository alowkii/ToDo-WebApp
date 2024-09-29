export {toggleMenu};

function toggleMenu(){
    createMenu();

    const menu = document.querySelector('#menu-window');
    if(menu.style.display == 'block'){
        hideMenu();
    }else{
        showMenu();
    };
}

function hideMenu(){
    const menu = document.querySelector('#menu-window');
    menu.style.animation = 'slideOut 0.5s forwards';
    const menuBtn = document.getElementById('menuBtn');
    menuBtn.style.transform = 'rotate(0deg)';
    menuBtn.style.transition = '0.5s';
    setTimeout(() => {
        menu.style.display = 'none';
    }, 500);
}

function showMenu(){
    const menu = document.querySelector('#menu-window');
    menu.style.animation = 'slideIn 0.5s forwards';
    menu.style.display = 'block';
    const menuBtn = document.getElementById('menuBtn');
    menuBtn.style.transform = 'rotate(90deg)';
    menuBtn.style.transition = '0.5s';
}

function createMenu() {
    const menu = document.createElement('div');
    menu.id ='menu-window';
    menu.style.display = 'none';
    
    document.querySelector('menu').appendChild(menu);
}

window.toggleMenu = toggleMenu;