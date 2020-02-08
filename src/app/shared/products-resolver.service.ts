import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product } from './product.model';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { BasketService } from './basket.service';
import { DataService } from './data.service';

@Injectable({providedIn: 'root'})

export class ProductsResolverService implements Resolve<Product[]> {
    constructor(private basketService: BasketService, private dataService: DataService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Product[]> | Promise<Product[]> | Product[] {
        console.log("resolved!");
        return this.dataService.fetchBasket()
            .pipe(
                take(1),
                tap(
                    products => {
                        this.basketService.onFetchProducts(products);
                    }
                )
                );
    }

}