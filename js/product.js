const getTeddyData = () => {
  // Stockage des variables utilisées plusieurs fois
  let data = {};
  data.params = new URLSearchParams(document.location.search);
  data.id = data.params.get("id");
  data.teddy = JSON.parse(localStorage.getItem(data.id));
  data.teddyPrice = data.teddy.price / 100;
  return data;
};

// Recuperer les données dans le localstorage en fonction de l'url
const createTeddyCard = () => {
  let data = getTeddyData();
  // Créer le HTML avec les données reçu
  let creationDivTeddies = `<article class=product>
                                <div class="product__imgwrapper">
                                    <img class="product__img" src=${data.teddy.imageUrl} alt="${data.teddy.name} est une peluche fait à la main, il est tout doux"></img>
                                </div>
                                <h1 class="product__title">${data.teddy.name}</h1>
                                <p class="product__desc">${data.teddy.description}</p>
                                <p class="product__price">${data.teddyPrice}€</p>
                                <div class="product__container">
                                    <div class="product__colors">
                                        <select class="product__colors__select product__list--style">
                                            <option value=colorNone selected>Couleur</option>
                                        </select>
                                    </div>
                                    <div class="product__quantity">
                                        <select class="product__quantity__select product__list--style">
                                            <option value=quantityNone selected>Quantité</option>
                                            <option value=1>1</option>
                                            <option value=2>2</option>
                                            <option value=3>3</option>
                                            <option value=4>4</option>
                                            <option value=5>5</option> 
                                        </select>
                                    </div>
                                </div>    
                                <button class="product__btn btn--style">Ajouter au panier</button>  
                            </article>                         
                            `;
  console.log("code HTML crée");
  // Ajouter le html dans le Product.html
  document.querySelector(".productpagewrapper").innerHTML = creationDivTeddies;
  console.log("Code HTML ajouté au fichier");
};

// Créer la list des couleurs
const createColorList = () => {
  let data = getTeddyData();
  let getColors = data.teddy.colors;
  getColors.map((getColors) => {
    let creationDivColors = `<option value=${getColors}>${getColors}</option>`;
    document.querySelector(".product__colors__select").innerHTML += creationDivColors; // Ajout des la list des couleurs dans le HTML
  });
  console.log("code HTML de la list de couleur crée");
};

// Ajoute l'objet, la quantité et la couleur selectionné au panié
const addToBasket = () => {
  let addToBasketButton = document.querySelector(".product__btn");
  addToBasketButton.addEventListener("click", () => {
    let quantityValue = document.querySelector(".product__quantity__select")
      .value;
    let colorValue = document.querySelector(".product__colors__select").value;
    console.log(colorValue);
    console.log(quantityValue);
    if (quantityValue === "quantityNone" && colorValue === "colorNone") {
      // Si il n'y a pas de couleur et de quantité séléctionnée
      window.alert("Veuillez choisir la couleur et la quantité de peluche que vous souhaitez"); // afficher une alerte
    } else if (quantityValue !== "quantityNone" && colorValue === "colorNone") {
      //sinon si il n'y a pas de couleur
      window.alert("Veuillez choisir la couleur que vous souhaitez"); // afficher une alerte
    } else if (quantityValue === "quantityNone" && colorValue !== "colorNone") {
      //sinon si il n'y a pas de quantité
      window.alert("Veuillez choisir la quantité de peluche que vous souhaitez"); // afficher une alerte
    } else if (quantityValue !== "quantityNone" && colorValue !== "colorNone") {
      // sinon si tout est ok lancé la fonction nécessaire
      window.alert("Produit ajouté au panier");
      addProductToLocalStorage();
    }
  });
};

// Créer un localstorage du produit selectionné

const addProductToLocalStorage = () => {
  let teddyQuantity = parseInt(document.querySelector(".product__quantity__select").value);
  let teddyColor = document.querySelector(".product__colors__select").value;
  let basket = [];
  let newTeddy = true;
  let data = getTeddyData();

  // stockage dans un array
  let basketArray = {
    _id: data.teddy._id,
    imageUrl: data.teddy.imageUrl,
    name: data.teddy.name,
    price: data.teddyPrice,
    quantity: teddyQuantity,
    color: teddyColor,
  };

  // Si le localstorage est vide créer un nouveau array basket et le push dans le localStorage
  if (localStorage.getItem("basket") === null) {
    basket.push(basketArray);
    localStorage.setItem("basket", JSON.stringify(basket));
    console.log(basket);
  }
  // Sinon recupérer le tableau du localStorage, ajouter le nouveau produit, et enregistrer le nouvelle array
  else {
    let basket = JSON.parse(localStorage.getItem("basket"));
    basket.forEach((product) => {
      if (teddyColor === product.color && data.teddy._id === product._id) {
        //si un produit avec la même id et la même couleur est présent
        product.quantity += teddyQuantity; // modifié la quantité du produit dans le localstorage
        newTeddy = false; // ce n'est pas un nouvelle ours
      }
    });
    if (newTeddy) basket.push(basketArray); // si c'est un nouvelle ours
    localStorage.setItem("basket", JSON.stringify(basket)); // ajouté au localstorage
  }
};

// Apelle les fonctions pour afficher le produit, les couleurs et la quantité
const displayData = () => {
  createTeddyCard();
  createColorList();
  addToBasket();
};
