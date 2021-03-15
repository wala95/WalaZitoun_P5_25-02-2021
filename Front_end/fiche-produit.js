
 "use strict";


 
 //  pointer sur l'objet DOM correspondant à la balise img dont l'id est 'first_teddy' 
 const teddiesUrl = 'http://127.0.0.1:3000/api/teddies';


 const teddyImage = document.getElementById('teddyImage');
 const teddyName = document.getElementById('teddyName');
 const teddyPrice = document.getElementById('teddyPrice');
 const teddyDescription = document.getElementById('teddyDescription');
 const teddyColors = document.getElementById('teddyColors');
 
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
 
 // prendre l'imageUrl du premier element de l'array json et le seter dans src de l'img ...
 
   .then (data => {
     teddyImage.src = data[0].imageUrl;
     teddyName.textContent = data[0].name;
     teddyPrice.textContent = `Prix :   ${data[0].price/100} €` ;
     teddyDescription.textContent = data[0].description;
     teddyColors.textContent = `${data[0].colors.length} Couleurs disponibles`;
   })
             






