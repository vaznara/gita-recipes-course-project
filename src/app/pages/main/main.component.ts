import { Component, OnInit } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';
import { RecipeService } from '../../shared/services';
import { IRecipe } from '../../shared/interfaces/interface';
import { FeaturedComponent } from "./components/featured/featured.component";
import { PopularCategoriesComponent } from './components/popular-categories/popular-categories.component';

@Component({
  selector: 'rcp-main',
  standalone: true,
  imports: [SliderComponent, FeaturedComponent, PopularCategoriesComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  featuredRecipes: IRecipe[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // this.recipeService.getRecipesByCategory("2").subscribe(res => this.featuredRecipes = res ?? []);
  }
}
