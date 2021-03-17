const teddiesPromise = fetch("http://localhost:3000/api/teddies");
teddiesPromise
    .then(data => data.json())
    .then(data => {
        data.forEach((teddies) => {
            console.log(teddies);
        });
    })
    .catch((error) => {
        console.log(error);
    });
