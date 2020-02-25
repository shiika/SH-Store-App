import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../shared/item.model';
import { Subscription } from 'rxjs';
import { BasketService } from '../../shared/basket.service';
import { DataService } from 'src/app/shared/data.service';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/shared/product.model';

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
  editMode: boolean;
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
    this.editMode = !!this.route.snapshot.fragment;
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



  updateCart() {
    const newProduct = new Product(this.item.img, this.item.name, this.color, this.size, this.item.price, this.item.id, this.gender, this.category, 1);
    
    if (this.editMode) {
      this.basket.editProduct(+this.item.id, newProduct);
    } else {
      this.basket.addProduct(newProduct);
    }
  }
  ngOnDestroy() {
    this.resolverSub.unsubscribe();
  }
}
