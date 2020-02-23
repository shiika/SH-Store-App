import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";
import { CanLoadShoppingBagService } from './shared/can-load-shopping.service';
import { HomeComponent } from './home/home/home.component';

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },

  { path: "home", component: HomeComponent },
  {
    path: "store/:gender",
    loadChildren: () => import("./store/store.module").then(m => m.StoreModule)
  },
  { 
    path: "basket",
    loadChildren: () => import("./shopping-bag/shopping-bag.module").then(m => m.ShoppingBagModule),
    canLoad: [CanLoadShoppingBagService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
