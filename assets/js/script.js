const category = document.getElementById("category");
const listProducts = document.getElementById("listProducts");
const contentModal = document.getElementById("contentModal");
var testId = "";
var cptProduct = 1;
let arrayPanier = [];

category.addEventListener("click", e => {
e.preventDefault()
if (e.target.nodeName == "A") {
    fetch("assets/json/produits.json")
        .then(response => response.json())
        .then(data => {
            listProducts.innerHTML = ""
                    data.products.forEach(element => {
                        if (e.target.dataset.category == element.category) {
                        listProducts.innerHTML += `
                    <div class="col-lg-4 text-center card-body">

                        <img id="picture1" src="assets/img/${element.img}" data-show class="rounded mx-auto d-block img-fluid img-thumbnail" alt="cards-images">
                        <h5 id="title1" class="card-title" >${element.name}</h5>
                        <p id="description1" class="card-text" >${element.description}</p>
                        <a id="price1" href="#" class="btn btn-secondary m-2" >${element.price}€</a>
                        <button type="button" class="btn btn-primary addPanier" id="${element.id}">Ajout au panier</button>

                    </div>
                        `
                    }
                })
                // ici commence l'écoute sur les boutons ajout au panier
                let btnAddPanier = Array.from(document.getElementsByClassName("addPanier"));
                btnAddPanier.forEach(element => {
                    element.addEventListener("click", e => {
                        if (!arrayPanier.includes(e.target.id)) {
                        arrayPanier.push(e.target.id);
                        // console.log(arrayPanier);
                        fetch("assets/json/produits.json")
                        .then(response => response.json())
                        .then(data => {
                         data.products.forEach(element => {
                            
                             if (element.id == e.target.id){
                                contentModal.innerHTML += ` ${element.name}`
                                testId = e.target.id;
                                var cptProduct = 1;
                            }
                         });  
                        })  
                        }
                        else {
                            console.log(testId)
                            if (testId == e.target.id) {
                            cptProduct++;
                            console.log(cptProduct);
                            }
                            else {
                                 console.log(cptProduct);
                            }
                            
                        }
                        
                    })
                })
              
                
            })
        }
    })


