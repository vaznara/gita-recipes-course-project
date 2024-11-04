import { Routes } from '@angular/router';
import { RecipeViewComponent } from './pages/recipe-view/recipe-view.component';
import { RecipeEditComponent } from './pages/recipe-edit/recipe-edit.component';
import { CategoriesComponent } from './pages/categories/categories.component';

export const routes: Routes = [
  {
    path: 'recipe', component: RecipeViewComponent
  },
  {
    path: 'edit', component: RecipeEditComponent
  },
  {
    path: 'categories', component: CategoriesComponent
  },
  { path: 'category/:id', component: RecipeViewComponent }
];
