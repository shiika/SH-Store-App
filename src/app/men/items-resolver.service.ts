import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Categories } from '../shared/categories.model';
import { Observable } from 'rxjs';


export class ItemsResolverService implements Resolve<Categories> {
    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<Categories> | Promise<Categories> | Categories {
            return 
        }
}