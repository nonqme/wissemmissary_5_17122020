// Burger
function navSlide(){
    let burger = document.querySelector(".header_container_mobilemenu_burger");
    let nav = document.querySelector(".header_container_ul");
    let navLinks = document.querySelectorAll(".header_container_ul_list");
    let blurEffect = document.querySelector(".header_container_mobileeffect")
    // Activer ou Desactiver au clic le menu
    burger.addEventListener("click",() => {
        nav.classList.toggle("header_container_ul-active");
        blurEffect.classList.toggle("header_container_mobileeffect-effect")
        navLinks.forEach((link, index) => {
            if(link.style.animation){
                link.style.animation ="";
            } else {
                link.style.animation = `navFade 0.5s ease forwards ${index / 4 + 0.2}s`;
            }
        });
        burger.classList.toggle("header_container_mobilemenu_burger-toggle");
    });
    console.log("BURGER LOADED")
}
navSlide()