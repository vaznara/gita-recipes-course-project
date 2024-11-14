import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICategory, IRecipeResponse } from '../../interfaces/interface';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';

@Component({
  selector: 'rcp-recipes-listing',
  standalone: true,
  imports: [RecipeCardComponent],
  templateUrl: './recipes-listing.component.html',
  styleUrl: './recipes-listing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesListingComponent {
  @Input() category: ICategory | null = null;
  @Input() recipes: IRecipeResponse[] = [];
}
