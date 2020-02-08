import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Item } from './item.model';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({providedIn: "root"})
 
export class ItemResolver implements Resolve<Item> {
    constructor(private dataService: DataService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Item> | Promise<Item> | Item {
        const { gender, category, id } = route.params;
        return this.dataService.fetchItem(id, category, gender)
            .pipe(
                map(
                    (data) => {
                        const index = Object.keys(data)[0];
                        return data[index]
                    }
                )
            )
    }
}