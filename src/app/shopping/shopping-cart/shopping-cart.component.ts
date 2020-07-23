import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  @Input() cartTotal;
  @Input() cartItems;
  // @Input() opened;
  // OpenedCart: boolean;
  @Input() opened: boolean;
  @Input() cart = [];
  constructor() {}

  ngOnInit(): void {
    // let cart = JSON.parse(localStorage.getItem('Cart'));
    // this.cart = cart;
    console.log({ hello: this.opened });
    // this.OpenedCart = this.opened;
    // this.setCartValues(this.cart);
    console.log(this.cart);
    // console.log({ opened: this.OpenedCart });
  }

  closeCartBtn() {
    this.opened = false;
  }
  OnClearCartBtn() {
    console.log('btn clr cart was clicked');
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
  // openedCartChange(event) {
  //   console.log('opened');
  // }
  onRemoveItem(id) {
    console.log(id);
    var storedProducts = JSON.parse(localStorage.getItem('Cart'));
    storedProducts.filter((el) => {
      return el.id === id;
    });
    console.log(storedProducts);
    localStorage.setItem('Czrt', JSON.stringify(storedProducts));
  }
}
