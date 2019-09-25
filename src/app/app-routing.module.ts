import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenComponent } from './men/men.component';
import { HomeComponent } from './home/home.component';
import { WomanComponent } from './woman/woman.component';

const appRoutes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    { path: 'categories', children: [
        { path: 'men', component: MenComponent },
        { path: 'women', component: WomanComponent }
    ] },
    { path: 'home', component: HomeComponent, data: { inHome: true } },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}