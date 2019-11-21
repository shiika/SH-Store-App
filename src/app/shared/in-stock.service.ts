import { Injectable } from '@angular/core';
import { Categories } from './categories.model';
import { BehaviorSubject } from 'rxjs';
import { Item } from './item.model';


@Injectable({
  providedIn: 'root'
})
export class InStockService {
  womenItems: Categories;
  menItems: Categories;
  categoryItems: Item[];

  womenLoader: BehaviorSubject<Categories> = new BehaviorSubject<Categories>(null);
  menLoader: BehaviorSubject<Categories> = new BehaviorSubject<Categories>(null);
  categoryLoader: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(null);

  loadMenItems(items: Categories) {
    this.menItems = items;
    this.menLoader.next(items);
  }

  loadWomenItems(items: Categories) {
    this.womenItems = items;
    this.womenLoader.next(items);
  }

  loadCategoryItems(items: Item[]) {
    this.categoryItems = items;
    this.categoryLoader.next(items);
    console.log(this.categoryItems);
  }
  
}
