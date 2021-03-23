
let client = localStorage.getItem('formulaire');
let clientInfo = JSON.parse(client);
console.log(clientInfo);
let nomComplet = document.getElementById("nomComplet");
console.log(nomComplet);

nomComplet.textContent = `${clientInfo.nom} ${clientInfo.prenom}` ;
console.log(clientInfo.nom)

let totalPriceProducts = localStorage.getItem('totalPrice');
let priceTotal = JSON.parse(totalPriceProducts);
let total = document.getElementById("total");
total.textContent = `Total TTC : ${(priceTotal.total)} €`;

localStorage.clear();