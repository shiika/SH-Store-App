import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { InStockService } from './shared/in-stock.service';

import * as firebase from "firebase/app";
import 'firebase/database';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private inStock: InStockService) {}

  ngOnInit() {
    const firebaseConfig = {
      apiKey: "AIzaSyB3hy4SAeurJT6IUoBnX3geh9hnARxBuU8",
      authDomain: "shopping-store-1fe69.firebaseapp.com",
      databaseURL: "https://shopping-store-1fe69.firebaseio.com",
      projectId: "shopping-store-1fe69",
      storageBucket: "shopping-store-1fe69.appspot.com",
      messagingSenderId: "593833896330",
      appId: "1:593833896330:web:ebbc5c070c2b42fd4ec073",
      measurementId: "G-JV3EX0RXB9"
    };
    firebase.initializeApp(firebaseConfig);
  }


  
}
