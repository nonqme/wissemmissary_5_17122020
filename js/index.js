const teddiesPromise = fetch("http://localhost:3000/api/teddies");
teddiesPromise
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let affichageTeddies = "<div class=container_grid>";
        for(let teddies of data){
            let creationdivTeddies = `<div class=container_grid_bloc><div class=container_grid_bloc_imgdiv><img class=container_grid_bloc_imgdiv_img src=${teddies.imageUrl}></img></div><div class=container_grid_bloc_name><h1 class=container_grid_bloc_name_title>${teddies.name}</h1></div><div class=container_grid_bloc_desc><p class=container_grid_bloc_desc_txt>${teddies.description}</p></div><div class=container_grid_bloc_price><p class=container_grid_bloc_price_txt>${teddies.price}€</p></div></div>`
            affichageTeddies += creationdivTeddies;
        }
        affichageTeddies += "</div>";
        document.getElementById("container").innerHTML = affichageTeddies;
    })
    .catch((error) => {
        console.log(error);
    });
