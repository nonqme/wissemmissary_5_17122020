// Verification du timer 
function expireTime(){
    let minutes = 1; 
    let now = new Date().getTime();
    let setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {  // Si pas de key "setuptime" le créer et apeller l'api
        localStorage.setItem('setupTime', now)
        console.log("Pas de setupTime dans localstorage!")
        getTeddies() 
    } else { // Sinon si le timer est expiré vider le localstorage et apeller l'api
        if(now-setupTime > minutes*60*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
            getTeddies()
            console.log("Mise à jours")
            } else { // Sinon Afficher les données depuis le localstorage
                displayData()
                console.log("Pas de mise à jours")
            }
        }
    }

//Appelle de l'API pour récupérer les données de chaques articles disponibles 
async function getTeddies() {
    try {
        let response = await fetch("http://localhost:3000/api/teddies");
        console.log("Appelle de l'API")
        if (response.ok) { // Si la réponse est ok executer les fonctions nécessaire
            let teddies = await response.json();
            storeAPI(teddies)
            idStorage(teddies)
            displayData(teddies)
            console.log("API chargée")
        } else { // Sinon renvoyé une erreur
            console.error('Retour du serveur : ', response.status)
            console.log("API non chargée")
        }
    } catch (error) {
        console.log(error);
    }
}
// Recuperer les données et les transferer dans le local storage
function storeAPI(teddies){
    localStorage.setItem("teddies", JSON.stringify(teddies));                          
    console.log("API chargée dans le localstorage") 
};


// Création localstorage pour chaque ours
function idStorage(){
    let getLocalStorage = JSON.parse(localStorage.getItem("teddies"));
    getLocalStorage.forEach(teddies => {
        localStorage.setItem(teddies._id, JSON.stringify(teddies));
})
    console.log("Id de chaque ours chargée dans le localstorage")
}

// Recuperer les données dans le localstorage en fonction de l'url 
function displayData(){
    let getLocalStorage = JSON.parse(localStorage.getItem("teddies"));
    let displayTeddies = "<ul class=cardwrapper__grid>"; 
    let i=0;  
    getLocalStorage.forEach(teddies => { // Pour chaque ours
        let teddiesPrice = teddies.price/100;
        i=i+1;
        // Créer le HTML avec les données reçu
        let creationdivTeddies=`<li class=card>
                                    <a href="product.html?id=${teddies._id}" class="card__link">
                                        <article class=card__flex>
                                            <div class=card__imgwrapper>
                                                <img class="card__img card__img--style${i}" src=${teddies.imageUrl} alt="Ours en peluche prénommé ${teddies.name} en vente sur Orinoco pour ${teddies.price}€."></img>
                                            </div>
                                            <div class=card__container>
                                                    <h3 class=card__title>${teddies.name}</h3>
                                                    <p class=card__desc>${teddies.description}</p>
                                                    <p class=card__price>${teddiesPrice}€</p>
                                            </div>
                                        </article>
                                    </a>   
                                </li>`;
        displayTeddies += creationdivTeddies;
    })
    displayTeddies += "</ul>";
    console.log("code HTML crée")
 // Ajouter le html dans l' index.html
    document.querySelector(".cardwrapper").innerHTML = displayTeddies;
    console.log("Code HTML ajouté au fichier")
}

expireTime()
