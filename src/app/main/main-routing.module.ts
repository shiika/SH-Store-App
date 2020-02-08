import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { GenderComponent } from './gender/gender.component';
import { ItemsResolverService } from '../shared/items-resolver.service';
import { CategoryComponent } from './category/category.component';
import { ItemResolver } from '../shared/item.resolver';

const routes: Routes = [
    { path: "home", component: HomeComponent },
    {
        path: "store/:gender",
        children: [
          {
            path: "",
            component: GenderComponent,
            resolve: { items: ItemsResolverService }
          },
          {
            path: ":category",
            component: CategoryComponent
          },
          {
            path: ":category/:id",
            component: DetailsComponent,
            resolve: {item: ItemResolver}
          }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainRoutingModule {

}