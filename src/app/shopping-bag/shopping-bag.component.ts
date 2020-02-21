import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BasketService } from '../shared/basket.service';
import { Product } from '../shared/product.model';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';

export class RowDirective {

}

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShoppingBagComponent implements OnInit, OnDestroy  {
  products: Product[];
  basketSub: Subscription;
  productQty: number = 1;

  constructor(
    private basketService: BasketService, 
    private dataService: DataService,
    private router: Router) {
  }

  ngOnInit() {
    this.products = [];
    this.basketSub = this.basketService.productsLoader
    .subscribe(
        (products: Product[]) => {
          this.products = products;
        }
        );

  }

  incQty(index: string) {
    console.log(this.products);
    this.products[index].qty == 3 ? this.products[index].qty = 3 : this.products[index].qty++;
  }

  decQty(index: string) {
    console.log(this.products);
    this.products[index].qty == 0 ? this.products[index].qty = 0 : this.products[index].qty--;
  }

  onEditProduct(product: Product) {
    const {gender, category, id} = product;
    this.router.navigate(["/store", gender, category, id], {fragment: "editMode"});
  }

  saveToBasket() {
    this.dataService.addToBasket(this.products)
      .pipe(take(1))
      .subscribe(
        (products: Product[]) => {
          console.log(products);
        }
      )
  }

  onRemoveProduct(index: string) {
    this.basketService.removeProduct(+index);
  }

  ngOnDestroy() {
    this.basketSub.unsubscribe();
  }

}
