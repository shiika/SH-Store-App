import { Injectable } from '@angular/core';
import { Categories } from './categories.model';
import { BehaviorSubject } from 'rxjs';
import { Item } from './item.model';


@Injectable({
  providedIn: 'root'
})
export class InStockService {
  constructor() {}

  page: number;
  genderItems: Categories;
  categoryItems: Array<Item> = [];
  chunkedCategoryItems: Array<Item[]> = [];
  genderLoader: BehaviorSubject<Categories> = new BehaviorSubject<Categories>(null);
  categoryLoader: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>(null);

  loadGenderItems(items: Categories) {
    this.genderItems = items;
    this.genderLoader.next(items);
  }

  loadCategoryItems(items: Item[], page: number) {
    this.categoryItems = items;
    this.chunkedCategoryItems = [];
    this.chunkedCategoryItems = this.getChunkedItems(items, 8);
    const pageItems = this.chunkedCategoryItems[page - 1];
    this.categoryLoader.next(pageItems);
  }

  private getChunkedItems(arr: Item[], limit: number) {
    let chunk = [];
    for (let i = 0; i < arr.length; i += limit) {
      chunk = arr.slice(i, i + limit);
      this.chunkedCategoryItems.push(chunk);
    }

    return this.chunkedCategoryItems;
  }

  navigatePage(page: number) {
    this.page = page;
    const pageItems = this.chunkedCategoryItems[page - 1];
    this.categoryLoader.next(pageItems);
  }

  getItemId(id: number) {
    return this.categoryItems.find(item => item.id == id)
  }

  loadFilteredItems(filterConfig: {size: string; color: string; price: string}, page: number) {
    let filtered: Item[] = this.chunkedCategoryItems[page - 1];
    for (let filter in filterConfig) {
      if (filter !== filterConfig[filter].toLowerCase()) {
        if (filter == "price") {
          const priceRange = filterConfig["price"].split("-");
          filtered = filtered.filter(item => item.price >= +priceRange[0] && item.price <= +priceRange[1]);
        } else {
          filtered = filtered.filter(
            (item: Item) => {
              return item[filter].includes(filterConfig[filter]);
            }
          );
        }
      }
    }

    this.categoryLoader.next(filtered);
      
  }

  
}