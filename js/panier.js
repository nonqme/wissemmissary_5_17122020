// Récuperer les données dans le localStorage
const getBasket = () => {
  let basket = JSON.parse(localStorage.getItem("basket"));
  basket === null ? displayEmptyBasket() : displayBasket(); // Si il n'y a pas de donnée affiché panier vide sinon afficher les produit dans le panier
};

//Affichage des produits dans le panier
const displayBasket = () => {
  let basket = JSON.parse(localStorage.getItem("basket"));
  let totalPrice = 0;
  let creationDivTeddies = "";
  basket.map((product, index) => {
    //Pour chaque item dans le panier
    totalPrice = totalPrice + product.price * product.quantity;
    //Créer le html
    creationDivTeddies = `<article class="basket__product"> 
                                    <div class="basket__product__wrapper">
                                        <div class="basket__product__imgwrapper">
                                        <img class="basket__product__img" src=${product.imageUrl} alt="${product.name} est une peluche fait à la main, il est tout doux"></img>
                                    </div>
                                    <div class="basket__product__txtwrapper">
                                        <h2 class="basket__product__title">${product.name}</h2>
                                        <p class="basket__product__colors basket__product--txt">Couleur : ${product.color}</p>
                                        <div class="basket__product__quantitywrapper">
                                            <label for="${index}" class="basket__product--txt">Quantité :</label>
                                            <input min="1" max="99" class="basket__product__quantity basket__product--txt ${index}" id="${index}" type="number" name="product${index}" value="${product.quantity}">
                                        </div>
                                        <p class="basket__product__price">${product.price * product.quantity}€</p>
                                    </div>
                                    <i class="fas fa-times basket__product__times" id="times${index}"></i>    
                                </article>                        
                                `;
    document.querySelector(".basket").innerHTML += creationDivTeddies; // Inserer le hmtl dans la page
  });
  localStorage.setItem("price", JSON.stringify(totalPrice)); // Création de la clé Prix dans le localstorage
  updateValueLocalStorage();
  deleteProduct();
  displayTotal(totalPrice);
  displayForm();
  formEvent();
};

// Mettre à jours la quantité dans le localstorage
const updateValueLocalStorage = () => {
  const input = document.querySelectorAll(".basket__product__quantity");
  let basket = JSON.parse(localStorage.getItem("basket"));
  input.forEach((item) => {
    //Pour chaque article
    item.addEventListener("change", (e) => {
      // si la value change la récuperer
      let index = e.target.classList[2];
      let getInputId = document.getElementById(`${index}`);
      console.log(getInputId.value);
      if (getInputId.value >= 1 && getInputId.value <99) {
        basket[index].quantity = getInputId.value;
        localStorage.setItem("basket", JSON.stringify(basket)); //Et mettre à jours le localstorage
      }
      updateHTML();
    });
  });
};

//Suprimmer les éléments séléctionnés
const deleteProduct = () => {
  const times = document.querySelectorAll(".basket__product__times");
  let basket = JSON.parse(localStorage.getItem("basket"));
  times.forEach((item) => {
    // Pour chaque icone de croix
    item.addEventListener("click", (e) => {
      // Si l'utilisateur clic alors enlever l'article du localstorage
      let timesIndex = e.target.getAttribute("id");
      console.log(e.target.getAttribute("id"));
      let index = timesIndex.slice(5);
      console.log(index);
      basket.splice(index, 1);
      console.log(typeof basket)
      if (basket.length === 0){
          localStorage.removeItem("basket")
      } else {
        localStorage.setItem("basket", JSON.stringify(basket)); 
      }
      updateHTML();
    });
  });
};

// Affichage du prix total
const displayTotal = (totalPrice) => {
  creationDivTotal = `<h2 class="total__title">Prix total :</h2>
                        <p class="total__txt">${totalPrice}€</p>
                        `;
  document.querySelector(".total").innerHTML = creationDivTotal;
};

