import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../shared/item.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { InStockService } from '../shared/in-stock.service';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit, OnDestroy {
  hoodies: Item[];
  jackets: Item[];
  itemsSub: Subscription;

  constructor(private inStock: InStockService) {}

  ngOnInit() {
      this.itemsSub = this.inStock.menLoader
        .subscribe(
          data => {
            this.hoodies = data["Hoodies & Sweatshirts"];
            this.jackets = data["Jackets & Coats"];
          }
        );
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }

}
