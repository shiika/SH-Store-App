import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Categories } from './categories.model';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InStockService {
  womenItems: Categories = {};
  menItems: Categories = {};
  

  constructor(private http: HttpClient) { }

  fetchItems(gender: string) {
    return this.http.get<Categories>(`https://shopping-store-1fe69.firebaseio.com/${gender}.json`)
      .pipe(
        tap(
          data => {
            if (gender === "men") {
              console.log(data);
              this.menItems = data;
            } else {
              this.womenItems = data;
            }
          }
        )
      )
  }

  fetchCategory(gender: string, category: string) {
    return this.http.get(`https://shopping-store-1fe69.firebaseio.com/${gender}/${category}.json`)
  }

  
}
