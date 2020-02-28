import { Directive, Renderer2, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener("mouseenter", ["$event"]) onHover(e) {
      this.renderer.addClass(this.elRef.nativeElement.lastElementChild, "show");
  }

  @HostListener("mouseleave") onLeave() {
      this.renderer.removeClass(this.elRef.nativeElement.lastElementChild, "show");
  }
  
}
