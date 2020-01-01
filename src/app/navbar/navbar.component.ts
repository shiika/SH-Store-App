import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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

  lastScrollTop: number = 0;
  @ViewChild("navbar", {static: true}) navElement: ElementRef;

  constructor(private authService: AuthService, private renderer: Renderer2) { }

  ngOnInit() {
      this.userSub = this.authService.userAuthentication.subscribe(
        user => {
          this.isAuthenticated = !!user;
          if (user) {
            const newName = user.username.slice(0, user.username.indexOf(" "));
            this.username = newName;
          } else {
            this.username = null;
          }
        });

        const scrollEvent = fromEvent(window, "scroll");
        scrollEvent.pipe(
          debounceTime(17)
        ).subscribe(this.onScroll.bind(this));
  }

  onAuth() {
    this.authService.emitLogin();
  }

  logout() {
    this.authService.logout();
  }

  onCollapse() {
      this.isCollapsed = !this.isCollapsed;
  }

  onScroll(e: Event) {
    let presentScroll: number = window.scrollY;
    if (presentScroll >= (this.lastScrollTop) && presentScroll >= this.navElement.nativeElement.clientHeight) {
      this.renderer.addClass(this.navElement.nativeElement, "nav-up");
    } else {
      this.renderer.removeClass(this.navElement.nativeElement, "nav-up");
    }
    
    this.lastScrollTop = presentScroll;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
