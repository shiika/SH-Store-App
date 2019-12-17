import { Injectable } from '@angular/core';
import { Categories } from './categories.model';
import { BehaviorSubject } from 'rxjs';
import { Item } from './item.model';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class InStockService {
  womenItems: Categories;
  menItems: Categories;
  genderItems: Categories;
  categoryItems: Item[];
  filteredItems: Item[];

  // womenLoader: BehaviorSubject<Categories> = new BehaviorSubject<Categories>(null);
  // menLoader: BehaviorSubject<Categories> = new BehaviorSubject<Categories>(null);
  genderLoader: BehaviorSubject<Categories> = new BehaviorSubject<Categories>(null);
  categoryLoader: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(null);

  loadGenderItems(items: Categories) {
    this.genderItems = items;
    this.genderLoader.next(items);
  }

  loadCategoryItems(items: Item[]) {
    this.categoryItems = items;
    this.categoryLoader.next(items);
  }

  loadItem(id: number) {
    return this.categoryItems.find(item => item["id"] == id);
  }

  loadSuggestions() {
    return this.categoryItems.slice(0, 8);
    
  }

  loadFilteredItems(filterConfig: {size: string; color: string}) {
    let filtered: Item[] = this.categoryItems;
    for (let filter in filterConfig) {
      if (filter === filterConfig[filter].toLowerCase()) {
          continue;
      } else {
        filtered = filtered.filter(
          (item: Item) => {
            return item[filter].includes(filterConfig[filter]);
          }
        );
      }
    }
    console.log(filtered);

    this.loadCategoryItems(filtered);
      
  }

  
}