//Mettre a jours le html
const updateHTML = () => {
  document.querySelector(".basket").innerHTML = "";
  document.querySelector(".total").innerHTML = "";
  document.querySelector(".form").innerHTML = "";
  getBasket();
};

// Affichage du panier vide
const displayEmptyBasket = () => {
  displayTeddies = "<h1 class=basket__empty>Panier Vide</h1>";
  console.log("code HTML crée");

  // Ajouter le html dans le Product.html
  document.querySelector(".basket").innerHTML = displayTeddies;
  console.log("Code HTML ajouté au fichier");
};

// Création du formulaire
const displayForm = () => {
  let createForm = `<h3 class="form__title">Pour finaliser la commande veuillez remplir le formulaire ci-dessous</h3>
                        <div class="form__name form--style">
                            <label for="name">Nom</label>
                            <input type="text" name="name" id="name" placeholder="Nom..." pattern="^[A-Z]{1}[A-Za-zÀ-ÿ\ -]+$" required />
                        </div>
                        <div class="form__firstname form--style">
                            <label for="firstname">Prénom</label>
                            <input type="text" name="firstname" id="firstname" placeholder="Prénom..." pattern="^[A-Z]{1}[A-Za-zÀ-ÿ\ -]+$" required />
                        </div>
                        <div class="form__address form--style">
                            <label for="address">Adresse</label>
                            <input type="text" name="adress" id="address" placeholder="Adresse..." pattern="^[0-9]{1,4}[ ,-][ A-Za-zÀ-ÿ0-9\-]+$" required />
                        </div>
                        <div class="form__city form--style">
                            <label for="city">Ville</label>
                            <input type="text" name="city" id="city" placeholder="Ville..." pattern="^[A-Z]{1}[A-Za-zÀ-ÿ\ -]+$" required />
                        </div>
                        <div class="form__email form--style">
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Email..." required />
                        </div>
                        <button class="form__btn" id="submit">Confirmer ma commande</button>
    `;
  document.querySelector(".form").innerHTML += createForm;
};

// Event listerner sur le bouton du formulaire
const formEvent = () => {
  let formBtn = document.querySelector(".form__btn");
  formBtn.addEventListener("click", (e) => {
    //si l'utilisateur clic sur el bouton
    e.preventDefault();
    console.log("test");
    let contact = {
      // Récuperer les informations fournis
      firstName: document.getElementById("firstname").value,
      lastName: document.getElementById("name").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    let products = [];
    let basket = JSON.parse(localStorage.getItem("basket"));
    basket.map((data) => {
      //Pour chaque objet dans le panier récuperer les Ids
      products.push(data._id);
      console.log(data._id);
    });
    let userOrder = { contact, products }; // créer un array avec les données récuperer
    console.log(contact);
    console.log(userOrder);
    order(userOrder);
  });
};

// Envoye des données pour récuperer l'id de la commande
const order = async (userOrder) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userOrder),
  };
  try {
    let response = await fetch(
      "http://localhost:3000/api/teddies/order/",
      options
    ); //connection à l'API
    console.log("Appelle de l'API");
    if (response.ok) {
      // Si la réponse est ok executer les fonctions nécessaire
      let orderFetch = await response.json();
      console.log("API chargée");
      orderResponse(orderFetch);
    } else {
      // Sinon renvoyé une erreur
      console.error("Retour du serveur : ", response.status);
      console.log("API non chargée");
    }
  } catch (error) {
    console.log(error);
    window.alert("Une erreur est survenue, le serveur ne répond pas");
  }
};

// Créer une clé localstorage avec les données renvoyé par l'api, supprimer le panier et passé à la confirmation
const orderResponse = (orderFetch) => {
  localStorage.setItem("contact", JSON.stringify(orderFetch.contact));
  localStorage.setItem("orderId", JSON.stringify(orderFetch.orderId));
  localStorage.removeItem("basket");
  window.location.replace("confirmation.html");
};

getBasket();
