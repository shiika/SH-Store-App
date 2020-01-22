import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { concatMap, take } from 'rxjs/operators';
import { DataService } from '../shared/data.service';
import { Item } from '../shared/item.model';
import { InStockService } from '../shared/stock.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy {
  category: string;
  items: Item[];
  gender: string;
  filterForm: FormGroup;
  priceFilters: Array<string> = ["10-30","30-50","50-100","100-1000"];
  sizeFilters: Array<string> = ["xs", "s", "m", "l", "xl"];
  colorFilters: Array<string> = ["white", "red", "green", "black"];
  
  catSub: Subscription;
  filterSub: Subscription;
  paramsSub: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private dataService: DataService, 
    private inStock: InStockService,
    private router: Router)
    { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      "price": new FormControl("Price"),
      "size": new FormControl("Size"),
      "color": new FormControl("Color")
    });

    this.paramsSub = this.route.params.pipe(
      concatMap(
        params => {
          this.category = this.route.snapshot.params["category"];
          this.gender = this.route.snapshot.params["gender"];
          return this.dataService.fetchCategory(this.gender, params.category)
        }
      )
    ).subscribe(
      (items: Item[]) => {
        console.log(items);
        this.items = items;
      }
    )

    this.catSub = this.inStock.categoryLoader.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    )

    this.filterSub = this.filterForm.valueChanges
      .subscribe(
        value => {
          const { size, color, price} = value;
          this.inStock.loadFilteredItems({size, color, price});
        }
      )
    
  }

  ngOnDestroy() {
    this.filterSub.unsubscribe();
    this.catSub.unsubscribe();
    this.paramsSub.unsubscribe();
  }

  getItem(id: number) {
    this.router.navigate([id], {relativeTo: this.route})
  }

}
