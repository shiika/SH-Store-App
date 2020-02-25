import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, concatMap, tap, take } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { UserInfo } from './userInfo.model';
import { Product } from './product.model';
import { BasketService } from './basket.service';

interface ResPayload {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    displayName?: string;
    registered?: boolean;
}

@Injectable({providedIn: "root"})

export class AuthService {
    constructor(
        private http: HttpClient, 
        private router: Router, 
        private basket: BasketService) {}

    userAuthentication: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    onAuthenticate = new EventEmitter<any>();
    administration: boolean = false;
    redirectUrl: string = "/home";

    signUp(authInfo: {email: string; password: string}, username: string, userInfo: UserInfo) {
        return this.http.post<ResPayload>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3hy4SAeurJT6IUoBnX3geh9hnARxBuU8", {
            ...authInfo,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            concatMap(
                (payload: ResPayload) => {
                    return this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB3hy4SAeurJT6IUoBnX3geh9hnARxBuU8", {
                        idToken: payload.idToken,
                        displayName: username,
                        deleteAttribute: ["PHOTO_URL"],
                        returnSecureToken: true
                        
                    })
                }
            ),
            concatMap(
                _ => {
                    return this.signIn(authInfo);
                }
            ),
            concatMap(
                (payload: ResPayload) => {
                    const userData = {...userInfo, products: []};
                    const userString = JSON.stringify(userData);
                    const userId = payload.localId;
                    const userToken = payload.idToken;
                    return this.http.put(`https://shopping-store-1fe69.firebaseio.com/users/${userId}.json?auth=${userToken}`, userString);
                }
            )
        )
    }

    signIn(authInfo: {email: string; password: string}) {
        return this.http.post<ResPayload>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3hy4SAeurJT6IUoBnX3geh9hnARxBuU8", {
            ...authInfo,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(this.handleAuthentication.bind(this))
        )
    }

    fetchBasket() {
        let userInfo: User;
        this.userAuthentication.pipe(take(1)).subscribe(user => { userInfo = user });
        return this.http.get<Product[]>(`https://shopping-store-1fe69.firebaseio.com/users/${userInfo.id}/products.json?auth=${userInfo.token}`)
      }

    autoLogin() {
        const data = JSON.parse(localStorage.getItem("userData"));
        if (!data) {
            return;
        }
        const user = new User(data.email, data.id, data._token, new Date(data._tokenExpirationDate), data.username);
        this.userAuthentication.next(user);
        const expiredDuration = (new Date(data._tokenExpirationDate).getTime() - new Date().getTime());
        this.autoLogout(expiredDuration);
        this.fetchBasket().pipe(take(1)).subscribe();
    }

    logout() {
        this.administration = false;
        this.userAuthentication.next(null);
        localStorage.clear();
        this.router.navigate(["/home"]);
    }

    private autoLogout(expirationDuration: number) {
        setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleError(errRes: HttpErrorResponse) {
        let errMessage = "An unknown error has occured!";
        if (!errRes.error || !errRes.error.error) {
            return throwError(errMessage);
        }

        switch (errRes.error.error.message) {
            case "EMAIL_EXISTS": 
                return throwError("The email address is already in use by another account.");
            
            case "OPERATION_NOT_ALLOWED":
                return throwError("This account has been disabled.");

            case "EMAIL_NOT_FOUND":
                return throwError("Email is not found");

            case "INVALID_PASSWORD":
                return throwError("Password is incorrect");
        }

        return throwError(errMessage);
    }

    private handleAuthentication(payload: ResPayload) {
        const { email, localId, idToken, expiresIn = "3600", displayName: username } = payload;
        const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000));
        const user = new User(email, localId, idToken, expirationDate, username);
        this.userAuthentication.next(user);
        localStorage.setItem("userData", JSON.stringify(user));
        this.router.navigate([this.redirectUrl]);
        this.autoLogout(+expiresIn * 1000);
        this.checkAdministration(email);
        this.fetchBasket()
            .pipe(
                take(1),
                tap(
                    products => {
                        this.basket.onFetchProducts(products);
                    }
                )
            )
            .subscribe();
    }

    checkAdministration(email: string) {
        this.administration = email.endsWith("@shopping.com");
        return this.administration;
    }

    redirectToLogin(url: string) {
        this.redirectUrl = url;
        this.emitLogin();
    }

    emitLogin() {
        this.onAuthenticate.emit();
    }
}