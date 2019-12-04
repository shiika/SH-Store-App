import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, take } from 'rxjs/operators';
import { Categories } from './categories.model';
import { InStockService } from './in-stock.service';
import { Item } from './item.model';

export interface FilterConfig {
  filter: string;
  value: string;
}

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

    fetchFilteredCategory(gender: string, category: string, filterConfig: FilterConfig) {
      if (filterConfig.filter === "price") {
        const filterArr = filterConfig.value.split("-");
        return this.http.get(`https://shopping-store-1fe69.firebaseio.com/${gender}/${category}.json?orderBy="${filterConfig.filter}"&startAt=${filterArr[0]}&endAt=${filterArr[1]}`)
        .pipe(
          take(1),
          tap(
            (items: {[key: number]: Item}) => {
              const itemsArr = Object.values(items);
              this.inStock.loadCategoryItems(itemsArr);
            }
          )
        )
      }

      return this.http.get(`https://shopping-store-1fe69.firebaseio.com/${gender}/${category}/${filterConfig.filter}/${filterConfig.value}.json`)
      .pipe(
        take(1),
        tap(
          (items: Item[]) => {
            console.log(items);
            this.inStock.loadCategoryItems(items);
          }
        )
      )
    }

}