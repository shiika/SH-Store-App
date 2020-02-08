import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../shared/item.model';
import { Subscription } from 'rxjs';
import { BasketService } from '../../shared/basket.service';
import { DataService } from 'src/app/shared/data.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit, OnDestroy {
  gender: string;
  category: string;
  item: Item;
  isCapable: boolean;
  resolverSub: Subscription;
  size: string = null;
  color: string = null;
  suggestions: Array<Item> = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private basket: BasketService,
    private router: Router) { }

  ngOnInit() {
    ({gender: this.gender, category: this.category} = this.route.snapshot.params);
    this.resolverSub = this.route.data
      .pipe(
        switchMap(
          (data: {item: Item}) => {
            this.item = data.item;
            return this.dataService.fetchSuggestions(this.gender, this.category)
          }
        )
      )
      .subscribe(
        (items: Item[]) => {
          this.suggestions = items;
        } 
      );

    this.isCapable = window.outerWidth > 970 ? true: false;
  }

  replaceLargeImg(img: string) {
    return img.replace(".jpg", "_lg.jpg");
  }

  navigateToItem(imgPath: string) {
    const id = this.suggestions.find(item => item["img"] == imgPath)['id'];
    this.router.navigate(["../", id], {relativeTo: this.route});
  }

  sizeSelected(size: string) {
    this.size = size;
  }

  colorSelected(color: string) {
    this.color = color;
  }

  addToCart() {
    this.basket.addProduct(this.item, this.size, this.color);
  }
  ngOnDestroy() {
    this.resolverSub.unsubscribe();
  }
}
