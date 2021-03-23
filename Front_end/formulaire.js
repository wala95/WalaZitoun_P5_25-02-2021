

//  recuperer les valeurs du formulaire pour les mettre dans le localstorage



let btnSend = document.getElementById('btnSend');

btnSend.addEventListener('click', ()=>{
    let formulaire = {
     nom :  document.getElementById("nom").value,
     prenom : document.getElementById("prenom").value,
    }

// mettre le formulaire dans le localstorage
    localStorage.setItem('formulaire', JSON.stringify(formulaire));
   
   window.location.href='confirmation.html'
 // localStorage.setItem('prenom', document.getElementById("prenom").value);
// localStorage.setItem('nom', document.getElementById("nom").value);

// mettre les valeurs du formulaire dans le localstorage
// let formulaire = {
//     'prenom': localStorage.getItem('prenom'),
//     'nom': localStorage.getItem('nom')
// };
  console.log(formulaire)
})




let totalPriceProducts = localStorage.getItem('totalPrice');
let priceTotal = JSON.parse(totalPriceProducts);
console.log(priceTotal);

let sousTotal = document.getElementById("sousTotal");
let total = document.getElementById("total");

sousTotal.textContent = `Sous total : ${(priceTotal.total)} €`;
total.textContent = `Prix total TTC : ${(priceTotal.total)} €`;


