//Appel de l'API pour récupérer les données de chaques articles disponibles 
async function getTeddies() {
    try {
        let response = await fetch("http://localhost:3000/api/teddies");
        if (response.ok) {
            let teddies = await response.json();
            storeAPI(teddies)
            displayData(teddies)
            idStorage(teddies)
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (error) {
        console.log(error);
    }
}

// Recuperer les données et les transferer dans le local storage
function storeAPI(teddies){
    localStorage.setItem("teddies", JSON.stringify(teddies));                          
    console.log(JSON.parse(localStorage.getItem("teddies")));
    console.log("Api to localstorage DONE") 
};

// Création localstorage pour chaque ours
function idStorage(){
    let getLocalStorage = JSON.parse(localStorage.getItem("teddies"));
    getLocalStorage.forEach(teddies => {
        localStorage.setItem(teddies._id, JSON.stringify(teddies));
})
}

// Ajout d'un timer aux données du localstorage et apelle de l'api si les données sont expiré
function expireTime(){
    let minutes = 1; 
    let now = new Date().getTime();
    let setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
        console.log("Notimer in localstorage!")
        getTeddies()
    } else {
        if(now-setupTime > minutes*60*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
            getTeddies()
            console.log("Time to refresh!")
            } else {
                displayData()
                console.log("No need to refresh !")
            }
        }
    }

// Créer l'affichage des Teddies
function displayData(){
    let getLocalStorage = JSON.parse(localStorage.getItem("teddies"));
    let displayTeddies = "<ul class=main_sectionarticle_container_grid>";  
    let i=0;  
    getLocalStorage.forEach(teddies => {
        console.log(teddies);
        i=i+1;
        let creationdivTeddies=`<li class=main_sectionarticle_container_grid_bloc>
                                    <a href="product.html?id=${teddies._id}" class="main_sectionarticle_container_grid_bloc_link">
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
    })
    displayTeddies += "</ul>";

    // Ajout à l'html
    document.querySelector(".main_sectionarticle_container").innerHTML = displayTeddies;
    console.log("Add to container DONE")
    console.log("HTML DONE")
}

expireTime()
