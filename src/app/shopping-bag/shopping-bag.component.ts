import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BasketService } from '../shared/basket.service';
import { Product } from '../shared/product.model';
import { take, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export class RowDirective {

}

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShoppingBagComponent implements OnInit, OnDestroy  {
  products: Product[] = [];
  basketSub: Subscription;

  constructor(private basketService: BasketService) {
  }

  ngOnInit() {
    this.products = this.basketService.fetchedProductsInstance;
    this.basketSub = this.basketService.productsLoader
      .subscribe(
        (products: Product[]) => {
          this.products.push(...products);
        }
      );

  }

  saveToBasket() {
    this.basketService.saveProducts(this.products)
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
