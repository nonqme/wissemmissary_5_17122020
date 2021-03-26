// var
let minutes = 1; // to clear the localStorage after 24 hour
let now = new Date().getTime();
let setupTime = localStorage.getItem('setupTime');

// Load burger
window.addEventListener('load',() => {
    expireTime()
    navSlide()
})

// fetch
function getData(){
    fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(data => teddiesData = data)
    .then(storeAPI)
    .then(displayData)
    .catch(error => console.log(error))      
    };

// api to localstorage
function storeAPI(){
    localStorage.setItem("teddies", JSON.stringify(teddiesData));                          
    console.log(JSON.parse(localStorage.getItem("teddies")));
    console.log("Api to localstorage DONE") 
};

// add expiretime to localstorage
function expireTime(){
if (setupTime == null) {
    localStorage.setItem('setupTime', now)
    console.log("Notimer in localstorage!")
    getData()
} else {
    if(now-setupTime > minutes*60*1000) {
        localStorage.clear()
        localStorage.setItem('setupTime', now);
        getData()
        console.log("Time to refresh!")
        } else {
            displayData()
            console.log("No need to refresh !")
        }
    }
}

// display data
function displayData(){
    let getLocalStorage = JSON.parse(localStorage.getItem("teddies"));
    let displayTeddies = "<ul class=main_sectionarticle_container_grid>";  
    let i=0;  
    getLocalStorage.forEach(teddies => {
        console.log(teddies);
        console.log(teddies._id)
        i=i+1;
        let creationdivTeddies=`<li class=main_sectionarticle_container_grid_bloc>
                                    <a href="produit.html?id=${teddies._id}" class="main_sectionarticle_container_grid_bloc_link">
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
        displayTeddies += creationdivTeddies;
        localStorage.setItem(teddies._id, JSON.stringify(teddies));
    })
    displayTeddies += "</ul>";
    console.log("HTML DONE")

    // add to container
    document.querySelector(".main_sectionarticle_container").innerHTML = displayTeddies;
    console.log("Add to container DONE")
}


// Burger
function navSlide(){
    let burger = document.querySelector(".header_container_mobilemenu_burger");
    let nav = document.querySelector(".header_container_ul");
    let navLinks = document.querySelectorAll(".header_container_ul_list");
    let blurEffect = document.querySelector(".header_container_mobileeffect")
    // Toggle class and effect on click
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


