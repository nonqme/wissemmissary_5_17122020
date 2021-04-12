//Affichage de la confirmation de commande
const displayConfirmation = () => {
  let contact = JSON.parse(localStorage.getItem("contact"));
  let id = JSON.parse(localStorage.getItem("orderId"));
  let prix = JSON.parse(localStorage.getItem("price"));
  //créer l'html des informations
  createConfirmation = `<h1 class="confirm__title">Merci d'avoir commandé sur Orinoco ${contact.firstName}!</h1> 
                        <h2>Numéro de commande: ${id}</h2>
                        <h3>Récapitulatif de commande</h3>
                        <ul>
                            <li>Nom: ${contact.lastName}</li>
                            <li>Prénom: ${contact.firstName}</li>
                            <li>Adresse: ${contact.address}</li>
                            <li>Ville: ${contact.city}</li>
                            <li>Email: ${contact.email}</li>
                            <li>Prix: ${prix}</li>
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
