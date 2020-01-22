import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from './item.model';
import { Product } from './product.model';

@Injectable({providedIn: "root"})

export class BasketService {

    productsLoader: BehaviorSubject<Item[]> = new BehaviorSubject(null);
    productsBag: Product[] = [];

    // addProduct(item: Item) {
    //     const { img, name, color, price, size} = item;
    //     const newProduct = new Product(img, name, color, size, price);
    //     this.productsBag.push(newProduct);
    //     this.loadProducts();
    // }

    // loadProducts() {
    //     this.productsLoader.next(this.productsBag);
    // }
}