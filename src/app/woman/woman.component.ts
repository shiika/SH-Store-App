import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/item.model';
import { ActivatedRoute } from '@angular/router';

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
        // returning data["0"] as we recieve firebase database node in the form of 
            // {0: {"Hoodies & Sweatshirts" Array[4]}}
        // so we map data to desirable form
        this.route.data
            .subscribe(
                data => {
                    this.hoodies = data.womenItems["Hoodies & Sweatshirts"];
                    this.jeans = data.womenItems["Jeans"];
                }
            )
    }

    
}