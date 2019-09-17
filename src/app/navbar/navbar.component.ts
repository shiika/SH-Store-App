import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit() {
  }

  collapse(info: object) {
      if (info["collapse"]) {
        this.renderer.addClass(this.elRef.nativeElement.querySelector(info["target"]), "show");
      } else {
        this.renderer.removeClass(this.elRef.nativeElement.querySelector(info["target"]), "show");
      }
  }

  dropdownToggle(target: string) {
    this.renderer.addClass(this.elRef.nativeElement.querySelector(target), "show");
  }


}
