//Affichage de la confirmation de commande
const displayConfirmation = () => {
  let contact = JSON.parse(localStorage.getItem("contact"));
  let id = JSON.parse(localStorage.getItem("orderId"));
  let prix = JSON.parse(localStorage.getItem("price"));
  //créer l'html des informations
  createConfirmation = `<h1 class="confirm__title">Merci d'avoir commandé sur Orinoco ${contact.firstName}!</h1> 
                        <div class="confirm__commandnumber"><p class="confirm__commandnumber__title">Numéro de commande:</p><p class="confirm__commandnumber__txt">${id}</p></div>
                        <p class="confirm__recap">Récapitulatif de commande</p>
                        <ul>
                            <li class="confirm__li"><p class="confirm__li__title">Nom:</p><p class="confirm__li__txt">${contact.lastName}</p></li>
                            <li class="confirm__li"><p class="confirm__li__title">Prénom:</p><p class="confirm__li__txt">${contact.firstName}</p></li>
                            <li class="confirm__li"><p class="confirm__li__title">Adresse:</p><p class="confirm__li__txt">${contact.address}</p></li>
                            <li class="confirm__li"><p class="confirm__li__title">Ville:</p><p class="confirm__li__txt">${contact.city}</p></li>
                            <li class="confirm__li"><p class="confirm__li__title">Email:</p><p class="confirm__li__txt">${contact.email}</p></li>
                            <li class="confirm__li"><p class="confirm__li__title">Prix:</p><p class="confirm__li__txt">${prix}</p></li>
                        </ul>
                        `;
  document.querySelector(".confirm").innerHTML += createConfirmation; // ajouté l'html dans la page
  localStorage.removeItem("contact");
  localStorage.removeItem("orderId");
  localStorage.removeItem("price");
};

//Système de rediréction en cas de problèmes ou actualisation de la page
const redirect = () => {
  let contact = JSON.parse(localStorage.getItem("contact"));
  let id = JSON.parse(localStorage.getItem("orderId"));
  let prix = JSON.parse(localStorage.getItem("price"));
  if (contact === null && id === null && prix === null) {
    window.location.replace("index.html");
  } else if (contact === null) {
    window.alert("Désolé une erreur est survenue");
    window.location.replace("index.html");
  } else if (id === null) {
    window.alert("Désolé une erreur est survenue");
    window.location.replace("index.html");
  } else if (prix === null) {
    window.alert("Désolé une erreur est survenue");
    window.location.replace("index.html");
  } else {
    displayConfirmation();
  }
};

redirect();
