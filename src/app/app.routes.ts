import { Routes } from '@angular/router';
import { RecipeViewComponent } from './pages/recipe-view/recipe-view.component';
import { RecipeEditComponent } from './pages/recipe-edit/recipe-edit.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './shared/guards/auth-guard.guard';
import { loginGuard } from './shared/guards/login.guard';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'sign-up', component: SignupComponent },
  {
    path: 'recipe', component: RecipeViewComponent, children: [
      { path: ':id', component: RecipeViewComponent },
      { path: 'edit/:id', component: RecipeEditComponent, canActivate: [authGuard] },
    ]
  },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:id', component: RecipesComponent },
  { path: '**', component: NotFoundComponent }
];
