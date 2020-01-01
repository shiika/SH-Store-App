import { Directive, Renderer2, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener("mouseenter") onHover() {
    this.renderer.addClass(this.elRef.nativeElement.lastChild, "show");
      setTimeout(() => {
        this.renderer.addClass(this.elRef.nativeElement.lastChild, "slideIn");
      }, 100);
  }

  @HostListener("mouseleave") onLeave() {
    this.renderer.removeClass(this.elRef.nativeElement.lastChild, "slideIn");
    setTimeout(() => {
      this.renderer.removeClass(this.elRef.nativeElement.lastChild, "show");
    }, 100);
  }

}
