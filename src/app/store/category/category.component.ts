import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { take, switchMap } from 'rxjs/operators';
import { DataService } from '../../shared/data.service';
import { Item } from '../../shared/item.model';
import { InStockService } from '../../shared/stock.service';
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
  page: number = 1;
  
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
      switchMap(
        params => {
          this.category = params["category"];
          this.gender = params["gender"];
          this.dataService.fetchCategory(this.gender, this.category).pipe(take(1)).subscribe();
          return this.inStock.categoryLoader;
        }
      )
    ).subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    )

    this.filterSub = this.filterForm.valueChanges
      .pipe(
        switchMap(
          value => {
            const { size, color, price} = value;
            this.inStock.loadFilteredItems({size, color, price}, this.page);
            return this.inStock.categoryLoader
          }
        )
      )
      .subscribe(
        (items: Item[]) => {
          this.items = items;
          console.log(this.items);
        }
      )
    
  }

  navigateToPage(index: number) {
    this.page = +index;
    this.inStock.navigatePage(this.page);
    this.inStock.loadFilteredItems(this.filterForm.value, this.page);
  }

  ngOnDestroy() {
    this.filterSub.unsubscribe();
    this.paramsSub.unsubscribe();
  }

  getItem(id: number) {
    this.router.navigate([id], {relativeTo: this.route})
  }

}
