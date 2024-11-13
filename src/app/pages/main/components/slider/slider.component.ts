import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRecipeResponse } from '../../../../shared/interfaces/interface';
import { SlideComponent } from './components/slide/slide.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'rcp-slider',
  standalone: true,
  imports: [SlideComponent, NgClass],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {

  @Input() recipes?: IRecipeResponse[];

  @Output() viewRecipe: EventEmitter<IRecipeResponse> = new EventEmitter();

  onView(recipe: IRecipeResponse): void {
    this.viewRecipe.emit(recipe);
  }
}
