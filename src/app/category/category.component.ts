import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { InStockService } from '../shared/in-stock.service';
import { Category } from '../shared/category.model';
import { concatMap } from 'rxjs/operators';
import { Categories } from '../shared/categories.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: string;
  items: Category[];
  gender: string;

  constructor(private route: ActivatedRoute, private inStock: InStockService) { }

  ngOnInit() {
    this.route.fragment.pipe(
      concatMap(
        category => {
          const path = window.location.pathname.split("/");
          const gender = path[1];
          this.category = category;
          this.gender = gender;
          return this.inStock.fetchCategory(gender, category)
        }
      )
    ).subscribe(
      (items: Category[]) => {
        console.log(items);
        this.items = items;
      }
    );

    // this.route.fragment.subscribe(
    //   (category) => {
    //     const path = window.location.pathname.split("/");
    //     const gender = path[1];
    //     this.category = category;
    //     this.gender = gender;
    //   }
    //   );

    //   this.inStock.fetchCategory(this.gender, this.category).subscribe(
    //     (items: Category[]) => {
    //       this.items = items;
    //     }
    //   )
  }

}
