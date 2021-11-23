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

            Array.from(document.getElementsByClassName("addPanier")).forEach(element => {

                element.addEventListener("click", e => {

                    if (!arrayPanier.includes(e.target.id)) {

                        arrayPanier.push(e.target.id)

                        fetch("assets/json/produits.json")
                            .then(response => response.json())
                            .then(data => {
                            data.products.forEach(element => {
                            
                                if (element.id == e.target.id){
                                    contentModal.innerHTML += `
                                                            <tr>
                                                                <th scope="row">${element.id}</th>
                                                                <td>${element.name}</td>
                                                                <td><input id="qte-${element.id}" type="number" placeholder="" min="0" max="20" value="1"></td>
                                                                <td>${element.price}</td>
                                                                <td><a href=""><i class="fas fa-times text-dark"></i></a></td>
                                                            </tr>
                                                            `
                                }
                            })
                        })  
                    }
                    else {
                            addQte(`qte-${e.target.id}`)
                        
                    }
                    
                })
            })
                
                
            })
        }
    })

function addQte(id){

    let ouioui = document.getElementById(id).value++
    console.log(ouioui)

}


