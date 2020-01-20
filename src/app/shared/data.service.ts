import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, take } from 'rxjs/operators';
import { Categories } from './categories.model';
import { InStockService } from './stock.service';
import { Item } from './item.model';
import { UserInfo } from "./userInfo.model";
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable({providedIn: 'root'})

export class DataService {
  user: User;

    constructor(private http: HttpClient, private inStock: InStockService, private authService: AuthService) {}

    fetchItems(gender: string) {
      return this.http.get<Categories>(`https://shopping-store-1fe69.firebaseio.com/${gender}/New%20Collection.json`)
        .pipe(
          tap(
            (items: Categories) => {
              this.inStock.loadGenderItems(items);
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

    getUserInfo() {
      this.authService.userAuthentication.pipe(take(1)).subscribe( (user: User) =>  {this.user = user});
      return this.http.get(`https://shopping-store-1fe69.firebaseio.com/users/${this.user.id}.json`, {
        params: new HttpParams().set("auth", this.user.token)
      })
          .pipe(
              take(1),
              tap((userInfo: UserInfo) => {
                  console.log(userInfo);
              })
          )
    }

    updateUserInfo(info: UserInfo) {
      this.authService.userAuthentication.pipe(take(1)).subscribe( (user: User) =>  {this.user = user});
      return this.http.patch(
        `https://shopping-store-1fe69.firebaseio.com/users/${this.user.id}.json`,
        info,
        {
          params: new HttpParams().set("auth", this.user.token)
        })
        .pipe(
          take(1)
        )
    }

}