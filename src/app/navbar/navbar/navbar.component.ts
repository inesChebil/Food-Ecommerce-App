import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  // @Output() openedCartChange = new EventEmitter();
  opened = false;
  cartItems = 0;
  cartTotal = 0;
  cart = [];
  constructor() {}

  ngOnInit(): void {}

  openCartBtn() {
    this.opened ? (this.opened = false) : (this.opened = true);
    // this.openedCartChange.emit(this.opened);
    console.log(this.opened);
  }
  cartItemsChanged(data) {
    this.cartItems += 1;
  }
  onSelectProduct(data) {
    this.cart = data;
    console.log(this.cart);
    this.setCartValues(this.cart);
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    this.cartTotal = parseFloat(tempTotal.toFixed(2));
    this.cartItems = itemsTotal;
  }
}
