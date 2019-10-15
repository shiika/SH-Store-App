import { Component, OnInit } from '@angular/core';
import { InStockService } from '../shared/in-stock.service';
import { Item } from '../shared/item.model';
import { Categories } from '../shared/categories.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit {
  hoodies: Item[];
  jackets: Item[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
      this.route.data
        .pipe(
          map(
            data => data["0"]
          )
        )
        .subscribe(
          menItems => {
            this.hoodies = menItems["Hoodies & Sweatshirts"];
            this.jackets = menItems["Jackets & Coats"];
          }
        )
  }

}
