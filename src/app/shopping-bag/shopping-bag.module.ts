import { NgModule } from '@angular/core';
import { ShippingComponent } from './shipping/shipping.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ShoppingBagComponent } from './shopping-bag.component';
import { SharedModule } from '../shared/shared.module';
import { ShoppingBagRoutingModule } from './shopping-bag-routing.module';

@NgModule({
    declarations: [
        ShippingComponent,
        PlaceholderComponent,
        OrderHistoryComponent,
        ShoppingBagComponent
    ],

    imports: [
        SharedModule,
        ShoppingBagRoutingModule
    ]
})

export class ShoppingBagModule {

}