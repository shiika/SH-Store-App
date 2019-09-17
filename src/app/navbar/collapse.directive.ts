import { Directive, Renderer2, ElementRef, HostListener, Output, EventEmitter } from "@angular/core";

@Directive({
  selector: '[appCollapse]'
})
export class CollapseDirective {
  @Output("onCollapse") onCollapse = new EventEmitter<object>();

  info: {
    target: string,
    collapse: boolean
  } = {
    target: this.elRef.nativeElement.dataset.target,
    collapse: false
  };
  
  
  constructor(private renderer: Renderer2, private elRef: ElementRef) {}

  @HostListener("mouseenter", ["$event"]) onDropdown() {
    if (event.target["tagName"] != "BUTTON") {
      const id = event.target["dataset"].target;
      this.renderer.addClass(this.elRef.nativeElement.querySelector(id), "show");
      setTimeout(() => {
        this.renderer.addClass(this.elRef.nativeElement.querySelector(id), "animate");
      }, 10);
    }
    
  }
  
  @HostListener("mouseleave", ["$event"]) onDropup() {
    if (event.target["tagName"] != "BUTTON") {
      const id = event.target["dataset"].target;
      this.renderer.removeClass(this.elRef.nativeElement.querySelector(id), "animate");
      setTimeout(() => {
        this.renderer.removeClass(this.elRef.nativeElement.querySelector(id), "show");
      }, 300);
    }
  }

   @HostListener("document:click", ["$event"]) onClick() {
      this.slideIn(event);
      
   }

   private slideIn(event: Event) {
      if (this.elRef.nativeElement.contains(event.target)) {
        this.onCollapse.emit({
          target: this.elRef.nativeElement.dataset.target,
          collapse: !this.info["collapse"]
        });
        this.info["collapse"] = !this.info["collapse"];
      } else {
        this.onCollapse.emit(this.info)
      }
   }

}
