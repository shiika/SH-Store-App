import { Component, OnInit, ViewChild, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  testimonials: Array<string> = [
    '../../assets/img/17026-min.jpg',
    "../../assets/img/590335-PMG3Q5-312-min.jpg",
    "../../assets/img/17251-min.jpg",
    "../../assets/img/riki--1OKgmz4bmo-unsplash-min.jpg",
    "../../assets/img/riki-nLv9Ne4uqro-unsplash-min.jpg",
    "../../assets/img/doran-_RzFdVWffmU-unsplash-min.jpg",
    '../../assets/img/17026-min.jpg',
    "../../assets/img/590335-PMG3Q5-312-min.jpg",
    "../../assets/img/17251-min.jpg"
  ];

  @ViewChild("img", {static: true}) img: ElementRef;

  @ViewChild("carouselContainer", { static: true }) container: ElementRef;
  slideSpace: number = 0;
  extraRight: number;
  extraLeft: number;
  

  constructor(private renderer: Renderer2, private route: ActivatedRoute, private elRef: ElementRef) {
    
  }

  ngOnInit() {
    this.extraRight = +this.container.nativeElement.dataset.extraRight;
    this.extraLeft = +this.container.nativeElement.dataset.extraLeft;
  }

  onSlideLeft() {
    if (this.extraRight > 0 ) {
      this.slideSpace -= this.container.nativeElement.children[1].offsetLeft;
      this.container.nativeElement.style.transform = `translateX(${this.slideSpace}px)`;
      this.extraRight--;
      this.extraLeft++;
    } 
    
  }

  onSlideRight() {
    if (this.extraLeft > 0 ) {
      this.slideSpace += this.container.nativeElement.children[1].offsetLeft;
      this.container.nativeElement.style.transform = `translateX(${this.slideSpace}px)`;
      this.extraRight++;
      this.extraLeft--;
    }
    
  }

  onScroll(e: Event) {
    console.log(e);
  }

}
