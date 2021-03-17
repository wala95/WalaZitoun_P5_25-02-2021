"use strict";
const teddiesUrl = 'http://127.0.0.1:3000/api/teddies';

function creatSection(urlImage, nom, Color, quantity, price, ){

    let newImage = document.createElement('img');
    newImage.src = urlImage;
    newImage.id = "photoProduit";
    let newDiv1 = document.createElement('div');
    newDiv1.classList.add("col-3", "mx-auto");
    newDiv1.appendChild(newImage);
    
    let newName = document.createElement('h2');
    newName.textContent = nom;
    let newDiv2 = document.createElement('div');
    newDiv2.classList.add("col-2", "text-center");
    newDiv2.appendChild(newName);

  
    let newColor = document.createElement('p');
    newColor.textContent = Color;
    let newDiv3 = document.createElement('div');
    newDiv3.classList.add("col-2", "text-center");
    newDiv3.appendChild(newColor);

    let newInput = document.createElement('input');
    newInput.value = quantity;
    newInput.setAttribute('min',0);
    let newDiv4 = document.createElement('div');
    newDiv4.classList.add("col-1", "text-center");
    newDiv4.appendChild(newInput);



    let newPrice = document.createElement('p');
    newPrice.textContent = price;
    let newDiv5 = document.createElement('div');
    newDiv5.classList.add("col-2", "text-center");
    newDiv5.appendChild(newPrice);
  
    
    let newButton = document.createElement('button');
    newButton.setAttribute('type',"number");
    newButton.textContent = "Supprimer";
    newButton.classList.add("btn", "btn-secondary");
    newButton.textContent = 'supprimer'
    let newDiv6 = document.createElement('div');
    newDiv6.classList.add("col-2", "text-center");
    newDiv6.appendChild(newButton);
    
  
    let newSection = document.createElement('section');
    newSection.classList.add("row","border", "rounded");
  
  
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
  
    .then (teddiesList => {
          for (let teddy of teddiesList){ 
            let articleActuel = creatSection(teddy.imageUrl, teddy.name, teddy.colors.lenght, "1", `${teddy.price/100} €`);
            listProdectAdded.appendChild(articleActuel) ;
    }})
  
    .catch(erreurCatche => console.log(`il y a une erreur ${erreurCatche.message}`));
  
  