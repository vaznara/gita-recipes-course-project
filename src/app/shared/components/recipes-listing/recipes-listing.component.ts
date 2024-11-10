import { Component, Input } from '@angular/core';
import { ICategory, IRecipeResponse } from '../../interfaces/interface';
import { Router, RouterLink } from '@angular/router';
import { UserAccessDirective } from '../../directives/user-access.directive';

@Component({
  selector: 'rcp-recipes-listing',
  standalone: true,
  imports: [RouterLink, UserAccessDirective],
  templateUrl: './recipes-listing.component.html',
  styleUrl: './recipes-listing.component.scss'
})
export class RecipesListingComponent {

  @Input() category: ICategory | null = null;
  @Input() recipes: IRecipeResponse[] = [];

  constructor(private router: Router) { }

  onEdit(key: string): void {
    this.router.navigate([`/user/recipe/edit/${key}`]);
  }
}
