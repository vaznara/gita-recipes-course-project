import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil, concatMap, Subject, EMPTY } from 'rxjs';
import { AuthService, RecipeService } from '../../../../shared/services';
import { IRecipeResponse } from '../../../../shared/interfaces/interface';
import { RecipesListingComponent } from '../../../../shared/components/recipes-listing/recipes-listing.component';

@Component({
  selector: 'rcp-recipes',
  standalone: true,
  imports: [RecipesListingComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesComponent implements OnInit, OnDestroy {
  private readonly ngUnsubscribe$: Subject<void> = new Subject();

  recipes: IRecipeResponse[] = [];

  constructor(
    private authService: AuthService,
    private recipeService: RecipeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        concatMap((user) => {
          if (!user) {
            this.router.navigate(['/recipes']);
            return EMPTY;
          }
          return this.recipeService.getUserRecipes(user.uid);
        }),
      )
      .subscribe((res) => {
        this.recipes = res;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
