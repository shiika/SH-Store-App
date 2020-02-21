import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment, Route } from '@angular/router';
import { User } from './user.model';
import { BasketService } from './basket.service';

@Injectable({providedIn: "root"})

export class CanLoadShoppingBagService implements CanLoad {
    constructor(private authService: AuthService, private basketService: BasketService) {}

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.userAuthentication
            .pipe(
                take(1),
                map(
                    (user: User) => {
                        if (!!user) {
                            return true;
                        } else {
                            this.authService.redirectToLogin(route.path);
                            return false;
                        }
                    }
                )
            )
    }
}