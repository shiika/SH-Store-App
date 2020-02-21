import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DropdownDirective } from './navbar/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './authentication/auth.module';
import { SharedModule } from './shared/shared.module';
import { PlaceholderDirective } from './placeholder.directive';
import { HomeComponent } from './home/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    SharedModule
  ],

  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
