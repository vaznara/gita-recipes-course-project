import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../../shared/services/recipe.service';
import { IRecipe } from '../../../../shared/interfaces/interface';
import { SlideComponent } from './components/slide/slide.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'rcp-slider',
  standalone: true,
  imports: [SlideComponent, NgClass],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent implements OnInit {

  constructor(private recipeServer: RecipeService) {

  }

  recipes?: IRecipe[];

  ngOnInit(): void {
    this.recipeServer.getRecipesByCategoryId(1).subscribe(res => this.recipes = res)
  }
}
