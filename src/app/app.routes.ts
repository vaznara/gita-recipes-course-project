import { Routes } from '@angular/router';
import { RecipeViewComponent } from './pages/recipe-view/recipe-view.component';
import { RecipeEditComponent } from './pages/recipe-edit/recipe-edit.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'recipe', component: RecipeViewComponent, children: [
      { path: ':id', component: RecipeViewComponent },
      { path: 'edit/:id', component: RecipeEditComponent },
    ]
  },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:id', component: RecipesComponent },
  { path: '**', component: MainComponent }
];
