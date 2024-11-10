import { Component, Input } from '@angular/core';
import { IIngredient } from '../../../../shared/interfaces/interface';

@Component({
  selector: 'rcp-recipe-ingredients',
  standalone: true,
  imports: [],
  templateUrl: './recipe-ingredients.component.html',
  styleUrl: './recipe-ingredients.component.scss'
})
export class RecipeIngredientsComponent {

  @Input() ingredients: IIngredient[] = [];
}
