import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Categories } from './categories.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})

export class ItemsResolverService implements Resolve<Categories> {
    constructor(private dataService: DataService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Categories> | Promise<Categories> | Categories {
        const gender = route.params["gender"];
        return this.dataService.fetchItems(gender);
        // if (route.component == WomanComponent) {
        //     return this.dataService.fetchItems("women");
        // } else if (route.component == MenComponent) {
        //     return this.dataService.fetchItems("men");
        // }
    }
}