const teddiesPromise = fetch("http://localhost:3000/api/teddies");
teddiesPromise
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let affichageTeddies = "<div class=container_grid>";  
        let i=0;  
        for(let teddies of data){
            console.log(teddies)
            i=i+1;
            let creationdivTeddies = `<div class=container_grid_bloc><div class=container_grid_bloc_imgdiv><img class="container_grid_bloc_imgdiv_img container_grid_bloc_imgdiv_img-style${(i)}" src=${teddies.imageUrl}></img></div><div class=container_grid_bloc_nameprice><div class=container_grid_bloc_nameprice_name><h1 class=container_grid_bloc_nameprice_name_title>${teddies.name}</h1></div><div class=container_grid_bloc_nameprice_desc><p class=container_grid_bloc_nameprice_desc_txt>${teddies.description}</p></div><div class=container_grid_bloc_nameprice_price><p class=container_grid_bloc_nameprice_price_txt>${teddies.price}€</p></div><div class=container_grid_bloc_nameprice_info><p class=container_grid_bloc_nameprice_info_txt>Plus d'info</p></div></div></div>`
            affichageTeddies += creationdivTeddies;
        }
        affichageTeddies += "</div>";
        document.getElementById("container").innerHTML = affichageTeddies;
        let test = document.querySelectorAll(".container_grid_bloc");
        for(let truc of test){
            console.log(truc);
            truc.addEventListener('click', event => {
                truc.style.transform = "scale(1.1,1.1)"
              })
        }
    })
    .catch((error) => {
        console.log(error);
    });






