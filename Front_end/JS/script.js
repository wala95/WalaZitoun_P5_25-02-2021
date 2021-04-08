"use strict";
let section = document.getElementById("sectionForArtticles");

// Fonction pour créer l'article
function creatArticle(urlImage, nom, price, listColor, button, link) {

  let newImage = document.createElement('img');
  newImage.src = urlImage;
  newImage.classList.add("card-img-top");


  let newName = document.createElement('h2');
  newName.textContent = nom;
  newName.classList.add("card-title")

  let newPrice = document.createElement('p');
  newPrice.textContent = price;
  newPrice.classList.add("card-text");

  let newListColors = document.createElement('p');
  newListColors.textContent = listColor;
  newListColors.classList.add("card-text");

  let newButton = document.createElement('a');
  newButton.href = button;
  newButton.classList.add("btn", "w-75", "btn-success");
  newButton.setAttribute('role', 'button');
  newButton.textContent = 'Afficher plus';

  let newCardBodyDiv = document.createElement('div');
  newCardBodyDiv.classList.add("card-body");


  newCardBodyDiv.appendChild(newName);
  newCardBodyDiv.appendChild(newPrice);
  newCardBodyDiv.appendChild(newListColors);
  newCardBodyDiv.appendChild(newButton);

  let newCardDiv = document.createElement('div');
  newCardDiv.classList.add("card", "text-center");


  newCardDiv.appendChild(newImage);
  newCardDiv.appendChild(newCardBodyDiv);

  let newLink = document.createElement('a');
  newLink.href = link;
  newLink.classList.add("link");

  newLink.appendChild(newCardDiv);

  let newArticle = document.createElement('article');
  newArticle.classList.add("col-12", "col-lg-4");

  newArticle.appendChild(newLink);

  return newArticle;
}


// envoyer une requette GET à l'API(web service) sur l'URL teddiesUrl pour récupérer les données 
// Le retour de la méthode fetch une est Promise 
// L'objet Promise sert à réaliser des traitements de façon asynchrone. Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voire jamais.

const teddiesUrl = 'http://127.0.0.1:3000/api/teddies';

fetch(teddiesUrl)
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


  // consommer la promesse précédente et parcourir chaque élément du tableau pour remplir les paramètres de la fonction creatArticle( exple:prendre l'imageUrl du premier element de l'array json et le seter dans src de l'img et ainsi de suite)

  .then(teddiesList => {
    for (let teddy of teddiesList) {
      let articleActuel = creatArticle(teddy.imageUrl, teddy.name, `Prix : ${teddy.price / 100} €`, `${teddy.colors.length} Couleurs disponibles`, `fiche_produit.html?produit=${teddy._id}`, `fiche_produit.html?produit=${teddy._id}`);
      section.appendChild(articleActuel);
    }
  })

  // capter l'erreur et afficher un msg
  .catch(erreurCatche => console.log(`il y a une erreur ${erreurCatche.message}`));

