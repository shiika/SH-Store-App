import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { LoginComponent } from './login/login.component';

import { PlaceholderDirective } from './placeholder.directive';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  loginClosingSub: Subscription;
  authSub: Subscription;
  @ViewChild(PlaceholderDirective, {static: false}) hostDirective: PlaceholderDirective;
  constructor(
    private compFacRes: ComponentFactoryResolver,
    private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.authSub = this.authService.onAuthenticate.subscribe(
      () => {
          const loginCompFac = this.compFacRes.resolveComponentFactory(LoginComponent);
          const hostComp = this.hostDirective.viewContRef;

          hostComp.clear();
          const loginComp = hostComp.createComponent(loginCompFac);
          this.loginClosingSub = loginComp.instance.closeComp.subscribe(
            () => {
              this.loginClosingSub.unsubscribe();
              hostComp.clear();
            }
          )
      }
    )
  }

}
