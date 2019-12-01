import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { concatMap, switchMap } from 'rxjs/operators';
import { DataService } from '../shared/data.service';
import { Item } from '../shared/item.model';

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
  colourFilters: Array<string> = ["White", "Red", "Green", "Blue", "Black"];


  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      "price": new FormControl("Price"),
      "size": new FormControl("Size"),
      "colour": new FormControl("Colour")
    });

    this.route.fragment.pipe(
      concatMap(
        category => {
          const path = window.location.pathname.split("/");
          const gender = path[1];
          this.category = category;
          this.gender = gender;
          return this.dataService.fetchCategory(gender, category)
        }
      )
    ).subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );

    for (let filter in this.filterForm.controls) {
      this.filterForm.controls[filter].valueChanges
        .pipe(switchMap(
          (value: string) => {
            const filterConfig = {
              filter,
              value
            }
            return this.dataService.fetchFilteredCategory(this.gender, this.category, filterConfig)
          }
        )
      ).subscribe(
        (items: {[key: number]: Item}) => {
          this.items = Object.values(items);
        }
      )
    }
    
  }

  onSubmit() {
    console.log(this.filterForm);
  }

}
