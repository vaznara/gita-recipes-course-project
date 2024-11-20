import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard.guard';
import { loginGuard } from './shared/guards/login.guard';
import { formGuard } from './shared/guards/form.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
    canActivate: [loginGuard],
    title: 'Please login',
    data: { breadcrumb: 'Login' },
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./pages/signup/signup.component').then((c) => c.SignupComponent),
    canActivate: [loginGuard],
    title: 'Welcome!',
    data: { breadcrumb: 'Sign-up' },
  },
  {
    path: 'recipe',
    data: { breadcrumb: 'Recipe' },
    children: [
      {
        path: 'view',
        loadComponent: () =>
          import('./pages/recipe-view/recipe-view.component').then((c) => c.RecipeViewComponent),
        data: { breadcrumb: 'View recipe' },
      },
      {
        path: 'edit',
        canDeactivate: [formGuard],
        runGuardsAndResolvers: 'always',
        loadComponent: () =>
          import('./pages/recipe-edit/recipe-edit.component').then((c) => c.RecipeEditComponent),
        canActivate: [authGuard],
        data: { breadcrumb: 'Edit recipe' },
      },
      {
        path: 'new',
        canDeactivate: [formGuard],
        runGuardsAndResolvers: 'always',
        loadComponent: () =>
          import('./pages/recipe-edit/recipe-edit.component').then((c) => c.RecipeEditComponent),
        canActivate: [authGuard],
        title: 'Create new recipe',
        data: { breadcrumb: 'New recipe' },
      },
      {
        path: 'view/:key',
        loadComponent: () =>
          import('./pages/recipe-view/recipe-view.component').then((c) => c.RecipeViewComponent),
        data: { breadcrumb: 'View recipe' },
      },
      { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    ],
  },
  {
    path: 'recipes',
    data: { breadcrumb: 'Recipes' },
    loadComponent: () =>
      import('./pages/recipes/recipes.component').then((c) => c.RecipesComponent),
    title: 'Delicious recipes list',
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/categories/categories.component').then((c) => c.CategoriesComponent),
    title: 'Categories list',
    data: { breadcrumb: 'Categories' },
  },
  {
    path: 'my-profile',
    loadComponent: () =>
      import('./pages/my-profile/my-profile.component').then((c) => c.MyProfileComponent),
    data: { breadcrumb: 'User profile' },
  },
  {
    path: 'my-recipes',
    loadComponent: () =>
      import('./pages/my-recipes/my-recipes.component').then((c) => c.MyRecipesComponent),
    title: 'My Delicious recipes list',
    data: { breadcrumb: 'My recipes' },
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/main/main.component').then((c) => c.MainComponent),
    data: { breadcrumb: 'Home' },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
    data: { breadcrumb: 'Not found' },
    title: "We are sorry! This page doesn't exists",
  },
];
