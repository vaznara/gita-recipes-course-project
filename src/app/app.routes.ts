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
import { RecipesComponent as UserRecipesComponent } from './pages/user/pages/recipes/recipes.component';

export const routes: Routes = [
  { path: '', component: MainComponent, title: 'Welcome to recipes' },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard], title: 'Please login' },
  { path: 'sign-up', component: SignupComponent, canActivate: [loginGuard], title: 'Welcome!' },
  {
    path: 'recipe', children: [
      { path: 'view', component: RecipeViewComponent },
      { path: 'view/:key', component: RecipeViewComponent },
    ]
  },
  {
    path: 'user', canActivateChild: [authGuard], runGuardsAndResolvers: 'always', children: [
      { path: 'profile', component: UserProfileComponent },
      { path: 'recipes', component: UserRecipesComponent, title: 'My Delicious recipes list' },
      {
        path: 'recipe', children: [
          { path: 'edit', component: RecipeEditComponent, canActivate: [authGuard] },
          { path: 'new', component: RecipeEditComponent, canActivate: [authGuard], title: 'Create new recipe' },
        ]
      }

    ]
  },
  {
    path: 'recipes', children: [
      { path: 'category/:key', component: RecipesComponent },
      { path: '', component: RecipesComponent, title: 'Delicious recipes list' },
    ]
  },
  { path: 'categories', component: CategoriesComponent, title: 'Categories list' },
  { path: '**', component: NotFoundComponent, title: 'We are sorry! This page doesn\'t exists' }
];
