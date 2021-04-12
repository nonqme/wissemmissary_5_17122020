const getTeddyData = () => {
  // Stockage des variables utilisées plusieurs fois
  let item = {};
  item.params = new URLSearchParams(document.location.search);
  item.id = item.params.get("id");
  item.teddy = JSON.parse(localStorage.getItem(item.id));
  item.teddyPrice = item.teddy.price / 100;
  return item;
};

// Recuperer les données dans le localstorage en fonction de l'url
const createTeddyCard = () => {
  let item = getTeddyData();
  // Créer le HTML avec les données reçu
  let creationDivTeddies = `<article class=product>
                                <div class="product__imgwrapper">
                                    <img class="product__img" src=${item.teddy.imageUrl}></img>
                                </div>
                                <h1 class="product__title">${item.teddy.name}</h1>
                                <p class="product__desc">${item.teddy.description}</p>
                                <p class="product__price">${item.teddyPrice}€</p>
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
  let item = getTeddyData();
  let getColors = item.teddy.colors;
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
      addItemBasket();
    }
  });
};

// Créer un localstorage du produit selectionné

const addItemBasket = () => {
  let teddyQuantity = parseInt(
    document.querySelector(".product__quantity__select").value
  );
  let teddyColor = document.querySelector(".product__colors__select").value;
  let basketItem = [];
  let newTeddy = true;
  let item = getTeddyData();

  // stockage dans un array
  let basketArray = {
    _id: item.teddy._id,
    imageUrl: item.teddy.imageUrl,
    name: item.teddy.name,
    price: item.teddyPrice,
    quantity: teddyQuantity,
    color: teddyColor,
  };

  // Si le localstorage est vide créer un nouveau array basketItem et le push dans le localStorage
  if (localStorage.getItem("basketItem") === null) {
    basketItem.push(basketArray);
    localStorage.setItem("basketItem", JSON.stringify(basketItem));
    console.log(basketItem);
  }
  // Sinon recupérer le tableau du localStorage, ajouter le nouveau produit, et enregistrer le nouvelle array
  else {
    let basketItem = JSON.parse(localStorage.getItem("basketItem"));
    basketItem.forEach((product) => {
      if (teddyColor === product.color && item.teddy._id === product._id) {
        //si un produit avec la même id et la même couleur est présent
        product.quantity += teddyQuantity; // modifié la quantité du produit dans le localstorage
        newTeddy = false; // ce n'est pas un nouvelle ours
      }
    });
    if (newTeddy) basketItem.push(basketArray); // si c'est un nouvelle ours
    localStorage.setItem("basketItem", JSON.stringify(basketItem)); // ajouté au localstorage
  }
};

// Apelle les fonctions pour afficher le produit, les couleurs et la quantité
const displayData = () => {
  createTeddyCard();
  createColorList();
  addToBasket();
};
