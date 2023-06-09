/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
state.cart = new Cart(cartItems)
  // let cartItems = undefined
  // //JSON.parse(localStorage.getItem('cart')) || [];
  // let cartObject = JSON.parse(localStorage.getItem('cart'))
  // if(cartObject==undefined){cartItems = []}else{
  //   cartItems = cartObject.items
  // }
  // state.cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let tablebodyRows = document.querySelectorAll('tbody tr')
  // let tr = document.querySelectorAll("tr");
  //tr.remove()
  console.log(tablebodyRows)
  for(let i = 0; i < tablebodyRows.length; i++) {
    console.log('for')
    tablebodyRows[i].remove();
  }

}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body

  let tableBody = document.querySelector('tbody')

  // TODO: Iterate over the items in the cart
  for(let i = 0; i < state.cart.items.length; i++){
    let tableRow = document.createElement('tr')
    console.log(state.cart.items)
   
    let deleteLink = document.createElement('td')
    deleteLink.innerHTML = 'X';

    let quantity = document.createElement('td');
    quantity.innerHTML = state.cart.items[i].quantity

    let item = document.createElement('td');
    item.innerHTML = state.cart.items[i].product.name 
    tableRow.append(deleteLink)
    tableRow.append(quantity)
    tableRow.append(item)
    tableBody.append(tableRow)
  }
  // TODO: Create a TR

  // TODO: Add the TR to the TBODY and each of the TD's to the TR


}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table
  if (event.target.innerHTML == 'X'){
    let targetRow = event.target.parentElement;
    let deletedItemTarget = targetRow.children[2].innerText;

    for (let i = 0; i < state.cart.items.length; i++){
      let item = state.cart.items[i].product;
      console.log('something',item.name,deletedItemTarget)
      if (item.name === deletedItemTarget){
        state.cart.removeItem(item);
        break;
      }
      //localStorage.getItem("cart", JSON.stringify(state.cart.items))
    }
  }

  state.cart.saveToLocalStorage();
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();

