import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ProductsService } from '../products.service';
import { Products } from '../products.model';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Output() purchasingChange = new EventEmitter();
  @Output() productSelected = new EventEmitter();
  prodSelected = [];
  purchasing = [false, false, false, false, false, false, false, false];
  count = 0;
  products: any[];
  private _jsonUrlProducts = 'assets/products.json';
  private unsubscribe$ = new Subject<void>();
  constructor(private http: HttpClient) {
    // this.productService = productService.getProducts();
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.http.get(this._jsonUrlProducts).subscribe(
      (data) => {
        // console.log(data.items);
        let products = data.items;
        products = products.map((item) => {
          const { title, price } = item.fields;
          const { id } = item.sys;
          const image = item.fields.image.fields.file.url;
          return { title, price, id, image };
        });
        console.log(products);
        // this.displayProducts(products);
        this.products = products;
        this.saveProducts(products);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
  saveProducts(products) {
    localStorage.setItem('Products', JSON.stringify(products));
  }
  AddToBasket(productId) {
    let purchase = this.purchasing[productId];
    this.purchasing.splice(productId, 1, !purchase);
    this.count += 1;

    this.purchasingChange.emit(this.count);
    let products = JSON.parse(localStorage.getItem('Products')).find(
      (product) => product.id === productId
    );
    let cartItem = { ...products, amount: 1 };
    this.prodSelected.push(cartItem);
    this.productSelected.emit(this.prodSelected);
    this.saveCart(this.prodSelected);
  }
  saveCart(cart) {
    localStorage.setItem('Cart', JSON.stringify(cart));
  }
}
