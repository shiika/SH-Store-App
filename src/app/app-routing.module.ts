import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';
import { AuthGuard } from './shared/auth.guard';
import { ProductsResolverService } from './shared/products-resolver.service';

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  { path: "basket",
    canActivate: [AuthGuard],
    component: ShoppingBagComponent,
    resolve: {products: ProductsResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
