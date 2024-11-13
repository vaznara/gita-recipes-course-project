import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IRecipeResponse } from '../../../../shared/interfaces/interface';
import { RecipeCardComponent } from '../../../../shared/components/recipe-card/recipe-card.component';

@Component({
  selector: 'rcp-featured',
  standalone: true,
  imports: [RecipeCardComponent],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedComponent implements OnInit {

  @Input() title: string = '';
  @Input() recipes: IRecipeResponse[] = [];

  private readonly MAX_LENGTH = 4;

  ngOnInit(): void {
    if (this.recipes.length > this.MAX_LENGTH) {
      this.recipes = this.recipes.slice(0, this.MAX_LENGTH);
    }
  }
}
