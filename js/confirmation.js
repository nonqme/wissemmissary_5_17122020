const displayConfirmation = () => {
    let contact = JSON.parse(localStorage.getItem("contact"));
    let id = JSON.parse(localStorage.getItem("orderId"));
    let prix = JSON.parse(localStorage.getItem("price"));
    createConfirmation =`<h1 class="confirm__title">Merci d'avoir commandé sur Orinoco ${contact.firstName}!</h1>
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
document.querySelector(".confirm").innerHTML += createConfirmation;
localStorage.removeItem("contact");
localStorage.removeItem("orderId");
localStorage.removeItem("price");
}
displayConfirmation();