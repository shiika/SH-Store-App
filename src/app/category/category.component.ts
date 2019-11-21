import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { concatMap } from 'rxjs/operators';
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

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
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
  }

}
