const setTimeToTimer = (time) => {
  let data = {};
  data.timer = time;
  data.now = new Date().getTime();
  data.setupTime = localStorage.getItem("setupTime");
  return data;
};

const checkTimer = () => {
  let data = setTimeToTimer(1);
  data.setupTime == null ? getTeddies() : data.now - data.setupTime > data.timer * 60 * 1000 ? getTeddies() : displayData();
};


// Verification du timer
const createTimer = () => {
    let data = setTimeToTimer(1);
    if (data.setupTime == null) {
      // Si pas de key "setuptime" le créer
      localStorage.setItem("setupTime", data.now);
      console.log("Pas de setupTime dans localstorage!");
    } else if (data.now - data.setupTime > data.timer * 60 * 1000) {
      localStorage.clear();
      localStorage.setItem("setupTime", data.now);
      console.log("Mise à jours");
    }
  };

  checkTimer();
