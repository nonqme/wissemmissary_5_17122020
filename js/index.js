const teddiesPromise = fetch("http://localhost:3000/api/teddies");
teddiesPromise
    .then(response => response.json())
    .then(response => {
        let affichageTeddies = "<ul class=maincontainer_grid>";  
        let i=0;  
        for(let teddies of response){
            console.log(teddies)
            i=i+1;
            let creationdivTeddies=`<li class=maincontainer_grid_bloc>
                                        <a href="" class=maincontainer_grid_bloc_link>
                                            <article class=maincontainer_grid_bloc_link_article>
                                                <div class=maincontainer_grid_bloc_link_article_imgdiv>
                                                    <img class="maincontainer_grid_bloc_link_article_imgdiv_img maincontainer_grid_bloc_link_article_imgdiv_img-style${i}" src=${teddies.imageUrl} alt="Photo d'un ours en peluche prénommé ${teddies.name} en vente sur Orinoco pour ${teddies.price}€."></img>
                                                </div>
                                                <div class=maincontainer_grid_bloc_link_article_nameprice>
                                                    <div class=maincontainer_grid_bloc_link_article_nameprice_name>
                                                        <h1 class=maincontainer_grid_bloc_link_article_nameprice_name_title>${teddies.name}</h1>
                                                    </div>
                                                    <div class=maincontainer_grid_bloc_link_article_nameprice_desc>
                                                        <p class=maincontainer_grid_bloc_link_article_nameprice_desc_txt>${teddies.description}</p>
                                                    </div>
                                                    <div class=maincontainer_grid_bloc_link_article_nameprice_price>
                                                        <p class=maincontainer_grid_bloc_link_article_nameprice_price_txt>${teddies.price}€</p>
                                                    </div>
                                                </div>
                                            </article>
                                        </a>   
                                    </li>`;
            affichageTeddies += creationdivTeddies;
        }
        affichageTeddies += "</ul>";
        document.getElementById("maincontainer").innerHTML = affichageTeddies;
    })
    .catch((error) => {
        console.log(error);        
    });












