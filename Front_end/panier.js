"use strict";


function creatSection(urlImage, nom, color, quantity, price) {

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

  let newInput = document.createElement('input');
  newInput.value = quantity;
  newInput.setAttribute('min', 0);
  let newDiv4 = document.createElement('div');
  newDiv4.classList.add("col-lg-2", "text-center");
  newDiv4.appendChild(newInput);



  let newPrice = document.createElement('p');
  newPrice.textContent =   `Prix : ${price / 100} €`;
  let newDiv5 = document.createElement('div');
  newDiv5.classList.add("col-lg-2", "text-center");
  newDiv5.appendChild(newPrice);


  let newButton = document.createElement('button');
  newButton.setAttribute('type', "number");
  newButton.textContent = "Supprimer";
  newButton.classList.add("btn", "btn-secondary");
  newButton.textContent = 'supprimer';
  newButton.addEventListener('click', () => remove());
  let newDiv6 = document.createElement('div');
  newDiv6.classList.add("col-lg-2", "text-center");
  newDiv6.appendChild(newButton);


  let newSection = document.createElement('section');
  newSection.classList.add("row", "border", "rounded");


  newSection.appendChild(newDiv1);
  newSection.appendChild(newDiv2);
  newSection.appendChild(newDiv3);
  newSection.appendChild(newDiv4);
  newSection.appendChild(newDiv5);
  newSection.appendChild(newDiv6);

  return newSection;
}


let listProdectAdded = document.getElementById("listProdectAdded")

// envoyer une requette GET à l'API(web service) sur l'URL teddiesUrl pour récupérer les données 
// Le retour de la méthode fetch une est Promise 
// L'objet Promise sert à réaliser des traitements de façon asynchrone. Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voire jamais.


let panierString = localStorage.getItem('basket');

let panier = JSON.parse(panierString);


for (let teddy of panier) {
  let totalPrice = teddy.price * teddy.quantity;
  let articleActuel = creatSection(teddy.image, teddy.name, teddy.color, teddy.quantity, totalPrice);
  listProdectAdded.appendChild(articleActuel);
}


function remove() {
  let elem = document.getElementById('dummy');
  elem.parentNode.removeChild(elem);
  return false;
}
function pageInit() {
  // Hook up the "remove dummy" button
  let btn = document.getElementById('btnRemoveDummy');
  if (btn.addEventListener) {
      // DOM2 standard
      btn.addEventListener('click', removeDummy, false);
  }
  else if (btn.attachEvent) {
      // IE (IE9 finally supports the above, though)
      btn.attachEvent('onclick', removeDummy);
  }
  else {
      // Really old or non-standard browser, try DOM0
      btn.onclick = removeDummy;
  }
}
