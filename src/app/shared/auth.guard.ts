import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from "rxjs/operators";
import { User } from "./user.model";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.userAuthentication.pipe(
        take(1),
        map(
          (user: User) => {
            if (!!user) {
              return true;
            } else {
              this.authService.redirectUrl = state.url;
              this.authService.emitLogin();
              return false;
            }
          }
        )
      )
    }
}
