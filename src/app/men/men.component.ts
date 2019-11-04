import { Component, OnInit, OnDestroy } from '@angular/core';
import { InStockService } from '../shared/in-stock.service';
import { Item } from '../shared/item.model';
import { Categories } from '../shared/categories.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit, OnDestroy {
  hoodies: Item[];
  jackets: Item[];
  routeSub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
        // returning data["0"] as we recieve firebase database node in the form of 
            // {0: {"Hoodies & Sweatshirts" Array[4]}}
        // so we map data to desirable form
      this.routeSub = this.route.data
        .subscribe(
          data => {
            this.hoodies = data.menItems["Hoodies & Sweatshirts"];
            this.jackets = data.menItems["Jackets & Coats"];
          }
        )
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
