import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { concatMap, take } from 'rxjs/operators';
import { DataService } from '../shared/data.service';
import { Item } from '../shared/item.model';
import { InStockService } from '../shared/in-stock.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: string;
  items: Item[];
  gender: string;
  filterForm: FormGroup;
  priceFilters: Array<string> = ["10-30","30-50","50-100","100-1000"];
  sizeFilters: Array<string> = ["xs", "s", "m", "l", "xl"];
  colorFilters: Array<string> = ["white", "red", "green", "black"];


  constructor(private route: ActivatedRoute, private dataService: DataService, private inStock: InStockService) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      "price": new FormControl("Price"),
      "size": new FormControl("Size"),
      "color": new FormControl("Color")
    });

    this.route.queryParams.pipe(
      take(1),
      concatMap(
        params => {
          const path = window.location.pathname.split("/");
          const gender = path[1];
          this.category = params.category;
          this.gender = gender;
          return this.dataService.fetchCategory(gender, params.category)
        }
      )
    ).subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    )

    this.inStock.categoryLoader.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    )

    this.filterForm.valueChanges
      .subscribe(
        value => {
          const { size, color} = value;
          this.inStock.loadFilteredItems({size, color});
        }
      )
    
  }

  onSubmit() {
    console.log(this.filterForm);
  }

}
