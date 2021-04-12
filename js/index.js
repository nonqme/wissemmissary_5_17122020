// Récupérer les données dans le localstorage
const displayData = () => {
  const getLocalStorage = JSON.parse(localStorage.getItem("teddies"));
  let i = 0;
  let  createUl =`<ul class="cardwrapper__grid">
                  </ul>`;
  document.querySelector(".cardwrapper").innerHTML = createUl; // Intégrer le code Html dans la page
  getLocalStorage.map((teddies) => {
    // Pour chaque ours
    const teddiesPrice = teddies.price / 100;
    i = i + 1;
    // Créer le HTML avec les données reçu
    let creationdivTeddies = `<li class="card">
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
    document.querySelector(".cardwrapper__grid").innerHTML += creationdivTeddies; // Intégrer le code Html dans la page
    console.log(`Ourson numéro ${i} ajouté dans l'HTML`);
  });
};

const displayFetchError = () => {
  let createFetchError = `<div class="fetcherror">
                            <img class="fetcherror__img" src="image/chris-tellez-piUgqH1YsS0-unsplash.jpg" alt="Nounours fait un petit somme"></img>
                            <div class="fetcherror__txtwrapper">
                              <h3 class="fetcherror__title">Les ours fonts une petite sieste</h3>
                              <p class="fetcherror__txt">Veuillez réessayer plus tard</p>
                            </div>
                          </div>  
                          `;
document.querySelector(".cardwrapper").innerHTML += createFetchError; // Intégrer le code Html dans la page

}


