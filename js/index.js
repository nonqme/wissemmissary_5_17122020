const teddiesPromise = fetch("http://localhost:3000/api/teddies");
teddiesPromise
    .then(response => response.json())
    .then(response => {
        let affichageTeddies = "<ul class=container_grid>";  
        let i=0;  
        for(let teddies of response){
            console.log(teddies)
            i=i+1;
            let creationdivTeddies=`<li class=container_grid_bloc>
                                        <div class=container_grid_bloc_imgdiv>
                                            <img class="container_grid_bloc_imgdiv_img container_grid_bloc_imgdiv_img-style${i}" src=${teddies.imageUrl}></img>
                                        </div>
                                        <div class=container_grid_bloc_nameprice>
                                            <div class=container_grid_bloc_nameprice_name>
                                                <h1 class=container_grid_bloc_nameprice_name_title>${teddies.name}</h1>
                                            </div>
                                            <div class=container_grid_bloc_nameprice_desc>
                                                <p class=container_grid_bloc_nameprice_desc_txt>${teddies.description}</p>
                                            </div>
                                            <div class=container_grid_bloc_nameprice_price>
                                                <p class=container_grid_bloc_nameprice_price_txt>${teddies.price}€</p>
                                            </div>
                                            <div class="container_grid_bloc_nameprice_info" >
                                                <i class="fas fa-chevron-up container_grid_bloc_nameprice_info_iconup"></i>
                                                <i class="fas fa-chevron-down container_grid_bloc_nameprice_info_icondown"></i>
                                                <div class="container_grid_bloc_nameprice_info_linkbloc">
                                                    <a href="" class="container_grid_bloc_nameprice_info_linkbloc_link">Plus d'info</a>
                                                </div>
                                            </div>   
                                    </li>`;
            affichageTeddies += creationdivTeddies;
        }
        affichageTeddies += "</ul>";
        document.getElementById("container").innerHTML = affichageTeddies;
        return response;

    })
    .then(response => {
        let iconList = document.querySelectorAll(".container_grid_bloc_nameprice_info_iconup");
        for (var i = 0; i < iconList.length; i++) {
            iconList[i].addEventListener("click", function() {
                let test = this.parentNode;
                test.classList.add("container_grid_bloc_nameprice_info-openstyle");
            });
          }
        let iconLists = document.querySelectorAll(".container_grid_bloc_nameprice_info_icondown");
        for (var i = 0; i < iconLists.length; i++) {
              iconLists[i].addEventListener("click", function() {
                  let test = this.parentNode;
                  test.classList.remove("container_grid_bloc_nameprice_info-openstyle");
              });
            }  
    })
    .catch((error) => {
        console.log(error);        
    });












