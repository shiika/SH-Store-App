import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    constructor(private authService: AuthService) {}
    authObs: Observable<any>;
    errorMessage: string = null;
    @ViewChild('authForm', {static: false}) authForm: NgForm;

    @Output() closeComp: EventEmitter<any> = new EventEmitter<any>();


    submitForm() {
        const { email, password, username } = this.authForm.form.value;
        this.authObs = this.authService.signIn(email, password);
        
        this.authObs.subscribe(
            () => {
                this.closeComp.emit();
            },
            err => {
                this.errorMessage = err;
            }
        )
        
    }

    onClose() {
        this.closeComp.emit();
    }

}