const category = document.getElementById("category")
const listProducts = document.getElementById("listProducts")
const contentModal = document.getElementById("contentModal")
const tablePrice = document.getElementById("tablePrice")
let arrayPanier = []

category.addEventListener("click", e => {

    e.preventDefault()

    if (e.target.nodeName == "A") {

        document.querySelectorAll("[data-category]").forEach(element => {
            if (element.dataset.category == e.target.dataset.category) {
                element.classList.add("activeListNav")
            } else {
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
                                            tr.setAttribute("id", `line-${element.id}`)
                                            tr.innerHTML = `
                                                        <th scope="row">${element.id}</th>
                                                        <td>${element.name}</td>
                                                        <td>${element.price} €</td>
                                                        <td><input id="qte-${element.id}" type="number" placeholder="" min="0" max="20" data-priceunit="${element.price}" data-qte="1" value="1" style="width: 42px;"></td>
                                                        <td id="price-${element.id}" data-priceqte="${element.price}" data-total>${element.price} €</td>
                                                        <td><i class="text-primary fas fa-times" data-idtr="line-${element.id}""></i></td>
                                                    `
                                            contentModal.appendChild(tr)

                                            totalCaddie()
                                        }
                                    })
                                })
                        } else {
                            let qty = document.getElementById(`qte-${e.target.id}`).dataset.qte++ + 1
                            let priceCurrent = document.getElementById(`qte-${e.target.id}`).dataset.priceunit
                            document.getElementById(`qte-${e.target.id}`).value = qty
                            document.getElementById(`price-${e.target.id}`).textContent = Number(priceCurrent * qty).toFixed(2) + " €"
                            document.getElementById(`price-${e.target.id}`).dataset.priceqte = Number(priceCurrent * qty).toFixed(2)
                            totalCaddie()
                        }
                    })
                })
            })
    }
})

tablePrice.addEventListener("change", e => {
    if (e.target.tagName == "INPUT") {
        e.target.dataset.qte = e.target.value
        document.getElementById(`price-${e.target.id.split("-").pop()}`).textContent = Number(e.target.dataset.priceunit * e.target.value).toFixed(2) + " €"
        document.getElementById(`price-${e.target.id.split("-").pop()}`).dataset.priceqte = Number(e.target.dataset.priceunit * e.target.value).toFixed(2)
        totalCaddie()
    }
})

tablePrice.addEventListener("click", e => {
    if(e.target.nodeName == "I"){
        let childRemove = document.getElementById(e.target.dataset.idtr)
        contentModal.removeChild(childRemove)
        totalCaddie()
    }
})

function totalCaddie() {
    let totalCaddie = 0
    document.querySelectorAll("[data-total]").forEach(elt => {
        totalCaddie += Number(elt.dataset.priceqte)
    })
    total.textContent = totalCaddie
}