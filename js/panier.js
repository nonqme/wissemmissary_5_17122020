function getBasket(){
    let basket = localStorage.getItem("basketItem")
    if (basket === null){ 
        createEmptyBasket()
        console.log("prob") 
    }
    else {
        createBasket()
        console.log("pas prob") 
    }
}
function createBasket(){
    let basket = JSON.parse(localStorage.getItem("basketItem"));
    let displayTeddies = "<article class=basket__product>";  
    basket.forEach(item => {
        console.log(item)
        let itemPrice = (item.price*item.quantity)
        let creationdivTeddies=`<div class="basket__product__wrapper">
                                    <div class="basket__product__imgwrapper">
                                    <img class="basket__product__img" src=${item.imageUrl}></img>
                                    </div>
                                    <div class="basket__product__txtwrapper">
                                        <h1 class="basket__product__title">${item.name}</h1>
                                        <p class="basket__product__colors basket__product--txt">Couleur : ${item.color}</p>
                                        <p class="basket__product__quantity basket__product--txt">Quantité : ${item.quantity}</p> 
                                        <p class="basket__product__price basket__product--txt">Prix Total : ${itemPrice}€</p>
                                    </div>    
                                </div>                        
                                `;
                            
        displayTeddies += creationdivTeddies;
})   
    displayTeddies += "</article>";
    console.log("code HTML crée")

    // Ajouter le html dans le Product.html
    document.querySelector(".basket").innerHTML = displayTeddies;
    console.log("Code HTML ajouté au fichier")

}

function createEmptyBasket(){
        displayTeddies = "<h1 class=basket__empty>Panier Vide</h1>";
        console.log("code HTML crée")
    
    // Ajouter le html dans le Product.html
    document.querySelector(".basket").innerHTML = displayTeddies;
    console.log("Code HTML ajouté au fichier")
}

getBasket();