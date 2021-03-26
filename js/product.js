let params = new URLSearchParams(document.location.search);
let id = params.get("id");
let lsid = localStorage.getItem(id);
expireTime()

// Affichage des données de l'ourson
function displayData(){
    let idTeddy = JSON.parse(localStorage.getItem(id))
    console.log(idTeddy)
    let displayTeddies = "<article class=main_article>";  
    let creationdivTeddies=`<img class="main_article_img" src=${idTeddy.imageUrl}></img>
                            <h1 class="main_article_title">${idTeddy.name}</h1>
                            <p class="main_article_desc">${idTeddy.description}</p>
                            <ul class="main_article_colorlist"></ul>
                            `;
                            
        displayTeddies += creationdivTeddies;
    
    displayTeddies += "</article>";
    console.log("HTML DONE")

    // add to container
    document.querySelector(".main").innerHTML = displayTeddies;
    console.log("Add to container DONE")
}

//Appel de l'API pour récupérer les données de chaques articles disponibles 
async function getTeddies() {
    try {
        let response = await fetch("http://localhost:3000/api/teddies");
        if (response.ok) {
            let teddies = await response.json();
            storeAPI(teddies)
            idStorage(teddies)
            displayData(teddies)
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (error) {
        console.log(error);
    }
}

// Recuperer les données et les transferer dans le local storage
function storeAPI(teddies){
    localStorage.setItem("teddies", JSON.stringify(teddies));                          
    console.log(JSON.parse(localStorage.getItem("teddies")));
    console.log("Api to localstorage DONE") 
};
// Création localstorage pour chaque ours
function idStorage(){
    let getLocalStorage = JSON.parse(localStorage.getItem("teddies"));
    getLocalStorage.forEach(teddies => {
        localStorage.setItem(teddies._id, JSON.stringify(teddies));
})
}


// Ajout d'un timer aux données du localstorage et apelle de l'api si les données sont expiré
function expireTime(){
    let minutes = 1; 
    let now = new Date().getTime();
    let setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
        console.log("Notimer in localstorage!")
        getTeddies()
    } else {
        if(now-setupTime > minutes*60*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
            getTeddies()
            console.log("Time to refresh!")
            } else {
                displayData()
                console.log("No need to refresh !")
            }
        }
    }

