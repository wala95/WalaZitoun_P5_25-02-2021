
"use strict";

const teddyImage = document.getElementById('teddyImage');
const teddyName = document.getElementById('teddyName');
const teddyPrice = document.getElementById('teddyPrice');
const teddyDescription = document.getElementById('teddyDescription');
const couleurs = document.getElementById('colors');
const quantite = document.getElementById('quantite')
const buttonAdd = document.getElementById('buttonAdd');


// créer la liste des couleurs
function creatOptions(colors) {
  for (let i of colors) {
    let newOption = document.createElement('option');
    newOption.value = i;
    newOption.innerHTML = i;
    couleurs.appendChild(newOption);
  }
}

///Récuperer l'url avec l'id qui correspond au teddy selectionné
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('produit');
const teddyUrl = `http://127.0.0.1:3000/api/teddies/${id}`;

// envoyer une requette GET à l'API(web service) pour récupérer les données 
fetch(teddyUrl)
  .then(response => {
    if (response.ok == true) {
      return response;
    }
    else {
      throw new Error("la reponse du serveur n'est pas 200");
    }
  })
  //  consommer la promesse et retourner uniquement son body sous format json
  .then(response => response.json())

  // consommer la promesse précédente pour: 
    // récuperer les informations du teddy selectionné
  .then(data => {
    teddyImage.src = data.imageUrl;
    teddyName.textContent = data.name;
    teddyPrice.textContent = `Prix :   ${data.price / 100} €`;
    teddyDescription.textContent = data.description;
    creatOptions(data.colors);

      // rajouter un listenner qui detecte quand on clique sur le boutton add et remplir les paramètres la fonction add pour qu'elle soit prête au moment du click
    buttonAdd.addEventListener('click', () => addItemToBasket(data._id, data.imageUrl, data.name, couleurs.value, quantite.value, data.price));
  })
  .catch(erreurCatche => console.log(`il y a une erreur ${erreurCatche.message}`));
  


/* ---------- Rajouter un produit dans le localestorage -------- */

// vérifier si le produit existe
function getExistingProduct (idProduct, colorProduct, panier){
  for(let i=0; i < panier.length; i++){
    let item = panier[i];
    if ((idProduct === item.id) && (colorProduct === item.color)) { 
      return i
    }
  }
  return null
};

// rajouter un produit dans le panier via le localstorage
function addItemToBasket(idProduct, imageProduct, nameProduct, colorProduct, quantityProduct, priceProduct) {

/* ----- checker si il ya deja une variable panier, si oui on lui rajoute un produit si non on crée une nouvelle variable panier et on lui rajoute ce produit ---*/

let panierString = localStorage.getItem('basket');

let product = {
  'id': idProduct,
  'image': imageProduct,
  'name': nameProduct,
  'color': colorProduct,
  'quantity': quantityProduct,
  'price': priceProduct
};

if (panierString === null) {   // panier n'est pas crée encore

    // créer le panier sous fome d'un tableau d'objet JSON
    
    let panier = [product];

    // seter le panier dans localStorage 
    localStorage.setItem('basket', JSON.stringify(panier));

  } else { // panier déja crée
    
    let panier = JSON.parse(panierString);

  /* ----- checker si le produit exsiste deja dans le panier, si oui on mis à jour la quantité si non on lui rajoute dans le panier---*/
    let index = getExistingProduct(idProduct, colorProduct, panier);

    if (index != null) {  // élement déja ajouté dans le panier

      panier[index].quantity = parseInt(quantityProduct) + parseInt(panier[index].quantity);

      localStorage.setItem('basket', JSON.stringify(panier));
    }
    else { // élement n'est pas encore ajouté dans le panier
   
    // rajouter le produit au panier(panier sous forme d'un tableau) 
    panier.push(product);

    //  rafraichir le panier
    localStorage.setItem('basket', JSON.stringify(panier));
    }
  }
}

