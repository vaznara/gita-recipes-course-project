import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICategory, IRecipeResponse } from '../../shared/interfaces/interface';
import { concatMap, Subject, takeUntil } from 'rxjs';
import { RecipeService } from '../../shared/services';

@Component({
  selector: 'rcp-recipes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit, OnDestroy {

  ngUnsubscribe$: Subject<void> = new Subject();

  category?: ICategory;
  recipes: IRecipeResponse[] = [];

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService) {

  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.ngUnsubscribe$),
      concatMap(res => {
        const categoryKey = res.get('key');
        return categoryKey ? this.recipeService.getRecipesByCategory(categoryKey) : this.recipeService.getRecipes();
      })
    )
      .subscribe(res => {
        this.recipes = res;
      })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
