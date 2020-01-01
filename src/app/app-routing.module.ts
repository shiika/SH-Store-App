import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ItemsResolverService } from "./shared/items-resolver.service";
import { AccountComponent } from "./account/account.component";
import { CategoryComponent } from './category/category.component';
import { DetailsComponent } from './details/details.component';
import { GenderComponent } from './gender/gender.component';

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },

  { path: "home", component: HomeComponent },

  {
    path: "account",
    component: AccountComponent
  },

  {
    path: ":gender",
    children: [
      {
        path: "",
        component: GenderComponent,
        resolve: { items: ItemsResolverService }
      },
      {
        path: ":category",
        component: CategoryComponent
      },
      {
        path: ":category/:id",
        component: DetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
