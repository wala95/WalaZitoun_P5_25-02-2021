"use strict";

let preOrder = JSON.parse(localStorage.getItem('preOrder'));

// afficher le prix total dans le récapitulatif  
let sousTotal = document.getElementById("sousTotal");
sousTotal.textContent = `Sous total : ${(preOrder.total)} €`;

let total = document.getElementById("total");
total.textContent = `Prix total TTC : ${(preOrder.total)} €`;


//  Envoyer les valeurs du formulaire dans l'api et récuperer l'orderId

let orderUrl = `http://127.0.0.1:3000/api/teddies/order`;
let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");


function sendToServer(){
  let data = {
     contact : {
     firstName:  document.getElementById("nom").value,
     lastName : document.getElementById("prenom").value,
     address :  document.getElementById("code").value,
     city : document.getElementById("ville").value,
     email :  document.getElementById("mail").value,
    },
    products : preOrder.id
  };

  fetch(orderUrl,{
    method : 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body : JSON.stringify(data) 
  })
  .then(response => {
      if (response.ok == true) {
        return response;
      }
      else {
        console.log(response)
        throw new Error("la reponse du serveur n'est pas 200");
      }
    })
  // ajouter orderId dans le localstorage
  .then(response => response.json())
  .then(data=> {
       let clientOrder = {
            nom: data.contact.firstName,
            id : data.orderId,
          }
       localStorage.setItem('clientOrder', JSON.stringify(clientOrder));

       //aller vers la page confirmation.fr
      window.location.href = 'confirmation.html'
      }) 
};

// appeller la fonction sendToServer quand on clique sur le boutton send à condition que les champs des formulaires sont tous bien remplis
let form = document.getElementById('formulaire');
let btnSend = document.getElementById('btnSend');

btnSend.addEventListener('click', ()=> {
  if (form.checkValidity() == true) {
    sendToServer();
  } else {
  // dire à bootstrap qu'on a rempli et qu'on souhaite qu'il nous mis à jour le design
  form.classList.add('was-validated');
  }
});

