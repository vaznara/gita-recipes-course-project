import { Component, Input } from '@angular/core';
import { ICategory, IRecipeResponse } from '../../interfaces/interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'rcp-recipes-listing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipes-listing.component.html',
  styleUrl: './recipes-listing.component.scss'
})
export class RecipesListingComponent {

  @Input() category: ICategory | null = null;
  @Input() recipes: IRecipeResponse[] = [];
}
