const category = document.getElementById("category");
const listProducts = document.getElementById("listProducts");
const contentModal = document.getElementById("contentModal");
let fisrtConnect = true
let arrayPanier = [];

category.addEventListener("click", e => {

    e.preventDefault()

    if (e.target.nodeName == "A") {

        document.querySelectorAll("[data-category]").forEach(element => {
            if(element.dataset.category == e.target.dataset.category){
                element.classList.add("activeListNav")
            }else{
                element.classList.remove("activeListNav")
            }
        })

        arianeCurrent.textContent = e.target.dataset.category
        titleCurrentPage.textContent = e.target.dataset.category

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
                                            <a id="price1" href="#" class="btn btn-outline-success m-2" >${element.price}€</a>
                                            <button type="button" class="btn btn-primary" data-addtocaddie id="${element.id}">Ajout au panier</button>

                                        </div>
                `
                    }
                })

                document.querySelectorAll("[data-addtocaddie]").forEach(element => {

                    element.addEventListener("click", e => {

                        if (!arrayPanier.includes(e.target.id)) {

                            arrayPanier.push(e.target.id)

                            fetch("assets/json/produits.json")
                                .then(response => response.json())
                                .then(data => {
                                    data.products.forEach(element => {

                                        if (element.id == e.target.id) {

                                            let tr = document.createElement('tr')
                                            tr.innerHTML = `
                                                        <th scope="row">${element.id}</th>
                                                        <td>${element.name}</td>
                                                        <td><input id="qte-${element.id}" type="number" placeholder="" min="0" max="20" data-priceunit="${element.price}" data-qte="1" value="1" style="width: 42px;"></td>
                                                        <td id="price-${element.id}">${element.price} €</td>
                                                        <td><a href=""><i class="text-primary fas fa-times"></i></a></td>
                                                    `
                                            contentModal.appendChild(tr)

                                        }
                                    })
                                })

                        } else {



                        }

                    })
                })


            })
    }
})