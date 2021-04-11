const getBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basketItem"));
    basket === null ? createEmptyBasket() : productInBasket();
}


const productInBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basketItem"));
    let totalPrice = 0
    let creationDivTeddies = "";
    basket.map((item, index) => {
        console.log(item)
        console.log(index)
        totalPrice = totalPrice + (item.price * item.quantity);        
        creationDivTeddies =`<article class=basket__product>
                                    <div class="basket__product__wrapper">
                                        <div class="basket__product__imgwrapper">
                                        <img class="basket__product__img" src=${item.imageUrl}></img>
                                    </div>
                                    <div class="basket__product__txtwrapper">
                                        <h1 class="basket__product__title">${item.name}</h1>
                                        <p class="basket__product__colors basket__product--txt">Couleur : ${item.color}</p>
                                        <div class="basket__product__quantitywrapper">
                                            <label for="product${item._id}" class="basket__product--txt">Quantité :</label>
                                            <input min="0" max="99" class="basket__product__quantity basket__product--txt ${index}" id="${index}" type="number"  name="product${index}" value="${item.quantity}">
                                        </div>
                                        <p class="basket__product__price" data-id:"${item._id}${item.color}">${(item.price * item.quantity)}€</p>
                                    </div>
                                    <i class="fas fa-times basket__product__times" id="times${index}"></i>    
                                </article>                        
                                `;
        document.querySelector(".basket").innerHTML += creationDivTeddies;  
    })
    console.log(totalPrice)
    updateValueLocalStorage();
    deleteItem();
    displayTotal(totalPrice);
    createForm();
    formEvent(totalPrice);
}

const updateValueLocalStorage = () => {
    const input = document.querySelectorAll(".basket__product__quantity")
    let basket = JSON.parse(localStorage.getItem("basketItem"));
    input.forEach((item) => {
        item.addEventListener("change", e => {
        let index = e.target.classList[2];
        let getInputId = document.getElementById(`${index}`);
        console.log(getInputId.value)
        basket[index].quantity = getInputId.value;
        localStorage.setItem("basketItem", JSON.stringify(basket)); 
        updateHTML();
        })
    })
}
const deleteItem = () => {
    const times = document.querySelectorAll(".basket__product__times")
    let basket = JSON.parse(localStorage.getItem("basketItem"));
    times.forEach((item) => {
        item.addEventListener("click", e => {
            let timesIndex = e.target.getAttribute("id");
            console.log(e.target.getAttribute("id"))
            let index = timesIndex.slice(5)
            console.log(index)
            basket.splice(index, 1);
            console.log(basket)
            localStorage.setItem("basketItem", JSON.stringify(basket))
            updateHTML();
        })
    })
}

const displayTotal = (totalPrice) => {
    creationDivTotal =  `<h2 class="total__title">Prix total :</h2>
                        <p class="total__txt">${totalPrice}€</p>
                        `;
    document.querySelector(".total").innerHTML = creationDivTotal;
}


const updateHTML = () => {
    document.querySelector(".basket").innerHTML="";
    productInBasket();
}


const createEmptyBasket = () => {
        displayTeddies = "<h1 class=basket__empty>Panier Vide</h1>";
        console.log("code HTML crée")
    
    // Ajouter le html dans le Product.html
    document.querySelector(".basket").innerHTML = displayTeddies;
    console.log("Code HTML ajouté au fichier")
}

const createForm = () => {
    let createForm =`<h3 class="form__title></h3>
                        <div class="form__name">
                            <label for="name">Nom</label>
                            <input type="text" name="name" id="name" placeholder="Nom..." pattern="^[A-Z]{1}[A-Za-zÀ-ÿ\ -]+$" required />
                        </div>
                        <div class="form__firstname">
                            <label for="firstname">Prénom</label>
                            <input type="text" name="firstname" id="firstname" placeholder="Prénom..." pattern="^[A-Z]{1}[A-Za-zÀ-ÿ\ -]+$" required />
                        </div>
                        <div class="form__address">
                            <label for="address">Adresse</label>
                            <input type="text" name="adress" id="address" placeholder="Adresse..." pattern="^[0-9]{1,4}[ ,-][ A-Za-zÀ-ÿ0-9\-]+$" required />
                        </div>
                        <div class="form__city">
                            <label for="city">Ville</label>
                            <input type="text" name="city" id="city" placeholder="Ville..." pattern="^[A-Z]{1}[A-Za-zÀ-ÿ\ -]+$" required />
                        </div>
                        <div class="form__email">
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Email..." required />
                        </div>
                        <button class="form__btn" id="submit">Confirmer ma commande</button>
    `;
document.querySelector(".form").innerHTML += createForm;  
}

const formEvent = (totalPrice) => {
    let formBtn = document.querySelector(".total__txt");
        formBtn.addEventListener("click", e => {
            e.preventDefault()
            console.log('test')
            let contact = {
                firstName: document.getElementById("firstname").value,
                lastName: document.getElementById("name").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value,
                email: document.getElementById("email").value
            };
        
            let products = [];
            let basket = JSON.parse(localStorage.getItem("basketItem"));                        
            basket.map( data => {
                products.push(data._id);
                console.log(data._id)
                })          
            let userOrder = {contact, products};
            console.log(contact)
            console.log(userOrder)
            localStorage.setItem('price', JSON.stringify(totalPrice));
            order(userOrder);
            
        });
}

const orderResponse = (orderFetch) => {
    localStorage.setItem('contact', JSON.stringify(orderFetch.contact));
    localStorage.setItem('orderId', JSON.stringify(orderFetch.orderId));
    localStorage.removeItem("basketItem");
    window.location.replace("confirmation.html");
}


const order = async(userOrder) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userOrder),
      }
    try {
      let response = await fetch("http://localhost:3000/api/teddies/order/", options);
      console.log("Appelle de l'API");
      if (response.ok) {
        // Si la réponse est ok executer les fonctions nécessaire
        let orderFetch = await response.json();
         console.log("API chargée");
         orderResponse(orderFetch)
      } else {
        // Sinon renvoyé une erreur
        console.error("Retour du serveur : ", response.status);
        console.log("API non chargée");
      }
    } catch (error) {
      console.log(error);
    }
  }



getBasket();