let arrayPanier = []

// Generation des Cards selon la catégorie selectionnée
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
                                            <a id="price1" href="#" class="btn btn-outline-dark m-2 text-dark" >${element.price}€</a>
                                            <button type="button" class="btn btn-dark" data-addToCaddie data-ref="${element.id}" data-name="${element.name}" data-price="${element.price}" id="${element.id}">Ajout au panier</button>
                                        </div>
                    `}
                })
            })

        document.querySelectorAll("[data-category]").forEach(element => {
            element.dataset.category == e.target.dataset.category ? element.classList.add("activeListNav") : element.classList.remove("activeListNav")
        })
        arianeCurrent.textContent = e.target.dataset.ariane
        titleCurrentPage.textContent = e.target.dataset.title
    }
})

// Ajout d'un produit dans le panier
listProducts.addEventListener("click", e => {

    if (e.target.hasAttribute("data-addToCaddie")) {

        if (!arrayPanier.includes(e.target.dataset.ref)) {

            arrayPanier.push(e.target.dataset.ref)
            let tr = document.createElement('tr')
            tr.setAttribute("id", `line-${e.target.dataset.ref}`)
            tr.innerHTML = `
                                <th scope="row">${e.target.dataset.ref}</th>
                                <td>${e.target.dataset.name}</td>
                                <td>${e.target.dataset.price} €</td>
                                <td><input id="qte-${e.target.dataset.ref}" type="number" placeholder="" min="0" max="20" data-priceunit="${e.target.dataset.price}" data-qte="1" value="1" style="width: 42px;"></td>
                                <td id="price-${e.target.dataset.ref}" data-priceqte="${e.target.dataset.price}" data-total>${e.target.dataset.price} €</td>
                                <td><i class="text-primary fas fa-times" data-idtr="line-${e.target.dataset.ref}""></i></td>
                            `
            contentModal.appendChild(tr)
            displayMessage('Votre article a été ajouté au panier')
            totalCaddie()

        }else {
            let qty = document.getElementById(`qte-${e.target.id}`).dataset.qte++ + 1
            let priceCurrent = document.getElementById(`qte-${e.target.id}`).dataset.priceunit

            document.getElementById(`qte-${e.target.id}`).value = qty
            document.getElementById(`price-${e.target.id}`).textContent = Number(priceCurrent * qty).toFixed(2) + " €"
            document.getElementById(`price-${e.target.id}`).dataset.priceqte = Number(priceCurrent * qty).toFixed(2)
            displayMessage('La quantité de votre article a été modifiée')
            totalCaddie()
        }
    }
})

// Incrémentation d'un produit depuis l'INPUT type number
tablePrice.addEventListener("change", e => {
    if (e.target.tagName == "INPUT") {
        document.getElementById(`price-${e.target.id.split("-").pop()}`).textContent = Number(e.target.dataset.priceunit * e.target.value).toFixed(2) + " €"
        document.getElementById(`price-${e.target.id.split("-").pop()}`).dataset.priceqte = Number(e.target.dataset.priceunit * e.target.value).toFixed(2)
        totalCaddie()
    }
})

// Suppression d'un produit dans le panier
tablePrice.addEventListener("click", e => {
    if (e.target.nodeName == "I") {
        arrayPanier.splice(arrayPanier.indexOf(e.target.dataset.idtr.split("-").pop()), 1)
        contentModal.removeChild(document.getElementById(e.target.dataset.idtr))
        displayMessage("L'article a été supprimé de votre panier")
        totalCaddie()
    }
})

// Fonction calculant le total du panier
function totalCaddie() {
    let totalCaddie = 0
    document.querySelectorAll("[data-total]").forEach(elt => {
        totalCaddie += Number(elt.dataset.priceqte)
    })
    total.textContent = Number(totalCaddie).toFixed(2)
}

// Fonction permettant d'afficher un message de confirmation à l'utilisateur
function displayMessage(message) {
    window.innerWidth < 450 ? infoCaddie.style.width = '70vw' : infoCaddie.style.width = '30vw'
    infoCaddie.style.top = `${Math.round((window.innerHeight / 2) + (window.scrollY))}px`
    infoCaddie.textContent = message
    infoCaddie.classList.replace("d-none", "d-block")
    setTimeout(function () {infoCaddie.classList.replace("d-block", "d-none")}, 1500)
}