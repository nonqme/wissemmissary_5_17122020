// Burger
function navSlide(){
    let burger = document.querySelector(".burgericon");
    let nav = document.querySelector(".header__nav__ul");
    let navLinks = document.querySelectorAll(".header__nav__list");
    let blurEffect = document.querySelector(".header__nav__menueffect");
    let selectBody = document.body;
    // Activer ou Desactiver au clic le menu
    burger.addEventListener("click",() => {
        selectBody.classList.toggle("fixed-position")
        nav.classList.toggle("header__nav__ul--effect");
        blurEffect.classList.toggle("header__nav__menueffect--effect")
        navLinks.forEach((link, index) => {
            if(link.style.animation){
                link.style.animation ="";
            } else {
                link.style.animation = `navFade 0.5s ease forwards ${index / 4 + 0.2}s`;
            }
        });
        burger.classList.toggle("burgericon--toggle");
    });
    navLinks.forEach(link =>{
        link.addEventListener("click",() => {
            selectBody.classList.remove("fixed-position")
            nav.classList.remove("header__nav__ul--effect");
            blurEffect.classList.remove("header__nav__menueffect--effect")
            burger.classList.remove("burgericon--toggle");
            navLinks.forEach(link =>{
                link.style.animation ="";
            })
    })
})
console.log("BURGER LOADED")
}
navSlide()