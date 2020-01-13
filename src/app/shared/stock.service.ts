import { Injectable } from '@angular/core';
import { Categories } from './categories.model';
import { BehaviorSubject } from 'rxjs';
import { Item } from './item.model';
import { BasketService } from './basket.service';
import { Product } from './product.model';


@Injectable({
  providedIn: 'root'
})
export class InStockService {
  constructor(private basketService: BasketService) {}

  genderItems: Categories;
  categoryItems: Item[];
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

  loadFilteredItems(filterConfig: {size: string; color: string; price: string}) {
    let filtered: Item[] = this.categoryItems;
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

  addToBasket(item: Item) {
    const {img, name, color, size, price} = item;
    let newProduct = new Product(img, name, color, size, 1, price);
    console.log(newProduct);
  }

  
}