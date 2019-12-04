import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenComponent } from "./men/men.component";
import { HomeComponent } from "./home/home.component";
import { WomanComponent } from "./woman/woman.component";
import { ItemsResolverService } from "./shared/items-resolver.service";
import { AccountComponent } from "./account/account.component";
import { CategoryComponent } from './category/category.component';

const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "account",
        component: AccountComponent
    },
    {
        path: "men",
        component: MenComponent,
        resolve: {items: ItemsResolverService}
    },
    {
        path: "women",
        component: WomanComponent,
        resolve: {items: ItemsResolverService}  
    },
    {
        path: ":gender/category",
        component: CategoryComponent
    },
    { path: "home", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
