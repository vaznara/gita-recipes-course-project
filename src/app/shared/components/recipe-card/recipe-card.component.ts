import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IRecipeResponse } from '../../interfaces/interface';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';
import { UserAccessDirective } from '../../directives/user-access.directive';

@Component({
  selector: 'rcp-recipe-card',
  standalone: true,
  imports: [NgStyle, UserAccessDirective],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeCardComponent {

  @Input() recipe?: IRecipeResponse;

  constructor(private router: Router) { }

  onEdit(): void {
    this.router.navigate([`/user/recipe/edit`], { state: { recipe: this.recipe } });
  }

  onView(): void {
    this.router.navigate([`/recipe/view`], { state: { recipe: this.recipe } });
  }
}
