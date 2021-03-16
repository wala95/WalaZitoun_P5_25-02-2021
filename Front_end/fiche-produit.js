
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
 const select = document.getElementById('exampleFormControlSelect1');
 
 // envoyer une requette GET à l'API(web service) sur l'URL teddiesUrl pour récupérer les données 
 // Le retour de la méthode fetch une est Promise 
 // L'objet Promise sert à réaliser des traitements de façon asynchrone. Une promesse représente une valeur qui peut être disponible maintenant, dans le futur voire jamais.



 function creatOptions(colors){
    for (let i of colors){
        let newOption = document.createElement('option');
        newOption.value = i;
        newOption.innerHTML = i;
        select.appendChild(newOption);
    }
 }
 
 fetch(teddyUrl) 
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
 
 // prendre l'imageUrl du premier element de l'array json et le seter dans src de l'img ...
 
   .then (data => {
     teddyImage.src = data.imageUrl;
     teddyName.textContent = data.name;
     teddyPrice.textContent = `Prix :   ${data.price/100} €` ;
     teddyDescription.textContent = data.description;
     creatOptions(data.colors);
   })
   .catch(erreurCatche => console.log(`il y a une erreur ${erreurCatche.message}`));