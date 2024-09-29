export {toggleMenu};

function toggleMenu(){
    createMenu();
    const menu = document.querySelector('.menu-window');
    if(menu.style.display == 'block'){
        hideMenu();
    }else{
        showMenu();
    };
}

function hideMenu(){
    const menu = document.querySelector('.menu-window');
    menu.style.animation = 'slideOut 0.5s forwards';
    setTimeout(() => {
        menu.style.display = 'none';
    }, 500);
}

function showMenu(){
    const menu = document.querySelector('.menu-window');
    menu.style.animation = 'slideIn 0.5s forwards';
    menu.style.display = 'block';
}

function createMenu() {
    const menu = document.createElement('div');
    menu.classList.add('menu-window');
    menu.style.display = 'none';

    const menuBtn = document.getElementById('menuBtn');
    const menuBtnInMenu = menuBtn.cloneNode(true);
    menu.appendChild(menuBtnInMenu);
    
    document.querySelector('menu').appendChild(menu);

    document.addEventListener('click', (e) => {
        if(!menu.contains(e.target) && e.target != menu){
            hideMenu();
        }else{
            showMenu();
        }
    });
}

window.toggleMenu = toggleMenu;