//Appelle de l'API pour récupérer les données de chaques articles disponibles
const getTeddies = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/teddies");
    console.log("Appelle de l'API");
    if (response.ok) {
      // Si la réponse est ok executer les fonctions nécessaire
      const teddiesFetch = await response.json();
      createTimer(teddiesFetch);
      storeAPI(teddiesFetch);
      idStorage(teddiesFetch);
      displayData(teddiesFetch);
      console.log("API chargée");
    } else {
      // Sinon renvoyé une erreur
      console.error("Retour du serveur : ", response.status);
      console.log("API non chargée");
    }
  } catch (error) {
    console.log(error);
  }
};
// Recuperer les données et les transferer dans le local storage

const storeAPI = (teddiesData) => {
  localStorage.setItem("teddies", JSON.stringify(teddiesData));
  console.log("API chargée dans le localstorage");
};

// Création localstorage pour chaque ours
const idStorage = () => {
  const getLocalStorage = JSON.parse(localStorage.getItem("teddies"));
  getLocalStorage.map((teddy) =>
    localStorage.setItem(teddy._id, JSON.stringify(teddy))
  );
  console.log("Id de chaque ours chargée dans le localstorage");
};
