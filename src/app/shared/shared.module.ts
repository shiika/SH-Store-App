import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TestimonialsComponent } from './testimonials/testimonials.component';

@NgModule({
    declarations: [
        TestimonialsComponent
    ],

    imports: [
        CommonModule,
        ReactiveFormsModule
    ],

    exports: [
        CommonModule,
        ReactiveFormsModule,
        TestimonialsComponent
    ]
})

export class SharedModule {

}