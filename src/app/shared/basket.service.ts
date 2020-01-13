import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from './item.model';

@Injectable({providedIn: "root"})

export class BasketService {

    productsLoader: BehaviorSubject<Item[]> = new BehaviorSubject(null);
    productsBag: Item[];

    addProduct(item: Item) {
        this.productsBag.push(item)
        this.loadProducts();
    }

    loadProducts() {
        this.productsLoader.next(this.productsBag);
    }
}