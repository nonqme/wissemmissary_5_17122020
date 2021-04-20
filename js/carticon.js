// Affiche le nombre de produit sur l'icone du panier
const displayNumberOfProduct = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if(basket !== null){ 
        document.querySelector(".carticon__number").innerHTML = basket.length;
    } else{
        document.querySelector(".carticon__number").innerHTML = "";
    }
}

displayNumberOfProduct();