import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { ShoppingBagComponent } from './shopping-bag.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
    { 
        path: "",
        component: ShoppingBagComponent
    },
    {
      path: ":id/order-history",
      component: OrderHistoryComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ShoppingBagRoutingModule {

}