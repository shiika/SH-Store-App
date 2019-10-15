import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item.model';
import { InStockService } from '../shared/in-stock.service';
import { Categories } from '../shared/categories.model';
import { ActivatedRoute } from '@angular/router';

import {map} from 'rxjs/operators';

@Component({
    selector: "app-woman",
    templateUrl: "./woman.component.html",
    styleUrls: ["./woman.component.scss"]
})

export class WomanComponent implements OnInit {
    hoodies: Item[];
    jeans: Item[];

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data
            .pipe(map(
                data => {
                    return data["0"];
                }
            ))
            .subscribe(
                womenItems => {
                    this.hoodies = womenItems["Hoodies & Sweatshirts"];
                    this.jeans = womenItems["Jeans"];
                }
            )
    }

    
}