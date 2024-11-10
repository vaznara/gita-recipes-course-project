import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../../shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, EMPTY, Subject, takeUntil } from 'rxjs';
import { IRecipe } from '../../shared/interfaces/interface';
import { RecipeHeaderComponent } from './components/recipe-header/recipe-header.component';
import { RecipeIngredientsComponent } from './components/recipe-ingredients/recipe-ingredients.component';
import { RecipeStepsComponent } from './components/recipe-steps/recipe-steps.component';

@Component({
  selector: 'rcp-recipe-view',
  standalone: true,
  imports: [RecipeHeaderComponent, RecipeIngredientsComponent, RecipeStepsComponent],
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.scss'
})
export class RecipeViewComponent implements OnInit, OnDestroy {

  private readonly ngUnsubscribe$: Subject<void> = new Subject();

  recipe?: IRecipe;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.ngUnsubscribe$),
      concatMap((params) => {
        const key = params.get('key');
        if (!key) {
          this.router.navigate(['/recipes']);
          return EMPTY;
        }

        return this.recipeService.getRecipe(key)
      })
    ).subscribe(res => this.recipe = res)
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
