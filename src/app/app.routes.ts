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
  {
    path: '',
    data: { breadcrumb: 'Homepage' },
    children: [
      {
        path: '', component: MainComponent,
        title: 'Welcome to recipes',
      },
      { path: 'login', component: LoginComponent, canActivate: [loginGuard], title: 'Please login', data: { breadcrumb: 'Login' } },
      { path: 'sign-up', component: SignupComponent, canActivate: [loginGuard], title: 'Welcome!', data: { breadcrumb: 'Sign-up' } },
      {
        path: 'recipe', data: { breadcrumb: 'Recipe' },
        children: [
          { path: '', redirectTo: '/recipes', pathMatch: 'full' },
          { path: 'view', component: RecipeViewComponent, data: { breadcrumb: 'View recipe' } },
          { path: 'view/:key', component: RecipeViewComponent, data: { breadcrumb: 'View recipe' } },
        ]
      },
      {
        path: 'recipes', data: { breadcrumb: 'Recipes' }, component: RecipesComponent, title: 'Delicious recipes list'
      },
      { path: 'categories', component: CategoriesComponent, title: 'Categories list', data: { breadcrumb: 'Categories' } },
      {
        path: 'user', canActivateChild: [authGuard], runGuardsAndResolvers: 'always', data: { breadcrumb: 'User' }, children: [
          { path: 'profile', component: UserProfileComponent, data: { breadcrumb: 'User profile' } },
          { path: 'recipes', component: UserRecipesComponent, title: 'My Delicious recipes list', data: { breadcrumb: 'User recipes' } },
          {
            path: 'recipe', data: { breadcrumb: 'Recipe' }, children: [
              { path: 'edit', component: RecipeEditComponent, canActivate: [authGuard], data: { breadcrumb: 'Edit recipe' } },
              { path: 'new', component: RecipeEditComponent, canActivate: [authGuard], title: 'Create new recipe', data: { breadcrumb: 'New recipe' } },
            ]
          }

        ]
      },
      { path: '**', component: NotFoundComponent, title: 'We are sorry! This page doesn\'t exists' }
    ]
  },
];
