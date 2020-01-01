import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { InStockService } from '../shared/stock.service';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailsComponent implements OnInit {
  gender: string;
  category: string;
  item: Item;

  constructor(
    private route: ActivatedRoute, 
    private inStock: InStockService,
    private router: Router) { }

  ngOnInit() {
    this.gender = this.route.snapshot.params["gender"];
    this.route.params
      .subscribe(
        (params: Params) => {
          this.item = this.inStock.loadItem(+params["id"]);
        }
      )
    this.category = this.route.snapshot.params["category"];
  }

  replaceLargeImg(img: string) {
    return img.replace(".jpg", "_lg.jpg");
  }

  getSuggestions() {
    const suggestionsImages: Array<string> = [];
    for (let item of this.inStock.loadSuggestions()) {
      suggestionsImages.push(item.img)
    }
    return suggestionsImages;
  }

  navigateToItem(imgPath: string) {
    const id = this.inStock.loadSuggestions().find(item => item["img"] == imgPath)['id'];
    this.router.navigate(["../", id], {relativeTo: this.route});
  }


}
