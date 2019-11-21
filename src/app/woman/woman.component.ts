import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../shared/item.model';
import { InStockService } from '../shared/in-stock.service';
import { Subscription } from 'rxjs';

@Component({
    selector: "app-woman",
    templateUrl: "./woman.component.html",
    styleUrls: ["./woman.component.scss"]
})

export class WomanComponent implements OnInit, OnDestroy {
    hoodies: Item[];
    jeans: Item[];
    itemsSub: Subscription;

    constructor(private inStock: InStockService) {}

    ngOnInit() {
        this.itemsSub = this.inStock.womenLoader
            .subscribe(
                data => {
                    this.hoodies = data["Hoodies & Sweatshirts"];
                    this.jeans = data["Jeans"];
                }
            )
    }

    ngOnDestroy() {
        this.itemsSub.unsubscribe();
    }
    
}