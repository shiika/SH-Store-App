import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    constructor(private authService: AuthService, private router: Router) {}
    authObs: Observable<any>;
    errorMessage: string = null;
    @ViewChild('authForm') authForm: NgForm;

    @Output() closeComp: EventEmitter<any> = new EventEmitter<any>();


    submitForm() {
        const { email, password } = this.authForm.form.value;
        this.authObs = this.authService.signIn({email, password}).pipe(take(1));
        
        
        this.authObs
        .subscribe(
            () => {
                this.closeComp.emit();
            },
            err => {
                this.errorMessage = err || "Network Error";
            }
        );
        this.authForm.reset();
        
    }

    onClose() {
        this.closeComp.emit();
        this.authService.redirectUrl = "";
    }

    navigateToSignup() {
        this.router.navigate(['./account']);
    }

}