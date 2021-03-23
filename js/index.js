const teddiesPromise = fetch("http://localhost:3000/api/teddies"); // Appel de l'API
teddiesPromise  .then(response => response.json())
                .then(response => {
                    let affichageTeddies = "<ul class=main_sectionarticle_container_grid>";  
                    let i=0;  
                    for(let teddies of response){
                        console.log(teddies)
                        i=i+1;
                        let creationdivTeddies=`<li class=main_sectionarticle_container_grid_bloc>
                                                    <a href="" class="main_sectionarticle_container_grid_bloc_link">
                                                        <article class=main_sectionarticle_container_grid_bloc_link_article>
                                                            <div class=main_sectionarticle_container_grid_bloc_link_article_imgdiv>
                                                                <img class="main_sectionarticle_container_grid_bloc_link_article_imgdiv_img main_sectionarticle_container_grid_bloc_link_article_imgdiv_img-style${i}" src=${teddies.imageUrl} alt="Photo d'un ours en peluche prénommé ${teddies.name} en vente sur Orinoco pour ${teddies.price}€."></img>
                                                            </div>
                                                            <div class=main_sectionarticle_container_grid_bloc_link_article_nameprice>
                                                                <div class=main_sectionarticle_container_grid_bloc_link_article_nameprice_name>
                                                                    <h3 class=main_sectionarticle_container_grid_bloc_link_article_nameprice_name_title>${teddies.name}</h3>
                                                                </div>
                                                                <div class=main_sectionarticle_container_grid_bloc_link_article_nameprice_desc>
                                                                    <p class=main_sectionarticle_container_grid_bloc_link_article_nameprice_desc_txt>${teddies.description}</p>
                                                                </div>
                                                                <div class=main_sectionarticle_container_grid_bloc_link_article_nameprice_price>
                                                                    <p class=main_sectionarticle_container_grid_bloc_link_article_nameprice_price_txt>${teddies.price}€</p>
                                                                </div>
                                                            </div>
                                                        </article>
                                                    </a>   
                                                </li>`;
                        affichageTeddies += creationdivTeddies;
                    }
                    affichageTeddies += "</ul>";
                    document.querySelector(".main_sectionarticle_container").innerHTML = affichageTeddies;
                })
                .catch((error) => {
                    console.log(error);        
                });

const navSlide = () => {
    const burger = document.querySelector(".header_container_mobilemenu_burger");
    const nav = document.querySelector(".header_container_ul");
    const navLinks = document.querySelectorAll(".header_container_ul_list");
    const blurEffect = document.querySelector(".header_container_mobileeffect")
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
}
navSlide();












