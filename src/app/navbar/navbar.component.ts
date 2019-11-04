import { Component, OnInit, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isCollapsed: boolean = false;
  isAuthenticated: boolean = false;
  username: string = null;
  userSub: Subscription;
  @Output() onAuthenticate = new EventEmitter<any>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.userSub = this.authService.userAuthentication.subscribe(
        user => {
          this.isAuthenticated = !!user;
          user ? this.username = user.username : this.username = null;
        });
  }

  onAuth() {
    this.onAuthenticate.emit();
  }

  logout() {
    this.authService.logout();
  }

  onCollapse() {
      this.isCollapsed = !this.isCollapsed;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
