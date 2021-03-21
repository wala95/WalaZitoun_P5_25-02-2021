
"use strict";





const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('produit');




//  pointer sur l'objet DOM correspondant à la balise img dont l'id est 'first_teddy' 
const teddyUrl = `http://127.0.0.1:3000/api/teddies/${id}`;


const teddyImage = document.getElementById('teddyImage');
const teddyName = document.getElementById('teddyName');
const teddyPrice = document.getElementById('teddyPrice');
const teddyDescription = document.getElementById('teddyDescription');
const coleurs = document.getElementById('coleurs');
const quantite = document.getElementById('quantite')

// envoyer une requette GET à l'API(web service) sur l'URL teddiesUrl pour récupérer les données 
// Le retour de la méthode fetch une est Promise 
// L'objet Promise sert à réaliser des traitements de façon asynchrone. Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voire jamais.



function creatOptions(colors) {
  for (let i of colors) {
    let newOption = document.createElement('option');
    newOption.value = i;
    newOption.innerHTML = i;
    couleurs.appendChild(newOption);
  }
}

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

  // prendre l'imageUrl du premier element de l'array json et le seter dans src de l'img ...

  .then(data => {

    

    teddyImage.src = data.imageUrl;
    teddyName.textContent = data.name;
    teddyPrice.textContent = `Prix :   ${data.price / 100} €`;
    teddyDescription.textContent = data.description;
    creatOptions(data.colors);


    const buttonAdd = document.getElementById('buttonAdd');
    buttonAdd.addEventListener('click', () => add(data.imageUrl, data.name, couleurs.value, quantite.value, data.price));
    
    

  })
  .catch(erreurCatche => console.log(`il y a une erreur ${erreurCatche.message}`));
  


/* ------------------ */
// rajouter un produit dans le panier via le localstorage
function add(imageProduct, nameProduct, colorProduct, quantityProduct, priceProduct) {

  // checker si il ya deja une variable panier, si oui on lui rajoute un produit si non on crée une n ouvelle variable et on lui rajoute ce produit la
  let panierString = localStorage.getItem('basket');
  let product = {
    'image': imageProduct,
    'name': nameProduct,
    'color': colorProduct,
    'quantity': quantityProduct,
    'price': priceProduct
  };

  if (panierString === null) {   // panier non crée encore

    // créer le panier sous fome d'un tableau d'objet JSON
    let panier = [product];
    // seter le produit dans local storage 
    localStorage.setItem('basket', JSON.stringify(panier));
  }
  else {
    // rendre le panierString un tableau
    let panier = JSON.parse(panierString);
    // rajouter le produit au tableau 
    console.log(panier);
    panier.push(product);

    //  rafraichir le panier
    localStorage.setItem('basket', JSON.stringify(panier));
  }
}

