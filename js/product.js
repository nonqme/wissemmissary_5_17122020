// Appelle des fonctions
expireTime()

// Verification du timer 
function expireTime(){
    let minutes = 5; 
    let now = new Date().getTime();
    let setupTime = localStorage.getItem('setupTime');
    if (setupTime === null) {  // Si pas de key "setuptime" le créer et apeller l'api
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
function createTeddyCard(){
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");
    let teddy = JSON.parse(localStorage.getItem(id))
    let teddyPrice = teddy.price/100;
    // Créer le HTML avec les données reçu
    let displayTeddies = "<article class=product>";  
    let creationdivTeddies=`<div class="product__imgwrapper">
                                <img class="product__img" src=${teddy.imageUrl}></img>
                            </div>
                            <h1 class="product__title">${teddy.name}</h1>
                            <p class="product__desc">${teddy.description}</p>
                            <p class="product__price">${teddyPrice}€</p>
                            <div class="product__container">
                                <div class="product__colors"></div>
                                <div class="product__quantity"></div>
                            </div>    
                            <button class="product__btn btn--style">Ajouter au panier</button>                           
                            `;
                            
        displayTeddies += creationdivTeddies;
    
    displayTeddies += "</article>";
    console.log("code HTML crée")

    // Ajouter le html dans le Product.html
    document.querySelector(".productpagewrapper").innerHTML = displayTeddies;
    console.log("Code HTML ajouté au fichier")
}

// Créer la list des couleurs
function createColorList(){
    let params = new URLSearchParams(document.location.search);
    let id = params.get("id");
    let teddy = JSON.parse(localStorage.getItem(id))  
    let getColors = teddy.colors
    let displayColors = `<select class="product__colors__select product__list--style">
                        <option value=colorNone selected>Couleur</option>
                        `;     
    getColors.forEach(getColors => {
        let creationDivColors = `<option value=${getColors}>${getColors}</option>`                        
            displayColors += creationDivColors;
    })
            
    displayColors += "</select>";
    console.log("code HTML de la list de couleur crée")

    // Ajouter la list de couleur dans le Product.html
    document.querySelector(".product__colors").innerHTML = displayColors;
    console.log("Code HTML de la list de couleur ajouté au fichier")
}

// Créer la list Quantité
function createQuantityList(){
    let displayQuantity = `<select class="product__quantity__select product__list--style">
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
    document.querySelector(".product__quantity").innerHTML = displayQuantity;
    console.log("Code HTML pour la quantité ajouté au fichier")
}

// Apelle les fonctions pour afficher le produit, les couleurs et la quantité
function displayData() {
    createTeddyCard();
    createColorList();
    createQuantityList();
}



// Ajoute l'objet, la quantité et la couleur selectionné au panié
function addToBasket() {
    let addToBasketButton = document.querySelector(".product__btn")
    addToBasketButton.addEventListener("click", () => {            
        let quantityValue = document.querySelector(".product__quantity__select").value;
        let colorValue = document.querySelector(".product__colors__select").value;
        console.log(colorValue)
        console.log(quantityValue)
        if ((quantityValue==="quantityNone") && (colorValue==="colorNone")){
            window.alert("Veuillez choisir la couleur et la quantité de peluche que vous souhaitez")
        } else {
            if ((quantityValue!=="quantityNone") && (colorValue==="colorNone")){
                window.alert("Veuillez choisir la couleur que vous souhaitez")
            }
            if ((quantityValue==="quantityNone") && (colorValue!=="colorNone")){
                window.alert("Veuillez choisir la quantité de peluche que vous souhaitez")
            }
            if ((quantityValue!=="quantityNone") && (colorValue!=="colorNone")){
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
    let teddy = JSON.parse(localStorage.getItem(id))
    let teddyQuantity = parseInt(document.querySelector(".product__quantity__select").value);
    let teddyColor = document.querySelector(".product__colors__select").value;
    let basketItem = []
    let teddyPrice = teddy.price/100;
    let test = true;

    // stockage dans un array
    let basketArray = {
        _id: teddy._id,
        imageUrl: teddy.imageUrl,
        name: teddy.name,
        price: teddyPrice,
        quantity: teddyQuantity,
        color: teddyColor
    }

    // Si le localstorage est vide créer un nouveau array basketItem et le push dans le localStorage
    if (localStorage.getItem("basketItem") === null) {
        basketItem.push(basketArray);
        localStorage.setItem("basketItem", JSON.stringify(basketItem));
    } 
    // Sinon recupérer le tableau du localStorage, ajouter le nouveau produit, et enregistrer le nouvelle array
    else {
        let basketItem = JSON.parse(localStorage.getItem("basketItem"));
        basketItem.forEach(item => {
            if ((teddyColor === item.color) && (teddy._id === item._id)){
                item.quantity += teddyQuantity;
                localStorage.setItem("basketItem", JSON.stringify(basketItem));
                test = false;
            }
        })
    if (test) {
            basketItem.push(basketArray);
            localStorage.setItem("basketItem", JSON.stringify(basketItem));
        }  
    }
}
