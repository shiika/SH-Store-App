import { Component, OnInit } from '@angular/core';
import { InStockService } from '../shared/in-stock.service';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {
  hoodies: Item[];
  jackets: Item[];

  constructor(private inStock: InStockService) { }

  ngOnInit() {
      this.hoodies = this.inStock.getMenCategory("Hoodies & Sweatshirts");
      this.jackets = this.inStock.getMenCategory("Jackets & Coats");
  }

}
