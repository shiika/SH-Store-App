import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item.model';
import { InStockService } from '../shared/in-stock.service';
import { Categories } from '../shared/categories.model';

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
        this.getWomen();
        this.inStock.womenItemsFetched
            .subscribe(
                (items: Categories) => {
                    this.hoodies = items["Hoodies & Sweatshirts"];
                }
            )
    }

    private getWomen() {
        this.inStock.fetchWomen();
    }

    
}