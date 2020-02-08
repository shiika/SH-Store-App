import { NgModule } from '@angular/core';
import { AccountComponent } from './account/account.component';
import { RouterModule } from '@angular/router';
import { ConfirmDeactivateGuard } from "./account/can-deactivate.guard";
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AccountComponent,
        LoginComponent
    ],

    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild([{
            path: "account",
            component: AccountComponent,
            canDeactivate: [ConfirmDeactivateGuard]
        }])
    ],

    exports: [RouterModule],

    entryComponents: [LoginComponent]

})

export class AuthModule {

}