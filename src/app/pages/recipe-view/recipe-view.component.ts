import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, EMPTY, Subject, takeUntil } from 'rxjs';
import { IRecipe, IRecipeResponse } from '../../shared/interfaces/interface';
import { RecipeHeaderComponent } from './components/recipe-header/recipe-header.component';
import { RecipeIngredientsComponent } from './components/recipe-ingredients/recipe-ingredients.component';
import { RecipeStepsComponent } from './components/recipe-steps/recipe-steps.component';
import { UserAccessDirective } from '../../shared/directives/user-access.directive';

@Component({
  selector: 'rcp-recipe-view',
  standalone: true,
  imports: [RecipeHeaderComponent, RecipeIngredientsComponent, RecipeStepsComponent, UserAccessDirective],
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.scss'
})
export class RecipeViewComponent implements OnInit, OnDestroy {

  private readonly ngUnsubscribe$: Subject<void> = new Subject();

  recipeKey: string | null = null;
  recipe?: IRecipe;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const recipe = history.state.recipe as IRecipeResponse;
    if (recipe) {
      this.recipeKey = recipe.key;
      this.recipe = recipe.recipe;
    } else {
      this.route.paramMap.pipe(
        takeUntil(this.ngUnsubscribe$),
        concatMap((params) => {
          this.recipeKey = params.get('key');
          if (!this.recipeKey) {
            this.router.navigate(['/recipes']);
            return EMPTY;
          }
          return this.recipeService.getRecipe(this.recipeKey)
        })
      ).subscribe(res => this.recipe = res)
    }
  }

  onPrint(): void {
    window.print();
  }

  onEdit(): void {
    this.router.navigate([`/user/recipe/edit`], { state: { recipe: { key: this.recipeKey, recipe: this.recipe } } });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
