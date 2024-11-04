import { Routes } from '@angular/router';
import { RecipeViewComponent } from './pages/recipe-view/recipe-view.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: 'recipe', component: RecipeViewComponent }
];
