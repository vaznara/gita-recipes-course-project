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
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'sign-up', component: SignupComponent, canActivate: [loginGuard] },
  {
    path: 'recipe', children: [
      { path: ':key', component: RecipeViewComponent },
    ]
  },
  {
    path: 'user', canActivateChild: [authGuard], runGuardsAndResolvers: 'always', children: [
      { path: 'profile', component: UserProfileComponent },
      {
        path: 'recipe', children: [
          { path: 'edit/:key', component: RecipeEditComponent, canActivate: [authGuard] },
          { path: 'new', component: RecipeEditComponent, canActivate: [authGuard] },
        ]
      }

    ]
  },
  {
    path: 'recipes', children: [
      { path: 'category/:key', component: RecipesComponent },
      { path: '', component: RecipesComponent },
    ]
  },
  { path: 'categories', component: CategoriesComponent },
  { path: '**', component: NotFoundComponent }
];
