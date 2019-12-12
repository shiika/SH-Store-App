import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, take } from 'rxjs/operators';
import { Categories } from './categories.model';
import { InStockService } from './in-stock.service';
import { Item } from './item.model';

@Injectable({providedIn: 'root'})

export class DataService {
    constructor(private http: HttpClient, private inStock: InStockService) {}

    fetchItems(gender: string) {
      return this.http.get<Categories>(`https://shopping-store-1fe69.firebaseio.com/${gender}/New%20Collection.json`)
        .pipe(
          take(1),
          tap(
            (items: Categories) => {
              if (gender === "men") {
                this.inStock.loadMenItems(items);
              } else {
                this.inStock.loadWomenItems(items);
              }
            }
          )
        )
    }

    fetchCategory(gender: string, category: string) {
      return this.http.get(`https://shopping-store-1fe69.firebaseio.com/${gender}/${category}.json`)
        .pipe(
          take(1),
          tap(
            (items: Item[]) => {
              this.inStock.loadCategoryItems(items);
            }
          )
        )
    }

}