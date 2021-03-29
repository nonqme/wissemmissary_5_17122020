// Appelle des fonctions
expireTime()
removeLocalStorageColorQuantity()



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
                addToBasket()
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
            addToBasket(teddies)
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
    let teddyPrice = idTeddy.price/100;
    // Créer le HTML avec les données reçu
    let displayTeddies = "<article class=mainproductpage_article>";  
    let creationdivTeddies=`<div class="mainproductpage_article_imgdiv">
                                <img class="mainproductpage_article_imgdiv_img" src=${idTeddy.imageUrl}></img>
                            </div>
                            <div class="mainproductpage_article_titlediv">
                                <h1 class="mainproductpage_article_titlediv_title">${idTeddy.name}</h1>
                            </div> 
                            <div class="mainproductpage_article_descdiv">   
                                <p class="mainproductpage_article_descdiv_desc">${idTeddy.description}</p>
                            </div>
                            <div class="mainproductpage_article_pricediv">
                                <p class="mainproductpage_article_pricediv_price">${teddyPrice}€</p>
                            </div>
                            <div class="mainproductpage_article_colorquantityflex">
                                <div class="mainproductpage_article_colorquantityflex_colorslist"></div>
                                <div class="mainproductpage_article_colorquantityflex_quantity"></div>
                            </div>    
                            <button class="mainproductpage_article_addtobasket">Ajouter au panier</button>                           
                            `;
                            
        displayTeddies += creationdivTeddies;
    
    displayTeddies += "</article>";
    console.log("code HTML crée")

    // Ajouter le html dans le Product.html
    document.querySelector(".mainproductpage").innerHTML = displayTeddies;
    console.log("Code HTML ajouté au fichier")

    // Créer la list des couleurs
    let getColors = idTeddy.colors
    let displayColors = `<select onchange="colorList()" class="mainproductpage_article_colorquantityflex_colorlist_select mainproductpage_article_colorquantityflex-style">
                        <option value=colorNone selected>Couleur</option>
                        `;     
    getColors.forEach(getColors => {
        let creationDivColors = `<option value=${getColors}>${getColors}</option>`                        
            displayColors += creationDivColors;
    })
            
    displayColors += "</select>";
    console.log("code HTML de la list de couleur crée")

    // Ajouter la list de couleur dans le Product.html
    document.querySelector(".mainproductpage_article_colorquantityflex_colorslist").innerHTML = displayColors;
    console.log("Code HTML de la list de couleur ajouté au fichier")

    // Créer la list Quantité
    let displayQuantity = `<select onchange="quantityList()" class="mainproductpage_article_colorquantityflex_quantity_select mainproductpage_article_colorquantityflex-style">
                        <option value=quantityNone selected>Quantité</option>
                        `;     
    let creationDivQuantity = `<option value=1>1</option>
                            <option value=2>2</option>
                            <option value=3>3</option>
                            <option value=4>4</option>
                            <option value=5>5</option>
                            <option value=6+>6+</option>        
                            `                        
    displayQuantity += creationDivQuantity;
    displayQuantity += "</select>";
    console.log("code HTML de la quantité crée")

    // Ajouter la list de la quantité dans le Product.html
    document.querySelector(".mainproductpage_article_colorquantityflex_quantity").innerHTML = displayQuantity;
    console.log("Code HTML pour la quantité ajouté au fichier")
}

// Enregistre la couleur selectionné dans le localStorage
function colorList() {
    let colorValue = document.querySelector(".mainproductpage_article_colorquantityflex_colorlist_select").value;
    if (colorValue == "colorNone"){ // Si la value selectionné est none alors enlever la couleur du localstorage
        localStorage.removeItem("selectedColor", colorValue)
        console.log("Couleur enlevé au localstorage")
    } else { // sinon ajouter la couleur au localstorage
        localStorage.setItem("selectedColor", colorValue)
        console.log("Couleur ajouté au localstorage")
    }
}

// Enregistre la couleur selectionné dans le localStorage
function quantityList() {
    let quantityValue = document.querySelector(".mainproductpage_article_colorquantityflex_quantity_select").value;
    if (quantityValue == "quantityNone"){ // Si la value selectionné est none alors enlever la couleur du localstorage
        localStorage.removeItem("selectedQuantity", quantityValue)
        console.log("Nombre de produit enlevé au localstorage")
    } else { // sinon ajouter la couleur au localstorage
        localStorage.setItem("selectedQuantity", quantityValue)
        console.log("Nombre de produit ajouté au localstorage")
    }
}
// Regrouper les données sur le produit que le client veux ajouter au panier
function removeLocalStorageColorQuantity() {
    localStorage.removeItem("selectedQuantity")
    localStorage.removeItem("selectedColor")
}


// Ajoute l'objet, la quantité et la couleur selectionné au panié
function addToBasket() {
    let addToBasketButton = document.querySelector(".mainproductpage_article_addtobasket")
    addToBasketButton.addEventListener("click", () => {            
        let quantityValue = localStorage.getItem("selectedQuantity")
        let colorValue = localStorage.getItem("selectedColor")
        console.log(colorValue)
        console.log(quantityValue)
        console.log("testsetsetset")
        if ((quantityValue==null) && (colorValue==null)){
            window.alert("Veuillez choisir la couleur et la quantité de peluche que vous souhaitez")
        } else {
            if ((quantityValue!==null) && (colorValue==null)){
                window.alert("Veuillez choisir la couleur que vous souhaitez")
            }
            if ((quantityValue==null) && (colorValue!==null)){
                window.alert("Veuillez choisir la quantité de peluche que vous souhaitez")
            }
            if ((quantityValue!==null) && (colorValue!==null)){
                window.alert("Produit ajouté au panier")
                addItemBasket();
            }
        }
    })
}

// Créer un localstorage du produit selectionné

function addItemBasket () {
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");
    let idTeddy = JSON.parse(localStorage.getItem(id))
    let teddyQuantity = localStorage.getItem("selectedQuantity")
    let teddyColor = localStorage.getItem("selectedColor")
    let basketItem = []

    // stockage dans un array
    let saveItemBasket = {
        _id: idTeddy._id,
        imageUrl: idTeddy.imageUrl,
        name: idTeddy.name,
        price: idTeddy.price,
        quantity: teddyQuantity,
        selectColors: teddyColor
    }
    let otherItem = true;
    // Si le localstorage est vide créer un nouveau array basketItem et le push dans le localStorage
    if (localStorage.getItem('basketItem') === null) {
        basketItem.push(saveItemBasket);
        localStorage.setItem('basketItem', JSON.stringify(basketItem));
    } 
    // Sinon recupérer le tableau du localStorage, ajouter le nouveau produit, et enregistrer le nouvelle array
    else { 
      let basketItem = JSON.parse(localStorage.getItem('basketItem'));
    if (otherItem) basketItem.push(saveItemBasket);
    localStorage.setItem('basketItem', JSON.stringify(basketItem));
}

}
