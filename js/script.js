'use strict';

// Objectives!
//   1. Allow Menu Items to go to Receipt.
//   2. Update Subtotal, Taxes & Total.
//   3. Error Checking on Delivery Information.

var subTotal = 0;

addEventListeners();

function updateTotals() {
  var runningTotal = 0;
  var foodTaxes = (subTotal * 0.029);
  var subtotalData = document.querySelector(".subtotal-data");
  var taxesData = document.querySelector(".taxes-data");
  var totalData = document.querySelector(".total-data");

  subtotalData.innerText = "$" + subTotal.toFixed(2);
  taxesData.innerText = "$" + foodTaxes.toFixed(2);
  runningTotal = subTotal + foodTaxes;
  totalData.innerText = "$" + runningTotal.toFixed(2);
}

function addEventListeners() {
  var royalButton = document.querySelector(".royal-btn-item");
  var arugulaButton = document.querySelector(".arugula-btn-item");
  var swineButton = document.querySelector(".swine-btn-item");
  var iceButton = document.querySelector(".ice-btn-item");
  var submitButton = document.querySelector('.place-order-button');

  royalButton.addEventListener("click", addItemToTable);
  arugulaButton.addEventListener("click", addItemToTable);
  swineButton.addEventListener("click", addItemToTable);
  iceButton.addEventListener("click", addItemToTable);
  submitButton.addEventListener("click", errorCheckInput);
}

function addItemToTable(event) {
  var recipeTableBod = document.querySelector(".table-body-class");
  var tableRow = document.createElement("tr");
  var foodName = document.createElement("td");
  var foodPrice = document.createElement("td");
  var royalButton = document.querySelector(".royal-btn-item");
  var arugulaButton = document.querySelector(".arugula-btn-item");
  var swineButton = document.querySelector(".swine-btn-item");
  var iceButton = document.querySelector(".ice-btn-item");

  recipeTableBod.appendChild(tableRow);
  tableRow.appendChild(foodName);
  tableRow.appendChild(foodPrice);
  foodPrice.className = "right";

  if(event.target === royalButton) {
    foodName.innerText = 'Royale with Cheese';
    foodPrice.innerText = '$8.99';
    subTotal += 8.99;
  }
  if(event.target === arugulaButton) {
    foodName.innerText = 'Arugula Pie';
    foodPrice.innerText = '$11.99';
    subTotal += 11.99;
  }
  if(event.target === swineButton) {
    foodName.innerText = 'Smoked Swine';
    foodPrice.innerText = '$14.99';
    subTotal += 14.99;
  }
  if(event.target === iceButton) {
    foodName.innerText = 'Ice Cream Biscuit';
    foodPrice.innerText = '$7.99';
    subTotal += 7.99;
  }

  updateTotals();
}

// Now, for the error checking.

function errorCheckInput() {
  var nameInput = document.querySelector('#name_field');
  var phoneInput = document.querySelector('#number_field');
  var addressInput = document.querySelector('#address_field');
  var recipeTableBod = document.querySelector(".table-body-class");

  console.log(recipeTableBod.childNodes);
  if(!(nameInput.className.includes('validate valid'))) {
    sendToast('Failed. Enter a valid name.');
    nameInput.className += " invalid";
  }
  else if(!(phoneInput.className.includes('validate valid'))) {
    sendToast('Failed. Enter a valid phone number.');
    phoneInput.className += " invalid";
  }
  else if(!(addressInput.className.includes('validate valid'))) {
    sendToast('Failed. Enter a valid address.');
    addressInput.className += " invalid";
  }
  else if(recipeTableBod.childNodes.length <= 1) {
    sendToast('Failed. No items added to the ticket.');
  }
  else {
    var orderForm = document.querySelector(".order-form");
    var table = document.querySelector(".items-table");
    var tableBod = document.createElement("tbody");

    sendToast('Success. Thanks for ordering!');
    orderForm.reset();
    table.removeChild(recipeTableBod);
    table.appendChild(tableBod);
    tableBod.className = "table-body-class";
    subTotal = 0;
    foodTaxes = 0;

    updateTotals();
  }
}

// send the Toast Message

function sendToast(text) {
  return Materialize.toast(text, 2000);
}
