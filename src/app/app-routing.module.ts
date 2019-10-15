import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenComponent } from './men/men.component';
import { HomeComponent } from './home/home.component';
import { WomanComponent } from './woman/woman.component';
import { ItemsResolverService } from './shared/items-resolver.service';

const appRoutes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    { path: 'categories', children: [
        { path: 'men', component: MenComponent, resolve: [ItemsResolverService] },
        { path: 'women', component: WomanComponent, resolve: [ItemsResolverService] }
    ] },
    { path: 'home', component: HomeComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}