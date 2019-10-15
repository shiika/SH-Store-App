import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Item } from './item.model';
import { Categories } from './categories.model';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InStockService {
  womenItemsFetched = new Subject<Categories>();
  menItemsFetched = new Subject<Categories>();

  womenItems: Categories = {};
  menItems: Categories = {};
  

  constructor(private http: HttpClient) { }

  fetchWomen() {
    // this.http.get<{[key: string]: Item[]}>("https://shopping-store-1fe69.firebaseio.com/women.json")
    //   .subscribe(
    //     (womenItems) => {
    //       this.womenItems = womenItems;
    //       this.womenItemsFetched.next(womenItems);
    //       console.log(womenItems);
    //     }
    //   )
    return this.http.get<{[key: string]: Item[]}>("https://shopping-store-1fe69.firebaseio.com/women.json")
      .pipe(tap(
        womenItems => {
          this.womenItems = womenItems;
          console.log(this.womenItems);
        }
      ))
  }

  fetchMen() {
    this.http.get<{[key: string]: Item[]}>("https://shopping-store-1fe69.firebaseio.com/men.json")
      .subscribe(
        (menItems) => {
          this.menItems = menItems;
          this.menItemsFetched.next(menItems);
          console.log(menItems);
        }
      )
  }

  fetchItems(gender: string) {
    return this.http.get<{[key: string]: Item[]}>(`https://shopping-store-1fe69.firebaseio.com/${gender}.json`)
      .pipe(
        tap(
          data => {
            if (gender === "men") {
              this.menItems = data;
            } else {
              this.womenItems = data;
            }
          }
        )
      )
  }

  
}
