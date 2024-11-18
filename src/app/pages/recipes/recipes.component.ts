import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory, IRecipeResponse } from '../../shared/interfaces/interface';
import { concatMap, of, Subject, take, takeUntil } from 'rxjs';
import { CategoryService, RecipeService } from '../../shared/services';
import { RecipesListingComponent } from '../../shared/components/recipes-listing/recipes-listing.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'rcp-recipes',
  standalone: true,
  imports: [RecipesListingComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent implements OnInit, OnDestroy {
  ngUnsubscribe$: Subject<void> = new Subject();

  private readonly pageSize: number = 20;

  category: ICategory | null = null;
  categoryKey: string | null = null;
  recipes: IRecipeResponse[] = [];

  canLoadMore = true;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private title: Title,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        concatMap((res) => {
          this.categoryKey = res.get('key');
          if (!this.categoryKey) return of(null);
          return this.categoryService.getCategory(this.categoryKey);
        }),
        concatMap((category) => {
          this.category = category;
          if (this.category) {
            this.title.setTitle(`Recipes from ${this.category?.name} category`);
          }
          return this.categoryKey
            ? this.recipeService.getRecipesByCategory(this.categoryKey)
            : this.recipeService.getRecipes(this.pageSize);
        }),
      )
      .subscribe((res) => {
        if (res.length !== this.pageSize) {
          this.canLoadMore = false;
        }
        this.recipes = res;
      });
  }

  loadRecipes(): void {
    this.recipeService
      .getRecipes(this.pageSize, this.recipes[this.recipes.length - 1].key)
      .pipe(take(1))
      .subscribe((res) => {
        if (res.length !== this.pageSize) {
          this.canLoadMore = false;
        }
        this.recipes = [...this.recipes, ...res];
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
