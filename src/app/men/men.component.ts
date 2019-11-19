import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../shared/item.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.scss']
})
export class MenComponent implements OnInit, OnDestroy {
  hoodies: Item[];
  jackets: Item[];
  routeSub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
      this.routeSub = this.route.data
        .subscribe(
          data => {
            this.hoodies = data.menItems["Hoodies & Sweatshirts"];
            this.jackets = data.menItems["Jackets & Coats"];
          }
        );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
