import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { InStockService } from './shared/in-stock.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private inStock: InStockService) {}

  ngOnInit() {
    
  }
  
}
