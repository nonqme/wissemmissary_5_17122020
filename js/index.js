// Recuperer les données dans le localstorage en fonction de l'url
const displayData = () => {
  let getLocalStorage = JSON.parse(localStorage.getItem("teddies"));
  let i = 0;
  getLocalStorage.map((teddies) => {
    // Pour chaque ours
    let teddiesPrice = teddies.price / 100;
    i = i + 1;
    // Créer le HTML avec les données reçu
    let creationdivTeddies = `<li class=card>
                                    <a href="product.html?id=${teddies._id}" class="card__link">
                                        <article class=card__flex>
                                            <div class=card__imgwrapper>
                                                <img class="card__img card__img--style${i}" src=${teddies.imageUrl} alt="Ours en peluche prénommé ${teddies.name} en vente sur Orinoco pour ${teddiesPrice}€."></img>
                                            </div>
                                            <div class=card__container>
                                                    <h3 class=card__title>${teddies.name}</h3>
                                                    <p class=card__desc>${teddies.description}</p>
                                                    <p class=card__price>${teddiesPrice}€</p>
                                            </div>
                                        </article>
                                    </a>   
                                </li>`;
    document.querySelector(".cardwrapper__grid").innerHTML += creationdivTeddies;
    console.log(`Ourson numéro ${i} ajouté dans l'HTML`)                         
  });
}


