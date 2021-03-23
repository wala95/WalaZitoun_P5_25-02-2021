"use strict";

// si le panier est vide 

let panierString = localStorage.getItem('basket');
let panier = JSON.parse(panierString);



if (panier === null || panier.length === 0){
  console.log('je suis vide')

  let newTitle = document.createElement('h2');
  newTitle.classList.add( "text-center", "mt-3");
  newTitle.textContent = 'Votre panier est vide';

  let message = document.getElementById('listProdectAdded');
  message.appendChild(newTitle);


  let newButtonAccueil = document.createElement('a');
  newButtonAccueil.href = "index.html";
  newButtonAccueil.classList.add("btn", "btn-success", "btn-lg", "btn-block", "clearfix","w-50", "text-center","mt-5","mb-5");
  newButtonAccueil.setAttribute('role', 'button');
  newButtonAccueil.textContent = "Revenir vers la page d'accueil";



  let buttonAccueil =document.getElementById("confirm")
  buttonAccueil.appendChild(newButtonAccueil);


  }
else {


function removeItem (idProduct){

let productsAdded = localStorage.getItem('basket');

let productsArray = JSON.parse(productsAdded);

  for(let item of productsArray){
    if (idProduct == item.id) {
      const index =  productsArray.indexOf(item);
      productsArray.splice(index, 1);
    }
  }
  localStorage.setItem('basket', JSON.stringify(productsArray));
  document.location.reload();

}

function creatArticles(index, id, urlImage, nom, color, price, quantity) {
 

  let newImage = document.createElement('img');
  newImage.src = urlImage;
  newImage.id = "photoProduit";
  let newDiv1 = document.createElement('div');
  newDiv1.classList.add("col-lg-3", "mx-auto");
  newDiv1.appendChild(newImage);

  let newName = document.createElement('h2');
  newName.textContent = nom;
  let newDiv2 = document.createElement('div');
  newDiv2.classList.add("col-lg-2", "text-center");
  newDiv2.appendChild(newName);


  let newColor = document.createElement('p');
  newColor.textContent = color;
  let newDiv3 = document.createElement('div');
  newDiv3.classList.add("col-lg-1", "text-center");
  newDiv3.appendChild(newColor);

  let newPrice = document.createElement('p');
  newPrice.textContent =   `Prix : ${price / 100} €`;
  let newDiv4 = document.createElement('div');
  newDiv4.classList.add("col-lg-2", "text-center");
  newDiv4.appendChild(newPrice);

  let newInput = document.createElement('input');
  newInput.value = quantity;
  newInput.setAttribute('type','number');
  newInput.setAttribute('min', 1);
  newInput.setAttribute('step','1');
  newInput.setAttribute('onkeypress', 'return false');
  newInput.classList.add("form-control");
  newInput.addEventListener("change", (e)=> {
    newPrice.textContent =`Prix : ${(price/quantity/100 * e.target.value)} €`;
    panier[index].quantity = e.target.value;
    localStorage.setItem('basket', JSON.stringify(panier));
    document.location.reload();
  });
  let newDiv5 = document.createElement('div');
  newDiv5.classList.add("col-lg-2", "text-center");
  newDiv5.appendChild(newInput);


  let newButton = document.createElement('button');
  newButton.textContent = "Supprimer";
  newButton.classList.add("btn", "btn-secondary","w-100","align-items-center");
  newButton.textContent = 'supprimer';
  newButton.addEventListener('click', () => removeItem(id)); 
  let newDiv6 = document.createElement('div');
  newDiv6.classList.add("col-lg-2", "text-center");
  newDiv6.appendChild(newButton);


  let newArticle = document.createElement('article');
  newArticle.classList.add("row", "border", "rounded");


  newArticle.appendChild(newDiv1);
  newArticle.appendChild(newDiv2);
  newArticle.appendChild(newDiv3);
  newArticle.appendChild(newDiv4);
  newArticle.appendChild(newDiv5);
  newArticle.appendChild(newDiv6);

  return newArticle;
};



let listProdectAdded = document.getElementById("listProdectAdded")

// envoyer une requette GET à l'API(web service) sur l'URL teddiesUrl pour récupérer les données 
// Le retour de la méthode fetch une est Promise 
// L'objet Promise sert à réaliser des traitements de façon asynchrone. Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voire jamais.


// let panierString = localStorage.getItem('basket');


// let panier = JSON.parse(panierString);


  

for (let teddy of panier) {
  let totalPrice = teddy.price * teddy.quantity;
  let articleActuel = creatArticles(panier.indexOf(teddy), teddy.id, teddy.image, teddy.name, teddy.color, totalPrice, teddy.quantity);
  listProdectAdded.appendChild(articleActuel);
}


let newButtonConfirm = document.createElement('button');
newButtonConfirm.classList.add("btn", "btn-success", "btn-lg","w-50", "btn-block", "clearfix", "text-center","mt-5");
newButtonConfirm.setAttribute('type', 'button');
newButtonConfirm.textContent = "Valider votre panier";

let buttonConfirm  = document.getElementById("confirm")
buttonConfirm.appendChild(newButtonConfirm);


newButtonConfirm.addEventListener('click', ()=>{
  let totalPrice = {
    total :  totaltPriceProducts(panier)/100,
  }
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    console.log(totalPrice)
   window.location.href='formulaire.html';
  
});
}


// prix total


function totaltPriceProducts(tab){
    let sum = 0;
  for ( let teddy of tab){
    sum = sum +  teddy.price * teddy.quantity;
  }
    return sum;
}
  
let sousTotal = document.getElementById("sousTotal")
sousTotal.textContent = `Sous total : ${totaltPriceProducts(panier)/100} €`;


let total = document.getElementById("total")
total.textContent = `Prix total TTC : ${totaltPriceProducts(panier)/100} €`;



