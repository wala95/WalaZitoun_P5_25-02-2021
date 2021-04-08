"use strict";

let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let code =  document.getElementById("code");
let ville = document.getElementById("ville");
let mail =  document.getElementById("mail");
let pays = document.getElementById('pays');
let conditionsCheck = document.getElementById('conditionsCheck');


let mailRegEx = new RegExp("[^@]+@[^@]+\.[a-zA-Z]{2,3}");
let textRegEx = new RegExp("[a-zA-Z]{2,}");
let numberRegEx = new RegExp("[0-9]{1,}");



let preOrder = JSON.parse(localStorage.getItem('preOrder'));

// afficher le prix total dans le récapitulatif  
let sousTotal = document.getElementById("sousTotal");
sousTotal.textContent = `Sous total : ${(preOrder.total)} €`;

let total = document.getElementById("total");
total.textContent = `Prix total TTC : ${(preOrder.total)} €`;


//  Envoyer les valeurs du formulaire dans l'api et récuperer l'orderId

let orderUrl = `http://127.0.0.1:3000/api/teddies/order`;

function sendToServer(){
  let data = {
     contact : {
     firstName:  nom.value,
     lastName : prenom.value,
     address :  code.value,
     city :  ville.value,
     email :  mail.value,
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

function checkIsValid(item, regEx) {
  if (!regEx.test(item.value)) {
    item.classList.add('is-invalid');
    return false;
  } else {
    item.classList.remove('is-invalid');
    item.classList.add('is-valid');
    return true;
  }
}

function checkBoxIsValid(checkBox) {
  if (!checkBox.checked ) {
    checkBox.classList.add('is-invalid');
    return false;
  } else {
    checkBox.classList.remove('is-invalid');
    checkBox.classList.add('is-valid');
    return true;
  }
}

btnSend.addEventListener('click', ()=> {
  let mailValid = checkIsValid(mail, mailRegEx);
  let nomValid = checkIsValid(nom, textRegEx) ;
  let prenomValid = checkIsValid(prenom, textRegEx);
  let paysValid = checkIsValid(pays, textRegEx);
  let villeValid = checkIsValid(ville, textRegEx);
  let codeValid = checkIsValid(code, numberRegEx);
  let conditionsCheckValid =  checkBoxIsValid(conditionsCheck);

  if (mailValid && nomValid && prenomValid && paysValid && villeValid && codeValid && conditionsCheckValid) {
    sendToServer();
  }
});

