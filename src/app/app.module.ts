import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DropdownDirective } from './navbar/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';
import { MainModule } from './main/main.module';
import { AuthModule } from './authentication/auth.module';
import { SharedModule } from './shared/shared.module';
import { PlaceholderDirective } from './placeholder.directive';
import { ShippingComponent } from './shopping-bag/shipping/shipping.component';
import { PlaceholderComponent } from './shopping-bag/placeholder/placeholder.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    NavbarComponent,
    FooterComponent,
    ShoppingBagComponent,
    PlaceholderDirective,
    ShippingComponent,
    PlaceholderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MainModule,
    AuthModule,
    SharedModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
