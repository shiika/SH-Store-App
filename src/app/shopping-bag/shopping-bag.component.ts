import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item.model';
import { BasketService } from '../shared/basket.service';

@Component({
  selector: 'app-shopping-bag',
  templateUrl: './shopping-bag.component.html',
  styleUrls: ['./shopping-bag.component.scss']
})
export class ShoppingBagComponent implements OnInit {
  products: Item[];

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basketService.productsLoader
      .subscribe(
        (items: Item[]) => {
          this.products = items;
        }
      )
  }

}
