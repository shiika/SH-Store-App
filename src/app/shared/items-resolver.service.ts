import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Categories } from './categories.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { InStockService } from './in-stock.service';
import { WomanComponent } from '../woman/woman.component';
import { MenComponent } from '../men/men.component';

@Injectable({
    providedIn: 'root'
})

export class ItemsResolverService implements Resolve<Categories> {
    constructor(private inStock: InStockService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Categories> | Promise<Categories> | Categories {
        if (route.component == WomanComponent) {
            console.log("womaaan!");
            return this.inStock.fetchItems("women");
        } else if (route.component == MenComponent) {
            return this.inStock.fetchItems("men");
        }
    }
}