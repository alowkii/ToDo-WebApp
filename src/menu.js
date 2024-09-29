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
    setTimeout(() => {
        menu.style.display = 'none';
    }, 500);

    const menuBtn = document.getElementById('menuBtn');
    menuBtn.style.transition = '0.5s';
    menuBtn.style.transform = 'translateX(0) rotate(0deg)';
}

function showMenu(){
    const menu = document.querySelector('#menu-window');
    menu.style.animation = 'slideIn 0.5s forwards';
    menu.style.display = 'block';

    const menuBtn = document.getElementById('menuBtn');
    menuBtn.style.transition = '0.5s';
    menuBtn.style.transform = 'translateX(14.5rem) rotate(90deg)';
}

function createMenu() {
    const menu = document.createElement('div');
    menu.id ='menu-window';
    menu.style.display = 'none';
    document.querySelector('menu').appendChild(menu);

    

    // // ********** MENU CLICK BEHAVIOR **********
    // // This shows weird behavior when the menu is clicked.
    // // Might need to be removed
    // const rest_of_the_content = document;
    // const menu_content = document.querySelector('#menu-window');
    // rest_of_the_content.addEventListener('click', function(event){
    //     if(event.target != menu_content && event.target != document.querySelector('#menuBtn') && event.target != document.querySelector('#menuBtn i')){
    //         hideMenu();
    //     }
    // });
}

window.toggleMenu = toggleMenu;