import { Component, OnDestroy, OnInit } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';
import { CategoryService, RecipeService } from '../../shared/services';
import { ICategoryResponse, IRecipeResponse } from '../../shared/interfaces/interface';
import { FeaturedComponent } from './components/featured/featured.component';
import { PopularCategoriesComponent } from './components/popular-categories/popular-categories.component';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'rcp-main',
  standalone: true,
  imports: [SliderComponent, FeaturedComponent, PopularCategoriesComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  ngUnsubscribe$: Subject<void> = new Subject();

  featuredRecipes: IRecipeResponse[] = [];
  carouselRecipes: IRecipeResponse[] = [];
  popularCategories: ICategoryResponse[] = [];

  constructor(
    private recipeService: RecipeService,
    private categoryService: CategoryService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.recipeService
      .getFeaturedRecipes()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res) => (this.featuredRecipes = res));

    this.recipeService
      .getMainCarouselRecipes()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res) => (this.carouselRecipes = res));

    this.categoryService
      .getPopularCategories()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res) => (this.popularCategories = res));
  }

  onSlideClick(recipe: IRecipeResponse): void {
    this.router.navigate([`/recipe/view`], { state: { recipe } });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
