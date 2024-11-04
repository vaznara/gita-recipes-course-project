import { Routes } from '@angular/router';
import { RecipeViewComponent } from './pages/recipe-view/recipe-view.component';
import { RecipeEditComponent } from './pages/recipe-edit/recipe-edit.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { RecipesComponent } from './pages/recipes/recipes.component';

export const routes: Routes = [
  {
    path: 'recipe', component: RecipeViewComponent, children: [
      { path: ':id', component: RecipeViewComponent },
      { path: 'edit/:id', component: RecipeEditComponent },
    ]
  },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:id', component: RecipesComponent }
];
