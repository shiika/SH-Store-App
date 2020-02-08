import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'src/app/shared/item.model';

@Pipe({
    name: "suggestionsImages"
})

export class SuggestionsPipe implements PipeTransform {
    transform(value: Item[]) {
        return value.map(item => item.img);
    }
}