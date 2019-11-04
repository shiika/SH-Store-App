import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, concatMap, tap, take } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

interface ResPayload {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    displayName?: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})


export class AuthService {
    constructor(private http: HttpClient) {}

    userAuthentication: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    signUp(email: string, password: string, username?: string) {
        return this.http.post<ResPayload>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB3hy4SAeurJT6IUoBnX3geh9hnARxBuU8", {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            take(1),
            // Following the signup request with an edit POST request to assign a username to the user
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
            catchError(this.handleError)
        )
    }

    signIn(email: string, password: string) {
        return this.http.post<ResPayload>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB3hy4SAeurJT6IUoBnX3geh9hnARxBuU8", {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            take(1),
            catchError(this.handleError),
            tap(this.handleAuthentication.bind(this))
        )
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
    }

    logout() {
        this.userAuthentication.next(null);
        localStorage.clear();
    }

    private autoLogout(expirationDuration: number) {
        setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleError(errRes: HttpErrorResponse) {
        let errMessage = "A unknown error has occured!";
        if (!errRes.error || errRes.error.error) {
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
        const { email, localId, idToken, expiresIn, displayName: username } = payload;
        const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000));
        const user = new User(email, localId, idToken, expirationDate, username);
        this.userAuthentication.next(user);
        localStorage.setItem("userData", JSON.stringify(user));
        this.autoLogout(expirationDate.getTime());
    }
}