//Appelle de l'API pour récupérer les données de chaques articles disponibles
async function getTeddies() {
    try {
        let response = await fetch("http://localhost:3000/api/teddies");
        if (response.ok) { // Si la réponse est ok executer les fonctions nécessaire
            let teddies = await response.json();
            storeAPI(teddies)
            displayData(teddies)
            idStorage(teddies)
        } else { // Sinon renvoyé une erreur
            console.error('Retour du serveur : ', response.status)
        }
    } catch (error) {
        console.log(error);
    }
}

// Recuperer les données et les transferer dans le local storage
function storeAPI(teddies){
    localStorage.setItem("teddies", JSON.stringify(teddies));                          
    console.log("Api to localstorage DONE") 
};

// Création localstorage pour chaque ours
function idStorage(){
    let getLocalStorage = JSON.parse(localStorage.getItem("teddies"));
    getLocalStorage.forEach(teddies => {
        localStorage.setItem(teddies._id, JSON.stringify(teddies));
})
}

// Verification du timer 
function expireTime(){
    let minutes = 1; 
    let now = new Date().getTime();
    let setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) { // Si pas de key "setuptime" le créer et apeller l'api
        localStorage.setItem('setupTime', now)
        console.log("Notimer in localstorage!")
        getTeddies()
    } else { // Sinon si le timer est expiré vider le localstorage et apeller l'api
        if(now-setupTime > minutes*60*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
            getTeddies()
            console.log("Time to refresh!")
            } else { // Sinon Afficher les données depuis le localstorage
                displayData()
                console.log("No need to refresh !")
            }
        }
    }

// Recuperer les données dans le localstorage en fonction de l'url 
function displayData(){
    let getLocalStorage = JSON.parse(localStorage.getItem("teddies"));
    let displayTeddies = "<ul class=main_sectionarticle_container_grid>"; 
    let i=0;  
    getLocalStorage.forEach(teddies => { // Pour chaque ours
        let teddiesPrice = teddies.price/100;
        i=i+1;
        // Créer le HTML avec les données reçu
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
                                                    <p class=main_sectionarticle_container_grid_bloc_link_article_nameprice_price_txt>${teddiesPrice}€</p>
                                                </div>
                                            </div>
                                        </article>
                                    </a>   
                                </li>`;
        displayTeddies += creationdivTeddies;
    })
    displayTeddies += "</ul>";
    console.log("code HTML crée")
 // Ajouter le html dans l' index.html
    document.querySelector(".main_sectionarticle_container").innerHTML = displayTeddies;
    console.log("Code HTML ajouté au fichier")
}

expireTime()
