import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../../shared/item.model';
import { Subscription } from 'rxjs';
import { InStockService } from '../../shared/stock.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Categories } from '../../shared/categories.model';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss']
})
export class GenderComponent implements OnInit, OnDestroy {
  hoodies: Item[];
  jackets: Item[];
  itemsSub: Subscription;
  gender: string;
  categoriesNames: Array<string>;
  categories: Categories;

  constructor(private inStock: InStockService, private route: ActivatedRoute) {}

  ngOnInit() {
      this.itemsSub = this.route.params
        .pipe(
          switchMap(
            (params: Params) => {
              this.gender = params["gender"];
              return this.inStock.genderLoader
            }
          )
        )
        .subscribe(
          (categories: Categories) => {
            this.categoriesNames = Object.keys(categories);
            this.categories = categories;
            this.hoodies = categories["Hoodies & Sweatshirts"];
            this.jackets = categories["Jackets & Coats"];
          }
        );
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }

}
