const cartBtn = document.querySelector(".fa-shopping-cart");
const crossPopup = document.querySelector(".fa-times-circle");
const overlay = document.querySelector(".overlay");
const menu = document.querySelector(".popup");

function openMenu() {
    overlay.classList.remove("hidden");
    menu.classList.remove("hidden");
    menu.classList.remove("opacity-0");
    
}

function closeMenu() {
    overlay.classList.add("hidden");
    menu.classList.add("hidden");
    menu.classList.add("opacity-0");
}

console.log(cartBtn, crossPopup, overlay, menu)

overlay.onclick = closeMenu;
crossPopup.onclick = closeMenu;

cartBtn.onclick = openMenu;