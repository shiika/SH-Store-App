import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.model';
import { Router } from '@angular/router';

@Injectable({providedIn: "root"})

export class BasketService {
    constructor(private router: Router) {}

    private productsBag: Array<Product> = [];
    productsLoader: BehaviorSubject<Product[]> = new BehaviorSubject([]);

    get productsInstance() {
        return this.productsBag.slice();
    }

    onFetchProducts(products: Product[]) {
        const productsMap = products.map(
            (item, index) => {
                const { img, name, color, size, price, id, gender, category, qty } = item;
                const newItem = new Product(img, name, color, size, price, id, gender, category, qty);
                return newItem
            }
        );
        this.productsBag.push(...productsMap);
        this.loadProducts(this.productsInstance);
    }

    addProduct(product: Product) {
        this.productsBag.push(product);
        this.loadProducts(this.productsInstance);

        this.router.navigate(["/basket"]);
    }

    editProduct(id: number, newProduct: Product) {
        const index = this.productsBag.findIndex(item => item.id == id);
        this.productsBag.splice(index, 1, newProduct);
        this.loadProducts(this.productsInstance);
    }

    clearProducts() {
        this.productsBag = [];
        this.loadProducts(this.productsInstance);
    }

    removeProduct(index: number) {
        this.productsBag.splice(index, 1);
        this.loadProducts(this.productsInstance)
    }

    private loadProducts(products: Product[]) {
        this.productsLoader.next(products);
    }
}