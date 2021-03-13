 "use strict";
 //  pointer sur l'objet DOM correspondant à la balise img dont l'id est 'first_teddy' 
const teddiesUrl = 'http://127.0.0.1:3000/api/teddies';

// const teddyImage = document.getElementById('teddyImage');
// const teddyName = document.getElementById('teddyName');
// const teddyPrice = document.getElementById('teddyPrice');
// const teddyColors = document.getElementById('teddyColors');

function creatArticle(urlImage, nom, price, listColor, link){

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

  let newLink = document.createElement('a');
  newLink.href = link;
  newLink.classList.add("btn", "btn-secondary");
  newLink.setAttribute('role', 'button')
  newLink.textContent = 'Ajouter au panier'

  let newCardBodyDiv = document.createElement('div');
  newCardBodyDiv.classList.add("card-body");

  newCardBodyDiv.appendChild(newName);
  newCardBodyDiv.appendChild(newPrice);
  newCardBodyDiv.appendChild(newListColors);
  newCardBodyDiv.appendChild(newLink);

  let newCardDiv = document.createElement('div');
  newCardDiv.classList.add("card", "text-center");


  newCardDiv.appendChild(newImage);
  newCardDiv.appendChild(newCardBodyDiv);

  
  let newArticle= document.createElement('article');
  newArticle.classList.add("col-12", "col-lg-4");

  
  newArticle.appendChild(newCardDiv);
  
  return newArticle;
}

//// block 1 article

let section = document.getElementById("sectionForArtticles")


  
// envoyer une requette GET à l'API(web service) sur l'URL teddiesUrl pour récupérer les données 
// Le retour de la méthode fetch une est Promise 
// L'objet Promise sert à réaliser des traitements de façon asynchrone. Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voire jamais.

fetch(teddiesUrl) 
  .then( response  => {
    if(response.ok == true) {
      return response;
    }
    else {
      throw new Error("la reponse du serveur n'est pas 200");
    }
  })
//  consommer la promesse et retourner uniquement son body sous format json
  .then(response => response.json())


// prendre l'imageUrl du premier element de l'array json et le seter dans src de l'img 

  // .then (data => {
  //   teddyImage.src = data[0].imageUrl;
  //   teddyName.textContent = data[0].name;
  //   teddyPrice.textContent = `${data[0].price/100} €` ;
  //   teddyColors.textContent = `${data[0].colors.length} Couleurs disponibles`;
  // })

  .then (teddiesList => {
        for (let teddy of teddiesList){ 
          let articleActuel = creatArticle(teddy.imageUrl, teddy.name, `${teddy.price/100} €`, `${teddy.colors.length} Couleurs disponibles`, `${teddiesUrl}/${teddy._id}`);
          section.appendChild(articleActuel) ;
  }})

  .catch(erreurCatche => console.log(`il y a une erreur ${erreurCatche.message}`));
 


 


