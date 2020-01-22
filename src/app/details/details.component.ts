import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InStockService } from '../shared/stock.service';
import { Item } from '../shared/item.model';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/data.service';

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
  sizes: string[];
  colors: string[];
  isCapable: boolean;
  paramsSub: Subscription;

  constructor(
    private route: ActivatedRoute, 
    private inStock: InStockService,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    ({gender: this.gender, category: this.category} = this.route.snapshot.params);
    this.paramsSub = this.dataService.fetchItem(id, this.category, this.gender)
      .subscribe(
        (res) => {
          const index = Object.keys(res)[0];
          this.item = res[index];
          ({color: this.colors, size: this.sizes} = this.item);
          console.log(res[index]);
        }
      );

    this.isCapable = window.outerWidth > 970 ? true: false;
  }

  replaceLargeImg(img: string) {
    return img.replace(".jpg", "_lg.jpg");
  }

  // getSuggestions() {
  //   console.log(this.inStock.loadSuggestions());
  //   return this.inStock.loadSuggestions();
  // }

  navigateToItem(imgPath: string) {
    const id = this.inStock.loadSuggestions().find(item => item["img"] == imgPath)['id'];
    this.router.navigate(["../", id], {relativeTo: this.route});
  }



  addToCart() {
    // this.basket.addProduct(this.item);
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
