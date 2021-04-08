"use strict";

let nom = document.getElementById("nom");
let numberOrder = document.getElementById("numberOrder");

let clientOrderString = localStorage.getItem('clientOrder');
let  clientOrder = JSON.parse(clientOrderString);
nom.textContent = clientOrder.nom;
numberOrder.textContent = clientOrder.id;



let totalPriceProducts = localStorage.getItem('preOrder');
let priceTotal = JSON.parse(totalPriceProducts);
let total = document.getElementById("total");
total.textContent = `Prix total TTC : ${(priceTotal.total)} €`;

localStorage.removeItem('basket');
localStorage.removeItem('preOrder');
localStorage.removeItem('clientOrder');