const setTimeToTimer = (time) => {
  // Stockage des variables utilisées plusieurs fois
  let data = {};
  data.timer = time;
  data.now = new Date().getTime();
  data.setupTime = localStorage.getItem("setupTime");
  return data;
};

const checkTimer = () => {
  // Vérifie le timer pour savoir si il doit fetch ou récuperer les données dans le localStorage
  let data = setTimeToTimer(1);
  data.setupTime == null ? getTeddies() : data.now - data.setupTime > data.timer * 60 * 1000 ? getTeddies() : displayData();
};

// Création du Timer
const createTimer = () => {
  let data = setTimeToTimer(1);
  if (data.setupTime == null) {
    // Si pas de key "setuptime" la créer
    localStorage.setItem("setupTime", data.now);
    console.log("setupTime Créer");
  } else if (data.now - data.setupTime > data.timer * 60 * 1000) {
    // Si le timer est passé vider le localStorage et créer le timer
    localStorage.clear();
    localStorage.setItem("setupTime", data.now);
    console.log("Supression des données et création du setupTime");
  }
};

checkTimer();
