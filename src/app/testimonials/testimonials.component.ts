import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  @Input("images") testimonials: Array<string>;
  @Output("onSelectItem") onSelectItem: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild("carouselContainer", { static: true }) container: ElementRef;
  @ViewChild("arrowRight", {static: true}) arrowRight: ElementRef; 
  @ViewChild("arrowLeft", {static: true}) arrowLeft: ElementRef; 
  slideSpace: number = 0;
  extraRight: number;
  extraLeft: number;
  

  constructor() {
    
  }

  ngOnInit() {
    this.extraRight = +this.testimonials.length - 6;
    this.extraLeft = 0;
    console.log(this.testimonials)
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

  onSelect(imgPath: string) {
    this.onSelectItem.emit(imgPath);
  }

}
