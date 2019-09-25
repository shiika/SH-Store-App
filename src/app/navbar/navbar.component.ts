import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild("search", {static: true}) searchItem: ElementRef

  constructor(
    private renderer: Renderer2, 
    private elRef: ElementRef) { }

  ngOnInit() {
      this.searchItem.nativeElement.addEventListener("mouseenter", (e) => {
        e.target.previousSibling.classList.toggle("active");
      });

      this.searchItem.nativeElement.addEventListener("mouseleave", (e) => {
        e.target.previousSibling.classList.toggle("active");
      })
      
  }

  collapse(info: object) {
      if (info["collapse"]) {
        this.renderer.addClass(this.elRef.nativeElement.querySelector(info["target"]), "show");
      } else {
        this.renderer.removeClass(this.elRef.nativeElement.querySelector(info["target"]), "show");
      }
  }

}
