import { NgModule } from '@angular/core';
import { CategoryComponent } from './category/category.component';
import { DetailsComponent } from './details/details.component';
import { GenderComponent } from './gender/gender.component';
import { DetailDirective } from './details/detail.directive';
import { SharedModule } from '../shared/shared.module';
import { SuggestionsPipe } from './details/suggestions.pipe';
import { StoreRoutingModule } from './store-routing.module';

@NgModule({
    declarations: [
        CategoryComponent,
        DetailsComponent,
        GenderComponent,
        DetailDirective,
        SuggestionsPipe
    ],

    imports: [
        SharedModule,
        StoreRoutingModule
    ]
})

export class StoreModule {

}