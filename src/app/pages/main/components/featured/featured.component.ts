import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from '../../../../shared/interfaces/interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'rcp-featured',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss'
})
export class FeaturedComponent implements OnInit {

  @Input() title: string = '';
  @Input() recipes: IRecipe[] = [];

  maxLengthRecipes: IRecipe[] = [];

  private readonly MAX_LENGTH = 3;

  ngOnInit(): void {
    this.maxLengthRecipes = this.recipes.slice(0, this.MAX_LENGTH);
  }
}
