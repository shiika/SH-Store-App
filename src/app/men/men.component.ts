import { Component, OnInit } from '@angular/core';
import { InStockService } from '../shared/in-stock.service';
import { Item } from '../shared/item.model';
import { Categories } from '../shared/categories.model';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {
  hoodies: Item[];
  jackets: Item[];

  constructor(private inStock: InStockService) {}

  ngOnInit() {
      this.getMen();
      this.inStock.menItemsFetched
          .subscribe(
              (items: Categories) => {
                  this.hoodies = items["Hoodies & Sweatshirts"];
                  this.jackets = items["Jackets & Coats"];
              }
          )
  }

  private getMen() {
      this.inStock.fetchMen();
  }

}
