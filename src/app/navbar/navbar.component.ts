import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { User } from '../shared/user.model';
import { DataService } from '../shared/data.service';
import { BasketService } from '../shared/basket.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = false;
  isAuthenticated: boolean;
  isAdmin: boolean;
  username: string = null;
  userId: string;
  userSub: Subscription;
  basketSub: Subscription;
  inBasketLength: number;

  lastScrollTop: number = 0;
  @ViewChild("navbar", {static: true}) navElement: ElementRef;
  @ViewChild("navBtn", {static: true}) navBtn: ElementRef;

  constructor(
    private authService: AuthService, 
    private renderer: Renderer2, 
    private dataService: DataService,
    private basket: BasketService) { }

  ngOnInit() {
      this.isAdmin = false;
      this.authService.userAuthentication.subscribe(
        (user: User) => {
          this.isAuthenticated = !!user;
          if (user) {
            this.userId = user.id;
            const newName = user.username.slice(0, user.username.indexOf(" "));
            this.username = this.authService.checkAdministration(user.email) ? "Admin" : `Hey, ${newName}`;
            this.isAdmin = this.authService.checkAdministration(user.email);
          }
        });

      this.basket.productsLoader
                        .subscribe(
                          (products: Product[]) => {
                            this.inBasketLength = products.length;
                          }
                        )

        const scrollEvent = fromEvent(window, "scroll");
        scrollEvent.pipe(
          debounceTime(17)
        ).subscribe(this.onScroll.bind(this));

        window.addEventListener("click", (e) => {
          this.isCollapsed = this.navBtn.nativeElement.contains(e.target) ? !this.isCollapsed : false;
        })
  }

  onAuth() {
    this.authService.emitLogin();
  }

  logout() {
    this.authService.logout();
    this.basket.clearProducts();
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

  onEditAccount() {
    this.dataService.getUserInfo();
  }

}
