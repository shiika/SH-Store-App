import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { DropdownDirective } from './navbar/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { PlaceholderDirective } from './placeholder.directive';
import { AccountComponent } from './account/account.component';
import { CategoryComponent } from './category/category.component';
import { DetailsComponent } from './details/details.component';
import { GenderComponent } from './gender/gender.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    PlaceholderDirective,
    AccountComponent,
    CategoryComponent,
    DetailsComponent,
    GenderComponent,
    TestimonialsComponent,
    ShoppingBagComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent
  ]
})
export class AppModule { }
