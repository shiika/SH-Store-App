import { NgModule } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { DetailsComponent } from './details/details.component';
import { GenderComponent } from './gender/gender.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { HomeComponent } from './home/home.component';
import { DetailDirective } from './details/detail.directive';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SuggestionsPipe } from './details/suggestions.pipe';

@NgModule({
    declarations: [
        CategoryComponent,
        DetailsComponent,
        GenderComponent,
        HomeComponent,
        TestimonialsComponent,
        DetailDirective,
        SuggestionsPipe
    ],

    imports: [
        SharedModule,
        MainRoutingModule
    ]
})

export class MainModule {

}