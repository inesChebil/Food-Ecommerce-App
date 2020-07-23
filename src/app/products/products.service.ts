import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from './products.model';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _jsonUrlProducts = 'assets/products.json';
  constructor(private http: HttpClient) {}
  private getJSON(): Observable<any> {
    return this.http.get(this._jsonUrlProducts);
  }
  public getProducts(): Observable<Products[]> | any {
    this.getJSON().subscribe(
      (data) => {
        let products = data.items;
        products = products.map((item) => {
          const { title, price } = item.fields;
          const { id } = item.sys;
          const image = item.fields.image.fields.file.url;
          return { title, price, id, image };
        });
        // console.log(products);
        this.displayProducts(products);
        return products;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }
  public displayProducts(products) {
    console.log(products);
  }
}
