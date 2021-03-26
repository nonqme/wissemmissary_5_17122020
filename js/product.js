// Appelle des fonctions
expireTime()



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
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");
    let idTeddy = JSON.parse(localStorage.getItem(id))
    // Créer le HTML avec les données reçu
    let displayTeddies = "<article class=mainproductpage_article>";  
    let creationdivTeddies=`<img class="mainproductpage_article_img" src=${idTeddy.imageUrl}></img>
                            <h1 class="mainproductpage_article_title">${idTeddy.name}</h1>
                            <p class="mainproductpage_article_desc">${idTeddy.description}</p>
                            <div class="mainproductpage_article_colorslist"></div>                           
                            `;
                            
        displayTeddies += creationdivTeddies;
    
    displayTeddies += "</article>";
    console.log("code HTML crée")

    // Ajouter le html dans le Product.html
    document.querySelector(".mainproductpage").innerHTML = displayTeddies;
    console.log("Code HTML ajouté au fichier")

    // Créer la list des couleurs
    let getColors = idTeddy.colors
    let displayColors = `<select onchange="colorList()" class=mainproductpage_article_colorlist_select>
                        <option value=none selected>Couleur</option>
                        `;     
    getColors.forEach(getColors => {
        let creationDivColors = `<option value=${getColors}>${getColors}</option>`                        
            displayColors += creationDivColors;
    })
            
    displayColors += "</select>";
    console.log("code HTML de la list de couleur crée")
    // Ajouter la list de couleur dans le Product.html
    document.querySelector(".mainproductpage_article_colorslist").innerHTML = displayColors;
    console.log("Code HTML de la list de couleur ajouté au fichier")
}

// Enregistre la couleur selectionné dans le localStorage
function colorList() {
    colorValue = document.querySelector(".mainproductpage_article_colorlist_select").value;
    if (colorValue == "none"){ // Si la value selectionné est none alors enlever la couleur du localstorage
        localStorage.removeItem("SelectedColor", colorValue)
        console.log("Couleur enlevé au localstorage")
    } else { // sinon ajouter la couleur au localstorage
        localStorage.setItem("SelectedColor", colorValue)
        console.log("Couleur ajouté au localstorage")
    }
}

// Ajoute l'objet, la quantité et la couleur selectionné
//function addToBasket() {

//}