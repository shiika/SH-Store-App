import { Injectable } from '@angular/core';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class InStockService {
  menItems: any = {
    "Hoodies & Sweatshirts": [
      {
        img: "../../assets/img/Men/Hoody_1.jpg",
        name: "AE FLEECE COLORBLOCK HOODIE",
        price: 89.95
      },
      {
        img: "../../assets/img/Men/Hoody_2.jpg",
        name: "AE FLEECE COLORBLOCK HOODIE",
        price: 89.95
      },
      {
        img: "../../assets/img/Men/Hoody_3.jpg",
        name: "AE FLEECE PULLOVER HOODIE",
        price: 89.95
      },
      {
        img: "../../assets/img/Men/Hoody_4.jpg",
        name: "AE FLEECE PULLOVER HOODIE",
        price: 89.95
      }
    ],

    "Jackets & Coats": [
      {
        img: "../../assets/img/Men/Jacket_1.jpg",
        name: "AE FLEECE COLORBLOCK HOODIE",
        price: 89.95
      },
      {
        img: "../../assets/img/Men/Jacket_2.jpg",
        name: "AE FLEECE COLORBLOCK HOODIE",
        price: 89.95
      },
      {
        img: "../../assets/img/Men/Jacket_3.jpg",
        name: "AE FLEECE COLORBLOCK HOODIE",
        price: 89.95
      },
      {
        img: "../../assets/img/Men/Jacket_4.jpg",
        name: "AE FLEECE COLORBLOCK HOODIE",
        price: 89.95
      },
    ]
  }

  womenItems: any = {
    "Hoodies & Sweatshirts": [
      {
        img: "../../assets/img/Women/Hoody_w_1.jpg",
        name: "AE FLEECE COLORBLOCK HOODIE",
        price: 89.95
      },
      {
        img: "../../assets/img/Women/Hoody_w_2.jpg",
        name: "AE FLEECE COLORBLOCK HOODIE",
        price: 89.95
      },
      {
        img: "../../assets/img/Women/Hoody_w_3.jpg",
        name: "AE FLEECE COLORBLOCK HOODIE",
        price: 89.95
      },
      {
        img: "../../assets/img/Women/Hoody_w_4.jpg",
        name: "AE FLEECE COLORBLOCK HOODIE",
        price: 89.95
      },
    ]
  }

  constructor() { }

  getMenCategory(cat: string): Array<Item> {
    return [...this.menItems[cat]]
  }

  getWomenCategory(cat: string): Array<Item> {
    return [...this.womenItems[cat]]
  }

  // getHoodies(): Array<Item> {
  //   return [...this.menItems["Hoodies & Sweatshirts"]];
  // }

  // getJackets(): Array<Item> {
  //   return [...this.menItems["Jackets & Coats"]];
  // }
}
