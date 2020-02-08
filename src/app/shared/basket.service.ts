import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from './item.model';
import { Product } from './product.model';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { tap, take, switchMap, takeWhile } from 'rxjs/operators';

@Injectable({providedIn: "root"})

export class BasketService {
    constructor(private router: Router, private dataService: DataService) {}

    productsLoader: BehaviorSubject<Product[]> = new BehaviorSubject([]);
    fetchedProducts: Product[] = [];
    productsBag: Array<Product> = [];

    get fetchedProductsInstance() {
        return this.fetchedProducts;
    }
    
    onFetchProducts(products: Product[]) {
        this.fetchedProducts = products;
    }

    addProduct(item: Item, size: string, color: string) {
        const product = new Product(item.img, item.name, color, size, item.price, item.id);
        this.productsBag.push(product);
        this.loadProducts(this.productsBag);

        this.router.navigate(["/basket"]);
    }

    saveProducts(lastProducts: Product[]) {
       return this.dataService.addToBasket(lastProducts);
    }

    removeProduct(index: number) {
        this.productsBag.splice(index, 1);
        this.loadProducts(this.productsBag);
    }

    clearProducts() {
        this.productsBag = [];
    }

    loadProducts(products: Product[]) {
        this.productsLoader.next(products);
    }
}