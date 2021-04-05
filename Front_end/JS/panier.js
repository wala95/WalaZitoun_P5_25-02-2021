"use strict";

let panierString = localStorage.getItem('basket');
let panier = JSON.parse(panierString);

// si le panier est vide, afficher le message de la panier vide

if (panier === null || panier.length === 0) {
  
  let newTitle = document.createElement('h2');
  newTitle.classList.add("text-center", "mt-2");
  newTitle.textContent = 'Votre panier est vide';

  let message = document.getElementById('listProductAdded');
  message.appendChild(newTitle);

  let newButtonAccueil = document.createElement('a');
  newButtonAccueil.href = "index.html";
  newButtonAccueil.classList.add("btn", "btn-success", "btn-lg", "btn-block", "clearfix", "w-50", "text-center", "mt-5", "mb-5");
  newButtonAccueil.setAttribute('role', 'button');
  newButtonAccueil.textContent = "Revenir vers la page d'accueil";

  let buttonAccueil = document.getElementById("confirm")
  buttonAccueil.appendChild(newButtonAccueil);
}

/* ---- si le panier contient des produits, afficher les produits ajoutés -----*/
else {
  // créer le produit ajouté
  function creatProduct(index, id, urlImage, nom, color, price, quantity) {

    let newImage = document.createElement('img');
    newImage.src = urlImage;
    newImage.id = "photoProduit";
    let newDiv1 = document.createElement('div');
    newDiv1.classList.add("col-lg-3", "mx-auto");
    newDiv1.appendChild(newImage);

    let newName = document.createElement('h2');
    newName.textContent = nom;
    let newDiv2 = document.createElement('div');
    newDiv2.classList.add("col-lg-2", "text-center",  "mt-1");
    newDiv2.appendChild(newName);


    let newColor = document.createElement('p');
    newColor.textContent = color;
    let newDiv3 = document.createElement('div');
    newDiv3.classList.add("col-lg-1", "text-center",  "mt-2");
    newDiv3.appendChild(newColor);

    let newPrice = document.createElement('p');
    newPrice.textContent = `Prix : ${price / 100} €`;
    let newDiv4 = document.createElement('div');
    newDiv4.classList.add("col-lg-2", "text-center",  "mt-2");
    newDiv4.appendChild(newPrice);

    let newInput = document.createElement('input');
    newInput.value = quantity;
    newInput.setAttribute('type', 'number');
    newInput.setAttribute('min', 1);
    newInput.setAttribute('step', '1');
    newInput.setAttribute('onkeypress', 'return false'); // accepter que des nombres entiers
    newInput.classList.add("form-control", "mb-3", "text-center",  "mt-2");
    newInput.addEventListener("change", (e) => {
      newPrice.textContent = `Prix : ${(price / quantity / 100 * e.target.value)} €`; // recalculer le prix selon la quantité modifiée
      panier[index].quantity = e.target.value; //modifier l'ancienne quantité par la nouvelle 
      localStorage.setItem('basket', JSON.stringify(panier)); // mettre à jour le panier du localStorage
      document.location.reload(); // rafraichir la page
    });
    let newDiv5 = document.createElement('div');
    newDiv5.classList.add("col-lg-2", "text-center");
    newDiv5.appendChild(newInput);

    let newButton = document.createElement('button');
    newButton.textContent = "Supprimer";
    newButton.classList.add("btn", "btn-secondary", "w-100", "align-items-center", "mb-3", "mt-2");
    newButton.textContent = 'supprimer';
    newButton.addEventListener('click', () => removeItem(id, color));
    let newDiv6 = document.createElement('div');
    newDiv6.classList.add("col-lg-2", "text-center");
    newDiv6.appendChild(newButton);

    let newProduct = document.createElement('article');
    newProduct.classList.add("row", "border", "rounded");
    newProduct.appendChild(newDiv1);
    newProduct.appendChild(newDiv2);
    newProduct.appendChild(newDiv3);
    newProduct.appendChild(newDiv4);
    newProduct.appendChild(newDiv5);
    newProduct.appendChild(newDiv6);

    return newProduct;
  };


// Renseigner les informations pour chaque produit  
  for (let teddy of panier) {

    let totalPrice = teddy.price * teddy.quantity;
    let productActuel = creatProduct(panier.indexOf(teddy), teddy.id, teddy.image, teddy.name, teddy.color, totalPrice, teddy.quantity);

    let listProductAdded = document.getElementById("listProductAdded")
    listProductAdded.appendChild(productActuel);
  }

// Calculer le prix total
function totalPriceProducts(tab) {
  let sum = 0;
  for (let teddy of tab) {
    sum = sum + teddy.price * teddy.quantity;
  }
  return sum;
}
let sousTotal = document.getElementById("sousTotal")
sousTotal.textContent = `Sous total : ${totalPriceProducts(panier) / 100} €`;

let total = document.getElementById("total")
total.textContent = `Prix total TTC : ${totalPriceProducts(panier) / 100} €`;


// Supprimer un produit 
function removeItem(idProduct, colorProduct) {

  for (let item of panier) {
    if (idProduct == item.id && colorProduct == item.color) {
      const index = panier.indexOf(item);
      panier.splice(index, 1);
    }
  }
  localStorage.setItem('basket', JSON.stringify(panier));
  document.location.reload();

}

// Créer le boutton confirmer
  let newButtonConfirm = document.createElement('button');
  newButtonConfirm.classList.add("btn", "btn-success", "btn-lg", "w-50", "btn-block", "clearfix", "text-center", "mt-2", "mb-3");
  newButtonConfirm.setAttribute('type', 'button');
  newButtonConfirm.textContent = "Valider votre panier";

  let buttonConfirm = document.getElementById("confirm")
  buttonConfirm.appendChild(newButtonConfirm);

 // Envoyer le prix total dans le local storage pour le réutiliser plus tard
  let listIdProducts = [];
  for (let teddy of panier) {
  listIdProducts.push(teddy.id);
 }
  
  newButtonConfirm.addEventListener('click', () => {
    let preOrder = {
      total: totalPriceProducts(panier) / 100,
      id : listIdProducts
    }
    localStorage.setItem('preOrder', JSON.stringify(preOrder));
    console.log( localStorage.getItem('preOrder'));

    window.location.href = 'formulaire.html';
  });
}




