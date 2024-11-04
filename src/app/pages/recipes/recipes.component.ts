import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ICategory, IRecipe } from '../../shared/interfaces/interface';
import { concatMap, EMPTY, Subject, takeUntil } from 'rxjs';
import { CategoryService, RecipeService } from '../../shared/services';

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
  recipes?: IRecipe[];

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private recipeService: RecipeService) {

  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.ngUnsubscribe$),
      concatMap(res => {
        const id = res.get('id');
        if (id) return this.categoryService.getCategory(+id);
        return EMPTY;
      }),
      concatMap(res => {
        this.category = res;
        if (this.category?.id) {
          return this.recipeService.getRecipesByCategoryId(this.category?.id);
        }
        return EMPTY;
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
