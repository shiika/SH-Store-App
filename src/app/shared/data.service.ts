import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, take, map } from 'rxjs/operators';
import { Categories } from './categories.model';
import { InStockService } from './stock.service';
import { Item } from './item.model';
import { UserInfo } from "./userInfo.model";
import { AuthService } from './auth.service';
import { User } from './user.model';
import { Product } from './product.model';
import { OrderInfo } from './orderInfo.model';

@Injectable({providedIn: 'root'})

export class DataService {
  user: User;

    constructor(
      private http: HttpClient, 
      private inStock: InStockService, 
      private authService: AuthService) {
      this.authService.userAuthentication.subscribe((user: User) => {this.user = user});
    }

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
          tap(
            (items: Item[]) => {
              this.inStock.loadCategoryItems(items, 1);
            }
          )
        )
    }

    fetchItem(id: number, category: string, gender: string) {
      return this.http.get<Item>(`https://shopping-store-1fe69.firebaseio.com/${gender}/${category}.json?orderBy="id"&equalTo=${id}`)
    }

    fetchSuggestions(gender: string, category: string) {
      return this.http.get<Item[]>(`https://shopping-store-1fe69.firebaseio.com/${gender}/${category}.json?orderBy="id"&limitToFirst=9`)
    }

    addToBasket(products: Product[]) {
      
      return this.http.put<Product[]>(
        `https://shopping-store-1fe69.firebaseio.com/users/${this.user.id}/products.json`,
        products, 
        {
          params: new HttpParams().set("auth", this.user.token)
        })
    }

    shipProducts(shipInfo: OrderInfo, products: Product[]) {
      // Breakpoint:  handle basket after ordering products
        const {deliveryMethod, firstName, lastName, city, address, phoneno, email} = shipInfo;
        const orderDate = new Date();
        const shippingDate = new Date(orderDate.getTime() + 86400000 * 2);
        const orderId = +phoneno.toString().slice(phoneno.toString().length - 4, phoneno.toString().length);
        const productsPrice: number = products.reduce(
          (total, product) => {
            return total + product.price
          },
          0
        );
        const totalPayment = productsPrice + 15; // 15 is DHL cost

        const order = new OrderInfo(deliveryMethod, firstName, lastName, city, address, phoneno, email, products, orderId, totalPayment, orderDate, shippingDate);
        return this.http.post<{name: string}>(`https://shopping-store-1fe69.firebaseio.com/orders.json`, 
          order,
          {
            params: new HttpParams().set("auth", this.user.token)
          }
        )
    }

    fetchOrders() {
      return this.http.get(`https://shopping-store-1fe69.firebaseio.com/orders.json?orderBy="email"&equalTo="${this.user.email}"`)
              .pipe(
                map(
                  (res: {[key: string]: OrderInfo}) => {
                    return Object.values(res)
                  }
                )
              )
    }

    getUserInfo() {
      return this.http.get(`https://shopping-store-1fe69.firebaseio.com/users/${this.user.id}.json`, {
        params: new HttpParams().set("auth", this.user.token)
      })
          .pipe(
              take(1)
          )
    }

    updateUserInfo(info: UserInfo) {
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

    removeFromBasket() {
      return this.http.put(
              `https://shopping-store-1fe69.firebaseio.com/users/${this.user.id}/products.json`,
              [],
              {
                params: new HttpParams().set("auth", this.user.token)
              })

    }

}