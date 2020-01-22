import { Directive, Renderer2, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector: "[detailSelector]"
})

export class DetailDirective {
    constructor(private renderer: Renderer2, private elRef: ElementRef) {}

    @HostListener("mousedown") onClick() {
        for (let child of this.elRef.nativeElement.parentElement.children) {
            this.renderer.removeClass(child, "active");
        }

        this.renderer.addClass(this.elRef.nativeElement, "active");
    }
}