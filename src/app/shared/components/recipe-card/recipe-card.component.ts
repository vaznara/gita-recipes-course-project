import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IRecipeResponse } from '../../interfaces/interface';
import { Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { UserAccessDirective } from '../../directives/user-access.directive';

@Component({
  selector: 'rcp-recipe-card',
  standalone: true,
  imports: [UserAccessDirective, NgOptimizedImage],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeCardComponent {
  @Input() recipe?: IRecipeResponse;
  @Input() isPriorityImage: boolean = false;

  constructor(private router: Router) {}

  onEdit(): void {
    this.router.navigate([`/recipe/edit`], { state: { recipe: this.recipe } });
  }

  onView(): void {
    this.router.navigate([`/recipe/view`], { state: { recipe: this.recipe } });
  }
}
