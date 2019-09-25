import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item.model';
import { InStockService } from '../shared/in-stock.service';

@Component({
    selector: "app-woman",
    templateUrl: "./woman.component.html",
    styleUrls: ["./woman.component.scss"]
})

export class WomanComponent implements OnInit {
    hoodies: Item[];
    jackets: Item[];

    constructor(private inStock: InStockService) {}

    ngOnInit() {
        this.hoodies = this.inStock.getWomenCategory("Hoodies & Sweatshirts");
        // this.jackets = this.inStock.getWomenCategory("Jackets & Coats");
    }
}