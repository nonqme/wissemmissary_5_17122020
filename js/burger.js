// Burger
const navSlide = () => {
  const burger = document.querySelector(".burgericon");
  const nav = document.querySelector(".header__nav__ul");
  const navLinks = document.querySelectorAll(".header__nav__list");
  const blurEffect = document.querySelector(".header__nav__menueffect");
  const selectBody = document.body;
  // Activer ou Desactiver au clic le menu
  burger.addEventListener("click", () => {
    selectBody.classList.toggle("fixed-position");
    nav.classList.toggle("header__nav__ul--effect");
    blurEffect.classList.toggle("header__nav__menueffect--effect");
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navFade 0.5s ease forwards ${index / 4 + 0.2}s`;
      }
    });
    burger.classList.toggle("burgericon--toggle");
  });
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      selectBody.classList.remove("fixed-position");
      nav.classList.remove("header__nav__ul--effect");
      blurEffect.classList.remove("header__nav__menueffect--effect");
      burger.classList.remove("burgericon--toggle");
      navLinks.forEach((link) => {
        link.style.animation = "";
      });
    });
  });
  console.log("BURGER LOADED");
};
navSlide();
