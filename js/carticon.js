const displayNumberOfProduct = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if(basket != null){
        document.querySelector(".carticon__number").innerHTML = basket.length;
        console.log("youhou")
    } else{
        console.log("pas youhou")
        document.querySelector(".carticon__number").innerHTML = "";
    }
}

displayNumberOfProduct();