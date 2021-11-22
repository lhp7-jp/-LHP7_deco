let requestURL = 'assets/json/produits.json';

fetch(requestURL)
    .then(response => response.json())
    .then(data => {
        console.log(data.results[0].original_title);
        data.results.forEach(element => {
            console.log(element)
                        })
        });